const express = require('express');
const mongoose = require('mongoose');
const {nanoid} = require("nanoid");
const User = require('../models/User');
const config = require("../config");
const axios = require("axios");

const router = express.Router();

router.post('/', async (req, res, next)=>{
   try{
       const user = new User({
           email: req.body.email,
           password: req.body.password,
           displayName: req.body.displayName,
       });

       user.generateToken();
       await user.save();

       return res.send(user);
   } catch(error){
       if(error instanceof mongoose.Error.ValidationError){
           return res.status(400).send(error);
       }
       return next(error);
   }
});

router.post('/sessions', async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(400).send({error: 'Wrong data'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if(!isMatch) {
            return res.status(400).send({error: 'Wrong data'});
        }

        user.generateToken();
        await user.save();

        return res.send(user);

    }catch (error){
        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        return next(error);
   }
});

router.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const message = {message: 'OK'};

        if (!token) return res.send(message);

        const user = await User.findOne({token});

        if (!user) return res.send(message);

        user.generateToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
});

router.post('/facebookLogin', async (req, res, next) => {
    try{
        const inputToken = req.body.authToken;
        const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

        const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if(!user){
            user = await User.findOne({email: req.body.email});
        }

        if(!user){
            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
            })
        }

        user.generateToken();

        await user.save();

        return res.send(user);
    }catch (e) {
        next(e);
    }
});

module.exports = router;