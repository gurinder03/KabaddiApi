
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

exports.adminview =  async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("matches"),
                query: { _id: payload.id }
            }
            Handler.GET(params, (err, resdata) => {
                if(err){
                }else{                    
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
                Collection: mongoose.model("matches"),
                query: { _id: payload.id }
            }
            let tempData = await mongoose.model("tempmatch").findOne().then().catch();
         
            Handler.GET(params, (err, resdata) => {
                if(err){
                    reject(err);
                }else{

                    resdata.is_show_federation_logo = tempData.is_show_federation_logo
                    resdata.is_show_add =   tempData.is_show_add
                    resdata.is_show_coach =  tempData.is_show_coach
                    resdata.is_show_player =      tempData.is_show_player
                    resdata.is_show_marquee_logo = tempData.is_show_marquee_logo
                    resdata.is_show_full_screen = tempData.is_show_full_screen
                    resdata.is_swap_team =  tempData.is_swap_team
                    resdata.is_show_refree = tempData.is_show_refree
                    resdata.is_show_chiefguest = tempData.is_show_chiefguest
                    resdata.is_show_team =  tempData.is_show_team
                    resdata.is_show_commentator = tempData.is_show_commentator
                    resdata.is_show_match = tempData.is_show_match
                    resdata.is_show_flag =  tempData.is_show_flag
                    resdata.is_show_score = tempData.is_show_score
                    resdata.is_show_sponser_logo =  tempData.is_show_sponser_logo
                    resdata.chiefguest =   tempData.chiefguest,
                    resdata.team =    tempData.team
                    resdata.refree =  tempData.refree
                    resdata.commentator = tempData.commentator
                    resdata.match =  tempData.match
                    resdata.card = tempData.card
                    resdata.coach =  tempData.coach
                    resdata.player =  tempData.player 
                    
                    resolve(resdata);
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

exports.removeMatch = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("matches"),
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



