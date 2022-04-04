const express = require('express');
const asyncHandler = require('express-async-handler');

const { Photo } = require('../../db/models');

const router = express.Router();

//Get photo
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const photo = await Photo.findByPk(id);

    return res.json({ photo });
}))

//Upload(create) photo
router.post('/new', asyncHandler(async (req, res) => {
    const { userId, imageUrl, content } = req.body;

    const photo = await Photo.create({
        userId,
        imageUrl,
        content
    });

    return res.json({ photo });
}))

//Update photo
router.put('/:id(\\d+)/edit', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { imageUrl, content } = req.body
    const photo = await Photo.findByPk(id);

    photo.imageUrl = imageUrl;
    photo.content = content;
    await photo.save();

    return res.json({ photo });
}))

module.exports = router