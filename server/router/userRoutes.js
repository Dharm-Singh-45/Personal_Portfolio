import express from 'express'
import { registerUser,login, logout, getUser, updateProfile, updatePassword, getUserForPortfolio, forgotPassword, resetPassword } from '../controller/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router()

router.post('/register', registerUser )
router.post('/login', login )
router.get('/logout', isAuthenticated,logout )
router.get('/me', isAuthenticated,getUser )
router.put('/update/me', isAuthenticated,updateProfile )
router.put('/update/password', isAuthenticated,updatePassword )

// portfolio access
router.get('/portfolio/me',getUserForPortfolio )

router.post('/password/forgot',forgotPassword )

router.post('/password/reset/:token',resetPassword )


export default router ; 