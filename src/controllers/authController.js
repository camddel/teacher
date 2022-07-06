const bcrypt = require('bcrypt')
const generateToken = require('../helpers/generateToken')
const httpStatus = require('../helpers/httpStatus')

const authController = (People) => {
// Una persona se registra en nuestra pagina,
// utiliza esos datos reales que estan en nuestra base de datos, 
// para iniciar secion en nuestra pagina
// nuestra aplicacion cuando inicia secion
// confirma que estan bien los datos y le dan un token
// la persona lo va a copiar y lo va a poder utilizar en sus futuras 
// llamadas a nuestros otros endpoints, porque los otros endpoints estan protegidos

  const logIn = async (req, res, next) => {
    // los unicos endpoinds que no estan protegidos son iniciar secion y de registrarse
    try {
      const { body } = req

      const user = await People.findOne({
        username: body.username
      })
      if (
        user === null ||
        !(await bcrypt.compare(body.password, user.password))
      ) {
        return res.status(httpStatus.FORBIDDEN).send('Invalid credentials')
      }

      const token = generateToken(user.username)

      return res.status(httpStatus.OK).json({
        status: 'OK',
        token
      })
    } catch (err) {
      next(err)
    }
  }

  const register = async (req, res, next) => {
    // los unicos endpoinds que no estan protegidos son iniciar secion y de registrarse
    try {
      const { body } = req

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const people = await new People(encryptedData)

      await people.save()

      return res.status(httpStatus.CREATED).json(people)
    } catch (err) {
      next(err)
    }
  }

  return { logIn, register }
}

module.exports = authController