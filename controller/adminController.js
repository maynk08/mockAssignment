const adminModel = require('../model/admin')
const studentModel = require('../model/student')
const jwt = require('jsonwebtoken')



let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const register = async(req,res)=>{
    try{

        let data = req.body
        let {email,password} = data
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please enter email!" })
        }

        if (!email.match(emailRegex))
            return res.status(400).send({ status: false, message: "Invalid email format!" })

        const emailInUse = await adminModel.findOne({ email: email })

        if (emailInUse)
            return res.status(400).send({ status: false, message: "email already in use!" })


      if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter password!" })
        }

        if (!password.match(passwordRegex))
            return res.status(400).send({ status: false, message: "Invalid password format! Password must be between 8 and 15 characters, and must contain one uppercase, one lowercase, special characters and number!" })
            data.password = (await bcrypt.hash(password, 10)).toString()

        await adminModel.create(data)
        return res.status(201).send({message:"Success !"})
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

const userLogin = async(req,res) =>{
    try{
    let {email,password} = req.body

    const findUser = await adminModel.findOne({email:email})

    if(!findUser) {
        return res.status(400).send({status:false,send:"No user found !!"})
    }

   // console.log(findUser._id)
   hashedPassword = user.password

        //Checking if the entered password matches with user's password
        const validPassword = await bcrypt.compare(password, hashedPassword)

        if (validPassword) {
            const checkCredentials = await adminModel.findOne({ email: data.email, password: hashedPassword });
        


    let token = jwt.sign({
        adminId : findUser._id.toString()
    },'student-management')

    res.setHeader('x-api-key',token)
    
    let studentData = await studentModel.findOne({uId:findUser._id})
    //console.log(studentData)
    if(!studentData){
        studentData = 'No data yet !!'
    }
    res.status(201).send({msg:'Successfully LoggedIn :)',data:{studentData},token:{token}})
    }
}

    catch (err) {
        res.status(500).send(err.message)
    }

}

module.exports = {register,userLogin}