// frontend/js/api.js — Módulo de comunicação com a API

const API_URL = 'http://localhost:3000/api';

// ── Token JWT ────────────────────────────────────────────────
const getToken  = ()       => localStorage.getItem('unicaronas_token');
const setToken  = (t)      => localStorage.setItem('unicaronas_token', t);
const clearToken= ()       => localStorage.removeItem('unicaronas_token');
const getUser   = ()       => JSON.parse(localStorage.getItem('unicaronas_user') || 'null');
const setUser   = (u)      => localStorage.setItem('unicaronas_user', JSON.stringify(u));
const clearUser = ()       => localStorage.removeItem('unicaronas_user');

const isLogado = () => !!getToken();

const logout = () => { clearToken(); clearUser(); window.location.href = '/frontend/pages/login.html'; };

// ── Fetch wrapper ────────────────────────────────────────────
const request = async (path, options = {}) => {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res  = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Erro na requisição');
  return data;
};

// ── API calls ────────────────────────────────────────────────
const api = {
  // Usuários
  cadastrar:  (body) => request('/usuarios',       { method: 'POST', body: JSON.stringify(body) }),
  login:      (body) => request('/usuarios/login', { method: 'POST', body: JSON.stringify(body) }),
  perfil:     (id)   => request(`/usuarios/${id}`),
  atualizarPerfil: (body) => request('/usuarios/perfil', { method: 'PATCH', body: JSON.stringify(body) }),

  // Caronas
  listarCaronas:  (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/caronas${qs ? '?' + qs : ''}`);
  },
  criarCarona:    (body)  => request('/caronas', { method: 'POST', body: JSON.stringify(body) }),
  buscarCarona:   (id)    => request(`/caronas/${id}`),
  solicitarVaga:  (id)    => request(`/caronas/${id}/solicitar`, { method: 'POST' }),
  responderSolicitacao: (id, status) =>
    request(`/caronas/solicitacoes/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Chat
  enviarMensagem: (body)  => request('/mensagens', { method: 'POST', body: JSON.stringify(body) }),
  listarMensagens:(sid)   => request(`/mensagens/${sid}`),

  // Pagamentos
  pagar:      (body)  => request('/pagamentos', { method: 'POST', body: JSON.stringify(body) }),
  historicoPagamentos: () => request('/pagamentos/historico'),

  // Avaliações
  avaliar:    (body)  => request('/avaliacoes', { method: 'POST', body: JSON.stringify(body) }),
  avaliacoes: (uid)   => request(`/avaliacoes/${uid}`),
};

// ── Helpers de UI ────────────────────────────────────────────
const showAlert = (msg, tipo = 'success', containerId = 'alert-container') => {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${tipo}">${msg}</div>`;
  setTimeout(() => el.innerHTML = '', 4000);
};

const formatarData = (iso) =>
  new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

const formatarMoeda = (v) =>
  Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const iniciais = (nome) =>
  nome?.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase() || '?';

// ── Cálculo de sugestão de preço (frontend) ──────────────────
const calcularValorSugerido = (distanciaKm, custoPorKm = 0.30) => {
  return Math.round(distanciaKm * custoPorKm * 100) / 100;
};

// ── Proteção de rota ─────────────────────────────────────────
const protegerRota = () => {
  if (!isLogado()) {
    window.location.href = '/frontend/pages/login.html';
  }
};

// Expor globalmente
window.api          = api;
window.getToken     = getToken;
window.setToken     = setToken;
window.getUser      = getUser;
window.setUser      = setUser;
window.logout       = logout;
window.isLogado     = isLogado;
window.showAlert    = showAlert;
window.formatarData = formatarData;
window.formatarMoeda= formatarMoeda;
window.iniciais     = iniciais;
window.calcularValorSugerido = calcularValorSugerido;
window.protegerRota = protegerRota;
