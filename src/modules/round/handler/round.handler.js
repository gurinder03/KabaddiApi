

module.exports.POST = async (params, callback) => {
    let Collection = params.Collection;
    let payload = params.payload;
    return await Collection
        .create(payload)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            console.log(err);
            callback(err, null)
        })
}


module.exports.GETLIST = async (params, callback) => {
    let Collection = params.Collection;
    return await Collection
        .find(params.aggregateQuery)
        .then((result) => {
            callback(null, result);
        }).catch((err) => {
            callback(err, null)
        })
}



