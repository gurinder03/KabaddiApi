const Response = require('../../../utils/response'); 


module.exports.add = (req,res,next)=>{
    if(!req.body.teamA){
        return Response.validatorResponse(res,"Tema A is required");
    }
    if(!req.body.teamB){
        return Response.validatorResponse(res,"Team B is required");
    }
    // if(!req.body.date){
    //     return Response.validatorResponse(res,"Date is required");
    // }
    // if(!req.body.time){
    //     return Response.validatorResponse(res,"Time is required");
    // }
    // if(!req.body.utc_date){
    //     return Response.validatorResponse(res,"Date is required");
    // }
    // if(!req.body.utc_time){
    //     return Response.validatorResponse(res,"Time is required");
    // }
    req.body.status = "pending";
    next();
}


module.exports.view = (req,res,next)=>{
    if(!req.params.id){
        return Response.validatorResponse(res,"Id is required");
    }
    next();
}


module.exports.remove = (req,res,next)=>{
    if(!req.body.id){
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


module.exports.addScore = (req,res,next) =>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    if(!req.body.score){
        return Response.validatorResponse(res,"Score is required");
    }
    if(!req.body.team){
        return Response.validatorResponse(res,"Tema A or B is required");
    }
    next();
}

module.exports.update =  (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    if(!req.body.teamA){
        return Response.validatorResponse(res,"Tema A is required");
    }
    if(!req.body.teamB){
        return Response.validatorResponse(res,"Team B is required");
    }
    // if(!req.body.date){
    //     return Response.validatorResponse(res,"Date is required");
    // }
    // if(!req.body.time){
    //     return Response.validatorResponse(res,"Time is required");
    // }
    // if(!req.body.utc_date){
    //     return Response.validatorResponse(res,"Date is required");
    // }
    // if(!req.body.utc_time){
    //     return Response.validatorResponse(res,"Time is required");
    // }
    next(); 
}
   