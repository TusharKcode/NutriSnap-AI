import api from "../api/api";

export async function getMealSuggestions() {
    try {
        const response = await api.get("/ai/meal-suggestions");

        return response;
    } catch (err) {
        if (err.response) return err.response;
        throw err;
    }
}

const aiService = {
    getMealSuggestions,
};

export default aiService;
