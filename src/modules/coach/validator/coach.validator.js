const Response = require('../../../utils/response'); 


module.exports.add = (req,res,next)=>{
    if(!req.body.name){
        return Response.validatorResponse(res,"Name is required");
    }
    req.body.name_without_space = req.body.name.trim().toLowerCase();
    // if(!req.body.age){
    //     return Response.validatorResponse(res,"Age is required");
    // }
    // if(!req.body.experience){
    //     return Response.validatorResponse(res,"Experience is required");
    // }
    next();
}

module.exports.remove = (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}


module.exports.view = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
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
   