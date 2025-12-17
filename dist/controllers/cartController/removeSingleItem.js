"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const rdConfig_1 = __importDefault(require("../../config/rdConfig"));
const removeSingleItem = async (req, res, _next) => {
    const sessionId = req.headers['x-card-session-id'];
    const productId = req.params.productId;
    if (!sessionId || !productId) {
        return res.status(400).json({ message: 'Session ID or productId missing' });
    }
    // Define Redis key
    const cartKey = `card:${sessionId}`;
    // Fetch the cart from Redis
    const cartData = await rdConfig_1.default.exists(cartKey);
    if (!cartData) {
        return res.status(404).json({ message: 'Cart sessionId not found' });
    }
    const items = await rdConfig_1.default.hgetall(cartKey);
    if (Object.keys(items).length === 0) {
        return res.status(200).json({ success: false, message: [] });
    }
    // Format the cart items
    const formatItems = Object.keys(items).map((key) => {
        const { quantity, inventoryId } = JSON.parse(items[key]);
        return {
            inventoryId,
            quantity,
            productId: key
        };
    });
    // Find and remove the item
    const matchId = formatItems.filter((item) => item.productId === productId);
    if (matchId.length === 0) {
        return res.status(404).json({ success: false, message: 'This Item is not found' });
    }
    const { inventoryId, quantity } = matchId[0];
    // Update inventory
    await axios_1.default.put(`http://localhost:3001/inventoris/update/${inventoryId}`, {
        quantity: Number(quantity),
        actionType: 'IN'
    });
    await rdConfig_1.default.hdel(cartKey, productId);
    /*
      // Remove the item from Redis
      await redis.hdel(cartKey, productId);
    
      // Fetch updated cart
      const updatedItems = await redis.hgetall(cartKey);
      const updatedCart = Object.keys(updatedItems).map((key) => {
        const { quantity, inventoryId } = JSON.parse(updatedItems[key]);
        return { inventoryId, quantity, productId: key };
      });
    */
    return res.json({ success: true, message: 'Item removed successfully', cart: formatItems, inventoryId, quantity });
};
exports.default = removeSingleItem;
//# sourceMappingURL=removeSingleItem.js.map