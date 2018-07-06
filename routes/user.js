const express =require('express');
const router=  express.Router();
const {signUp,signIn}=  require("../Controllers/user");

router.route('/signUp').post(signUp);
router.route('/signIn').post(signIn);

module.exports = router;