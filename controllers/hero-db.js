const Hero = require('../models/hero');
const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/hero';

// const options = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     autoIndex: false, // Don't build indexes
//     reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//     reconnectInterval: 500, // Reconnect every 500ms
//     poolSize: 10, // Maintain up to 10 socket connections
//     // If not connected, return errors immediately rather than waiting for reconnect
//     bufferMaxEntries: 0,
//     connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
//     socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     family: 4 // Use IPv4, skip trying IPv6
//   };

// mongoose.connect(url, options);

// mongoose.connection.once('open',  async () => {
//     insertOne('viettietie');
// });

const getMany = async () => {
    let heroes = await Hero.find({}, "id name");
    heroes.sort((hero1, hero2) => Number(hero2.id) - Number(hero1.id));
    console.log(heroes);
    return heroes;
}

const getOne = async (id) => {
    const hero = await Hero.findOne({ id }, "id name");
    return hero;
}

const insertOne = async (name) => {
    const heroes = await getMany();
    const id = Number(heroes[0].id) + 1;
    const hero = new Hero({id,name});
    const after = await hero.save();
    return after;
}

const updateOne = async (id, name) => {
    const hero = await Hero.findOneAndUpdate({id}, {name});
    return hero;
}

const dropOne = async (id) => {
    const hero = await Hero.findOneAndRemove({ id });
    return hero;
}

module.exports = { getMany, getOne, insertOne, updateOne, dropOne };
