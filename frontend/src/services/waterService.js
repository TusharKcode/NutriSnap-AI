import api from '../api/api';

const getAuthConfig = () => {
    const token = localStorage.getItem('authToken');

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export async function addWater(amount) {
    try {
        const response = await api.post(
            '/water',
            { amount },
            getAuthConfig()
        );

        return response;
    } catch (err) {
        if (err.response) return err.response;
        throw err;
    }
}

export async function getTodayWater() {
    try {
        const response = await api.get(
            '/water/today',
            getAuthConfig()
        );

        return response;
    } catch (err) {
        if (err.response) return err.response;
        throw err;
    }
}

export async function deleteWater(id) {
    try {
        const response = await api.delete(
            `/water/${id}`,
            getAuthConfig()
        );

        return response;
    } catch (err) {
        if (err.response) return err.response;
        throw err;
    }
}

const waterService = {
    addWater,
    getTodayWater,
    deleteWater,
};

export default waterService;