/**
 * Auth Context
 * Manages authentication state across the app
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth.api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const TOKEN_KEY = 'authToken';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!token;

    // Login function
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await loginApi(email, password);
            const newToken = response.token || response.data?.token;

            if (newToken) {
                localStorage.setItem(TOKEN_KEY, newToken);
                setToken(newToken);
                toast.success('Login successful!');
                return true;
            } else {
                toast.error('Invalid response from server');
                return false;
            }
        } catch (error) {
            // Error is already handled by axios interceptor
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        toast.success('Logged out successfully');
    };

    const value = {
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to use auth context
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
