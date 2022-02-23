const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');

const products = require('./database/products.json');

const server = http.createServer(app);
const io = socketIO(server);

// Websocket
const chat = [];
io.on("connection", (socket) => {
    console.log(`${socket.id} connected!`);
    socket.emit("prods", products);

    socket.emit("msg", chat);
    socket.on("newMsg", data => {
        chat.push(data);
        console.log(data);
        io.sockets.emit("msgs", chat);
    })
})










// ---- Routes requires ----
const homeRouter = require('./routes/home');
// const categoriesRouter = require('./routes/categories')
const productsRouter = require('./routes/products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "docs")));

app.engine("hbs", engine({
    layoutDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "index",
    extname: "hbs"
}));
app.set("view engine", "hbs");


// ---- Routes calls ----
app.use("/", homeRouter);
// app.use("/categories", categoriesRouter)
app.use("/products", productsRouter);



app.listen(8080, () => console.log(`Listening on localhost:8080`));