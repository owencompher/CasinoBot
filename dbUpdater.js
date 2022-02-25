const Datasource = require('nedb');
const userDB = new Datasource({filename: './database/users', autoload: true});

userDB.find({}, (err, docs) => {
  if(docs) {
    for(const doc of docs) {
      userDB.update({"_id": doc._id}, {
        "_id":doc._id,"bal":doc.bal,"level":doc.level,"levelExp":doc.levelExp,
        "flip":{
          "reps":doc.totalFlips,"winnings":doc.flipWinnings,"best":doc.biggestWinFlip
        },
        "slot":{
          "reps":doc.totalSpins,"winnings":doc.slotWinnings,"best":doc.biggestWinSlot
        },
        "lastSpin":doc.lastSpin
      });
    }
  }
  if (err) console.log(err);
});