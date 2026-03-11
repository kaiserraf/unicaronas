// backend/src/routes/avaliacoes.js
const router = require('express').Router();
const ctrl   = require('../controllers/avaliacoesController');
const auth   = require('../middleware/auth');

router.post('/',              auth, ctrl.avaliar);
router.get('/:usuario_id',         ctrl.listarPorUsuario);

module.exports = router;
