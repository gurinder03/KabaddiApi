
'use strict';

const  Router = require('express').Router();
const Service =  require('../service/post.service');
 

/************************************************ ADMIN ROUTES**********************************************/

Router.get("/view",Service.view);
Router.post("/update",Service.update);


module.exports =  Router;