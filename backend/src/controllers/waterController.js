const WaterEntry = require('../models/waterEntry');

const addWaterEntry = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: 'Valid water amount is required',
            });
        }

        const entry = new WaterEntry({
            userId: user._id,
            amount,
        });

        await entry.save();

        res.status(201).json({
            success: true,
            entry,
        });

    } catch (error) {
        console.error(
            '[WaterController] addWaterEntry failed:',
            error
        );

        res.status(500).json({
            message:
                'Server error while adding water entry',
        });
    }
};

const getTodayWater = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const entries =
            await WaterEntry.find({
                userId: user._id,
                createdAt: {
                    $gte: start,
                    $lte: end,
                },
            }).sort({
                createdAt: -1,
            });

        const totalWater =
            entries.reduce(
                (sum, entry) =>
                    sum + entry.amount,
                0
            );

        res.status(200).json({
            success: true,
            totalWater,
            entries,
        });

    } catch (error) {
        console.error(
            '[WaterController] getTodayWater failed:',
            error
        );

        res.status(500).json({
            message:
                'Server error while fetching water data',
        });
    }
};

const deleteWaterEntry = async (
    req,
    res
) => {
    try {
        const user = req.user;
        const { id } = req.params;

        const entry =
            await WaterEntry.findOne({
                _id: id,
                userId: user._id,
            });

        if (!entry) {
            return res.status(404).json({
                message:
                    'Water entry not found',
            });
        }

        await WaterEntry.findByIdAndDelete(
            id
        );

        res.status(200).json({
            success: true,
            message:
                'Water entry deleted successfully',
        });

    } catch (error) {
        console.error(
            '[WaterController] deleteWaterEntry failed:',
            error
        );

        res.status(500).json({
            message:
                'Server error while deleting water entry',
        });
    }
};

module.exports = {
    addWaterEntry,
    getTodayWater,
    deleteWaterEntry,
};