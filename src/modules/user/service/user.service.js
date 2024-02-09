const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Response = require('../../../utils/response');
const Controller = require('../controller/user.controller');


const adminSignup =  async (req, res) => {
   try {
      req.body.email = req.body.email.trim().toLowerCase();
      let userExist = await mongoose.model("users").findOne({
         email: req.body.email
      });
      if (userExist) {
         return Response.validatorResponse(res, "Admin is already exist.");
      }
      req.body.is_account_verified = true;
      let result = await Controller.admin
      Signup(req.body);
      return Response.successResponse(res, "Signup successfully", result);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}


const adminLogin =  async (req, res) => {
   try {
      let result = await Controller.adminLogin(req.body);
      return Response.successResponse(res, "Login successfully", result);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}

const login = async (req, res) => {
   try {
      let query = {};
      req.body.email = req.body.email.trim().toLowerCase();
      query = { email: req.body.email }
     
      const userExist = await mongoose.model("users").findOne(query).then((resp) => resp).catch((err) => err);
      if (!userExist) {
         return Response.validatorResponse(res, 'User does not exist.');
      }
      if (!bcrypt.compareSync(req.body.password, userExist.password)) {
         return Response.validatorResponse(res, 'Incorrect credentials.');
      }
      let result = await Controller.login(req.body);
      return Response.successResponse(res, "Login successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const view = async (req, res) => {
   try {
      let result = await Controller.view(req.params);
       return Response.successResponse(res, "Login successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}


const update = async (req, res) => {
   try {
      const payload = req.body;
      const file =  req.file;
      if (file) {
          payload.profile_image = file.location;
      }
      let result = await Controller.update(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const logout = async (req, res) => {
   try {
      let result = await Controller.logout(req.body);
      return Response.successResponse(res, "Logout successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const forgotPassword = async (req, res) => {
   try {
      let result = await Controller.forgotPassword(req.body);
      let resdata = {
            "role":req.body.role,
            "email_or_mobile_number":req.body.email_or_mobile_number
      }
      return Response.successResponse(res, "OTP Send  successfully", resdata);
   } catch (err) {
      return Response.internalError(res, err);
   }
}


const changePassword = async(req,res) =>{
   try{
      let payload = req.body;
      const verify = await mongoose.model("users").findOne({_id: payload.id}).then((resdata) => resdata).catch((err) => err);
     if (!verify) {
         return Response.validatorResponse(res, 'User not found');
     }
     if (!bcrypt.compareSync(payload.current_password, verify.password)) {
         return Response.validatorResponse(res, 'Current password is not matching');
     }

     let result = await Controller.changePassword(payload);
     return Response.successResponse(res, "Password changed successfully", result);
   }catch(err){
      return Response.internalError(res, err);
   }
}

const resetPassword = async(req,res) =>{
   try{
      let payload = req.body;
      payload.email = payload.email.trim().toLowerCase();
      
      let userExist = await mongoose.model("users").findOne({
         email: payload.email
      });
      if (!userExist) {
         return Response.validatorResponse(res, "User is not exist.");
      }
      let result = await Controller.resetPassword(payload);
     return Response.successResponse(res, "Password changed successfully", result);
   }catch(err){
      return Response.internalError(res, err);
   }
}

const list = async(req,res) =>{
   try{
       let result = await Controller.list(req.body);
       return Response.successResponseWithCount(res, "List successfully", result.data,result.totalcount);
   }catch(err){
       return Response.internalError(res,err);
   }
}

exports.view = view;
exports.login = login;
exports.logout = logout;
exports.update = update;
exports.list = list;
exports.resetPassword = resetPassword;
exports.forgotPassword = forgotPassword;
exports.changePassword = changePassword;
exports.adminSignup = adminSignup;
exports.adminLogin = adminLogin;

