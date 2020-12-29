
const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const UserController = require('../controllers/UserController');
const NoticiaController = require('../controllers/NoticiaController');


router.post('/novoUsuario',UserController.store);
router.post('/login',UserController.login);
router.get('/noticia/:id',NoticiaController.show);
router.get('/noticias',NoticiaController.index);
//router.put('/noticia/:id',NoticiaController.update);
router.put('/noticia/:id', multer(multerConfig).single('foto') ,NoticiaController.update);
router.delete('/noticia/:id',NoticiaController.delete);
router.post('/noticias', multer(multerConfig).single('foto') , NoticiaController.create);



module.exports = router;