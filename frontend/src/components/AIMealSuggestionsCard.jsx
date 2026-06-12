import { useState } from "react";
import aiService from "../services/aiService";
import {
    FaRobot,
    FaMagic,
    FaLeaf,
    FaHeartbeat,
    FaLightbulb,
} from "react-icons/fa";

function AIMealSuggestionsCard() {
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState("");
    const [error, setError] = useState("");

    const loadSuggestions = async () => {
        setLoading(true);
        setError("");

        try {
            const res =
                await aiService.getMealSuggestions();

            if (res.status === 200) {
                setSuggestion(
                    res.data.suggestion
                );
            } else {
                setError(
                    res.data.message ||
                    "Failed to generate suggestions"
                );
            }
        } catch (error) {
            console.error(error);
            setError(
                "Failed to generate suggestions"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                relative overflow-hidden
                rounded-3xl
                border border-indigo-100
                bg-linear-to-br
                from-indigo-50
                via-white
                to-purple-50
                p-6
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
            "
        >
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-200 rounded-full blur-3xl opacity-30" />

            <div className="relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-indigo-100">
                            <FaRobot className="text-indigo-600 text-xl" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                AI Meal Coach
                            </h2>

                            <p className="text-sm text-gray-500">
                                Personalized nutrition recommendations
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={loadSuggestions}
                        disabled={loading}
                        className="
                            px-5 py-2.5
                            rounded-xl
                            bg-linear-to-r
                            from-indigo-600
                            to-purple-600
                            text-white
                            font-medium
                            shadow-md
                            hover:scale-105
                            transition-all
                            disabled:opacity-60
                        "
                    >
                        {loading ? (
                            "Generating..."
                        ) : (
                            <span className="flex items-center gap-2">
                                <FaMagic />
                                Generate
                            </span>
                        )}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!suggestion && !loading && (
                    <div className="rounded-2xl border border-dashed border-indigo-200 bg-white/60 p-6 text-center">

                        <FaLightbulb className="mx-auto text-4xl text-yellow-500 mb-3" />

                        <h3 className="font-semibold text-gray-700">
                            Ready for Smart Suggestions?
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                            AI will analyze your recent meals,
                            nutrition goals and calorie intake
                            to recommend healthier options.
                        </p>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center py-8">

                        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

                        <p className="mt-3 text-gray-500">
                            Generating personalized meal plan...
                        </p>
                    </div>
                )}

                {/* Suggestion Result */}
                {suggestion && !loading && (
                    <div className="space-y-4">

                        <div className="flex items-center gap-2">
                            <FaLeaf className="text-green-600" />
                            <span className="font-semibold text-green-700">
                                Healthy Recommendations
                            </span>
                        </div>

                        <div
                            className="
                                rounded-2xl
                                bg-white/80
                                backdrop-blur-sm
                                border border-indigo-100
                                p-5
                                shadow-sm
                            "
                        >
                            <div className="whitespace-pre-wrap text-gray-700 leading-8">
                                {suggestion}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-indigo-600">
                            <FaHeartbeat />
                            Based on your nutrition goals,
                            meal history and calorie intake.
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default AIMealSuggestionsCard;