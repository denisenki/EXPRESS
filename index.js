// подключение express
const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const path = require('path');
// создаем объект приложения
const app = express();
//подключаем роуты
const router = express.Router();
const add = require('./routes/add');
const index = require('./routes/index');
const products = require('./routes/products');

const bodyParser = require('body-parser');

// устанавливаем настройки для файлов layout
app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
))
app.set('view engine', 'hbs');

//подключаем статичную папку
app.use(express.static('public'))

// определяем обработчик для маршрута "/"
app.use("/", index);
app.use("/products", products);
app.use("/add", add);

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});

const PORT = process.env.PORT || 3000

// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});