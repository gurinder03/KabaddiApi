'user strict'

const DBQuery = require('./query');
const AddScore = require('./score');
const AddPostion = require('./position');
const mongoose = require('mongoose');
const AddReset = require('./reset');
const MatchData = require('./match');
const TempMatch = require('./tempmatch');


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
        //console.log("connection >>>>>>>",socket);
        socket.on('usersocket', (data, ack) => {
            try {
                console.log("usersocket >>>>>>>",data);
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

        socket.on('getCard', async (data, ack) => {
            let update = {};
            console.log("getCard getCard",data);
            if(data.card){
                update.card =  data.card;
            }
            //
            if(data.is_show_flag){
                update.is_show_flag = true;
                update.is_show_refree = false;
                update.is_show_team = false;
                update.is_show_player = false;
                update.is_show_coach = false;
                update.is_show_chiefguest = false;
                update.is_show_commentator = false;
                update.is_show_match = false;
            }
            await TempMatch.updateTempData(update, io,'setCard');
        })

        socket.on('getUpcomming', async (data, ack) => {
            if(data.is_show_refree){
                data.is_show_refree = true;
                data.is_show_player = false;
                data.is_show_team = false; 
                data.is_show_coach = false;
                data.is_show_chiefguest = false;
                data.is_show_commentator = false;
                data.is_show_match = false;
                data.is_show_flag = false;
            }
            if(data.is_show_coach){
                data.is_show_coach = true;
                data.is_show_player = false;
                data.is_show_team = false; 
                data.is_show_refree = false;
                data.is_show_chiefguest = false;
                data.is_show_commentator = false;
                data.is_show_match = false;
                data.is_show_flag = false;
            }
            if(data.is_show_chiefguest){
                data.is_show_chiefguest = true; 
                data.is_show_team = false; 
                data.is_show_player = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_match = false;
                data.is_show_flag = false;
            }
            if(data.is_show_commentator){
                data.is_show_commentator = true; 
                data.is_show_player = false;
                data.is_show_team = false; 
                data.is_show_chiefguest = false;
                data.is_show_coach = false;
                data.is_show_refree = false;
                data.is_show_match = false;
                data.is_show_flag = false;
            }
            if(data.is_show_match){
                data.is_show_match = true; 
                data.is_show_team = false; 
                data.is_show_player = false;
                data.is_show_chiefguest = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_flag = false;
            }
            if(data.is_show_team){
                data.is_show_team = true; 
                data.is_show_player = false;
                data.is_show_match = false; 
                data.is_show_chiefguest = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_flag = false;
            }
            if(data.is_show_player){
                data.is_show_player = true; 
                data.is_show_team = false
                data.is_show_match = false; 
                data.is_show_chiefguest = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_flag = false;
            }

            await TempMatch.updateTempData(data, io,'setUpcomming');
            
        })

        socket.on('getHideShow', async (data, ack) => {
            console.log(data, "Show difgoefgpfg we")

            if(!data.match_id){
                ack({stausCode: 400, message:"Match id is required"})
            }
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
            let query = {_id: data.match_id}
            await TempMatch.updateAddData(query,data, io,'updateHideShow');
        })

        socket.on('getMultiMedia', async (data, ack) => {
            if (!data.match_id) {
                ack({ success: false, messsage: 'Match id is required' })
            }
            let query = {_id: data.match_id};
            await MatchData.tempmatch(query,data, io,'updateMultiMedia');
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
                console.log('data.team');
                console.log(data.team);
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

        socket.on('getRound', async (data, ack) => {
            let update = {};
            if (!data.match_id) {
                ack({ success: false, message: "Match id is required" });
            }
            if (!data.round) {
                ack({ success: false, message: "Round is required" });
            }
            update = {round: data.round}
            let query = { _id: data.match_id }
            await AddPostion.updatePostion(query, update, io, 'setRound');
        })

        socket.on("tempDataGet",async(data,ack) =>{

            if(data.refree && data.refree.length > 0){
                data.is_show_refree = true;
                data.is_show_coach = false;
                data.is_show_team = false;
                data.is_show_player = false;
                data.is_show_chiefguest = false;
                data.is_show_commentator = false;
                data.is_show_match = false;
                data.is_show_flag = false;
            }
            if(data.coach && data.coach.length > 0){
                data.is_show_coach = true;
                data.is_show_refree = false;
                data.is_show_team = false;
                data.is_show_player = false;
                data.is_show_chiefguest = false;
                data.is_show_commentator = false;
                data.is_show_match = false;
                data.is_show_flag = false;
            }
            if(data.chiefguest && data.chiefguest.length > 0){
                data.is_show_chiefguest = true; 
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_team = false;
                data.is_show_player = false;
                data.is_show_commentator = false;
                data.is_show_match = false;
                data.is_show_flag = false;
            }
            if(data.commentator && data.commentator.length > 0){
                data.is_show_commentator = true; 
                data.is_show_chiefguest = false;
                data.is_show_coach = false;
                data.is_show_team = false;
                data.is_show_player = false;
                data.is_show_refree = false;
                data.is_show_match = false;
                data.is_show_flag = false;
                data.is_show_flag = false;
            }
            if(data.match && data.match.length > 0){
                data.is_show_match = true; 
                data.is_show_chiefguest = false;
                data.is_show_team = false;
                data.is_show_player = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_flag = false;
            }
            if(data.team && data.team.length > 0){
                data.is_show_team = true; 
                data.is_show_match = false; 
                data.is_show_player = false;
                data.is_show_chiefguest = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_flag = false;
                let players =   await mongoose.model("players").find({ team: new mongoose.Types.ObjectId( data.team[0]._id) })  
                data.team[0].players = players; 
            }
            if(data.player && data.player.length > 0){
                data.is_show_player = true;
                data.is_show_match = false; 
                data.is_show_team = false; 
                data.is_show_chiefguest = false;
                data.is_show_refree = false;
                data.is_show_coach = false;
                data.is_show_commentator = false;
                data.is_show_flag = false;
            }
            await TempMatch.updateTempData(data, io,'tempDataSet');

        })
        socket.on('disconnect', async function (reason) {
            console.log("Reasons for disconnecting", reason, socket.id);
        });

         // Swicth Between Live and Ad Video
         socket.on('sendLive', async (data, ack) => {
            console.log("Send Live @");
            console.log(data);
         });
    });


}

    
