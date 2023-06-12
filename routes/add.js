// определяем Router
const express = require('express');
const Course = require('../models/course')
const router = express.Router();

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

//страница добавление продукта
router.get("/", function (request, response) {
    // отправляем ответ
    response.render('add.hbs', {
        title: 'Добавить продукт',
        isAdd: true
    });
});

router.post("/", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    const course = new Course(request.body.name, request.body.price, request.body.link)
    course.save()
    response.redirect('/products')

});

module.exports = router;