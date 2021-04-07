const express = require('express');
const app = express();
const path = require("path");

//configurer PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "templates"));


app.use((req, res, next) => {
    res.set({ 'content-type': 'text/html; charset=utf-8' });
    res.status(200); //on définit le statut de la réponse qu'on va envoyer
    next();
});

let produits = [{
  id:1,
  name:"Produit 1",
  description:"fldksflds kflmdsk flmdsk fds",
  price: 12,
    image:"image1.png"
},{
    id:2,
    name:"Produit 2",
    description:"fldksflds kflmdsk flmdsk fds",
    price: 24,
    image:"image1.png"
},{
    id:3,
    name:"Produit 3",
    description:"fldksflds kflmdsk flmdsk fds",
    price: 33,
    image:"image2.png"
}];


let services = [{
    id:1,
    name:"Service 1",
    description:"fldksflds kflmdsk flmdsk fds",
    disponible: true
},{
    id:2,
    name:"Service 2",
    description:"fldksflds kflmdsk flmdsk fds",
    disponible: false
},{
    id:3,
    name:"Service 1",
    description:"fldksflds kflmdsk flmdsk fds",
    disponible: true
}];


app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/contact",(req, res, next) => {
    res.render("contact");
});

app.use("/accueil",(req, res, next) => {
    res.render("accueil", { title:"Accueil", liste:produits, services });
});

app.use("/services",(req, res, next) => {
    res.render("services", { title:"Services", services });
});


app.use("/produits",(req, res, next) => {
    res.render("produits", { liste:produits });
});

app.use((req, res, next) => {
    res.render("404");
});

module.exports = app;