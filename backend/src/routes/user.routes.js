import { Router } from "express";
import { loginUser, registerUser, logoutUser, changeCurrentPassword, getCurrentUser, refreshAccessToken, verifyEmail, updateUserDetails, updateAvatar, resendEmailVerificationLink } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/MyProfile").get(verifyJWT, getCurrentUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email").get(verifyEmail);
router.route("/update-details").patch(verifyJWT, updateUserDetails);
router.route("/update-avatar").patch(
    verifyJWT, 
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        }
    ]),
    updateAvatar
);
router.route("/resend-verification-link").post(resendEmailVerificationLink);

export default router;