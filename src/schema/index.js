
const userModel = require('../modules/user/model/user.model');
const settingModel = require('../modules/setting/model/setting.model');
const matchModel = require('../modules/match/model/match.model');
const palyerModel = require('../modules/player/model/player.model');
const refreeModel = require('../modules/refree/model/refree.model');
const teamModel = require('../modules/team/model/team.model');
const tournamentModel = require('../modules/tournament/model/tournament.model'); 
const commentatorModel = require('../modules/commentator/model/commentator.model');
const chiefguestModel = require('../modules/chiefguest/model/chiefguest.model');
const advertisementModel = require('../modules/advertisment/model/ad.model');

module.exports = {
    userModel,
    settingModel,
    refreeModel,
    palyerModel,
    matchModel,
    teamModel,
    commentatorModel,
    tournamentModel,
    chiefguestModel,
    advertisementModel
}