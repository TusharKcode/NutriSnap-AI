import api from '../api/api';

export async function addWeight(weight) {
    try {
        const response = await api.post(
            '/weight',
            { weight }
        );

        return response;
    } catch (err) {
        if (err.response) return err.response;
        throw err;
    }
}

export async function getWeightHistory() {
    try {
        const response = await api.get(
            '/weight'
        );

        return response;
    } catch (err) {
        if (err.response) return err.response;
        throw err;
    }
}

export async function deleteWeight(id) {
    try {
        const response = await api.delete(
            `/weight/${id}`
        );

        return response;
    } catch (err) {
        if (err.response) return err.response;
        throw err;
    }
}

const weightService = {
    addWeight,
    getWeightHistory,
    deleteWeight,
};

export default weightService;