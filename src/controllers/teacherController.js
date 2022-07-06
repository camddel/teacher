const teacherController = (Teacher) => {
  const getAllTeacher = async (req, res) => {
      // Dentro de la función ponemos nuestras peticiones HTTP
      // ASÍNCRONAS
      try{
      const { query } = req

      const response = await Teacher.find(query)

      res.status(200).json(response)
    } catch (err) {
      console.log(err)
  }
  }

  const postTeacher = async (req, res) => {
try{
      const { body } = req

      const teacher = await new Teacher(body)

      await teacher.save()

      res.status(201).json(teacher)
    } catch (err) {
      console.log(err)
      // if(err.username === 'MongoServerError'){
      //   console.log('Existing data in database');
      //   res.status(401).send('Repeated data')
      // }else if(err.username === 'ValidationError'){
      //   res.status(403).send('Te falto un dato');
      // }else{
      //   res.status(500).send(err.message)
      // }
  }
  }

  const putTeacherById = async (req, res) => {
    try{
      const { body, params } = req

      const response = await Teacher.updateOne(
          {
              _id: params.id
          },
          {
              $set: {
                name: body.name,
                email: body.email,
                subjectMatter: body.subjectMatter
              }
          }
      );
      res.status(200).json(response)
    } catch (err) {
      console.log(err)
  }
  }
  const getTeacherById = async (req, res) => {
    try{
    const { params } = req

    const response = await Teacher.findById(params.id)

    res.status(200).json(response)
  } catch (err) {
    console.log(err)
}
}
    const deleteTeacherById = async (req, res) => {
      try {
          const { params } = req;

          const response = await Teacher.findByIdAndDelete(params.id)

          res.status(202).json(response)
      } catch (err) {
          console.log(err)
      }
    }
  
return {getAllTeacher,
        getTeacherById,
        postTeacher,
        putTeacherById,
        deleteTeacherById
      }
    
}

module.exports = teacherController