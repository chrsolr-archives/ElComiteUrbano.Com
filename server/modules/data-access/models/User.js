'use strict';

const mongoose = require('mongoose');

const UserModel = (() => {
    const schema = {
        google: { type: Object },
        email: { type: String, required: true, trim: true },
        email_canonical: { type: String, lowercase: true, trim: true },
        provider: { type: String, required: true, trim: true },
        isAnAdmin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    };

    const UserSchema = mongoose.Schema(schema);

    UserSchema.pre('save', function(next) {
        this.email_canonical = this.email;

        return next();
    });

    return UserSchema;
})();

module.exports = mongoose.model('User', UserModel, 'Users');