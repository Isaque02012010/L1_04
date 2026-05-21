const express = require('express');
const router = express.Router();

// Página inicial
router.get("/", (req, res) => {
    res.render("index", {
    });
});

// Receber notas
router.post('/', (req, res) => {

    let nota1 = parseFloat(req.body.nota1);
    let nota2 = parseFloat(req.body.nota2);

    let media = (nota1 + nota2) / 2;

    let conceito = '';

    if(media > 9 && media <= 10){
        conceito = 'A';
    }
    else if(media > 7.5 && media <= 9){
        conceito = 'B';
    }
    else if(media > 6 && media <= 7.5){
        conceito = 'C';
    }
    else if(media > 4 && media <= 6){
        conceito = 'D';
    }
    else{
        conceito = 'E';
    }

    res.render('index', {
        nota1,
        nota2,
        media,
        conceito
    });

});

module.exports = router;