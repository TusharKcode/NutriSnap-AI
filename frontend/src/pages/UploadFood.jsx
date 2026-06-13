import { useState, useEffect } from 'react';
import foodService from '../services/foodService';
import AppNavbar from '../components/AppNavbar';
import {
    FaCloudUploadAlt,
    FaRobot,
    FaCheckCircle,
    FaExclamationCircle,
} from 'react-icons/fa';

export default function UploadFood() {
    const [formValues, setFormValues] = useState({
        mealType: 'breakfast',
        foodName: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [imageInfo, setImageInfo] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setImageFile(file);
        setPreview(imageUrl);

        const img = new Image();

        img.onload = () => {
            setImageInfo({
                width: img.width,
                height: img.height,
                size: (
                    file.size /
                    1024 /
                    1024
                ).toFixed(2),
            });
        };

        img.src = imageUrl;

        try {
            setIsAnalyzing(true);

            const response = await foodService.analyzeFood(file);

            if (
                response?.status === 200 &&
                response?.data?.analysis
            ) {
                const ai = response.data.analysis;

                setFormValues((prev) => ({
                    ...prev,
                    foodName: ai.foodName || '',
                    calories: ai.calories || '',
                    protein: ai.protein || '',
                    carbs: ai.carbs || '',
                    fat: ai.fat || '',
                }));
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            if (!imageFile) {
                setError('Please select an image.');
                setIsLoading(false);
                return;
            }

            const formData = new FormData();

            formData.append('image', imageFile);
            formData.append('mealType', formValues.mealType);
            formData.append('foodName', formValues.foodName);
            formData.append('calories', formValues.calories);
            formData.append('protein', formValues.protein);
            formData.append('carbs', formValues.carbs);
            formData.append('fat', formValues.fat);

            const response = await foodService.uploadFood(formData);

            if (response?.status === 200 || response?.status === 201) {
                setSuccess('Food uploaded successfully!');

                setFormValues({
                    mealType: 'breakfast',
                    foodName: '',
                    calories: '',
                    protein: '',
                    carbs: '',
                    fat: '',
                });

                setImageFile(null);
                setPreview(null);
                setImageInfo(null);

            } else {
                setError(
                    response?.data?.message ||
                    'Upload failed.'
                );
            }
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Upload failed.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <>
            <AppNavbar/>
            <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-yellow-50 py-10 px-4">
                <div className="max-w-4xl mx-auto rounded-4xl border border-white/30 bg-white/90 backdrop-blur-xl p-8 shadow-2xl animate-fadeIn">
                    <div className="text-center mb-8">

                        <div
                            className="h-20 w-20 mx-auto rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white flex items-center justify-center text-4xl shadow-xl animate-float mb-4">
                            <FaCloudUploadAlt />
                        </div>

                        <h1
                            className="text-4xl font-black bg-linear-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                            Upload Food
                        </h1>

                        <p className="text-gray-500 mt-2">
                            AI-powered nutrition analysis
                        </p>
                    </div>

                    {success && (
                        <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 animate-fadeIn">
                            <FaCheckCircle className="text-xl shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 animate-fadeIn">
                            <FaExclamationCircle className="text-xl shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>
                            <label className="block mb-1 font-medium">
                                Food Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="w-full rounded-2xl border-2 border-dashed border-orange-300 p-4 cursor-pointer bg-orange-50 hover:border-orange-500 transition-all"
                            />
                            {preview && (
                                <div className="mt-6">

                                    <div className="overflow-hidden rounded-3xl border shadow-xl bg-gray-50">
                                        <img
                                            src={preview}
                                            alt="Food Preview"
                                            className="w-full max-h-125 object-contain hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {imageInfo && (
                                        <div className="mt-3 flex flex-wrap gap-3 text-sm">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                                📐 {imageInfo.width} × {imageInfo.height}
                                            </span>

                                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                                                📦 {imageInfo.size} MB
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {isAnalyzing && (
                                <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-4 flex items-center gap-3 animate-pulse">
                                    <FaRobot className="text-blue-600 text-xl shrink-0" />

                                    <span className="font-semibold text-blue-700">
                                        AI is analyzing your food...
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Meal Type
                            </label>

                            <select
                                name="mealType"
                                value={formValues.mealType}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="snack">Snack</option>
                                <option value="sweet">Sweet</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            name="foodName"
                            placeholder="Food Name"
                            value={formValues.foodName}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
                        />

                        <input
                            type="number"
                            name="calories"
                            placeholder="Calories"
                            value={formValues.calories}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
                        />

                        <input
                            type="number"
                            name="protein"
                            placeholder="Protein (g)"
                            value={formValues.protein}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"                      
                        />

                        <input
                            type="number"
                            name="carbs"
                            placeholder="Carbs (g)"
                            value={formValues.carbs}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"                      
                        />

                        <input
                            type="number"
                            name="fat"
                            placeholder="Fat (g)"
                            value={formValues.fat}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl bg-linear-to-r from-orange-500 to-red-500 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-60"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Uploading...
                                </span>
                            ) : (
                                '🚀 Upload Food'
                            )}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}