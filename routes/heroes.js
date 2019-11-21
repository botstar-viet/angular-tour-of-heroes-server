const router = require('express').Router();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const heroSchema = new mongoose.Schema({
    id: String, name: String,
}, { collection: 'hero' })

const Hero = mongoose.model('hero', heroSchema);

const url = "mongodb://localhost:27017/hero";

// mongoose.connect(url, { useNewUrlParser: true });

// mongoose.connection.once('open', function () {
//     getMany();
// });

const getMany = async () => {
    let heroes = await Hero.find({}, "id name").sort({ id : -1 });
    heroes.sort((hero1,hero2) => Number(hero2.id) - Number(hero1.id));
    return heroes;
}

const get = async (id) => {
    let hero = await Hero.findOne({ 'id': id }, "id name");
    return hero;
}

const insert = async (name) => {
    let heroes = await getMany();
    let id =Number(heroes[0].id) + 1;
    let hero = new Hero({ id: id, name: name.name });
    let after = await hero.save();
    return after;
}

const update = async (id, name) => {
    let hero = await Hero.updateOne({ 'id': id }, { 'name': name });
    return hero;
}

const drop = async (id) => {
    let hero = await Hero.deleteOne({ 'id': id });
    return hero;
}

router.get('/', async function (req, res) {
    let heroes = [];
    heroes = await getMany();
    res.send(heroes);
})

router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let hero = await get(id);
    res.send(hero);
})

router.put('/', async function (req, res) {
    let heroPut = req.body;
    let heroRes = await update(heroPut.id, heroPut.name);
    res.send(heroRes);
})

router.delete('/:id', async function (req, res) {
    let id = req.params.id;
    let heroRes = await drop(id);
    res.send(heroRes);
})

router.post('/', async function (req, res) {
    console.log(req.body);
    let name = req.body;
    let hero = await insert(name);
    res.send(hero);
})

module.exports = router;
