
const Response = require('../../../utils/response');
const mongoose = require('mongoose');
const Controller = require('../controller/team.controller');

const add = async (req, res) => {
   try {
      delete req.body.id;
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
       return Response.successResponse(res, "Data successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const update = async (req, res) => {
   try {
      const payload = req.body;
      console.log("== paylaod ==payload ===",payload);
      if(payload.teams){
         let players = await mongoose.model("players").find({team: payload.id}).then().catch();
         console.log("== players player ==",players);
         let teamList = JSON.parse(payload.teams);
         teamList.players = players;
         console.log("== TeamList ==", teamList);
         await mongoose.model("tempmatch").findOneAndUpdate({},{team: teamList},{new: true});
      }
    
      let result = await Controller.update(payload);
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

const listAll =  async(req,res) =>{
   try{
       let result = await Controller.listAll();
       return Response.successResponse(res, "List successfully", result);
   }catch(err){
       return Response.internalError(res,err);
   }
}
exports.view = view;
exports.add = add;
exports.update = update;
exports.list = list;
exports.listAll = listAll;

