const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        console.log(decoded)
        next()
    } catch (e) {
        console.log(e.message)
        res.status(401).json({message: 'Нет авторизации'})
    }
}