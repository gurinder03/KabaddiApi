
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/round.validator');
const Service =  require('../service/round.service');
 

/************************************************ ADMIN ROUTES**********************************************/
Router.post("/add",Validator.add,Service.add);
Router.post("/list",Validator.list,Service.list);


module.exports =  Router;