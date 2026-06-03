/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';
import authService from '../services/authService';

const AuthContext = createContext(null);

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export function AuthProvider({ children }) {
	const [token, setToken] = useState(() => {
		try {
			return localStorage.getItem(TOKEN_KEY) || null;
		} catch {
			// ignore localStorage read errors
			return null;
		}
	});

	const [user, setUser] = useState(() => {
		try {
			const raw = localStorage.getItem(USER_KEY);
			return raw ? JSON.parse(raw) : null;
		} catch {
			// ignore localStorage parse errors
			return null;
		}
	});

	useEffect(() => {
		if (token) {
			api.defaults.headers.common.Authorization = `Bearer ${token}`;
		} else {
			delete api.defaults.headers.common.Authorization;
		}
	}, [token]);

	const login = async (credentials) => {
		const res = await authService.loginUser(credentials);
		const data = res?.data || null;
		const newToken = data?.token || data?.accessToken || data?.access_token || null;
		const newUser = data?.user || data?.userInfo || (data && !newToken ? data : null);

		if (newToken) {
			setToken(newToken);
			try {
				localStorage.setItem(TOKEN_KEY, newToken);
			} catch {
				// ignore localStorage write errors
			}
		}

		if (newUser) {
			setUser(newUser);
			try {
				localStorage.setItem(USER_KEY, JSON.stringify(newUser));
			} catch {
				// ignore localStorage write errors
			}
		}

		return res;
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		try {
			localStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem(USER_KEY);
		} catch {
			// ignore localStorage remove errors
		}
		delete api.defaults.headers.common.Authorization;
	};

	const value = { user, token, login, logout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (ctx === undefined || ctx === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return ctx;
}

export default AuthContext;

