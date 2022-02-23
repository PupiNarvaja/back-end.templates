const socket = io();

const renderProds = (data) => {
    const card = data.map(prod => {
        return (`<tr>
                    <td><img src=${prod.image} alt=${prod.title} width="100"></td>
                    <td>${prod.title}</td>
                    <td>${prod.price}</td> 
                </tr>`)
    });
    document.getElementById("cart").innerHTML = card
}

socket.on("prods", (data) => {
    return renderProds(data);
})

const addMsg = (e) => {
    e.preventDefault();
    const chat = {
        mail: document.getElementById("mail").value,
        message: document.getElementById("message").value
    }

    socket.emit("newMsg", chat)
    return false
}

const btn = document.getElementById("btn")
btn.addEventListener("click", addMsg);

const renderChat = (chat) => {
    const space = chat.map(chat => {
        return (`<p>
                    ${chat.email}: ${chat.message} 
                </p>`)
    });
}

socket.on("msgs", data => renderChat(data));