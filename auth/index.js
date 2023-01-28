require('dotenv').config()
const {SECRET} = process.env
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try
    {
        if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, SECRET)
        if(payload){
            req.payload = payload
            next()
        } else {
            res.status(400).json({error: "Verification failed or no payload"})
        }
    } else {
        res.status(400).json({error: "No authorization header"})
    }}
    catch(error) {
        res.status(400).json({error})
    }
}

module.exports = auth