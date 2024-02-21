
const Response = require('../../../utils/response');
const utcHelper = require('../../../helper/utc');
const mongoose = require('mongoose');
const app = require('../../../app');
const Controller = require('../controller/match.controller');

const add = async (req, res) => {
   try {
      if(req.body.utc_date && req.body.utc_time){
         req.body.utc_date_time = utcHelper.utcDateTime(req.body.utc_date, req.body.utc_time);
      }
      let result = await Controller.add(req.body);
      return Response.successResponse(res, "Added successfully", result);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}

const view = async (req, res) => {
   try {
      let result = await Controller.view(req.params);
       return Response.successResponse(res, "View successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const adminview = async (req, res) => {
   try {
      let result = await Controller.adminview(req.params);
       return Response.successResponse(res, "View successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const update = async (req, res) => {
   try {
      const payload = req.body;
      if(payload.match_id){
         await mongoose.model("matches").findOneAndUpdate({_id: payload.match_id},{match: payload.match},{new: true});
      }
      await mongoose.model("tempmatch").findOneAndUpdate({},{match: payload.match},{new: true});
      let result = await Controller.update(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const addScore = async (req, res) => {
   try {
      const payload = req.body;
      let result = await Controller.addScore(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
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
exports.add = add;
exports.adminview = adminview
exports.update = update;
exports.list = list;
exports.addScore = addScore;

