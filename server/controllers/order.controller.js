const Order = require('../models/order.model');
const Flower = require('../models/flower.model');

module.exports.createOrder = (req, res) => {
    Order.create(req.body)
        .then(order => res.json(order))
        .catch(err => res.status(400).json(err));
}

module.exports.getAllOrders = (req, res) => {
    const isAdmin = req.admin;
    let query = {};

    if (!isAdmin) {
        query = { user: req.user._id };
    }

    Order.find(query)
        .populate('flowers.flowerId')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json(err));
}

module.exports.deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(result => res.json({ result: "Order deleted successfully" }))
        .catch(err => res.status(400).json(err));
}

module.exports.decreaseProductQuantity = async (req, res) => {
    try {
        const { orderId, flowerId, quantity } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const flowerInOrder = order.flowers.find(item => item.flowerId.equals(flowerId));

        if (!flowerInOrder) {
            return res.status(404).json({ message: "Flower not found in order" });
        }

        if (flowerInOrder.quantity < quantity) {
            return res.status(400).json({ message: "Not enough quantity in order" });
        }

        flowerInOrder.quantity -= quantity;

        if (flowerInOrder.quantity === 0) {
            order.flowers = order.flowers.filter(item => !item.flowerId.equals(flowerId));
        }

        order.total = order.flowers.reduce((acc, item) => acc + (item.quantity * item.flowerId.price), 0);

        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.increaseProductQuantity = async (req, res) => {
    try {
        const { orderId, flowerId, quantity } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const flowerInOrder = order.flowers.find(item => item.flowerId.equals(flowerId));

        if (!flowerInOrder) {
            return res.status(404).json({ message: "Flower not found in order" });
        }

        flowerInOrder.quantity += quantity;

        order.total = order.flowers.reduce((acc, item) => acc + (item.quantity * item.flowerId.price), 0);

        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.purchaseOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('flowers.flowerId');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status !== 'Not Purchased') {
            return res.status(400).json({ message: "Order is not in 'Not Purchased' status" });
        }

        for (const item of order.flowers) {
            const flower = await Flower.findById(item.flowerId);
            if (!flower) {
                return res.status(404).json({ message: "Flower not found" });
            }
            if (flower.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for flower ${flower.title}` });
            }
            flower.stock -= item.quantity;
            await flower.save();
        }

        order.status = 'Pending';
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('flowers.flowerId');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status !== 'Pending') {
            return res.status(400).json({ message: "Order can only be canceled if it's in 'Pending' status" });
        }

        for (const item of order.flowers) {
            const flower = await Flower.findById(item.flowerId);
            if (!flower) {
                return res.status(404).json({ message: "Flower not found" });
            }
            flower.stock += item.quantity;
            await flower.save();
        }

        order.status = 'Canceled';
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.deliverOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status !== 'Pending') {
            return res.status(400).json({ message: "Order can only be delivered if it's in 'Pending' status" });
        }

        order.status = 'Delivered';
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.getAllActiveOrders = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        let query = { status: 'Not Purchased' };

        if (start_date && end_date) {
            query.createdAt = {
                $gte: new Date(start_date),
                $lte: new Date(end_date)
            };
        }

        const orders = await Order.find(query)
            .populate('flowers.flowerId');
        res.json(orders);
    } catch (err) {
        res.status(400).json(err);
    }
};
