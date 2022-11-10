var jwt = require('jsonwebtoken');
let secret = process.env.SECRET



const getToken = (payload)=>jwt.sign(payload, secret);
const tokenVerif = (token)=>jwt.verify(token, secret);

module.exports = {getToken, tokenVerif}