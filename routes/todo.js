const {Router} = require('express')
const Todo = require('../../node-mysql/models /todo')
const User = require('../models /user')
const router = Router()

//получение списка задач
router.get('/', async (req,res) => {
    try{
        const todos = await Todo.findAll()
        res.status(200).json(todos) 
    } catch (e) {
        console.log(e)
        res.sendStatus(500).json({
            message: "Server error!"
        })
    }
})

//создание новой задачи
router.post('/', async (req,res) => {
    try{
        const todo = await Todo.create({
            title: req.body.title,
            done: false
        })
        res.status(201).json({todo})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Server error!"
        })
    }
})

router.put('/:id', async (req,res) => {
    try{
        const todo = await Todo.findByPk(+req.params.id) //+ для того чтобы айди из строки сделать число а не строку
        todo.done = req.body.done
        await todo.save()
        res.status(200).json({todo})
    } catch (e) {
        console.log(e)
        res.sendStatus(500).json({
            message: "Server error!"
        })
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const todos = await Todo.findAll({
            where: {
                id: +req.params.id
            }
        })
        const todo = todos[0]
        await todo.destroy()
        res.status(204).json({})

    } catch (e) {
        console.log(e)
        res.sendStatus(500).json({
            message: "Server error!"
        })
    }
})

module.exports = router
