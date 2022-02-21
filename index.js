const express = require('express');
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 8080;

const products = require('./database/products.json');

const homeRouter = require('./routes/home');
// const categoriesRouter = require('./routes/categories')
const productsRouter = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "docs")));

app.use("/", homeRouter);

app.engine("hbs", engine({
    layoutDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "index",
    extname: "hbs"
}));
app.set("view engine", "hbs");

// app.use("/api/categories", categoriesRouter)
app.get("/products", (req, res) => res.render("main", { products }));
app.use("/products", productsRouter);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));