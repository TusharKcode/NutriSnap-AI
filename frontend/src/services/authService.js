import api from '../api/api';

export async function loginUser(credentials) {
	try {
		const response = await api.post('/auth/login', credentials);
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

export async function registerUser(userData) {
	try {
		const response = await api.post('/auth/register', userData);
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

const authService = { loginUser, registerUser };

export default authService;

