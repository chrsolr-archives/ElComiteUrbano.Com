// modules
const mongoose = require('mongoose');

/**
 * Model Schema
 */
const Subscription = new mongoose.Schema({
    email: {type: String, required: true, index: {unique: true}, min: 6},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    canonical: {type: String, required: true},
    isActive: {type: Boolean, default: true}
});

/**
 * Convert Model to ViewModel
 */
Subscription.methods.toVM = function() {
    var _this = this;

    return {
        email: _this.email,
        createdAt: _this.createdAt,
        updatedAt: _this.updatedAt
    };
};

module.exports = mongoose.model('Subscription', Subscription, 'Subscriptions');