
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/match.validator');
const Service =  require('../service/match.service');
 

/************************************************ ADMIN ROUTES**********************************************/
Router.post("/add",Validator.add,Service.add);
Router.post("/list",Validator.list,Service.list);
Router.get("/view/:id",Validator.view,Service.view);
Router.get("/admin/view/:id",Validator.view,Service.adminview);
Router.post("/update",Validator.update,Service.update);
Router.post("/add/score",Service.addScore);
Router.post("/remove",Validator.remove,Service.remove);


module.exports =  Router;