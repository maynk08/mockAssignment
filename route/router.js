const express = require("express");
const controller = require('../controller/studentController')
const adminController = require('../controller/adminController')
const middleware = require('../middleware/authenticate')

const router = express.Router()

router.post('/register',adminController.register)
router.post('/login',adminController.userLogin)
router.post('/student',middleware.authenticate,controller.addStudent)
router.get('/student',middleware.authenticate,controller.getData)
router.put('/student/:id',middleware.authenticate,controller.upDate)
router.delete('/student/:id',middleware.authenticate,controller.deleteData)



module.exports = router
