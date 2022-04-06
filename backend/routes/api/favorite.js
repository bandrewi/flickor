const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Favorite } = require('../../db/models')

const router = express.Router();

//Get favorite
router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const id = req.params.id
    const favorite = await Favorite.findByPk(id)

    return res.json({ favorite })
}))

//Create favorite
router.post('/new', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { photoId } = req.body;

    const favorite = await Favorite.create({
        userId: id,
        photoId
    })

    return res.json({ favorite })
}))

//Delete favorite
router.delete('/:id(\\d+)/delete', requireAuth, asyncHandler(async (req, res) => {
    const id = req.params.id
    const favorite = await Favorite.findByPk(id)

    await favorite.destroy();

    return res.json({ message: 'success' })
}))

module.exports = router