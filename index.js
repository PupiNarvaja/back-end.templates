const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

// const products = require('./database/products.json');
const products = [
    {
      id: 0,
      name: "Jacket0",
      type: "jacket",
      price: 2000,
      image: "https://res.cloudinary.com/this/image/upload/v1642777578/p3_mc8xcq.jpg"
    },
    {
      id: 1,
      name: "Shirt0",
      type: "shirt",
      price: 1300,
      image: "https://res.cloudinary.com/this/image/upload/v1642778633/p7_tvv6dj.jpg"
    },
    {
      id: 2,
      name: "Shirt1",
      type: "shirt",
      price: 1700,
      image: "https://res.cloudinary.com/this/image/upload/v1642778672/p9_mongye.jpg"
    }
];

const server = http.createServer(app);
const io = new Server(server);

const messages = [];

// Websocket
io.on("connection", (socket) => {
    console.log(`${socket.id} connected!`);

    // PRODUCTS.
    // Envía todos los productos.
    socket.emit("products", products);

    // Pushea el nuevo producto y renderiza nuevamente los productos.
    socket.on("new-prod", (data) => {
        products.push(data);
         io.sockets.emit("products", products);
    });

    // CHAT.
    // Envia los mensajes hasta entonces enviados.
    socket.emit("messages", messages);

    // Pushea el nuevo mensaje recibido y lo renderiza en todos los clientes.
    socket.on("new-message", (data) => {
        messages.push(data);
        io.sockets.emit("messages", messages);
    });
});

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


server.listen(8080, () => console.log(`Listening on localhost:8080`));