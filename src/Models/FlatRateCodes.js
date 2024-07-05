import mongoose from 'mongoose';
const { Schema } = mongoose;

const flatRateCodesSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const FlatRateCodes = mongoose.model('FlatRateCodes', flatRateCodesSchema);
export default FlatRateCodes;