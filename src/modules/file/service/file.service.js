
const Response = require('../../../utils/response');

const add = async (req, res) => {
   try {
      const file = req.file;
      if (!file) {
          return Response.validatorResponse(res, "Image is required");
      }
     	   let obj = {};
	   if(req.body.type == "image"){
           obj = {image: file.location}
	   }else if(req.body.type == "marquee_logo"){
            obj = {marquee_logo: file.location}
	   }else
	   {
		   obj = {video: file.location}
	   }
      return Response.successResponse(res, "Uploaded successfully", obj);
   } catch (err) {
      console.log(err);
      return Response.internalError(res, err);
   }
}

exports.add = add;



