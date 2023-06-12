// определяем Router
const express = require('express');
const router = express.Router();
const Course = require('../models/course')

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

router.get("/", async function (request, response) {
    const courses = await Course.getAll()
    // отправляем ответ
    response.render('products.hbs', {
        title: 'Продукты',
        isProduct: true,
        courses
    });
});

router.get("/:id", async function (request, response) {
    const courses = await Course.getByID(request.params.id)
    // отправляем ответ
    response.render('product.hbs', {
        isProduct: true,
        courses
    });
});

// страница редактирования курса
router.get("/:id/edit", async function (request, response) {
    // проверка прав
    if (!request.query.allow) {
        return response.redirect('/')
    }

    const course = await Course.getByID(request.params.id)
    // отправляем ответ
    response.render('edit.hbs', {
        isProduct: true,
        course
    });
});

// Обновление курса
router.post("/edit", urlencodedParser, async function (request, response) {
    if (!request.body) return response.sendStatus(400)
    console.log(request.body)
    await Course.update(request.body)

    response.redirect('/products')

});

module.exports = router;