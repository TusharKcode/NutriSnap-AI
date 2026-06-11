const WeightEntry =
    require('../models/WeightEntry');

const addWeightEntry =
    async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json({
                    message:
                        'Unauthorized',
                });
            }

            const { weight } =
                req.body;

            if (
                !weight ||
                weight <= 0
            ) {
                return res.status(400).json({
                    message:
                        'Valid weight required',
                });
            }

            const entry =
                new WeightEntry({
                    userId: user._id,
                    weight,
                });

            await entry.save();

            res.status(201).json({
                success: true,
                entry,
            });

        } catch (error) {
            console.error(
                '[WeightController] addWeightEntry failed:',
                error
            );

            res.status(500).json({
                message:
                    'Server error while adding weight',
            });
        }
    };

const getWeightHistory =
    async (req, res) => {
        try {
            const user = req.user;

            const entries =
                await WeightEntry.find({
                    userId: user._id,
                }).sort({
                    createdAt: -1,
                });

            res.status(200).json({
                success: true,
                entries,
            });

        } catch (error) {
            console.error(
                '[WeightController] getWeightHistory failed:',
                error
            );

            res.status(500).json({
                message:
                    'Server error while fetching weight history',
            });
        }
    };

const deleteWeightEntry =
    async (req, res) => {
        try {
            const user = req.user;

            const { id } =
                req.params;

            const entry =
                await WeightEntry.findOne({
                    _id: id,
                    userId: user._id,
                });

            if (!entry) {
                return res.status(404).json({
                    message:
                        'Weight entry not found',
                });
            }

            await WeightEntry.findByIdAndDelete(
                id
            );

            res.status(200).json({
                success: true,
                message:
                    'Weight entry deleted',
            });

        } catch (error) {
            console.error(
                '[WeightController] deleteWeightEntry failed:',
                error
            );

            res.status(500).json({
                message:
                    'Server error while deleting weight',
            });
        }
    };

module.exports = {
    addWeightEntry,
    getWeightHistory,
    deleteWeightEntry,
};