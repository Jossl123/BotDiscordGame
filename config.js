const dotenv = require('dotenv');
dotenv.config();

module.exports.prefix = process.env.PREFIX
module.exports.token = process.env.TOKEN
module.exports.admin = process.env.ADMIN