
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/chiefguest.validator');
const uploadImage = require("../../../helper/imageUploader");
const Service =  require('../service/chiefguest.service');
 

/************************************************ ADMIN ROUTES**********************************************/
Router.post("/add",uploadImage.single('image'),Validator.add,Service.add);
Router.post("/list",Validator.list,Service.list);
Router.get("/list",Service.listAll);
Router.get("/view/:id",Validator.view,Service.view);
Router.post("/update",uploadImage.single('image'),Validator.update,Service.update);

module.exports =  Router;