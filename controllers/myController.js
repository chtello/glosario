exports.Principal = (req, res) => {
    res.status(200).render('Principal'); 
};
router.get('/gls', (req, res) => {
    const { wordInput } = req.query;
    res.send(`La palabra ingresada es: ${wordInput}`);
});
