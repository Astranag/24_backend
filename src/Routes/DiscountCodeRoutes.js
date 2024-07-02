import express from 'express';
import {
  getFlatRateCodes,
  getPercentageCodes,
  createFlatRateCode,
  createPercentageCode,
  updateFlatRateCode,
  updatePercentageCode,
  deleteFlatRateCode,
  deletePercentageCode
} from '../Controllers/DiscountCodesController.js';

const router = express.Router();

router.get('/flatRateCodes', getFlatRateCodes);
router.get('/percentageCodes', getPercentageCodes);
router.post('/flatRateCodes', createFlatRateCode);
router.post('/percentageCodes', createPercentageCode);
router.put('/flatRateCodes/:id', updateFlatRateCode);
router.put('/percentageCodes/:id', updatePercentageCode);
router.delete('/flatRateCodes/:id', deleteFlatRateCode);
router.delete('/percentageCodes/:id', deletePercentageCode);

export default router;

