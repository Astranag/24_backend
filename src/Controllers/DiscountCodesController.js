import FlatRateCodes from '../Models/FlatRateCodes.js';
import PercentageCodes from '../Models/PercentageCodes.js';

export const getFlatRateCodes = async (req, res) => {
  try {
    const flatRateCodes = await FlatRateCodes.find({});
    res.json({ success: true, flatRateCodes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const getPercentageCodes = async (req, res) => {
  try {
    const percentageCodes = await PercentageCodes.find({});
    res.json({ success: true, percentageCodes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const createFlatRateCode = async (req, res) => {
  const { code, value } = req.body;
  try {
    const newCode = new FlatRateCodes({ code, value });
    await newCode.save();
    res.json({ success: true, newCode });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const createPercentageCode = async (req, res) => {
  const { code, value } = req.body;
  try {
    const newCode = new PercentageCodes({ code, value });
    await newCode.save();
    res.json({ success: true, newCode });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const updateFlatRateCode = async (req, res) => {
  const { id } = req.params;
  const { code, value } = req.body;
  try {
    const updatedCode = await FlatRateCodes.findByIdAndUpdate(id, { code, value }, { new: true });
    res.json({ success: true, updatedCode });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const updatePercentageCode = async (req, res) => {
  const { id } = req.params;
  const { code, value } = req.body;
  try {
    const updatedCode = await PercentageCodes.findByIdAndUpdate(id, { code, value }, { new: true });
    res.json({ success: true, updatedCode });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};

export const deleteFlatRateCode = async (req, res) => {
    try {
      const { id } = req.params;
      await FlatRateCodeModel.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Flat rate code deleted successfully' });
    } catch (error) {
      console.error("Error deleting flat rate code:", error);
      res.status(500).json({ success: false, message: 'Failed to delete flat rate code' });
    }
  };
  
  export const deletePercentageCode = async (req, res) => {
    try {
      const { id } = req.params;
      await PercentageCodeModel.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Percentage code deleted successfully' });
    } catch (error) {
      console.error("Error deleting percentage code:", error);
      res.status(500).json({ success: false, message: 'Failed to delete percentage code' });
    }
  };