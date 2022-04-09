const express = require('express');
const multer = require("multer");
const {nanoid} = require("nanoid");
const Image = require("../models/Image");
const path = require("path");
const config = require("../config");
const authorization = require("../middleware/authorization");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try{
        if(req.query.user) {
            const imagesByUser = await Image.find({user: req.query.user}).populate('user', 'displayName');

            return res.send(imagesByUser);
        }

        const images = await Image.find().populate('user', 'displayName');

        return res.send(images);
    }catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const image = await Image.findOne({_id: req.params.id}).populate('user', 'displayName');

        return res.send(image);
    }catch (e) {
        next(e);
    }
});

router.post('/', authorization, upload.single('image'), async (req, res, next) => {
    try{
        const image = new Image({
            user: req.body.user,
            name: req.body.name,
            image: null,
        })

        if(req.file){
            image.image = req.file.filename;
        }
        await image.save();

        return res.send(image);
    }catch (e) {
        next(e);
    }
});

router.delete('/:id', authorization, async (req, res, next) => {
    try{
        const image = await Image.findByIdAndRemove({_id: req.params.id});

        return res.send(image);
    }catch (e){
        next(e);
    }
});

module.exports = router;