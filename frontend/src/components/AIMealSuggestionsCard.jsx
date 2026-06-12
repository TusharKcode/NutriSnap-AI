import { useState } from "react";

import aiService from "../services/aiService";

function AIMealSuggestionsCard() {
    const [loading, setLoading] = useState(false);

    const [suggestion, setSuggestion] = useState("");

    const [error, setError] = useState("");

    const loadSuggestions = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await aiService.getMealSuggestions();

            if (res.status === 200) {
                setSuggestion(res.data.suggestion);
            } else {
                setError(res.data.message || "Failed to generate suggestions");
            }
        } catch (error) {
            console.error(error);
            setError("Failed to generate suggestions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">AI Healthy Meal Suggestions</h2>

                <button
                    onClick={loadSuggestions}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
            </div>

            {error && (
                <div className="p-3 rounded bg-red-100 text-red-600 mb-4">{error}</div>
            )}

            {!suggestion && !loading && (
                <p className="text-gray-500">
                Click Generate to receive personalized AI meal recommendations.
                </p>
            )}

            {suggestion && (
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {suggestion}
                </div>
            )}
        </div>
    );
}

export default AIMealSuggestionsCard;
