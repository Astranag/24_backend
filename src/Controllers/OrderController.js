import mongoose from "mongoose";
import Order from "../Models/Order.js";
import Joi from 'joi';
import { sendEmail } from "../Utils/Email.js";
import User from "../Models/User.js";
import Product from "../Models/Product.js";
// import EmailData from "../Utils/EmailText.json" assert { type: 'json' };
import { updateProduct } from "./ProductController.js";
let EmailData= 
  {
    "uploadTexts": {
      "1stText": "Congratulations on successfully uploading your furniture to the 24möbler application! 🎉",
      "2ndText": "Now, take the next step and continue using the application.",
      "3rdText": "We'll keep you updated on the status of your furniture based on your availability time slots. It can be approved for announcing the item on our platform, declined, or directly approved for pick up. Most commonly, we offer pick up of the items within 24h.",
      "4thText": "Keep up the great work!"
    },
    "orderText": {
      "1stText": "Congratulations for your selection of furniture. Kindly proceed with payment using the following details:",
      "2ndText": "Recipient: Crombo AB",
      "3rdText": "Payment Methods:",
      "4thTextUL": "Swish: 1231843754",
      "5thTextUL": "Bank Giro: 5765-6878",
      "6thTextUL": "Bank Account: 53851107659 (SEB)",
      "7thTextUL": "Please include the message \"24mobler app + Swedish personal identification number\" for reference.",
      "8thText": "Upon successful payment, you will be contacted via email with the receipt and more precise delivery timing, taking into account the time slot preferences you previously specified in the app."
    },
    "preApprovedToApproved": {
      "1stText": "Congratulations! ",
      "2ndText": "We confirm that your furniture has been successfully sold on our platform 🎉",
      "3rdText": "This means that we will pick up the furniture within this time slot:",
      "4thText": "[the text we provide in the admin description box while approving]",
      "5ththText": "Thank you for choosing 24möbler for selling your furniture!"
    },
    "statusSoldTodeliveryApproved": {
      "1stText": "Congratulations! ",
      "2ndText": "We confirm that you successfully paid for your Furniture order 🎉",
      "3rdText": "This means that we will deliver you the furniture within this time slot:",
      "4thText": "[the text we provide in the admin description box while approving]",
      "5ththText": "Thank you for choosing 24möbler for buying our furniture!"
    },
    "pendingToPreApproved": {
      "1stText": "Congratulations! ",
      "2ndText": "Your furniture ad has been approved to be posted on the 24möbler platform! 🎉 ",
      "3rdText": "This means other users can choose it from our furniture library and after they buy it, we will transfer directly to you.",
      "4thText": "Thank you for choosing 24möbler for selling your furniture!"
    },
    "pendingToApproved": {
      "1stText": "Congratulations! Your furniture has been selected for direct pick up on the 24möbler platform! 🎉 ",
      "2ndText": "This means that we are interested to directly take it to our storage and pay you during the pick up.",
      "3rdText": "Pick up time will be:",
      "4thText": "[the text we provide in the admin description box while approving]",
      "5thText": "Thank you for choosing 24möbler for selling your furniture!"
    },
    "pendingToDeclined": {
      "1stText": "Your furniture submission has been carefully reviewed. Unfortunately, we won't be able to proceed with listing it on the 24möbler platform at this time. We appreciate your interest in selling with us. Reason is:",
      "2ndText": "[the text we provide in the admin description box while declining]",
      "3rdText": "We encourage you to refine your listing based on the feedback provided and resubmit for consideration. We appreciate your interest in selling with us and look forward to the opportunity to potentially work with you in the future.",
      "4thText": "Thank you for choosing 24möbler!"
    },
    "paymentDeclined": {
      "1stText": "Payment Not Received: We have not received the payment for your order. Please ensure that your payment is completed to proceed with the order.",
      "2ndText": "We are unable to deliver your order in the available delivery slots. We apologize for the inconvenience and appreciate your understanding.",
      "3rdText": "Thank you for choosing 24möbler!"
    }
  }
  

const createNewOrder = async (req, res) => {
    try {
        const { customerId, orderItems, shippingAddress, deliverySlots } = req.body;
        const orderSchema = Joi.object({
            customerId: Joi.string().required().custom((value, helper) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helper.error('Invalid customer ID');
                }
                return value;
            }),
            orderItems: Joi.array().required().min(1),
            shippingAddress: Joi.object().required(),
            deliverySlots: Joi.array().required().min(1),
        });
        const validationResult = orderSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ success: false, message: validationResult.error.details[0].message });
        }

        let orderNo = await generateUniqueOrderNo()

        const user = await findUserById(customerId);
        if (!user) {
            console.log('User who order that product not found.');
        }

        const createdOrder = await Order.create({ customerId, orderNo, orderItems, shippingAddress, deliverySlots })

        for (const item of orderItems) {
            const product = await findProductById(item.id);
            if (!product) {
                console.log(`Product not found with ID ${item.id}.`);
                continue;
            }
            if (product.status === 'approved') {
                // Send email to customer only
                if (process.env.SMTP2GO_API_KEY) {
                    await sendEmail({ product: {}, user, emailSubject: "Product Order", emailMsg: EmailData?.orderText });
                } else {
                    console.log('SMTP2GO API key not found. Email sending disabled.');
                }
            } else if (product.status === 'preApproved') {
                // const productOwner = await findUserById(product.posterId);
                // if (productOwner) {
                //     // Send email to product owner
                //     if (process.env.SMTP2GO_API_KEY) {
                //         await sendEmail({ product: {}, user: productOwner, emailSubject: "Pre Approved Product update", emailMsg: EmailData?.preApprovedToApproved });
                //     } else {
                //         console.log('SMTP2GO API key not found. Email sending disabled.');
                //     }
                // } else {
                //     console.log(`Product owner not found with ID ${product.posterId}.`);
                // }

                // Also Send email to customer 
                if (process.env.SMTP2GO_API_KEY) {
                    await sendEmail({ product: {}, user, emailSubject: "Product Order", emailMsg: EmailData?.orderText });
                } else {
                    console.log('SMTP2GO API key not found. Email sending disabled.');
                }
            }
            if (product.status === 'preApproved') {
                product.isPreApproved = true;
            }
            product.status = "sold";
            await updateProduct(product);
        }

        if (createdOrder?._id) {
            res.status(200).json({
                success: true,
                message: 'Order created successfully',
                createdOrder,
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Order creation failed',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const getCustomerOrders = async (req, res) => {
    try {
        const { customerId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ success: false, message: 'Invalid customer ID' });
        }
        const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
        if (!orders || !Array.isArray(orders) || orders.length === 0) {
            return res.status(200).json({ success: false, message: 'No orders found for this customer.' });
        }
        const productIds = orders?.flatMap(order => order?.orderItems?.map(item => item?.id));
        const products = await Product.find({ _id: { $in: productIds }, status: 'deliveryApproved' });
        const ordersWithProducts = orders?.map(order => {
            const orderItemsWithProducts = order?.orderItems?.map(item => {
                const product = products?.find(product => product?._id?.equals(item?.id));
                return { ...item, product: product || {} };
            });
            // Check if all products for this order are found, if not, skip the order
            if (orderItemsWithProducts.some(item => !item.product._id)) {
                return null; // Skip this order
            }
            return { ...order.toObject(), orderItems: orderItemsWithProducts };
        }).filter(Boolean);
        res.status(200).json({ success: true, customerOrders: ordersWithProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({}).sort({ createdAt: -1 });
        if (!orders || !Array.isArray(orders) || orders.length === 0) {
            return res.status(200).json({ success: false, message: 'No order found' });
        }
        const productIds = orders?.flatMap(order => order?.orderItems?.map(item => item?.id));
        const products = await Product.find({ _id: { $in: productIds } });
        const ordersWithProducts = orders?.map(order => {
            const orderItemsWithProducts = order?.orderItems?.map(item => {
                const product = products?.find(product => product?._id?.equals(item?.id));
                return { ...item, product: product || {} };
            });
            return { ...order.toObject(), orderItems: orderItemsWithProducts };
        });
        res.status(200).json({ success: true, allOrders: ordersWithProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

const generateUniqueOrderNo = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let orderNo;
    do {
        orderNo = '';
        for (let i = 0; i < 5; i++) {
            orderNo += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (await Order.exists({ orderNo })); // Check for existing order with same ID
    return orderNo;
};

const findUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
    }
};

const findProductById = async (productId) => {
    try {
        return await Product.findById(productId);
    } catch (error) {
        console.error('Error finding product by ID:', error);
        throw error;
    }
};

const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Assuming the order ID is passed as a URL parameter

    // Validate the orderId, assuming it should be a string of 24 hex characters
    if (!orderId || !/^[0-9a-fA-F]{24}$/.test(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order ID." });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    // Check if the customer exists
    const customer = await User.findById(order.customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found for this order." });
    }

    // Update the order status to "confirmed"
    order.orderStatus = 'confirmed';
    await order.save();

    // Respond with the updated order
    res.json({ success: true, message: "Order status updated to confirmed.", order });
  } catch (error) {
    console.error("Failed to confirm order status:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { createNewOrder, getCustomerOrders, getAllOrders, confirmOrder };