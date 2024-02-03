const Response = require('../../../utils/response'); 

module.exports.add = (req,res,next)=>{
    console.log("== bodu ====",req.body);
    if(!req.body.name){
        return Response.validatorResponse(res,"Name is required");
    }
    req.body.name_without_space = req.body.name.trim().toLowerCase();
    // if(!req.body.start_date){
    //     return Response.validatorResponse(res,"Start date is required");
    // }
    // if(!req.body.end_date){
    //     return Response.validatorResponse(res,"End date is required");
    // }
    if(!req.body.place){
        return Response.validatorResponse(res,"Place is required");
    }
    // if(!req.body.winning_price){
    //     return Response.validatorResponse(res,"Winning price is required");
    // }
    // if(!req.body.runner_up_price){
    //     return Response.validatorResponse(res,"Runner up price is required");
    // }
    // if(!req.body.sponsors_detail){
    //     return Response.validatorResponse(res,"Sponsers detail is required");
    // }
    // if(!req.body.referee){
    //     return Response.validatorResponse(res,"Refree is required");
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




module.exports.remove =  (req,res,next)=>{
    if(!req.body.id){
        return Response.validatorResponse(res,"Id is required");
    }
    if(!req.body.status){
        return Response.validatorResponse(res,"Status is required");
    }
    next(); 
}
   