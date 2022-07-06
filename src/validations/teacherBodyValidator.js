const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  subjectMatter: Joi.string().required()
  /*
    min() y max() funcionan distinto en number() o string()
    por lo que hay que ver si usar number o string
  */
})

module.exports = schema