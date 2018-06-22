const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.JWT_SECRET;
/**
 * This function will verify the given token is valid JWT token created
 * by using the secret used to generete it.
 * @function verifyJWT
 * @param token
 * @returns isValid
 */
function verifyJWT(token) {
    jwt.verify(token, secret, (err) =>  isValid = !err)
    return isValid;
}
/**
 * This function will geenrate the JWT token by using the secret.
 * @function genearteJWT
 * @param data
 * @returns token
 */
function genearteJWT(data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, secret, (err, token) => (err ? reject(err) : resolve(token)));
    });
}
/**
 * This function will geenrate the JWT token by using the secret.
 * @function genearteJWT
 * @param token
 * @returns decoded data
 */
function decodeJWT(token) {
    return jwt.decode(token);
}

module.exports.verifyJWT = verifyJWT;
module.exports.genearteJWT = genearteJWT;
module.exports.decodeJWT = decodeJWT