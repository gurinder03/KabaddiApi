
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/ad.validator');
const Service =  require('../service/ad.service');
 

/************************************************ ADMIN ROUTES**********************************************/
Router.post("/add",Service.add);
Router.get("/list",Service.list);
Router.get("/view/:id",Validator.view,Service.view);
Router.post("/update",Validator.update,Service.update);


module.exports =  Router;