const {Router} = require('express')
const config = require('config')
const Todo = require('../models/Todo')
const authMdw = require('../middleware/auth.middleware')

const router = Router()

// создание задачи для пользователя
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

//  получение задач для пользователя
router.get('/', authMdw, async (req, res) => {
    try {
        const todos = await Todo.find({owner: req.user.userId})
        res.json(todos)
    } catch(e) {
        res.status(500).json({message: 'Ошибка, попробуйте еще раз'})
    }
})

//  удаление задачи
router.delete('/delete/:id', authMdw, async(req, res) => {
    try {
        const todoId = req.params.id
        if (!todoId) return res.status(500).json({message: 'Ошибка, id задачи отсутствует'})
        const todo = await Todo.findById(todoId)
        if (!todo) return res.status(500).json({message: 'Ошибка, задача не найдена в базе'})
        await Todo.findByIdAndDelete(todoId)
        res.status(200).json({message: 'Задача удалена'})
    } catch (e) {
        res.status(500).json({message: 'Ошибка, попробуйте еще раз'})
    }
})

module.exports = router
