
const mongoose = require('mongoose');
const Handler = require('../handler/setting.handler');



exports.view = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = {
                Collection: mongoose.model("settings")
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
                Collection: mongoose.model("settings"),
                payload: payload
            }
            Handler.PUT(params, (err, resdata) => {
                return err ? reject(err) : resolve(resdata);
            })
        } catch (err) {
            reject(err);
        }
    })
}

exports.passcode = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            mongoose.model("settings").findOne({ passcode: payload.passcode })
                .then((resdata) => resolve(resdata))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err);
        }
    })
}









