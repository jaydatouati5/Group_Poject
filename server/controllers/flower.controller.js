const Flower = require('../models/flower.model');
const Order = require('../models/order.model');

module.exports.createFlower = (req, res) => {
    Flower.create(req.body)
        .then(flower => res.json(flower))
        .catch(err => res.status(400).json(err));
}

module.exports.getAllFlowers = (req, res) => {
    Flower.find()
        .then(flowers => res.json(flowers))
        .catch(err => res.status(400).json(err));
}

module.exports.getFlowerById = (req, res) => {
    Flower.findById(req.params.id)
        .then(flower => res.json(flower))
        .catch(err => res.status(400).json(err));
}

module.exports.updateFlower = (req, res) => {
    Flower.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedFlower => res.json(updatedFlower))
        .catch(err => res.status(400).json(err));
}

module.exports.deleteFlower = (req, res) => {
    Flower.findByIdAndDelete(req.params.id)
        .then(result => res.json({ result: "Flower deleted successfully" }))
        .catch(err => res.status(400).json(err));
}

module.exports.addToCart = async (req, res) => {
    const { flowerId, quantity } = req.body;
    console.log(req.user);
    const userId = req.user._id;

    try {
        // Find an existing "Not Purchased" order for the user
        let order = await Order.findOne({ status: 'Not Purchased', user: userId });

        if (order) {
            // Check if the flower already exists in the order
            const existingFlower = order.flowers.find(item => item.flowerId.equals(flowerId));

            if (existingFlower) {
                // Update the quantity if the flower already exists
                existingFlower.quantity += quantity;
            } else {
                // Add the flower to the order if it doesn't exist
                order.flowers.push({ flowerId, quantity });
            }

            // Save the updated order
            order.total = order.flowers.reduce((acc, item) => acc + (item.quantity * item.flowerId.price), 0);
            await order.save();
            res.json(order);
        } else {
            // Create a new order if no "Not Purchased" order exists
            const flower = await Flower.findById(flowerId);
            if (!flower) {
                return res.status(404).json({ message: "Flower not found" });
            }

            const newOrder = new Order({
                flowers: [{ flowerId, quantity }],
                total: quantity * flower.price,
                status: 'Not Purchased',
                user: userId
            });

            // Save the new order
            await newOrder.save();
            res.json(newOrder);
        }
    } catch (err) {
        console.error("Error in addToCart:", err);
        res.status(400).json({ message: err.message });
    }
};

module.exports.getMostPopularFlower = async (req, res) => {
    try {
        const orders = await Order.find({ $or: [{ status: 'Pending' }, { status: 'Delivered' }] }).populate('flowers.flowerId');

        const flowerQuantities = {};

        orders.forEach(order => {
            order.flowers.forEach(item => {
                const flowerId = item.flowerId._id.toString();
                if (flowerQuantities[flowerId]) {
                    flowerQuantities[flowerId] += item.quantity;
                } else {
                    flowerQuantities[flowerId] = item.quantity;
                }
            });
        });

        let mostPopularFlowerId = null;
        let maxQuantity = 0;

        for (const flowerId in flowerQuantities) {
            if (flowerQuantities[flowerId] > maxQuantity) {
                maxQuantity = flowerQuantities[flowerId];
                mostPopularFlowerId = flowerId;
            }
        }

        if (!mostPopularFlowerId) {
            return res.status(404).json({ message: "No flowers have been purchased yet." });
        }

        const mostPopularFlower = await Flower.findById(mostPopularFlowerId);

        res.json({ flower: mostPopularFlower, quantity: maxQuantity });
    } catch (err) {
        res.status(400).json(err);
    }
};
