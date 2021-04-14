const express = require('express');
const router = express.Router();

//on créé notre première route qui correspond à l'url http://localhost:3000/contact
router.use("/",(req, res, next) => {
    //lorsque cette url va être appelé on charge le fichier pug qui se trouve dans le dossier templates/contact.pug
    res.render("contact",{path:req.baseUrl, title:"Contact"});
});

module.exports = router;