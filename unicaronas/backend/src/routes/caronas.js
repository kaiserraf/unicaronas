// backend/src/routes/caronas.js
const router = require('express').Router();
const ctrl   = require('../controllers/caronasController');
const auth   = require('../middleware/auth');

router.get('/',                             ctrl.listar);
router.post('/',                      auth, ctrl.criar);
router.get('/:id',                          ctrl.buscarPorId);
router.post('/:id/solicitar',         auth, ctrl.solicitar);
router.patch('/solicitacoes/:id',     auth, ctrl.responderSolicitacao);

module.exports = router;
