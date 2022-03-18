const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const Model = require('./models/clase');
const modelProducts = new Model('../database/products.json');
const modelChat = new Model('../database/chat.json');

const server = http.createServer(app);
const io = new Server(server);

// Websocket
io.on("connection", async (socket) => {
    console.log(`${socket.id} connected!`);
    
    // ---- PRODUCTS ----
    const products = await modelProducts.getAll();

    // Envía todos los productos.
    socket.emit("products", products);

    // Pushea el nuevo producto y renderiza nuevamente los productos.
    socket.on("new-prod", async (data) => {
        await modelProducts.add(data);
        io.sockets.emit("products", await modelProducts.getAll());
    });

    // ---- CHAT ----
    // Envia los mensajes hasta entonces enviados.
    socket.emit("messages", await modelChat.getAll());

    // Pushea el nuevo mensaje recibido y lo renderiza en todos los clientes.
    socket.on("new-message", async (data) => {
        await modelChat.add(data);
        io.sockets.emit("messages", await modelChat.getAll());
    });
});

// ---- Routes requires ----
const homeRouter = require('./routes/home');
// const categoriesRouter = require('./routes/categories')
const productsRouter = require('./routes/products');
const Contenedor = require('./models/clase');

//---- Middlewares ----
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
app.use("/api/products", productsRouter);


server.listen(8080, () => console.log(`Listening on localhost:8080`));