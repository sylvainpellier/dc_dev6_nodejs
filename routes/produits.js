const express = require('express');
const router = express.Router();


const { produits } = require("../data/produits");

router.use("/:id",(req, res, next) => {

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


router.use("/all",(req, res, next) => {

        res.render("produits", {path:req.baseUrl,  title:"SchemaProduits", produits });

});

module.exports = router;