import api from '../api/api';

export async function getGoals() {
	try {
		const response = await api.get('/user/goals');
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

export async function updateGoals(data) {
	try {
		const response = await api.put('/user/goals', data);
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

const userService = {
	getGoals,
	updateGoals,
};

export default userService;