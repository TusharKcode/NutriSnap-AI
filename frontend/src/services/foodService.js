import api from '../api/api';

const getAuthConfig = () => {
	const token = localStorage.getItem('authToken');

	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export async function uploadFood(data) {
	try {
		const response = await api.post(
			'/food/upload',
			data,
			getAuthConfig()
		);

		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

export async function getDiary() {
	try {
		const response = await api.get(
			'/food/diary',
			getAuthConfig()
		);

		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

const foodService = {
	uploadFood,
	getDiary,
};

export default foodService;