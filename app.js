const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');


//configuration des routes
const routesService = require("./routes/services");
const routesRestaurant = require("./routes/restaurants");
const routesProduit = require("./routes/produits");
const routesContact = require("./routes/contact");
const routesRechercher = require("./routes/rechercher");

//configurer PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "templates"));

//Configurer le body-parser pour récupérer les données de formulaire en JSON et lisible dans req.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://sylvainpellier:qdNlI2acJDcfsX3Y@cluster0.jli9g.mongodb.net/sample_restaurants?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Votre connexion est  réussie'); } )
    .catch(() => { console.log('Votre connexion a échoué') } );


//on créé des routes statiques qui vont nous permettre de charger des données dans des dossiers spécifiques
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));


//Configuration des middlewares et appliquation des routes
app.use("/restaurants",routesRestaurant);
app.use("/produits",routesProduit);
app.use("/services",routesService);
app.use("/contact",routesContact);
app.use("/rechercher",routesRechercher);



//middleware utilisé si aucune autre route n'a été appelé en fait
app.use((req, res, next) => {

    const { produits } = require("./data/produits");
    const { services } = require("./data/services");

    //si la requête est http://localhost:3000 ou http://localhost:3000/accueil
    //on déclenche la page pug accueil
    if(req.path === "/" || req.path === "/accueil")
    {
        res.render("accueil", { path:req.baseUrl, title:"Accueil", produits, services });

    } else {
        //dans tous les autres cas on déclenche la page 404
        res.render("404",{title:"Erreur 404",path:req.baseUrl});
    }

});


module.exports = app;