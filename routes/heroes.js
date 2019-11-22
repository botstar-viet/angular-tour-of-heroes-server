const router = require('express').Router();
const herodb = require('../controllers/hero-db');

router.get('/api/', async (req, res ) => {
    let heroes = [];
    heroes = await herodb.getMany();
    res.send(heroes);
});

router.get('/api/:id', async (req, res) => {
    const id = req.params.id;
    const hero = await herodb.getOne(id);
    res.send(hero);
});

router.put('/api/', async (req, res) => {
    const heroPut = req.body;
    const heroRes = await herodb.updateOne(heroPut.id, heroPut.name);
    res.send(heroRes);
});

router.delete('/api/:id', async (req, res) => {
    const id = req.params.id;
    const heroRes = await herodb.dropOne(id);
    res.send(heroRes);
});

router.post('/api/', async (req, res) => {
    const name = req.body;
    const hero = await herodb.insertOne(name.name);
    res.send(hero);
});

module.exports = router;
