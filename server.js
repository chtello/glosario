const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scripts'))); // Servir scripts/app.js

app.use('/', require('./routes/myRouter'));

// Middleware para el manejo de errores 404
app.use((req, res) => {
    res.status(404).render('404');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} correctamente`);
});
