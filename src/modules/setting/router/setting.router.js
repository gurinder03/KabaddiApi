
'use strict';

const  Router = require('express').Router();
const Service =  require('../service/setting.service');


Router.get('/view',Service.view);
Router.post('/update',Service.update);
Router.post('/passcode',Service.passcode);

module.exports =  Router;