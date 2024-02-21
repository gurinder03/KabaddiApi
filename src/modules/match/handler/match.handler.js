const { default: mongoose } = require("mongoose");

module.exports.GET = async (params, callback) => {
    let Collection = params.Collection;
    let query = params.query;
  
    return await Collection
        .findOne(query)
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team')
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.POST = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let [teamA, teamB] = await Promise.all([
        mongoose.model('teams').findOne({ _id: payload.teamA }).select('name logo').then().catch(),
        mongoose.model('teams').findOne({ _id: payload.teamB }).select('name logo').then().catch(),
    ])
    payload.teamA_score = {
        name: teamA.name,
        is_first_raider_or_stopper: true,
        position: "none",
        logo: teamA.logo,
        is_score_added: false,
        hold: 0,
        stopper: 0,
        raider: 0,
        score: 0
    }
    payload.teamB_score = {
        name: teamB.name,
        is_first_raider_or_stopper: true,
        position: "none",
        logo: teamB.logo,
        is_score_added: false,
        hold: 0,
        stopper: 0,
        raider: 0,
        score: 0
    }
    return await Collection
        .create(payload)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            console.log(err);
            callback(err, null)
        })
}


module.exports.DELETE = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    return await Collection
        .deleteOne(payload)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })

}

module.exports.GETLIST = async (params, callback) => {
    let Collection = params.Collection;
    let aggregateQueryCount = [];
    params.aggregateQuery.map((agg) => {
            if (!agg.hasOwnProperty('$sort') && !agg.hasOwnProperty('$skip') && !agg.hasOwnProperty('$limit')) {
                aggregateQueryCount.push(agg)
            }
        
    })
    aggregateQueryCount.push({ $group: { _id: null, count: { $sum: 1 } } });
    let count = await Collection.aggregate(aggregateQueryCount);
    let totalcount = count.length > 0 ? count[0].count : 0;
    return await Collection
        .aggregate(params.aggregateQuery)
        .then((result) => {
            callback(null, { result: result, totalcount: totalcount });
        }).catch((err) => {
            callback(err, null)
        })
}


module.exports.PATCH = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let query = params.query;
    return await Collection
        .findOneAndUpdate(query, payload, { upsert: true, new: true })
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.PUT = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let query = params.query;
    console.log("=====/////// params ===", params);
    payload.commentator = JSON.parse(JSON.stringify(payload.commentator));
    payload.refree = JSON.parse(JSON.stringify(payload.refree));
    payload.chiefguest = JSON.parse(JSON.stringify(payload.chiefguest));

    return await Collection
        .findOneAndUpdate(query, payload, { new: true })
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team')
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.addScore = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let query = params.query;
    let update;
    if (payload.team == 'A') {
        update = { $inc: { 'teamA_score.score': Number(payload.score) }, is_score_added: true };
    }
    if (payload.team == 'B') {
        update = { $inc: { 'teamB_score.score': Number(payload.score) }, is_score_added: true };
    }
    return await Collection
        .findOneAndUpdate(query, update, { new: true })
        .populate('teamA')
        .populate('teamB')
        .populate('tournament')
        .populate('winning_team')
        .populate('losing_team')
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

