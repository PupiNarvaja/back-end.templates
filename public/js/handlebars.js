//Query a la DB.

const products = [
    { id: 0, name: "Jacket0", type: "jacket", price: 2000, thumbnail: "https://res.cloudinary.com/this/image/upload/v1642777578/p3_mc8xcq.jpg" },
    { id: 1, name: "Shirt0", type: "shirt", price: 1300, thumbnail: "https://res.cloudinary.com/this/image/upload/v1642778633/p7_tvv6dj.jpg" },
    { id: 2, name: "Shirt1", type: "shirt", price: 1700, thumbnail: "https://res.cloudinary.com/this/image/upload/v1642778672/p9_mongye.jpg" }
];

const nombre = "Pupi";

const template = document.getElementById("template").innerHTML;

//compila el template.
const compile = Handlebars.compile(template)

//Combina el template y datos en formato HTML.
const result = compile({ nombre, products });
document.getElementById("app").innerHTML += result;