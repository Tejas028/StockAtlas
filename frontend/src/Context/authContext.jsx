import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import validator from 'validator'

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null)
    const [state, setState] = useState('Sign Up')
    const [accessToken, setAccessToken] = useState(null)

    const register = async (formData) => {
        try {
            const username = formData.get("username");
            const email = formData.get("email");
            const password = formData.get("password");

            const isEmail = validator.isEmail(email);
            if (!isEmail) {
                toast.error("Enter a valid email!");
                return false;
            }

            const isStrongPassword = validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            });

            if (!isStrongPassword) {
                toast.error("Enter a strong password!");
                return false;
            }

            const response = await axios.post('/api/v1/users/register', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                toast.success("User registered successfully");
                setAuthUser(response.data.data);
                return true;
            } else {
                toast.error(response.data.message || "Registration failed");
                return false;
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return false;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post('/api/v1/users/login', credentials);

            if (response.data.success) {
                toast.success("User logged in successfully");

                const { loggedInUser, accessToken, refreshToken } = response.data.data;
                setAuthUser(loggedInUser)
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setAccessToken(accessToken)

                return true;
            } else {
                toast.error(response.data.message || "Registration failed");
                return false;
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return false;
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post('/api/v1/users/logout', null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });


            if (response.data.success) {
                toast.success("User logged out successfully");
                setAuthUser(null)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setState('Sign Up')
                return true;
            } else {
                toast.error("Logout failed");
                return false;
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            console.log(error);
            
            return false;
        }
    }

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('/api/v1/users/refresh-token',
                { refreshToken: localStorage.getItem('refreshToken') }
            );

            const { accessToken } = response.data.data;

            localStorage.setItem("accessToken", accessToken);
            setAccessToken(accessToken); // <- triggers getUser via useEffect if needed
            return true;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            // toast.error("Session expired. Please login again.");
            return false;
        }
    };

    const changePassword = async (oldPassword, newPassword) => {
        try {
            const response = await axios.post('/api/v1/users/change-password', { oldPassword, newPassword }, { withCredentials: true });

            if (response.data.success) {
                toast.success("Password changed successfully");
                // setAuthUser(response.data.data)

                return true;
            } else {
                toast.error(response.data.message || "Password Updation failed");
                return false;
            }

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return false;
        }
    }

    const resendVerificationEmail=async(email)=>{
        try {
            const response = await axios.post('/api/v1/users/resend-verification-link', {email: email.trim()}); 

            if (response.data.success) {
                toast.success("Email verification link re-sent successfully");

                return true;
            } else {
                toast.error(response.data.message || "Failed to resend link!");
                return false;
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return false;
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            try {
                const response = await axios.get("/api/v1/users/MyProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setAuthUser(response.data.data);
                    setAccessToken(token);
                    setState("Sign In");
                }
            } catch (err) {
                // Handle expired or invalid token
                if (err.response?.status === 401) {
                    console.warn("Token expired or unauthorized. Trying refresh...");

                    const success = await refreshAccessToken();
                    if (success) {
                        const retryToken = localStorage.getItem("accessToken");

                        try {
                            const retryRes = await axios.get("/api/v1/users/MyProfile", {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
                                },
                            });

                            if (retryRes.data.success) {
                                setAuthUser(retryRes.data.data);
                                setAccessToken(retryToken);
                                setState("Sign In");
                                return;
                            }
                        } catch (retryErr) {
                            console.error("Retry after refresh failed:", retryErr.message);
                        }
                    }
                }

                // Final fallback if refresh also fails
                console.error("User restore failed:", err.response?.data?.message || err.message);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setAuthUser(null);
                setAccessToken(null);
            }
        };

        fetchUser(); // Always try restoring on first mount
    }, []);



    useEffect(() => {
        // console.log(authUser);
    }, [authUser])

    const value = {
        register,
        state, setState,
        login, authUser,
        logout, changePassword,
        resendVerificationEmail
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}