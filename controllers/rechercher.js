const { produits } = require("../data/produits");


exports.get = (req, res, next) => {


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
};
