import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const subadminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address.']
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required.'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        trim: true,
        set: (val) => {
            return bcrypt.hashSync(val, 10);
        },
    }
}, {
    timestamps: true
});

// Ensure model is defined only once
let Subadmin;
try {
    Subadmin = mongoose.model('Subadmin');
} catch (error) {
    Subadmin = mongoose.model('Subadmin', subadminSchema);
}

export default Subadmin;