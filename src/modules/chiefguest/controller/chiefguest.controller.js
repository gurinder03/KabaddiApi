
const mongoose = require('mongoose');
const Handler = require('../handler/chiefguest.handler');

exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("chiefguest"),
                payload: payload
            }
            Handler.POST(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
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
                Collection: mongoose.model("chiefguest"),
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

exports.removeChiefguest = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("chiefguest"),
                query: { _id: payload.id }
            }
            Handler.DELETE(params, (err, resdata) => {
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
                Collection: mongoose.model("chiefguest"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            console.log("gwegegwerrro==",err)
            reject(err);
        }
    })
}


exports.list =  (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { order, page, limit, filter,status,role } = payload;
            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;
            if(filter){
                obj['$or'] = [];
                obj["$or"].push({'name': { $regex: payload.filter || '', $options: 'i' }})
            }
            if(status){
                obj.status = {$in: payload.status}
            }
            let aggregateQuery = [
                {
                    $match:obj
                },
                // {$sort :{createdAt: -1}},
                {$skip: (paged-1)*size},
                {$limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("chiefguest"),
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

exports.listAll =  () => {
    return new Promise(async (resolve, reject) => {
        try {
            mongoose.model("chiefguest").find({}).then((resdata) =>{
               return resolve(resdata)
            }).catch((err) =>{
              return reject(err);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.remove = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("chiefguest"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.DELETE(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}



