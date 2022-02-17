//Query a la DB.

const products = require(".../database/productos.json");

const nombre = "Pupi";

const template = document.getElementById("template").innerHTML;

//compila el template.
const compile = Handlebars.compile(template)

//Combina el template y datos en formato HTML.
const result = compile({ products });
document.getElementById("app").innerHTML += result;