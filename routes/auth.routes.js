const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')  //  валидатор
const User = require('../models/User')

const router = Router()

//  /api/auth/register
router.post(
    '/register',
    //  middleware
    [
        //  валидация email
        check('email', 'Некорректный email').isEmail(),
        //  валидация пароля по количеству символов
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные для регистрации'
            })
        }

        const {email, password} = req.body
        //  проверка уникальный пользователь или нет
        const candidate = await User.findOne({email: email})
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }
        //  хешируем пароль (пакет bcrypt)
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email: email, password: hashedPassword})
        await user.save()

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500).json({message: 'Ошибка, попробуйте еще раз'})
    }
})

//  /api/auth/login
router.post('/login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()    //  проверка введен ли пароль
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные, вход не выполнен'
                })
            }
            const {email, password} = req.body
            //   проверка наличия email
            const user = await User.findOne({email: email})
            if (!user) {
                return res.status(400).json({message: 'Неверный email/пароль'})
            }
            //  проверка пароля
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Неверный email/пароль'})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})
        } catch (e) {
            res.status(500).json({message: 'Ошибка, попробуйте еще раз'})
        }
})


module.exports = router