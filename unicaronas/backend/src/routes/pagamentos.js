// backend/src/routes/pagamentos.js
const router = require('express').Router();
const ctrl   = require('../controllers/pagamentosController');
const auth   = require('../middleware/auth');

router.post('/',          auth, ctrl.processar);
router.get('/historico',  auth, ctrl.historico);

module.exports = router;
