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


module.exports = router