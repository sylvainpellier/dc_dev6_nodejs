const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');

const SchemaRestaurant = require('./schemas/restaurants');
const SchemaProduits = require('./schemas/produits');


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


//en attendant de pouvoir avoir accès à une base de données on se créé un tableau avec nos données
let produits = [{
  id:2,
  name:"Banane",
  description:"fldksflds nourriture kflmdsk flmdsk fds",
  price: 12,
  image:"image1.png",
},{
    id:3,
    name:"Tomate",
    description:"fldksflds nourriture kflmdsk flmdsk fds",
    price: 24,
    image:"image1.png"
},{
    id:1,
    name:"NodeJs",
    description:"fldksflds langage kflmdsk flmdsk fds",
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


//on créé des routes statiques qui vont nous permettre de charger des données dans des dossiers spécifiques
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));



//on créé notre première route qui correspond à l'url http://localhost:3000/contact
app.use("/contact",(req, res, next) => {
    //lorsque cette url va être appelé on charge le fichier pug qui se trouve dans le dossier templates/contact.pug
    res.render("contact",{path:req.baseUrl, title:"Contact"});
});

app.use("/doUpdateRestaurant/:id",(req,res,next)=>{
   let name = req.body.name;
   let cuisine = req.body.cuisine;
   let borough = req.body.borough;

   let restaurant = { name, cuisine, borough};

   Restaurants.updateOne({_id:req.params.id},restaurant).then(function(){
       res.redirect("/restaurants")
   }).catch(function(){  res.redirect("/404") })


});

app.use("/update/restaurant/:id",(req,res,next)=>{
    let id = req.params.id;

    Restaurants.findOne({_id:id}).then(restaurant => {
        res.render("restaurant_update_redirect",{title:"Modi restaurant",restaurant});
    })
});

app.use("/rechercher",(req, res, next) => {


    //on récupère les données envoyés par le formulaire en POST
    let price = req.body.price; //élément de formulaire dont le name est price
    let name = req.body.name; //élément de formulaire dont le name est name


    let produitsRecherches = []; //on définit un tableau vide
    if(price && name)
    {
        //si l'utilisateur a saisi un prix et un name on vient mettre dans produitsRecherches les produits qui correspond
        //produitsRecherches = produits.filter((item) => (item.name.indexOf(name) != -1 || item.description.indexOf(name) != -1) && item.price < price);

        //l'équivalent de la ligne précédente
        produits.forEach(function(item){
            if((item.name.includes(name) || item.description.includes(name)) && item.price < price)
            {
                produitsRecherches.push(item);
            }
        });

    } else if(price)
    {
        produitsRecherches = produits.filter((item) => item.price < price);
    } else if(name)
    {
        produitsRecherches = produits.filter((item) => (item.name.includes(name)  || item.description.includes(name))) ;
    }


    res.render("rechercher",{path:req.baseUrl, recherche:true, title:"Rechercher", produits : produitsRecherches, price,name});
});

app.use("/produit/:id",(req, res, next) => {

    let id = parseInt(req.params.id); //on récupère l'id sous forme de chaîne de caractère qu'on transforme en entier
    //Première possibilité : on parcourt le tableau
    // let produit = false; //on donne une valeur à produit, false au cas ou ne trouve rien
    //
    // produits.forEach((element)=>{
    //
    //     if(element.id === id ) //on vérifie si l'id de l'élément qu'on parcour est égale à l'id passé en paramètre
    //     {
    //         produit = element; //si c'est le cas on a notre produt qu'on cherchait
    //     }
    //
    // });

    //Autre méthode équivalente (moins cohérente avec le besoin)
    // let produits = produits.filter((item) => {return item.id === id});
    // let produit = (produits.length === 1) ? produits[0] : false;

    //La méthode la plus efficace et la plus cohérence
    let produit = produits.find(item => item.id === id );

    //si produit est faux c'est qu'aucun produit ne correspond, on passe au middleware suivant sans rendre la page ce qui va provoquer une erreur 404
    if(!produit) next(); else res.render("produit", {title:produit.name, produits, produit });
});

app.use("/service/:id",(req, res, next) => {


    //let service = services.find((item)=>item.id === parseInt(req.params.id));
    //if(service !== undefined) next(); else res.render("service", {path:req.baseUrl,  title:service.name, services, service });

    let idService = parseInt(req.params.id);

    let service = false;
    services.forEach(function(item){
       if(item.id === idService)
       {
           service = item;
       }

    });


    if(!service) {
        next();
    } else
    {
        res.render("service", {path:req.baseUrl,  title:service.name, services, service });
    }

});


app.use("/services",(req, res, next) => {
    res.render("services", {path:req.baseUrl,  title:"Services", services });
});


app.use("/produits",(req, res, next) => {

    SchemaProduits.find().then((produits)=>{
        res.render("produits", {path:req.baseUrl,  title:"SchemaProduits", produits });
    })

});

app.use("/restaurant/:id",(req,res,next) => {

    let id = req.params.id;

    SchemaRestaurant.findOne({_id:id}).then((restaurant)=> {
        res.render("restaurant", {path: req.baseUrl, title: restaurant.name, restaurant});
    }).catch(()=>{
            res.redirect(404,"/404");
    })


});

app.use("/delete_restaurant/:id",(req,res,next) => {

    SchemaRestaurant.deleteOne({_id:req.params.id}).then(()=>{
        res.redirect("/restaurants");
    });

});


app.use("/add_restaurant",(req,res,next) => {

    let name = req.body.name;
    let cuisine = req.body.cuisine;
    let borough = req.body.borough;

    let added = null;
    let error = null;

    if (name && cuisine && borough) {
        let restaurant = new SchemaRestaurant();
        restaurant.name = name;
        restaurant.cuisine = cuisine;
        restaurant.borough = borough;


        restaurant.save().then( (restaurant) =>
        {
            added = true;
            res.render("restaurant_add", {path:req.baseUrl,  title:"Ajouter un restaurant", added, error, restaurant});
        }).catch(error=>console.error(error));
    } else
    {
        res.render("restaurant_add", {path: req.baseUrl, title: "Ajouter un restaurant", added, error});
    }



});


app.use("/update_restaurant/:id",(req, res, next) => {

    let name = req.body.name;
    let cuisine = req.body.cuisine;
    let borough = req.body.borough;

    if (name && cuisine && borough) {

            const restaurant = {
                name, cuisine, borough
            };

            SchemaRestaurant.updateOne({_id: req.params.id}, restaurant ).then((restaurant)=>
            {
                SchemaRestaurant.findOne({_id: req.params.id} ).then((restaurant)=>
                {
                    res.render("restaurant_update", { title:"Modifier un restaurant", updated:true, restaurant });
                })
            })


    } else
    {
        SchemaRestaurant.findOne({_id:req.params.id}).then((restaurant)=>{
            res.render("restaurant_update", { title:"Modifier un restaurant", restaurant });
        })
    }

});







app.use("/restaurants",(req,res,next) => {

    SchemaRestaurant.find({}).limit(20).sort({"_id":-1}).then((restaurants) => {

    }).catch(function(){ });


});


//middleware utilisé si aucune autre route n'a été appelé en fait
app.use((req, res, next) => {

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