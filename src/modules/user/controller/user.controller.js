
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const utils = require("../../../utils/util");
const Handler = require('../handler/user.handler');


exports.adminSignup = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {email: payload.email}
            payload.password = bcrypt.hashSync(payload.password, salt);
            payload.status = "unblocked";
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: query
            }
            Handler.PATCH(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })

}

exports.adminLogin =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { email: payload.email }
            }
            
            Handler.PUT(params, async(err, resdata) => {
                if (err) {
                    reject(err);
                } else {
                    resdata.token = await utils.jwtToken(payload);
                    resolve(resdata);
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.view = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.GET(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.update = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}



exports.forgotPassword = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};
            query = { email: payload.email };
            const verify = await mongoose.model("users").findOne(query).then((res) => res).catch((err) => err);
            if (!verify) {
                return response.validatorResponse(res, 'User does not exist');
            }
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: query
            }

            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })

        } catch (err) {
            reject(err);
        }
    })
}




exports.changePassword = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            payload.password = bcrypt.hashSync(payload.new_password, salt);
            await utils.jwtToken(payload);
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })

        } catch (err) {
            reject(err);
        }
    })
}

exports.resetPassword =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            payload.password = bcrypt.hashSync(payload.password, salt);
            await utils.jwtToken(payload);
            let params = {
                Collection: mongoose.model("users"),
                payload: payload,
                query: { email_or_mobile_number: payload.email_or_mobile_number }
            }
            Handler.PUT(params, (err, resdata) => {
                console.log("== err err err ==",err);
                return err ? reject(err) : resolve(resdata);
            })

        } catch (err) {
            reject(err);
        }
    })
}



exports.list =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, filter,role } = payload;
            let size = limit || 10;
            let order_by = "created_at";
            let sort_by = order || -1;
            let paged = page || 1;

            if(filter){
                obj['$or'] = [];
                obj["$or"].push({'name': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'email_or_mobile_number': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'age': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'city': { $regex: payload.filter || '', $options: 'i' }});
                obj["$or"].push({'state': { $regex: payload.filter || '', $options: 'i' }});
            }
            obj.role = {$ne: "ADMIN"};
            if(role){
                obj.role = role;
            }
            let aggregateQuery = [
                {
                    $match:obj
                },
                {$sort :{[order_by]:  parseInt(sort_by)}},
                {$skip: (paged-1)*size},
                {$limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("users"),
                obj: obj,
                aggregateQuery:aggregateQuery
            }
            Handler.GETLIST(params, (err, resdata) => {
                return err ? reject(err) : resolve({data: resdata.result, totalcount: resdata.totalcount});
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.logout = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(payload);
        } catch (err) {
            reject(err);
        }
    })
}


