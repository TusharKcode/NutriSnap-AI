import api from '../api/api';

export async function getDashboardSummary() {
	try {
		const response = await api.get('/dashboard/summary');
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

export async function getGoalProgress() {
	try {
		const response = await api.get('/dashboard/goals');
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

export async function getStreak() {
	try {
		const response = await api.get('/dashboard/streak');
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

export async function getWeeklyStats() {
	try {
		const response = await api.get('/dashboard/weekly');
		return response;
	} catch (err) {
		if (err.response) return err.response;
		throw err;
	}
}

const dashboardService = {
	getDashboardSummary,
	getGoalProgress,
	getStreak,
	getWeeklyStats
};

export default dashboardService;
