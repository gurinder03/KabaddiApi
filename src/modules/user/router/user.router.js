
'use strict';

const  Router = require('express').Router();
const Authenticator = require("../../../utils/auth");
const Validator = require('../validator/user.validator');
const Service =  require('../service/user.service');


/************************************************ ADMIN ROUTES**********************************************/
Router.post("/admin/signup",Validator.signup,Service.adminSignup);
Router.post("/admin/list",Authenticator.verifyToken,Validator.list,Service.list);
Router.post("/admin/login",Validator.adminLogin,Service.adminLogin);
Router.post('/admin/forgot/password',Validator.forgotPassword,Service.forgotPassword);
Router.post('/admin/change/password',Authenticator.verifyToken,Validator.changePassword,Service.changePassword);
Router.post('/admin/reset/password',Validator.resetPassword,Service.resetPassword);
Router.post('/admin/logout',Validator.logout,Service.logout);



module.exports =  Router;