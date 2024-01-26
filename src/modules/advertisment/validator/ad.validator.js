const Response = require('../../../utils/response'); 


module.exports.view = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}

module.exports.add = (req,res,next)=>{
    if(!req.body.type){
        return Response.validatorResponse(res,"Type is required");
    }
    next();
}


module.exports.list = (req,res,next)=>{
    if(!req.body.page){
        return Response.validatorResponse(res,"Page number is required");
    }
    if(!req.body.limit){
        return Response.validatorResponse(res,"Limit is required");
    }
    next();
}

module.exports.update =  (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next(); 
}
   