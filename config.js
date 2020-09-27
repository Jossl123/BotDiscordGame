const dotenv = require('dotenv');
const { promises } = require('fs');
dotenv.config();

module.exports.prefix = process.env.PREFIX
module.exports.token = process.env.TOKEN
module.exports.admin = process.env.ADMIN_ID
module.exports.adminTag = process.env.ADMIN_TAG
module.exports.channelGeneral = process.env.CHANNEL_GENERAL
module.exports.channelWelcome = process.env.CHANNEL_WELCOME
module.exports.channelErrors = process.env.CHANNEL_ERRORS
module.exports.channelActions = process.env.CHANNEL_ACTIONS