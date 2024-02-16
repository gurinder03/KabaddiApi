
const Response = require('../../../utils/response');
const Controller = require('../controller/player.controller');

const add = async (req, res) => {
   try {
      const file = req.file;
      if (!file) {
          return Response.validatorResponse(res, "Image is required");
      }
      if (file) {
          req.body.image = file.location;
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
       return Response.successResponse(res, "Data successfully", result);
   } catch (err) {
      return Response.internalError(res, err);
   }
}

const update = async (req, res) => {
   try {
      const payload = req.body;
      const file =  req.file;
      if (file) {
          payload.image = file.location;
      }
      await mongoose.model("tempmatch").findOneAndUpdate({},{palyer: JSON.parse(payload.palyer)},{new: true});
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

exports.view = view;
exports.add = add;
exports.update = update;
exports.list = list;

