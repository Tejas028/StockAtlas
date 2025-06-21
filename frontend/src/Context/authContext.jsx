import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import validator from 'validator'

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null)
    const [state, setState] = useState('Sign Up')

    const register = async (credentials) => {
        try {

            const { username, email, password } = credentials;

            const isEmail = validator.isEmail(email);
            if (!isEmail) {
                toast.error("Enter a valid email!");
                return false
            }

            const isStrongPassword = validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            });
            if(!isStrongPassword){
                toast.error("Enter a strong password!");
                return false
            }

            const response = await axios.post('/api/v1/users/register', credentials);

            if (response.data.success) {
                toast.success("User registered successfully");
                setAuthUser(response.data.data)

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
                toast.error(response.data.message || "Logout failed");
                return false;
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return false;
        }
    }

    useEffect(() => {
        console.log(authUser);
    }, [authUser])

    const value = {
        register,
        state, setState,
        login, authUser,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}