const express = require('express');
const router = express.Router();
// Importa as funções necessárias do express-validator
const { body, validationResult } = require('express-validator');

// Página inicial
router.get("/", (req, res) => {
    res.render("index", { 
        errors: [], // Passa um array vazio de erros por padrão
        nota1: '', 
        nota2: '' 
    });
});

// Receber notas com validação
router.post('/', [
    // Regras de validação para a Nota 1
    body('nota1')
        .notEmpty().withMessage('A primeira nota é obrigatória.')
        .isFloat({ min: 0, max: 10 }).withMessage('A nota 1 deve ser um número entre 0 e 10.'),
    
    // Regras de validação para a Nota 2
    body('nota2')
        .notEmpty().withMessage('A segunda nota é obrigatória.')
        .isFloat({ min: 0, max: 10 }).withMessage('A nota 2 deve ser um número entre 0 e 10.')
], (req, res) => {

    // Verifica se houveram erros na validação
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Se houver erros, renderiza a página novamente exibindo os alertas
        return res.render('index', {
            errors: errors.array(),
            // Mantém os dados que o usuário digitou para ele não perder o que preencheu
            nota1: req.body.nota1,
            nota2: req.body.nota2,
            media: undefined,
            conceito: undefined
        });
    }

    // Se passou na validação, o código segue normalmente
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
        errors: [], // Sem erros
        nota1,
        nota2,
        media,
        conceito
    });

});

module.exports = router;
