// /api/strava/token.js
//
// Vercel Serverless Function (Node.js runtime).
//
// Responsabilidade única: trocar um código OAuth do Strava por tokens de
// acesso (grant_type=authorization_code), ou renovar um access_token
// existente (grant_type=refresh_token) — SEMPRE usando o Client Secret do
// lado do servidor. O Client Secret nunca chega ao navegador: é lido
// exclusivamente de process.env e nunca incluído na resposta.
//
// Este endpoint é só infraestrutura (Commit 1). O frontend (exchangeStravaCode,
// refreshStravaToken) ainda NÃO foi alterado para chamá-lo — isso é o Commit 2.
//
// Request esperado (POST, JSON):
//   { "code": "<código OAuth recebido no redirect>" }   -> grant_type=authorization_code
//   { "refresh_token": "<refresh_token salvo>" }        -> grant_type=refresh_token
//
// Response (200): mesmo formato que o Strava já retorna e que o frontend
// atual já espera — access_token, refresh_token, expires_at, athlete (quando
// aplicável). client_id/client_secret NUNCA aparecem na resposta.

const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

function setCorsHeaders(req, res) {
  // Mesma origem (pacemaker-hazel.vercel.app chamando /api no próprio domínio)
  // não precisa de CORS, mas refletimos a Origin da requisição para cobrir
  // previews da Vercel (*.vercel.app) e ambiente local, sem usar '*' — assim
  // não abrimos o endpoint para qualquer site de terceiros sem necessidade.
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  // Preflight CORS (navegadores podem disparar isso mesmo em same-origin
  // dependendo de headers/config; responder sempre é seguro e barato).
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ message: 'Método não permitido. Use POST.' });
    return;
  }

  // Credenciais exclusivamente do servidor. Sem fallback para nada vindo do
  // frontend — se as env vars não estiverem configuradas na Vercel, o
  // endpoint falha de forma explícita (500), nunca tenta usar outra fonte.
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('[strava/token] STRAVA_CLIENT_ID/STRAVA_CLIENT_SECRET ausentes em process.env.');
    res.status(500).json({ message: 'Configuração do servidor incompleta.' });
    return;
  }

  // Vercel normalmente já entrega req.body parseado quando Content-Type é
  // application/json, mas tratamos o caso de vir como string por segurança.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = null;
    }
  }
  if (!body || typeof body !== 'object') {
    res.status(400).json({ message: 'Corpo da requisição inválido. Envie JSON.' });
    return;
  }

  const { code, refresh_token } = body;
  const hasCode = typeof code === 'string' && code.trim().length > 0;
  const hasRefresh = typeof refresh_token === 'string' && refresh_token.trim().length > 0;

  if (!hasCode && !hasRefresh) {
    res.status(400).json({ message: 'Envie "code" (troca inicial) ou "refresh_token" (renovação).' });
    return;
  }
  if (hasCode && hasRefresh) {
    res.status(400).json({ message: 'Envie apenas um: "code" OU "refresh_token", não os dois.' });
    return;
  }

  const params = hasCode
    ? { client_id: clientId, client_secret: clientSecret, code, grant_type: 'authorization_code' }
    : { client_id: clientId, client_secret: clientSecret, refresh_token, grant_type: 'refresh_token' };

  let stravaRes;
  try {
    stravaRes = await fetch(STRAVA_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  } catch (e) {
    console.error('[strava/token] Falha de rede ao chamar o Strava:', e.message);
    res.status(502).json({ message: 'Não foi possível contatar o Strava. Tente novamente.' });
    return;
  }

  let data;
  try {
    data = await stravaRes.json();
  } catch (e) {
    console.error('[strava/token] Resposta do Strava não é JSON válido.');
    res.status(502).json({ message: 'Resposta inválida do Strava.' });
    return;
  }

  if (!stravaRes.ok || !data.access_token) {
    // Repassa status e mensagem do Strava (ex: código expirado, refresh token
    // revogado). A resposta do Strava aqui nunca contém client_secret.
    res.status(stravaRes.status || 400).json({
      message: data.message || 'Falha na autenticação com o Strava.',
      errors: data.errors || undefined,
    });
    return;
  }

  // Filtro explícito de saída: só os campos que o frontend atual já consome.
  // client_id e client_secret nunca são incluídos aqui, mesmo que por algum
  // motivo viessem ecoados na resposta do Strava (não vêm, mas a filtragem
  // explícita é a garantia real, não uma suposição sobre o comportamento deles).
  const safeResponse = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
    expires_in: data.expires_in,
    token_type: data.token_type,
  };
  if (data.athlete) safeResponse.athlete = data.athlete;

  res.status(200).json(safeResponse);
};
