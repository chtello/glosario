const express = require('express');
const path = require('path');
const app = express();

// Middlewares

app.set('view engine', 'ejs');``
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la aplicación
app.use('/', require('./routes/myRouter'));

// Middleware para manejar la página 404
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Puerto
const port = 3000;
// Corremos el servidor en el puerto seleccionado
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} correctamente`);
});
