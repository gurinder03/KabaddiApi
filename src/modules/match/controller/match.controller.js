
const mongoose = require('mongoose');
const Handler = require('../handler/match.handler');

exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("=== paylaod ==0",payload);
            delete payload.id;
            let params = {
                Collection: mongoose.model("matches"),
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
                Collection: mongoose.model("matches"),
                query: { _id: payload.id }
            }
            let tempData = await mongoose.model("tempmatch").findOne().then().catch();
         
            Handler.GET(params, (err, resdata) => {
                if(err){
                    reject(err);
                }else{
                    let result =   Object.assign({},resdata,tempData)
                    resolve(result);
                } 
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
                Collection: mongoose.model("matches"),
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



exports.addScore = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("matches"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.addScore(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}


exports.list = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = {};
            let { page, limit, filter, status } = payload;
            let size = limit || 10;
            let paged = page || 1;
            console.log("== paykload payload --", payload);
            if (filter) {
                obj['$or'] = [];
                obj["$or"].push({ 'teamA.name': { $regex: payload.filter || '', $options: 'i' } })
                obj["$or"].push({ 'teamB.name': { $regex: payload.filter || '', $options: 'i' } })
            }
            if (status) {
                obj.status = { $in: payload.status }
            }

            let aggregateQuery = [
              
                {
                    $lookup: {
                        from: "teams",
                        localField: "teamA",
                        foreignField: "_id",
                        as: "teamA"
                    }
                },
                { $unwind: {path: "$teamA",preserveNullAndEmptyArrays: true} },
                {
                    $lookup: {
                        from: "teams",
                        localField: "teamB",
                        foreignField: "_id",
                        as: "teamB"
                    }
                },
                { $unwind: {path: "$teamB",preserveNullAndEmptyArrays: true} },
                {
                    $lookup: {
                        from: "teams",
                        localField: "winning_team",
                        foreignField: "_id",
                        as: "winning_team"
                    }
                },
                { $unwind: {path: "$winning_team",preserveNullAndEmptyArrays: true} },
                {
                    $lookup: {
                        from: "teams",
                        localField: "losing_team",
                        foreignField: "_id",
                        as: "losing_team"
                    }
                },
                { $unwind: {path: "$losing_team",preserveNullAndEmptyArrays: true} },
                {
                    $lookup: {
                        from: "chiefguest",
                        localField: "chiefguest",
                        foreignField: "_id",
                        as: "chiefguest"
                    }
                },
             
                { $unwind: {path: "$chiefguest",preserveNullAndEmptyArrays: true} },
                {
                    $lookup: {
                        from: "refrees",
                        localField: "refree",
                        foreignField: "_id",
                        as: "refree"
                    }
                },
             
                { $unwind: {path: "$refrees",preserveNullAndEmptyArrays: true} },
                {
                    $lookup: {
                        from: "commentators",
                        localField: "commentator",
                        foreignField: "_id",
                        as: "commentator"
                    }
                },
             
                { $unwind: {path: "$commentator",preserveNullAndEmptyArrays: true} },
                {
                    $match: obj
                },
                { $sort: { createdAt: -1 } },
                { $skip: (paged - 1) * size },
                { $limit: parseInt(size) },
            ]
  
            let params = {
                Collection: mongoose.model("matches"),
                obj: obj,
                aggregateQuery: aggregateQuery
            }
            Handler.GETLIST(params, (err, resdata) => {
                return err ? reject(err) : resolve({ data: resdata.result, totalcount: resdata.totalcount });
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
                Collection: mongoose.model("matches"),
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



