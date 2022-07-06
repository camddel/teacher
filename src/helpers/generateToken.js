const jwt = require('jsonwebtoken')
// esta linea es para traer jwt

const generateToken = (data) => 
// generamos una funcion
{
  const token = jwt.sign(
  // a traves de jwt.sign se crea nuestro token
    {
      username: data
      // aca va la informacion que yo quiero grabar en mi token
    },
    process.env.SECRET,
    // es la contraseña secreta que yo utilizo para firmar mi token
    // { expiresIn: '1d' }
    // expitesIn: indica el tiempo en el que el token deje de funcionar
  )

  return token
}

module.exports = generateToken
