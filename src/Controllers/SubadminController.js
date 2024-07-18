import Subadmin from '../Models/Subadmin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerSubadmin = async (req, res) => {
    try {
        const { username, email, companyName, password } = req.body;

        if (!username || !email || !companyName || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const existingSubadmin = await Subadmin.findOne({ email });
        if (existingSubadmin) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const newSubadmin = new Subadmin({
            username,
            email,
            companyName,
            password
        });

        await newSubadmin.save();
        res.status(201).json({ message: 'Subadmin registered successfully.', subadmin: newSubadmin });
    } catch (error) {
        console.error('Error registering subadmin:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const loginSubadmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        const subadmin = await Subadmin.findOne({ email });
        if (!subadmin) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, subadmin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { subadminId: subadmin._id, email: subadmin.email },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );

        const subadminWithoutPassword = { ...subadmin.toObject() };
        delete subadminWithoutPassword.password;

        res.set("Authorization", `Bearer ${token}`);
        res.status(200).json({ success: 1, message: 'Login successful.', token, subadmin: subadminWithoutPassword });
    } catch (error) {
        console.error('Error logging in subadmin:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const logoutSubadmin = (req, res) => {
    try {
        res.set("Authorization", "");
        res.clearCookie("token");
        req.session.destroy();
        res.status(200).json({ success: 1, message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out subadmin:', error);
        res.status(500).json({ success: 0, message: 'Internal server error.' });
    }
};

const updateSubadmin = async (req, res) => {
    try {
        const { userId, ...updateFields } = req.body; // Change subadminId to userId to match frontend

        if (!userId) {
            return res.status(400).json({ success: 0, message: 'Please provide the subadmin ID.' });
        }

        const updatedSubadmin = await Subadmin.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedSubadmin) {
            return res.status(404).json({ success: 0, message: 'Subadmin not found.' });
        }

        res.status(200).json({ success: 1, message: 'Subadmin data updated successfully.', subadmin: updatedSubadmin });
    } catch (error) {
        console.error('Error updating subadmin data:', error);
        res.status(500).json({ success: 0, message: 'Internal server error.' });
    }
};


const checkSubadmin = async (req, res) => {
    const { email, password } = req.body;

    const subadmin = await Subadmin.findOne({ email });

    if (!subadmin || !bcrypt.compareSync(password, subadmin.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a copy of the subadmin object without the password
    const subadminWithoutPassword = subadmin.toObject();
    delete subadminWithoutPassword.password;

    // Include the subadmin data in the response
    res.json({ success: true, subadmin: subadminWithoutPassword });
};

const getSubadminDetails = async (req, res) => {
    try {
        const { posterId } = req.params;
        const subadmin = await Subadmin.findById(posterId);

        if (!subadmin) {
            return res.status(404).json({ success: false, message: "Subadmin not found" });
        }

        res.status(200).json({ success: true, data: subadmin });
    } catch (error) {
        console.error("Error fetching subadmin details:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { registerSubadmin, loginSubadmin, logoutSubadmin, updateSubadmin, checkSubadmin, getSubadminDetails };