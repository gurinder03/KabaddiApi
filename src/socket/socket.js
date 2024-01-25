'user strict'

const DBQuery = require('./query');
const HideShow = require('./showHide');
const AddScore = require('./score');
const AddPostion = require('./position');
const AddPerson = require('./addPerson');
const AddReset = require('./reset');
const MatchData = require('./match');
const mongoose = require('mongoose');

module.exports = function (http, app) {
    const io = require('socket.io')(http, {
        cors: {
            origin: "*"
        },
        transports: ['websocket'],
        upgrade: false
    });

    const { createClient } = require("redis");
    const { createAdapter } = require("@socket.io/redis-adapter");
    const pubClient = createClient({ host: "localhost", port: 6379 });
    const subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));
    app.set('socketIO', io);
    global.socketApp = io;
    //all socket listen request
    io.on('connection', function (socket) {
        console.log("== user connected ==", socket.id);
        socket.on('usersocket', (data, ack) => {
            try {
                data.socketId = socket.id;
                let SocketData = {
                    success: true,
                    connection: true,
                    message: 'Connection established'
                }
                ack(SocketData);
            }
            catch (err) {
                let SocketData = {
                    success: false,
                    connection: false,
                    message: 'Connection lost'
                }
                ack(SocketData);
            }
        });



  

        socket.on('getUpcomming', async (data, ack) => {
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            let payload ;
            if(data.is_show_refree){
                data.is_show_refree = true;
                data.is_show_coach = false;
                data.is_show_chiefguest = false;
                data.is_show_commentator = false;
                data.is_show_match = false
                payload = await mongoose.model("refrees").find({is_checked: true}).then().catch();
            }
            if(data.is_show_coach){
                data.is_show_coach = true;
                data.is_show_refree = false;
                data.is_show_chiefguest = false;
                data.is_show_commentator = false;
                data.is_show_match = false
                payload = await mongoose.model("coach").find({is_checked: true}).then().catch();
            }
            if(data.is_show_chiefguest){
                data.is_show_chiefguest = true; 
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_match = false;
                payload = await mongoose.model("chiefguest").find({is_checked: true}).then().catch();
            }
            if(data.is_show_commentator){
                data.is_show_commentator = true; 
                data.is_show_chiefguest = false;
                data.is_show_coach = false;
                data.is_show_refree = false;
                data.is_show_match = false;
                payload = await mongoose.model("commentators").find({is_checked: true}).then().catch();
            }
            if(data.is_show_match){
                data.is_show_match = true; 
                data.is_show_chiefguest = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false
                payload = await mongoose.model("matches").find({is_checked: true}).then().catch();
            }

            let query = { _id: data.match_id };
            await AddPerson.updatePerson(query, data, io, payload,'setUpcomming');
        })

        socket.on('getPerson', async (data, ack) => {

            let update = {};
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            if (data.commentator) {
                if (data.commentator.length > 8) {
                    ack({ success: false, message: "Commentator can not more than 8" });
                }
                update = { commentator: data.commentator };
            }
            if (data.refree) {
                if (data.refree.length > 8) {
                    ack({ success: false, message: "Refree can not more than 8" });
                }
                update = { refree: data.refree };
            }
            if (data.chiefguest) {
                if (data.chiefguest.length > 8) {
                    ack({ success: false, message: "Chiefguest can not more than 8" });
                }
                update = { chiefguest: data.chiefguest };
            }
            if (data.match) {
                if (data.match.length > 8) {
                    ack({ success: false, message: "Match can not more than 8" });
                }
                update = { match: data.match };
            }
            let query = { _id: data.match_id };
            await AddPerson.updatePerson(query, update, io, 'setPerson');
        })

        socket.on('getHideShow', async (data, ack) => {
            console.log(data, "Show difgoefgpfg we")
            if (data.type === 'image') {
                if (data.is_show_image) {
                    data.is_show_image = true;
                    data.is_show_video = false;
                } else {
                    data.is_show_image = false;
                    data.is_show_video = true;
                }

            }
            if (data.type === 'video') {
                if (data.is_show_video) {
                    data.is_show_image = false;
                    data.is_show_video = true;
                } else {
                    data.is_show_image = true;
                    data.is_show_video = false;
                }
            }
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            let query = { _id: data.match_id }
            await HideShow(query, data, io, 'updateHideShow');
        })

        socket.on('getMultiMedia', async (data, ack) => {

            if (!data.match_id) {
                ack({ success: false, messsage: 'Match id is required' })
            }
            let query = { _id: data.match_id }

            await MatchData.match(query, io, 'updateMultiMedia');
        })


        socket.on('getStatus', async (data, ack) => {
            if (!data.team) {
                ack({ success: false, message: "Team (A or B) is required" });
            }
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            let query = { _id: data.match_id }
            await DBQuery(query, data, io, data, 'checkStatus');
        })

        socket.on('getHold', async (data, ack) => {
            let update = {};
            if (!data.team) {
                ack({ success: false, message: "Team (A or B) is required" });
            }
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            if (!data.hold) {
                ack({ success: false, message: "Hold is required" });
            }
            if (data.team == 'A') {
                update = {
                    $inc: { 'teamA_score.hold': Number(data.hold) }
                }
            }
            if (data.team == 'B') {
                update = {
                    $inc: { 'teamB_score.hold': Number(data.hold) }
                }
            }
            let query = { _id: data.match_id }
            await DBQuery(query, update, io, data, 'updateHold');
        })

        socket.on('getRaider', async (data, ack) => {
            let update = {};
            if (!data.team) {
                ack({ success: false, message: "Team (A or B) is required" });
            }
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            if (!data.raider) {
                ack({ success: false, message: "Raider is required" });
            }
            if (data.team == 'A') {
                update = {
                    $inc: { 'teamA_score.raider': data.raider }
                }
            }
            if (data.team == 'B') {
                update = {
                    $inc: { 'teamB_score.raider': Number(data.raider) }
                }
            }
            let query = { _id: data.match_id }
            await DBQuery(query, update, io, data, 'updateRaider');
        })

        socket.on('getScore', async (data, ack) => {
            let update = {};
            if (!data.team) {
                ack({ success: false, message: "Team (A or B) is required" });
            }
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            if (!data.score) {
                ack({ success: false, message: "Score is required" });
            }
            if (data.team == 'A') {
                update = {
                    'teamA_score.addon': data.score,
                    is_score_added: true
                }
            }
            if (data.team == 'B') {
                update = {
                    'teamB_score.addon': data.score,
                    is_score_added: true
                }
            }
            let query = { _id: data.match_id };
            await AddScore.updateScore(query, update, data, io, 'updateScore');
        })


        socket.on('getPosition', async (data, ack) => {
            let update = {};
            if (!data.user_type) {
                ack({ success: false, message: "User type (user_type) is required" });
            }
            if (!data.team) {
                ack({ success: false, message: "Team (A or B) is required" });
            }
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            if (!data.position) {
                ack({ success: false, message: "Postion is required" });
            }
            if (data.user_type == "admin") {
                if (data.team == 'A') {
                    if (data.position == "left") {
                        update = {
                            'teamA_score.admin_position': "left",
                            'teamB_score.admin_position': "right"
                        }
                    }
                    if (data.position == "right") {
                        update = {
                            'teamA_score.admin_position': "right",
                            'teamB_score.admin_position': "left"
                        }
                    }
                    if (data.position == "none") {
                        update = {
                            'teamA_score.admin_position': "none",
                            'teamB_score.admin_position': "none"
                        }
                    }
                    let query = { _id: data.match_id };
                    await AddPostion.updatePostion(query, update, io, 'updatePosition');

                }
                if (data.team == 'B') {
                    if (data.position == "left") {
                        update = {
                            'teamA_score.admin_position': "right",
                            'teamB_score.admin_position': "left"
                        }
                    }
                    if (data.position == "right") {
                        update = {
                            'teamA_score.admin_position': "left",
                            'teamB_score.admin_position': "right"
                        }
                    }
                    if (data.position == "none") {
                        update = {
                            'teamA_score.admin_position': "none",
                            'teamB_score.admin_position': "none"
                        }
                    }

                    let query = { _id: data.match_id };
                    await AddPostion.updatePostion(query, update, io, 'updatePosition');
                }
            } else {
                if (data.team == 'A') {
                    if (data.position == "left") {
                        update = {
                            'teamA_score.position': "left",
                            'teamB_score.position': "right"
                        }
                    }
                    if (data.position == "right") {
                        update = {
                            'teamA_score.position': "right",
                            'teamB_score.position': "left"
                        }
                    }
                    if (data.position == "none") {
                        update = {
                            'teamA_score.position': "none",
                            'teamB_score.position': "none"
                        }
                    }

                    let query = { _id: data.match_id };
                    await AddPostion.updatePostion(query, update, io, 'updatePosition');

                }
                if (data.team == 'B') {
                    if (data.position == "left") {
                        update = {
                            'teamA_score.position': "right",
                            'teamB_score.position': "left"
                        }
                    }
                    if (data.position == "right") {
                        update = {
                            'teamA_score.position': "left",
                            'teamB_score.position': "right"
                        }
                    }
                    if (data.position == "none") {
                        update = {
                            'teamA_score.position': "none",
                            'teamB_score.position': "none"
                        }
                    }

                    let query = { _id: data.match_id };
                    await AddPostion.updatePostion(query, update, io, 'updatePosition');
                }
            }

        })

        socket.on('getReset', async (data, ack) => {
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            let query = { _id: data.match_id }
            await AddReset.updateReset(query, io, 'updateReset');
        })


        socket.on('getStopper', async (data, ack) => {
            let update = {};
            if (!data.team) {
                ack({ success: false, message: "Team (A or B) is required" });
            }
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            if (!data.stopper) {
                ack({ success: false, message: "Stopper is required" });
            }
            if (data.team == 'A') {
                update = {
                    $inc: { 'teamA_score.stopper': Number(data.stopper) }
                }
            }
            if (data.team == 'B') {
                update = {
                    $inc: { 'teamB_score.stopper': Number(data.stopper) }
                }
            }
            let query = { _id: data.match_id }
            await DBQuery(query, update, io, data, 'updateStopper');
        })
        socket.on('disconnect', async function (reason) {
            console.log("Reasons for disconnecting", reason, socket.id);
        });
    });


}
