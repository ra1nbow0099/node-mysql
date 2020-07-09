const {Router} = require('express')
const User = require('../models /User')
const router = Router()

router.get('/', async (req,res) => {
    User.findAll()
        .then(user => {
            if(user) {
                res.json(user)
            }   else {
                res.send('User does not exist!')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/', async (req,res) => {

})
module.exports = router
