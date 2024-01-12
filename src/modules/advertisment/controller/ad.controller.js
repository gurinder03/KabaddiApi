
const mongoose = require('mongoose');
const Handler = require('../handler/ad.handler');

exports.add = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("advertisments"),
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
                Collection: mongoose.model("advertisments"),
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
                Collection: mongoose.model("advertisments"),
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


exports.list = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("advertisments")
            }
            Handler.LIST(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}





