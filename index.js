const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const sequelize = require('./utils/db')
const todoRoutes = require('./routes/todo')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/api/todo', todoRoutes)
app.use('/users', usersRoutes)
/*app.use((req, res, next) => {
    res.sendFile('/index.html')
})*/

async function start(){
    try{
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is runing on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
 
start()

