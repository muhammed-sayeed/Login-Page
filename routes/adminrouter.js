const express = require('express')

const {
    getadminlog,
    adminhomeview,
    getusers,
    search,
    deleteuser,
    edituser,
    updateuser,
    
} = require('../controller/admincontroller')

const router =  express.Router()


router.get('/',getadminlog)
router.post('/adminhome',adminhomeview)
router.get('/getusers',getusers)
router.post('/searchusers',search)
router.get('/deleteuser/:id',deleteuser)
router.get('/edituser/:id',edituser)
router.post('/updateuser/:id',updateuser)


module.exports = router 