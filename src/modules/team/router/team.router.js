
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/team.validator');
const uploadImage = require("../../../helper/imageUploader");
const Service =  require('../service/team.service');
 

/************************************************ ADMIN ROUTES**********************************************/
Router.post("/add",uploadImage.single('logo'),Validator.add,Service.add);
Router.post("/list",Validator.list,Service.list);
Router.get("/list",Service.listAll);
Router.get("/view/:id",Validator.view,Service.view);
Router.post("/update",uploadImage.single('logo'),Validator.update,Service.update);


module.exports =  Router;