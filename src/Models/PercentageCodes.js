import mongoose from 'mongoose';
const { Schema } = mongoose;

const PercentageCodesSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const PercentageCodes = mongoose.model('PercentageCodes', PercentageCodesSchema);
export default PercentageCodes;