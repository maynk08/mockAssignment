const student = require('../model/student')
const studentModel = require('../model/student')






const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value != 'string' || value.trim().length === 0) return false
    return true
}


/////////////////////////////////////// => Student Management Project <= /////////////////////////////////////////


const addStudent = async (req, res) => {
    try {

        if (Object.keys(req.body).length < 1) return res.status(400).send({
            status: false,
            message: "Insert data "
        })

        let data = req.body

        let {Name,Subject,Marks} = data

        if(!isValid(Name)){
            return res.status(400).send({ status: false, message: " Name is required !!" })
        }

        if(!isValid(Subject)){
            return res.status(400).send({ status: false, message: " Subject is required !!" })
        }
    
       if(typeof(Marks)!='number'){
        return res.status(400).send({status:false,message:"Marks should be a number"})
       }

    data.uId = req.userLoggedIn

        let findStudent = await studentModel.findOne({uId:data.uId,Subject:Subject})
        //console.log(findStudent)


        if(findStudent){
            let updateData = await studentModel.findOneAndUpdate({ uId:data.uId }, { Marks:findStudent.Marks+Marks }, { new: true })
        return res.status(201).send({ updateData })
        }


        else{
            let addData = await studentModel.create(data)
            return res.status(201).send({ addData })
        }
        
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let getData = async (req, res) => {
    try {
        let uId = req.userLoggedIn
        let data = await studentModel.find({uId:uId})
        return res.status(200).send({ data })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let upDate = async (req, res) => {
    try {

        if (Object.keys(req.body).length < 1) return res.status(400).send({
            status: false,
            message: "Insert data "
        })

        let data = req.body

        let id = req.userLoggedIn
        let studentId = req.params.id
        
        if(id != studentId){
            return res.status(403).send("Unauthorized Access !!")
        }
        let updateData = await studentModel.findOneAndUpdate({ _id:id, isDeleted: false }, { data }, { new: true })
        return res.status(201).send({ updateData })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let deleteData = async (req, res) => {
    try {

        let id = req.userLoggedIn
        let studentId = req.params.id
        if(id != studentId){
            return res.status(403).send("Unauthorized Access !!")
        }
        
        await studentModel.findOneAndUpdate({ id: _id, isDeleted: false }, { isDeleted: true }, { new: true })
        return res.status(201).send('Deleted :)')
    }

    catch (err) {
        res.status(500).send(err.message)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {addStudent,getData,upDate,deleteData}
