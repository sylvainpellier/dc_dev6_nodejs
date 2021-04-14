const { services } = require("../data/produits")


exports.getOne = (req, res, next) => {


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

};

exports.getAll = (req, res, next) => {
    res.render("services", {path:req.baseUrl,  title:"Services", services });
};


