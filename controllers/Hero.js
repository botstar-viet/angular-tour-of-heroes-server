// const router = require('express').Router();
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    id: String, name: String,
}, { collection: 'hero' })

const Hero = mongoose.model('hero', heroSchema);

const url = "mongodb://localhost:27017/hero";

mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.once('open', function () {
    getMany();
});

heroSchema.methods.retrieve = function (id) {
    get(id);
}

heroSchema.methods.update = function (id, name) {
    update(id, name);
}

heroSchema.methods.create = function (id, name) {
    insert(id, name);
}

heroSchema.methods.delete = function (id) {
    drop(id);
}

heroSchema.methods.retrieveMany = function () {
    getMany();
}

const getMany = () =>{
    let heroes = [];
    heroes = Hero.find({}, "id name", function (err, res) {
        handle(err, res);
    });
    return heroes;
}

const get = (id) => {
    Hero.findOne({ 'id': id }, "id name", function (err, res) {
        handle(err, res);
    });
}

const insert = (id, name) => {
    let hero = new Hero({ id: id, name: name });
    hero.save(function (err, res) {
        handle(err, res);
    })
}

const update = (id, name) => {
    Hero.updateOne({ 'id': id }, { 'name': name }, function (err, res) {
        handle(err, res);
    })
}

const drop = (id) => {
    Hero.deleteOne({ 'id': id }, function (err, res) {
        handle(err, res);
    })
}

const handle = (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(res);
    }
}