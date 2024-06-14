// Respuesta a una solicitud de tipo GET para la página de inicio
exports.Principal = (req, res) => {
    res.status(200).render('Principal'); 
};
// Renderizar la página del juego 2
exports.glsEsp = (req, res) => {
    res.status(200).render('glsEsp');
};
// Renderizar la página del juego 2
exports.glsIng = (req, res) => {
    res.status(200).render('glsIng');
};