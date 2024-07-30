var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Página de consulta de usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4444/usuarios');
    res.render('usuarios', { usuarios: response.data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Página de creación de usuarios
router.get('/crear-usuario', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:4444/perfiles');
    res.render('crear-usuario', { perfiles: response.data });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Enviar datos para crear un nuevo usuario
router.post('/crear-usuario', async (req, res) => {
  try {
    const { usuario, nombre, apellido, id_perfil } = req.body;
    await axios.post('http://localhost:4444/usuarios', { usuario, nombre, apellido, id_perfil });
    res.redirect('/usuarios');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
