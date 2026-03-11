// backend/src/routes/usuarios.js
const router = require('express').Router();
const ctrl   = require('../controllers/usuariosController');
const auth   = require('../middleware/auth');

router.post('/',          ctrl.cadastrar);
router.post('/login',     ctrl.login);        // POST /api/usuarios/login
router.get('/:id',        auth, ctrl.buscarPorId);
router.patch('/perfil',   auth, ctrl.atualizarPerfil);

module.exports = router;
