import api from '../api/api';

const getAuthConfig = () => {
	const token = localStorage.getItem('authToken');

	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export async function uploadFood(formData) {
	try {
		const token = localStorage.getItem('authToken');

		const response = await api.post(
			'/food/upload',
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			}
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

export async function analyzeFood(imageFile) {
	try {
		const formData = new FormData();
		formData.append('image', imageFile);

		const response = await api.post(
			'/food/analyze',
			formData,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
					'Content-Type': 'multipart/form-data',
				},
			}
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
	analyzeFood
};

export default foodService;