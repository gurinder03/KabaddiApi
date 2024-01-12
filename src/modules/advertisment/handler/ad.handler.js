
module.exports.GET = async (params, callback) => {
    let Collection = params.Collection;
    let query = params.query;
    return await Collection
        .findOne(query)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}

module.exports.POST = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    await Collection.deleteMany({}).then().catch()
    return await Collection
        .create(payload)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            console.log(err);
            callback(err, null)
        })
}



module.exports.LIST = async (params, callback) => {
    let Collection = params.Collection;
    return await Collection
        .findOne()
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}


module.exports.PATCH = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    let query = params.query;
    return await Collection
        .findOneAndUpdate(query,payload, { upsert: true, new: true })
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
    return await Collection
        .findOneAndUpdate(query,payload, { new: true })
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}
