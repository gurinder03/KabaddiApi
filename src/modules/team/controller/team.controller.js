
const mongoose = require('mongoose');
const Handler = require('../handler/team.handler');

exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("teams"),
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
                Collection: mongoose.model("teams"),
                query: { _id: payload.id }
            }
            let players = await mongoose.model("players").find({ team: new mongoose.Types.ObjectId(payload.id) });
            Handler.GET(params, (err, resdata) => {
                if (err) {
                    return reject(err)
                } else {
                    resdata.players = players;
                    return resolve(resdata)
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
            console.log("== category category===", payload);
            let params = {
                Collection: mongoose.model("teams"),
                payload: payload,
                query: { _id: payload.id }
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            console.log("gwegegwerrro==", err)
            reject(err);
        }
    })
}

exports.listAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            mongoose.model("teams").find().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
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
            let { order, page, limit, filter, status, role } = payload;
            let size = limit || 10;
            let sort_by = "created_at";
            let order_by = order || -1;
            let paged = page || 1;
            if (filter) {
                obj['$or'] = [];
                obj["$or"].push({ 'name': { $regex: payload.filter || '', $options: 'i' } })
            }
            if (status) {
                obj.status = { $in: payload.status }
            }
            let aggregateQuery = [
                {
                    $match: obj
                },
                { $sort: { createdAt: -1 } },
                { $skip: (paged - 1) * size },
                { $limit: parseInt(size) },
            ]

            let params = {
                Collection: mongoose.model("teams"),
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
                Collection: mongoose.model("categories"),
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



