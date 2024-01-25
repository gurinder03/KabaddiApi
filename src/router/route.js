
module.exports = (app) =>{

    app.use("/api/v1/user",require('../modules/user/router/user.router'));
    app.use('/api/v1/setting',require('../modules/setting/router/setting.router'));
    app.use('/api/v1/tournament',require('../modules/tournament/router/tournament.router'));
    app.use('/api/v1/commentator',require('../modules/commentator/router/commentator.router'));
    app.use('/api/v1/team',require('../modules/team/router/team.router'));
    app.use('/api/v1/refree',require('../modules/refree/router/refree.router'));
    app.use('/api/v1/coach',require('../modules/coach/router/coach.router'));
    app.use('/api/v1/match',require('../modules/match/router/match.router'));
    app.use('/api/v1/player',require('../modules/player/router/palyer.router'));
    // app.use('/api/v1/round',require('../modules/round/router/round.router'));
    app.use('/api/v1/chiefguest',require('../modules/chiefguest/router/chiefguest.router'));
    app.use('/api/v1/fileupload',require('../modules/file/router/file.router'));
    app.use('/api/v1/advertise',require('../modules/advertisment/router/ad.router'));
}