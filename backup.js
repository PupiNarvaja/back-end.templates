//Ejercicio generico.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const frase = "Hola mundo como estan";

// app.get("/api/products", (req, res) => {
//     res.send(products)
// });

app.get("/api/frase", (req, res) => {
    res.send("Frase:" + " " + frase)
});

app.get("/api/letras/:num", (req, res) => {
    let { num } = req.params;
    num > frase.length ? res.status(400).send("Error, larger than expected.")
     : 
    res.send("Letra:" + " " + frase[num]);
});

app.get("/api/palabras/:num", (req, res) => {
    let { num } = req.params;
    if (num == 1) {
        res.send("Palabra:" + " " + frase.slice(0, 4))
    } else if (num == 2) {
        res.send("Palabra:" + " " + frase.slice(5, 10))
    } else if (num == 3) {
        res.send("Palabra:" + " " + frase.slice(11, 15))
    } else if (num == 4) {
        res.send("Palabra:" + " " + frase.slice(16, 21))
    } else {
        res.status(400).send("Error, larger than expected.")
    }
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


// MIDDLEWARE ----> Funcion que se ejecuta en cierta ruta. ---> Handler. Se ejecuta antes del callback final, puede regresar errores, etc.
// Funciones que ejecutan logica y despues pasan el control al siguiente hasta el final. 
//app.use por ej. es

// /api es formato JSON, si maneja archivos es HTML.


// USAR handlebars:
//1. Instalar handlebars.
//2 importarlo.
//3 setear el engine comn layoutDir
//4 hacer el get con el res.render y lo demas.