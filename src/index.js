const express = require('express');
const cors = require('cors');
const People = require('./models/peopleModel');
const Teacher = require('./models/teacherModel');
const peopleRouter = require('./routes/peopleRouter')(People);
const teacherRouter = require('./routes/teacherRouter')(Teacher);
const authRouter = require('./routes/authRouter')(People);
const httpStatus = require('./helpers/httpStatus')
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config()
const { expressjwt } = require('express-jwt')

const PORT = process.eventNames.PORT || 5000
const app = express()

require('./database/db')

// mongoose.connect('mongodb://127.0.0.1:27017/peopleAPI');
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// estas dos lineas sirven para trabajar con JSON

app.all(
    '/*',
    // proteger todos los caminos que queremos
    expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
    // con expressjwt le digo que el secreto va hacer la contraseña que tengo guardada. 
    // esta linea VERIFICA si el token es correcto si es asi lo dejas acceder y si no tiras un error que no es un token valido.
    // unless: es para dejar rutas abiertas, esos path que sean libres sin necesidad de tener un token son el de login y registrer
      path: ['/auth/login', '/auth/register']
    })
  )
  
  app.use((err, _, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: err.name,
        cause: 'Unauthorized. Missing or invalid token provided.'
      })
    } else {
      next(err)
    }
  })

app.use('/api', peopleRouter, teacherRouter);
// Routes forma de redireccionar las peticiones
app.use('/', authRouter)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Server is running!')
})