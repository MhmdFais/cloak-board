const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    email: { type: String, required: true }, // Email to associate with user
    message: { type: String, required: true }, // The actual message
    createdAt: { type: Date, default: Date.now } // Timestamp
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
