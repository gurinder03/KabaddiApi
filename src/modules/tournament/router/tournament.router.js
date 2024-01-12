
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/tournament.validator');
const uploadImage = require("../../../helper/imageUploader");
const Service =  require('../service/tournament.service');
 

/************************************************ ADMIN ROUTES**********************************************/
Router.post("/add",Validator.add,Service.add);
Router.post("/list",Validator.list,Service.list);
Router.get("/list",Service.listAll);
Router.get("/view/:id",Validator.view,Service.view);
Router.post("/update",Validator.update,Service.update);
Router.post("/remove",Validator.remove,Service.remove);

module.exports =  Router;