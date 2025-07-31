import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { cookieOptions } from "../constants.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        // console.log("AccessToken in function : ", accessToken);
        // console.log("RefreshToken in fucntion: ", refreshToken);

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
}

const sendVerificationEmail = async (user, email) => {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    user.emailVerificationToken = hashedToken
    user.emailVerificationTokenExpiry = Date.now() + 1000 * 60 * 15 // 15 minutes
    await user.save({ validateBeforeSave: false });

    const verificationUrl = `${process.env.CORS_ORIGIN}/verify-email?token=${verificationToken}&id=${user._id}`;

    await sendEmail(
    email,
    "Verify Your StockAtlas Account - Complete Registration",
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your StockAtlas Account</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.6;
                color: #e2e8f0;
                background: #0f172a;
                padding: 20px;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #1e293b;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid #334155;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            }
            
            .header {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                padding: 40px 30px;
                text-align: center;
                border-bottom: 1px solid #475569;
                position: relative;
            }
            
            .header::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6);
                animation: shimmer 3s ease-in-out infinite;
            }
            
            @keyframes shimmer {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }
            
            .logo {
                font-size: 28px;
                font-weight: 700;
                color: #f1f5f9;
                margin-bottom: 8px;
                letter-spacing: -0.5px;
            }
            
            .tagline {
                font-size: 14px;
                color: #94a3b8;
                font-weight: 400;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .content {
                padding: 40px 30px;
            }
            
            .welcome-title {
                font-size: 24px;
                color: #f1f5f9;
                margin-bottom: 16px;
                font-weight: 600;
                text-align: center;
            }
            
            .greeting {
                font-size: 16px;
                color: #cbd5e1;
                margin-bottom: 24px;
                text-align: center;
            }
            
            .intro-text {
                font-size: 16px;
                color: #cbd5e1;
                margin-bottom: 32px;
                text-align: center;
                line-height: 1.7;
            }
            
            .verification-card {
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 8px;
                padding: 32px;
                margin: 32px 0;
                text-align: center;
                position: relative;
            }
            
            .verification-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #3b82f6, #06b6d4);
                border-radius: 8px 8px 0 0;
            }
            
            .security-notice {
                font-size: 14px;
                color: #94a3b8;
                margin-bottom: 24px;
                font-weight: 500;
            }
            
            .verify-button {
                display: inline-block;
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: #ffffff;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 6px;
                font-weight: 600;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                border: none;
            }
            
            .verify-button:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            }
            
            .expiry-notice {
                background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                color: #ffffff;
                padding: 12px 20px;
                border-radius: 6px;
                margin-top: 20px;
                font-size: 13px;
                font-weight: 500;
                display: inline-block;
            }
            
            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 24px;
                margin: 40px 0;
                padding: 32px 0;
                border-top: 1px solid #334155;
                border-bottom: 1px solid #334155;
            }
            
            .feature-item {
                text-align: center;
                padding: 16px;
            }
            
            .feature-icon {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #3b82f6, #06b6d4);
                border-radius: 12px;
                margin: 0 auto 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            
            .feature-title {
                font-weight: 600;
                color: #f1f5f9;
                margin-bottom: 4px;
                font-size: 14px;
            }
            
            .feature-desc {
                font-size: 12px;
                color: #94a3b8;
                line-height: 1.4;
            }
            
            .alternative-link {
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 6px;
                padding: 20px;
                margin-top: 24px;
                font-size: 13px;
                color: #94a3b8;
                text-align: center;
            }
            
            .alternative-link a {
                color: #3b82f6;
                text-decoration: none;
                word-break: break-all;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 12px;
            }
            
            .footer {
                background: #0f172a;
                padding: 32px 30px;
                text-align: center;
                border-top: 1px solid #334155;
            }
            
            .footer-content {
                color: #64748b;
                font-size: 13px;
                line-height: 1.6;
                margin-bottom: 16px;
            }
            
            .footer-links {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #334155;
            }
            
            .footer-links a {
                color: #64748b;
                text-decoration: none;
                margin: 0 16px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                transition: color 0.3s ease;
            }
            
            .footer-links a:hover {
                color: #3b82f6;
            }
            
            .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, #334155, transparent);
                margin: 32px 0;
            }
            
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 8px;
                }
                
                .header, .content, .footer {
                    padding: 24px 20px;
                }
                
                .verification-card {
                    padding: 24px 20px;
                }
                
                .features-grid {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                
                .verify-button {
                    padding: 12px 24px;
                    font-size: 13px;
                }
                
                .welcome-title {
                    font-size: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">StockAtlas</div>
                <div class="tagline">Navigate Global Markets</div>
            </div>
            
            <div class="content">
                <div class="welcome-title">Account Verification Required</div>
                <div class="greeting">Hello <strong>${user.username}</strong>,</div>
                
                <p class="intro-text">
                    Welcome to StockAtlas. To complete your registration and gain access to 
                    comprehensive market data and analysis tools, please verify your email address.
                </p>
                
                <div class="verification-card">
                    <div class="security-notice">
                        <strong>Security Verification</strong><br>
                        Verify your email address to secure your account and unlock platform features.
                    </div>
                    
                    <a href="${verificationUrl}" class="verify-button">
                        Verify Email Address
                    </a>
                    
                    <div class="expiry-notice">
                        Verification link expires in 15 minutes
                    </div>
                </div>
                
                <div class="features-grid">
                    <div class="feature-item">
                        <div class="feature-icon">📊</div>
                        <div class="feature-title">Real-Time Data</div>
                        <div class="feature-desc">Live market feeds and price updates</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">📈</div>
                        <div class="feature-title">Advanced Analytics</div>
                        <div class="feature-desc">Technical indicators and market insights</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">🌍</div>
                        <div class="feature-title">Global Coverage</div>
                        <div class="feature-desc">Worldwide stock exchanges and indices</div>
                    </div>
                </div>
                
                <div class="alternative-link">
                    <strong>Alternative Access:</strong><br>
                    If the button above doesn't work, copy and paste this link:<br>
                    <a href="${verificationUrl}">${verificationUrl}</a>
                </div>
            </div>
            
            <div class="footer">
                <div class="footer-content">
                    <strong>Questions or concerns?</strong><br>
                    Contact our support team if you didn't request this verification or need assistance.
                </div>
                
                <div class="footer-content">
                    © 2024 StockAtlas. All rights reserved.<br>
                    Professional market data and analysis platform.
                </div>
                
                <div class="footer-links">
                    <a href="#">Support</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Unsubscribe</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `
    );
}

const registerUser = asyncHandler(async (req, res) => { 
    const { username, email, password } = req.body;

    if(
        [username, email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exist");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    // if(!avatar?.url){
    //     throw new ApiError(400, "Avatar not uploaded on cloudinary");
    // }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar?.url || ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user");
    }

    await sendVerificationEmail(user, email);

    return res
    .status(201)
    .json(
        new ApiResponse(200, createdUser ,"User Registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email){
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{email}]
    })
    if(!user){
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials");
    }

    if(!user.isVerified){
        throw new ApiError(403, "Please Verify your Email before logging in");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    // console.log("AccessToken: ", accessToken);
    // console.log("RefreshToken", refreshToken);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
        new ApiResponse(
            200,
            {
                loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // removes refreshToken field from DB
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
        new ApiResponse(200, {}, "User Logged Out")
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "User Found Successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    // console.log(req.cookies);
    
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    // console.log(incomingRefreshToken);
    
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Request", [
            {code: "UNAUTHORIZED", shouldRefresh: false}
        ]);
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        // console.log(decodedToken);
        
        const user = await User.findById(decodedToken?._id);
        
        if(!user){
            throw new ApiError(401, "Invalid Refresh Token", [
                {code: "UNAUTHORIZED", shouldRefresh: false}
            ]);
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Invalid Refresh Token", [
               {code: "UNAUTHORIZED", shouldRefresh: false}
            ]);
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user?._id);
        console.log("accessToken: ", accessToken);
        console.log("newRefreshToken: ", refreshToken);

        return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken},
                "Access Token Refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token", [
            {code: "UNAUTHORIZED", shouldRefresh: false}
        ]);
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed Succesfully"
        )
    )
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { token, id } = req.query;

    if(!token || !id){
        throw new ApiError(400, "Invalid Verification Request");
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        _id: id,
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if(!user){
        throw new ApiError(400, "Verification link is invalid or has expired");
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Email Verified Successfully")
    );
})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    if(!username || !email){
        throw new ApiError(400, "Fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                username,
                email
            }
        },
        {new: true} // returns updated data
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Profile Details Updated Successfully"
        )
    );
})

const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar File is Missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar.url){
        throw new ApiError(400, "Error while uploading on cloudinary");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Avatar Image Updated Successfully"
        )
    )
})

const resendEmailVerificationLink = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if(!email){
        throw new ApiError(400, "Email is Required");
    }

    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(400, "User not Found");
    }

    if(user.isVerified){
        throw new ApiError(400, "Email is already verified");
    }

    await sendVerificationEmail(user, email);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Verification Link Resent Successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken,
    changeCurrentPassword,
    verifyEmail,
    updateUserDetails,
    updateAvatar,
    resendEmailVerificationLink
}