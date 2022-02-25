const inputMail = document.getElementById("input-mail"); // E-mail input.
const chatContainer = document.getElementById("chat-container"); // Chat section.
const messageInput = document.getElementById("message-input"); // Chat input.
const sendBtn = document.getElementById("send-btn"); // Send button.
// const usersList = document.getElementById("user-list"); // Users' list.

const socket = io();

const date = Date.now();

function renderChat (data) {
    // Por cada mensaje del array messages, renderiza en una sección de chat.
    const html = data.map((elem) => {
        return(`<div>
        <p>
        <strong style="color:blue">${elem.author}</strong><span class="margin-left-small" style="color:brown">${new Date(date).toLocaleString()}</span>
        </p>
        <p class="italic" style="color:green">${elem.text}</p>
        </div>
        `)
    }).join(" ");
    document.getElementById("chat-container").innerHTML = html;
}

function addMessage(e) {
    // Si el campo "mail" está vacío, impide el envío del mensaje. Caso contrario, lo envía.
    const mailInput = document.getElementById("input-mail");
    const messageInput = document.getElementById("message-input");

    if (mailInput.value == "") {
        alert("Please, fill the e-mail field.");
        return;
    } else {
        const msg = {
            author: mailInput.value,
            text: messageInput.value,
        };
        socket.emit("new-message", msg);
        return false;
    };
};

socket.on("messages", data => {
    renderChat(data);
});

// PRODUCTS SECTION.
const cart = document.getElementById("cart");
const prodList = document.querySelector("#prods-list");

function renderProducts (data) {
    // Por cada producto del array products, renderiza en una sección de productos.
    const html = data.map((prod) => {
        return(`<div class="card">
        <img src=${prod.image} alt=${prod.name}>
        <h3>${prod.name}</h3>
        <p>$${prod.price}</p>
        </div>
        `)
    }).join(" ");
    cart.innerHTML = html;
};

socket.on("products", (data) => {
    renderProducts(data);
});

function addProduct(e) {
    const nameField = document.getElementById("prod-name");
    const priceField = document.getElementById("prod-price");
    const imageField = document.getElementById("prod-image");

    if (nameField.value == "" || priceField.value == "" || imageField.value == "") {
        alert("Please, fill the empty fields.");
        return;
    } else {
        const newProd = {
            name: nameField.value,
            price: priceField.value,
            image: imageField.value
        };
        socket.emit("new-prod", newProd);
        return false;
    }
};
