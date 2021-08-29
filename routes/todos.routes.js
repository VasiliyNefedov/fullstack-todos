const {Router} = require('express')
const config = require('config')
const Todo = require('../models/Todo')
const authMdw = require('../middleware/auth.middleware')

const router = Router()

router.post('/create', authMdw, async (req, res) => {
    try {
        const owner = req.user.userId
        const {title, description} = req.body
        if (!title) return res.status(500).json({message: 'Ошибка, нет заголовка'})
        if (!description) return res.status(500).json({message: 'Ошибка, нет описания'})
        const todo = new Todo({title: title, description: description, owner: owner, isDone: false})
        await todo.save()
        res.status(201).json({message: 'Задача создана'})
    } catch(e) {
        res.status(500).json({message: 'Ошибка, попробуйте еще раз'})
    }
})

router.get('/', authMdw, async (req, res) => {
    try {
        const todos = await Todo.find({owner: req.user.userId})
        res.json(todos)
    } catch(e) {
        res.status(500).json({message: 'Ошибка, попробуйте еще раз'})
    }
})

module.exports = router
