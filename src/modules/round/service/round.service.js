
const Response = require('../../../utils/response');
const Controller = require('../controller/round.controller');

const add = async (req, res) => {
   try {

      let result = await Controller.add(req.body);
      return Response.successResponse(res, "Added successfully", result);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}

const list = async(req,res) =>{
   try{
       let result = await Controller.list(req.body);
       return Response.successResponse(res, "List successfully", result.data,result.totalcount);
   }catch(err){
       return Response.internalError(res,err);
   }
}


exports.add = add;
exports.list = list;

