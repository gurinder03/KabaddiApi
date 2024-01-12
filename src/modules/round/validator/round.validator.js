const Response = require('../../../utils/response'); 


module.exports.add = (req,res,next)=>{
    if(!req.body.match_id){
        return Response.validatorResponse(res,"Match id is required");
    }
    next();
}


module.exports.list = (req,res,next)=>{
    if(!req.body.match_id){
        return Response.validatorResponse(res,"Match id is required");
    }

    next();
}


   