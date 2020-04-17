const router = require('express').Router();
const usersCtrl = require('./../controllers/usersCtrl');
 
router.post('/add', usersCtrl.addDetails);
router.get('/users', usersCtrl.getUsersDetails);
router.get('/append', usersCtrl.getAndAppendData);

module.exports = router;