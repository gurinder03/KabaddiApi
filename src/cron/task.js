const cron = require('node-cron');
const mongoose = require('mongoose');

const myTask = () => {
  console.log('Task executed at 12:00 AM');
  mongoose.model("tempmatch").findOne({}).then(async(resdata) =>{
    let id = resdata._id;
    await Promise.all([
      mongoose.model("tempmatch").findOneAndUpdate({_id: id},{
        is_show_federation_logo:false,
        is_show_add:false,
        is_show_image:false,
        is_show_marquee_logo:false,
        is_show_full_screen:false,
        is_swap_team:false,
        is_show_refree:false,
        is_show_chiefguest:false,
        is_show_team:false,
        is_show_player: false,
        is_show_commentator:false,
        is_show_match:false,
        is_show_flag:false,
        is_show_score:false,
        is_show_sponser_logo:false,
        chiefguest: [],
        refree: [],
        commentator: [],
        team:[],
        match:[],
        card:[],
        coach:[],
        player:[]  
    },{new: true}),then().catch(),
     mongoose.model("refrees").updateMany({},{is_checked:false},{new: true}).then().catch(),
     mongoose.model("chiefguest").updateMany({},{is_checked:false},{new: true}).then().catch(),
     mongoose.model("coach").updateMany({},{is_checked:false},{new: true}).then().catch(),
     mongoose.model("commentators").updateMany({},{is_checked:false},{new: true}).then().catch(),
     mongoose.model("matches").updateMany({},{is_checked:false},{new: true}).then().catch(),
     mongoose.model("teams").updateMany({},{is_checked:false},{new: true}).then().catch(),
     mongoose.model("players").updateMany({},{is_checked:false},{new: true}).then().catch()
    ]) 
    
  }).catch((err) =>{
    console.log("Error to update",err);
  })
 
};

cron.schedule('0 0 * * *', myTask);
console.log('Cron job scheduled for 12:00 AM');


//
