const express = require("express");
const teacherController = require("../controllers/teacherController");
const validator = require('express-joi-validation').createValidator({})
const bodySchema = require('../validations/teacherBodyValidator')
// Routes forma de redireccionar las peticiones
const router = (Teacher) => { // Aca utilizaremos Express y nuestro
    // Controller para indicar qué hacer en cada petición!
    const teacherRouter = express.Router()

    const { getAllTeacher, getTeacherById, postTeacher, putTeacherById, deleteTeacherById} =
    teacherController(Teacher)

    teacherRouter
        .route('/teacher')
        .get(getAllTeacher)
        .post(validator.body(bodySchema), postTeacher)

    teacherRouter
        .route('/teacher/:id')
        .get(getTeacherById)
        .delete(deleteTeacherById)
        .put(validator.body(bodySchema), putTeacherById)

    return teacherRouter
}

module.exports = router