const express = require('express');
const asyncHandler = require('express-async-handler');

const { Photo } = require('../../db/models');

const router = express.Router();

module.exports = router