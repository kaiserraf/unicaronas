// backend/src/routes/mensagens.js
const router = require('express').Router();
const ctrl   = require('../controllers/mensagensController');
const auth   = require('../middleware/auth');

router.post('/',          auth, ctrl.enviar);
router.get('/nao-lidas',  auth, ctrl.contagemNaoLidas);
router.get('/:solicitacao_id', auth, ctrl.listar);

module.exports = router;
