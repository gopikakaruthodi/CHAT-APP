import { Router } from "express";
import * as rh from './requestHandler.js'
import Auth from "./middleware/Auth.js";

const router=Router()

router.route('/signup').post(rh.signup)
router.route('/signin').post(rh.signin)
router.route('/email').post(rh.checkEmail)
router.route('/changepassword').put(rh.changePassword)
router.route('/displayusers').get(Auth,rh.displayUsers)
router.route('/userprofile').get(Auth,rh.userProfile)
router.route('/edituser').put(Auth,rh.edituser)
router.route('/displayuserprofile').get(Auth,rh.displayUserProfile)
router.route('/chat/:receiverID').get(Auth,rh.chat)
router.route('/getchaters').get(Auth,rh.getChaters)
router.route('/openchat/:receiverID').get(Auth,rh.openChat)
router.route('/addmessage/:receiverID').post(Auth,rh.addMessage)
router.route('/deletemessage/:id').delete(Auth,rh.deleteMessage)


    
export default router