const SchemaRestaurant = require('../schemas/restaurants');


exports.getAll = (req,res,next) => {

    SchemaRestaurant.find().limit(20).sort({"_id":-1}).then((restaurants) => {

        res.render("restaurants/restaurants", { path:req.baseUrl, title:"Restaurants", restaurants });

    }).catch(function(){ });


};

exports.deleteOne = (req,res,next) => {

    SchemaRestaurant.deleteOne({_id:req.params.id}).then(()=>{
        res.redirect("/restaurants");
    });

};

exports.add = (req,res,next) => {

    let name = req.body.name;
    let cuisine = req.body.cuisine;
    let borough = req.body.borough;

    let added = null;

    if (name && cuisine && borough) {

        let restaurant = new SchemaRestaurant();
        restaurant.name = name;
        restaurant.cuisine = cuisine;
        restaurant.borough = borough;


        restaurant.save().then( (restaurant) =>
        {
            res.render("restaurants/restaurant_add", {path:req.baseUrl,  title:"Ajouter un restaurant", added:true, restaurant});
        }).catch(()=>
        {
            res.render("restaurants/restaurant_add", {path:req.baseUrl,  title:"Ajouter un restaurant", error:true, restaurant});

        });
    } else if(!name && !cuisine && !borough)
    {
        let errors = [];
        res.render("restaurants/restaurant_add", {path: req.baseUrl, title: "Ajouter un restaurant",errors});

    }
    else if(!name || !cuisine || !borough)
    {
        let errors = [];
        if(!name)
        {
            errors.push("name");
        }

        if(!cuisine)
        {
            errors.push("cuisine");
        }

        if(!borough)
        {
            errors.push("borough");
        }

        res.render("restaurants/restaurant_add", {path: req.baseUrl, title: "Ajouter un restaurant", errors});

    }



};

exports.update = (req, res, next) => {

    let id = req.params.id;

    let name = req.body.name;
    let cuisine = req.body.cuisine;
    let borough = req.body.borough;

    console.log(req.body);

    if (name && cuisine && borough) {
//CAS 2
        const restaurant = {
            name, cuisine, borough
        };

        SchemaRestaurant.updateOne({_id:id}, restaurant ).then(()=>
        {
            SchemaRestaurant.findOne({_id: id} ).then((restaurant)=>
            {
                res.render("restaurants/restaurant_update", { title:"Modifier un restaurant", updated:true, restaurant });
            })
        })


    } else {

        //CAS 1
        SchemaRestaurant.findOne({_id:id}).then((restaurant)=>{
            res.render("restaurants/restaurant_update", { title:"Modifier un restaurant", restaurant });
        }).catch((error)=>{ res.redirect("/404"); });
    }

};

exports.updateAlternative = (req,res,next)=>{
    let id = req.params.id;

    SchemaRestaurant.findOne({_id:id}).then(restaurant => {
        res.render("restaurants/restaurant_update_redirect",{title:"Modifier restaurant",restaurant});
    })
};

exports.doUpdate = (req,res,next)=>{

    let name = req.body.name;
    let cuisine = req.body.cuisine;
    let borough = req.body.borough;

    if(name && cuisine && borough) {

        let restaurant = {name, cuisine, borough};

        SchemaRestaurant.updateOne({_id: req.params.id}, restaurant).then(function () {
            res.redirect("/restaurants")
        }).catch(function () {
            res.redirect("/404")
        })
    } else
    {
        res.redirect("/update/restaurant/"+req.params.id);
    }


};

exports.getOne = (req,res,next) => {

    let id = req.params.id;

    SchemaRestaurant.findOne({_id:id}).then((restaurant)=> {
        res.render("restaurants/restaurant", {path: req.baseUrl, title: restaurant.name, restaurant});
    }).catch(()=>{
        res.redirect(404,"/404");
    })


};