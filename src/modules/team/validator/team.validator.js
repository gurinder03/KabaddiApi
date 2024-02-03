const Response = require('../../../utils/response'); 



module.exports.add = (req,res,next)=>{
    if(!req.body.name){
        return Response.validatorResponse(res,"Name is required");
    }
    req.body.name_without_space = req.body.name.trim().toLowerCase();
    // if(!req.body.place){
    //     return Response.validatorResponse(res,"Place is required");
    // }
    // if(!req.body.coach){
    //     return Response.validatorResponse(res,"Coach is required");
    // }

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
   