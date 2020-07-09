const {Router} = require('express');
const bcrypt = require('bcrypt')
const User = require('../models /User')
const Todo = require('../routes/todo')
const router = Router()

router.get('/login', async (req,res) => {
    res.render('auth', {
        title: 'Authorization',
        isLogin: true,
    })
})

router.post('/login', async (req, res) => {
    try{
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    res.redirect('/')
                } else {
                    res.redirect('/auth/register')
                }
            })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Server error!"
        })
    }
})

router.get('/register', async (req, res) => {
    try{
        res.render('auth', {
            title: 'Registration',
            isRegister: true
        })
    }catch(e){
        console.log(e)
    }
})

router.post('/register', async (req, res) => {
    try{
        const today = new Date()
        const userData = {
            name: req.body.name,
            lastname: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirm: req.body.confirm,
            created: today
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if(!user){
                        const hash = bcrypt.hashSync(userData.password, 10)
                        userData.password = hash
                        User.create(userData)
                        res.redirect('/')  
                }else{
                    res.redirect('/auth/login')
                }
            })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Server error!"
        })
    }
    })


module.exports = router