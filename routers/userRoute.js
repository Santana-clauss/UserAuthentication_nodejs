const express=require('express')
const router=express.Router()


const {login,signUp,getAllUsers} = require('../controllers/userController');

router.post('/signup', signUp); 
router.post('/login',login);
router.get('/getAllusers',getAllUsers);

module.exports = router; 