
const Response = require('../../../utils/response');
const mongoose = require('mongoose');
const Controller = require('../controller/post.controller');

const view = async (req, res) => {
   try {
      let result = await Controller.view();
       return Response.successResponse(res, "View successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const update = async (req, res) => {
   try {
      const payload = req.body;
      let result = await Controller.update(payload);
      return Response.successResponse(res, "Updated successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const shareview = async (req, res) => {
   try {
      let data =  await mongoose.model("posts").findOne().then().catch();
      console.log("== data data ====",data);
      res.render('post.ejs',data)
   } catch (err) {
      return Response.internalError(res, err);
   }
}



exports.view = view;
exports.update = update;
exports.shareview = shareview;

