import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    partnerName: { type: String, required: true },
    loveLuckPercentage: { type: Number, required: true } // Add loveLuckPercentage
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.model('User', UserSchema);
