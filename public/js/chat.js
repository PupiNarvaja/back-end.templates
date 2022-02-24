const inputMail = document.getElementById("input-mail"); // input del modal
const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("message-input"); // input del chat
const sendBtn = document.getElementById("send-btn"); // Send button.
const usersList = document.getElementById("user-list") // Users' list.

//Prods section.
const cart = document.getElementById("cart");
const prodList = document.querySelector("#prods-list");

const user = {};
const users = [];

const socket = io();

const date = Date.now();

function renderChat (data) {
    const html = data.map((elem, index) => {
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
    if (document.getElementById("input-mail").value == "") {
        alert("Please, fill the e-mail field.");
        return;
    } else {
        const msg = {
            author: document.getElementById("input-mail").value,
            text: document.getElementById("message-input").value
        };
        socket.emit("new-message", msg);
        return false;
    }
}

socket.on("messages", data => {
    renderChat(data);
});


// PRODUCTS SECTION.

//Intenté hacer lo mismo que en el chat para ver si asi 
// hacía dinámico el renderizado de productos pero me tira data.map is not a function.
// Voy a corregirlo.

// function renderProds (data) {
//     const html = data.map((elem, index) => {
//         return(`<div>
//         <img src="${elem.image}">
//         <p>${elem.name}</p>
//         </div>
//         `)
//     }).join(" ");

//     document.getElementById("prods-list").innerHTML += html;
// }

socket.on("products", data => {
    // renderProds(data)
    // Escucha "products" sel server.
    //Los trae y por cada uno crea un <li> con sus datos.
    const liElement = document.createElement("li");
    liElement.innerHTML = data.name;
    prodList.appendChild(liElement);

    // Crea un <img> por cada imagen.
    const imgElement = document.createElement("img");
    imgElement.src = data.image;
    imgElement.style.width = "100px";
    cart.prepend(imgElement);
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
}
