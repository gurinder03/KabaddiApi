
const mongoose = require('mongoose');
const Handler = require('../handler/round.handler');

exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            delete payload.id;
            let params = {
                Collection: mongoose.model("rounds"),
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




exports.list = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { match_id } = payload;
            obj.match_id = match_id;
            let aggregateQuery = [
                {
                    $match: obj
                },
                { $sort: { created_at: -1 } },
                { $skip: (paged - 1) * size },
                { $limit: parseInt(size) },
            ]
  
            let params = {
                Collection: mongoose.model("rounds"),
                aggregateQuery: aggregateQuery
            }
            Handler.GETLIST(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}




