// определяем Router
const express = require('express');
const router = express.Router();

//страница добавление продукта
router.get("/", function (request, response) {
    // отправляем ответ
    response.render('index.hbs', {
        title: 'Главная страница',
        isMain: true
    });
});

module.exports = router;