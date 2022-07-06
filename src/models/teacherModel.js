const mongoose = require('mongoose')
// Model esta asociado a la base de datos, tiene que tener un orden asociado.

const { Schema } = mongoose

const teacherModel = new Schema({
    name: { type: String,required: true },
    email: { type: String},
    subjectMatter: {type: String, required: true}
});

module.exports = mongoose.model('Teacher', teacherModel)