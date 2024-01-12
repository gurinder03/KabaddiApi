


'use strict';

const  Router = require('express').Router();
const uploadImage = require("../../../helper/imageUploader");
const Service =  require('../service/file.service');
 
Router.post("/add",uploadImage.single('image'),Service.add);


module.exports =  Router;