const jwt = require('jsonwebtoken');

const generateJWT = (_id) => {
    return new Promise((resolve, reject) => {
        const payload= { _id };
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
        }, (err, token)=>{
            if (err) {
                reject('Error generate token !');
            } else {
                resolve(token);
            }
         })
     })
};


const compareJWT = (token = "") => {
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return [true, _id];
    } catch (error) {
        return [false, null];
    }
};


module.exports = { generateJWT, compareJWT }
