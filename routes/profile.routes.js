const constants = require('../constants');
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const completenessMiddleware = require('../middlewares/completed.middleware');


router.get('/verify/:token', profileController.verify);
router.get('/edit', authMiddleware.isAuthenticated, profileController.edit);
router.post('/edit', authMiddleware.isAuthenticated, profileController.doEdit);
router.post('/:id/delete', 
  authMiddleware.isAuthenticated, 
  authMiddleware.checkRole(constants.ROLE_ADMIN), 
  profileController.doDelete);
  

module.exports = router;

//completenessMiddleware.checkCompleteness
