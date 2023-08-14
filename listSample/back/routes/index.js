const express = require('express');
//const User = require('../models/map');

const router = express.Router();

const mapRouter = require('./map');
const userRouter = require('./user');

router.use('/api/map', mapRouter);
router.use('/api/user', userRouter);

/*
router.get('/', async(req, res, next) => {
    try {
        const maps=await Map.findAll();
        res.render('sequlize', {maps});
    } catch (error) {
        console.error(error);
        next(error);
    }
});*/

/*
router.get('/', (req, res, next) => {
    res.render('index', {
        javascriptkey: process.env.javascriptkey
    });
});*/

router.get('/', async(req, res, next) => {
    try {
        const user = await User.findAll();
        res.render('sequelize', {user});
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports=router;