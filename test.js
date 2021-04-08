let produits = [{
    id:2,
    name:"Produit 1",
    description:"fldksflds kflmdsk flmdsk fds",
    price: 12,
    image:"image1.png",
},{
    id:3,
    name:"Produit 3",
    description:"fldksflds kflmdsk flmdsk fds",
    price: 12,
    image:"image1.png",
}];

app.use("/recherche",(req, res, next) => {

    let listeProduits = [];

    let price = req.body.price;
    let name = req.body.name;

    produits.foreach(function(element){

        if( name === element.name )
        {
            listeProduits.push(element);
        }

    });



   app.render("formulaire",{ listeProduits });
});