import Product from "../Models/Product.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "../Utils/Email.js";
import User from "../Models/User.js";
import EmailData from "../Utils/EmailText.json" assert { type: "json" };
import Order from "../Models/Order.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "../Utils/Uploads.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function singleupdateOrder(updateOrder) {
  try {
    const updatedProduct = await Order.findByIdAndUpdate(
      updateOrder._id,
      updateOrder,
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Order not found or update failed.");
    }
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
const addNewProduct = async (req, res) => {
  try {
    const {
      posterId,
      title,
      price,
      color,
      category,
      condition,
      rooms,
      model,
      description,
      dimension,
      location,
      pickUpSlots,
      mainImageIndex, 
    } = req.body;

    console.log("Received new product data:", req.body);

    if (!posterId) {
      return res
        .status(400)
        .json({ message: "Please login first or user id not found." });
    }

    if (!title || !price || !color || !category) {
      return res
        .status(400)
        .json({ message: "Missing required product details." });
    }

    const existingProduct = await Product.findOne({ title, deleted: false });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product with the same name already exists.",
      });
    }

    if (
      !req.files ||
      Object.keys(req.files).length < 1 ||
      Object.keys(req.files).length > 5
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload 1 to 5 images." });
    }

    console.log("Files to upload:", req.files);

    const filesArray = Array.isArray(req.files.imageNames)
      ? req.files.imageNames
      : [req.files.imageNames];

    const uploadPromises = filesArray.map((file) => {
      return cloudinary.uploader.upload(file.tempFilePath, {
        folder: "product_images",
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    let parsedDimension, parsedLocation, parsedPickUpSlots;
    try {
      parsedDimension = JSON.parse(dimension);
    } catch (error) {
      console.error("Error parsing dimension:", error);
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid JSON format in dimension field.",
        });
    }

    try {
      parsedLocation = JSON.parse(location);
    } catch (error) {
      console.error("Error parsing location:", error);
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid JSON format in location field.",
        });
    }

    if (pickUpSlots && pickUpSlots !== "undefined") {
      try {
        parsedPickUpSlots = JSON.parse(pickUpSlots);
      } catch (error) {
        console.error("Error parsing pickUpSlots:", error);
        return res
          .status(400)
          .json({
            success: false,
            message: "Invalid JSON format in pickUpSlots field.",
          });
      }
    } else {
      parsedPickUpSlots = []; // default to an empty array if pickUpSlots is 'undefined' or not provided
    }

    const mainImageUrl = imageUrls[mainImageIndex] || imageUrls[0]; // Set main image URL based on the index

    const newProduct = new Product({
      posterId,
      title,
      price,
      color,
      imageNames: imageUrls,
      mainImage: mainImageUrl, // Use the main image URL
      category,
      condition,
      rooms,
      model,
      description,
      dimension: parsedDimension,
      location: parsedLocation,
      pickUpSlots: parsedPickUpSlots,
    });

    // Log the new product object for verification
    console.log("New product object:", newProduct);

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating new product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({ deleted: false });
    if (allProducts) {
      res.status(200).json({ message: "All Products", allProducts });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getProductsByUserId = async (req, res) => {
  try {
    const { posterId } = req.params;
    if (posterId) {
      const myProducts = await Product.find({ posterId, deleted: false });
      if (myProducts.length) {
        res.status(200).json({
          success: 1,
          message: "User's All Products",
          totalCount: myProducts?.length,
          myProducts,
        });
      } else {
        res.status(200).json({ success: 0, message: "No data Found" });
      }
    } else {
      res.status(200).json({ success: 0, message: "user id not Found" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};

const getAllApprovedProducts = async (req, res) => {
  try {
    const approvedProducts = await Product.find({
      status: { $in: ["approved", "preApproved", "deliveryNotApproved"] },
      deleted: false,
    }).sort({ createdAt: -1 });
    if (approvedProducts?.length) {
      res.status(200).json({
        success: 1,
        message: "All Approved Products",
        approvedProducts,
      });
    } else {
      res.status(200).json({ success: 0, message: "No data Found" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};

const getAllPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({
      status: "pending",
      deleted: false,
    });
    if (pendingProducts?.length) {
      res
        .status(200)
        .json({ success: 1, message: "All Pending Products", pendingProducts });
    } else {
      res.status(200).json({ success: 0, message: "No data Found" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};

const getProductsHistory = async (req, res) => {
  try {
    const historyProducts = await Product.find({
      status: { $in: ["approved", "preApproved", "declined"] },
      deleted: false,
    }).sort({ createdAt: -1 });
    if (historyProducts?.length) {
      res
        .status(200)
        .json({ success: 1, message: "All Products History", historyProducts });
    } else {
      res.status(200).json({ success: 0, message: "No data Found" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};
const deleteProductsHistory = async (req, res) => {
  try {
    let checkProduct = await Product.findOne({
      _id: req.params.id,
      deleted: false,
    });

    if (!Product) {
      return res.status(400).json({
        message: `Product with the name  does not exist `,
      });
    }

    // Soft delete the role by updating the 'deleted' key to true
    checkProduct.deleted = true;
    await checkProduct.save();

    return res.status(200).json({
      data: checkProduct,
      message: `Product  has been  deleted successfully`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
const getSoldProducts = async (req, res) => {
  try {
    const soldProducts = await Product.find({
      status: { $in: ["sold"] },
      deleted: false,
    }).sort({ createdAt: -1 });
    if (soldProducts?.length) {
      res
        .status(200)
        .json({ success: 1, message: "All Sold Products", soldProducts });
    } else {
      res.status(200).json({ success: 0, message: "No data Found" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { id, status, imageNames } = req.body;
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid product ID." });
    }
    if (!["approved", "declined", "preApproved"].includes(status)) {
      return res.status(400).json({
        success: 0,
        message:
          "Invalid status. Valid values( approved, preApproved & declined)",
      });
    }
    const product = await findProductById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: 0, message: "Product not found." });
    }
    product.status = status;

    if (status === "approved" && !imageNames) {
      imageNames = product.imageNames;
    }

    if (imageNames) {
      product.imageNames = imageNames; // This should update the imageNames field
    }
    const updatedProduct = await updateProduct(product);

    const user = await findUserById(updatedProduct.posterId);
    if (!user) {
      console.log("User who posted that product not found.");
    }
    if (process.env.SMTP2GO_API_KEY) {
      if (updatedProduct?.status === "approved") {
        await sendEmail({
          updatedProduct,
          user,
          emailSubject: "Product Review Status",
          emailMsg: EmailData?.pendingToApproved,
        });
      }
      if (updatedProduct?.status === "declined") {
        const updatedPendingToDeclinedEmailMsg = {
          ...EmailData?.pendingToDeclined,
          "2ndText": `Reason not justified <br>`,
        };
        await sendEmail({
          updatedProduct,
          user,
          emailSubject: "Product Review Status",
          emailMsg: updatedPendingToDeclinedEmailMsg,
        });
      }
    } else {
      console.warn("SMTP2GO API key not found. Email sending disabled.");
    }
    res.status(200).json({
      success: 1,
      message: `Product status updated to: ${status}`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid product ID." });
    }

    const productData = req.body;

    const product = await findProductById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: 0, message: "Product not found." });
    }

    let imageUrls = product.imageNames || [];
    let mainImageUrl = product.mainImage;

    if (productData.removeImages) {
      const imagesToRemove = productData.removeImages.split(",");
      imageUrls = imageUrls.filter((image) => !imagesToRemove.includes(image));
    }

    // Handle new image uploads
    if (req.files && Object.keys(req.files).length > 0) {
      const uploadPromises = Object.values(req.files).map((file) => {
        return cloudinary.uploader.upload(file.tempFilePath, {
          folder: "product_images",
        });
      });

      const uploadResults = await Promise.all(uploadPromises);
      const newImageUrls = uploadResults.map((result) => result.secure_url);
      imageUrls = [...imageUrls, ...newImageUrls];

      // If mainImage is uploaded, update mainImageUrl
      if (req.files.mainImage) {
        const mainImageResult = uploadResults.find(result => result.original_filename === req.files.mainImage.originalname);
        if (mainImageResult) {
          mainImageUrl = mainImageResult.secure_url;
        }
      }
    }

    if (productData.imageOrder) {
      const newOrder = productData.imageOrder.map(Number);
      const reorderedImages = [];
      newOrder.forEach((index) => {
        reorderedImages.push(imageUrls[index]);
      });
      imageUrls = reorderedImages;
    }
    productData.imageNames = imageUrls;

    // Handle the main image if it's provided as a URL reference
    if (productData.mainImage && !req.files.mainImage) {
      mainImageUrl = productData.mainImage;
    }

    // Set the main image URL in product data
    productData.mainImage = mainImageUrl;

    // Handle other fields (dimension and location)
    if (productData.dimension) {
      productData.dimension = JSON.parse(productData.dimension);
    }

    if (productData.location) {
      productData.location = JSON.parse(productData.location);
    }

    // Update nested fields
    updateNestedFields(product, productData);

    const updatedProduct = await updateProduct(product);
    const user = await findUserById(updatedProduct.posterId);

    if (!user) {
      console.log("User who posted that product not found.");
    }

    if (process.env.SMTP2GO_API_KEY) {
      let fourthTextField;

      if (updatedProduct?.status === "approved") {
        if (updatedProduct?.pickUpSlots?.length) {
          function formatDateAndTime(dateTime) {
            const date = new Date(dateTime.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const time = dateTime.time;
            return `${date}, Time Slot: ${time}`;
          }

          fourthTextField = updatedProduct?.pickUpSlots
            ?.map((dateTime) => formatDateAndTime(dateTime))
            ?.join("<br>");

          const updatedPendingToApprovedEmailMsg = {
            ...EmailData?.pendingToApproved,
            "4thText": fourthTextField,
          };

          await sendEmail({
            updatedProduct,
            user,
            emailSubject: "Product Review Status",
            emailMsg: updatedPendingToApprovedEmailMsg,
          });
        } else {
          fourthTextField = "No pick up slot added <br>";
          const updatedPendingToApprovedEmailMsg = {
            ...EmailData?.pendingToApproved,
            "4thText": fourthTextField,
          };

          await sendEmail({
            updatedProduct,
            user,
            emailSubject: "Product Review Status",
            emailMsg: updatedPendingToApprovedEmailMsg,
          });
        }
      }

      if (updatedProduct?.status === "preApproved") {
        await sendEmail({
          updatedProduct,
          user,
          emailSubject: "Product Review Status",
          emailMsg: EmailData?.pendingToPreApproved,
        });
      }

      if (updatedProduct?.status === "declined") {
        const updatedPendingToDeclinedEmailMsg = {
          ...EmailData?.pendingToDeclined,
          "2ndText": `${
            updatedProduct?.reason
              ? updatedProduct?.reason
              : "Reason not justified"
          }<br>`,
        };

        await sendEmail({
          updatedProduct,
          user,
          emailSubject: "Product Review Status",
          emailMsg: updatedPendingToDeclinedEmailMsg,
        });
      }
    } else {
      console.warn("SMTP2GO API key not found. Email sending disabled.");
    }

    res.status(200).json({
      success: 1,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    if (req.files) {
      req.files.forEach((file) => fs.unlinkSync(file.path));
    }
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};

const confirmProductPayment = async (req, res) => {
  try {
    const { id, status, customerId, deliverySlots } = req.body;
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid product ID." });
    }
    if (!["sold"].includes(status)) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid status. Valid status( sold )" });
    }
    const product = await findProductById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: 0, message: "Product not found." });
    }


    
    product.status = "deliveryApproved";
    const updatedProduct = await updateProduct(product);
    if (product?.isPreApproved) {
      const productOwner = await findUserById(product.posterId);
      if (productOwner) {
        // Send email to product owner
        if (process.env.SMTP2GO_API_KEY) {
          if (product?.pickUpSlots?.length) {
            function formatDateAndTime(dateTime) {
              const date = new Date(dateTime.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const time = dateTime.time;
              return `${date}, Time Slot: ${time}`;
            }
            const fourthTextField = product?.pickUpSlots
              ?.map((dateTime) => formatDateAndTime(dateTime))
              ?.join("<br>");
            const updatedPreApprovedToDeliveryApprovedEmailMsg = {
              ...EmailData?.preApprovedToApproved,
              "4thText": fourthTextField,
            };
            await sendEmail({
              product: {},
              user: productOwner,
              emailSubject: "Pre Approved Product update",
              emailMsg: updatedPreApprovedToDeliveryApprovedEmailMsg,
            });
          }
        } else {
          console.log("SMTP2GO API key not found. Email sending disabled.");
        }
      } else {
        console.log(`Product owner not found with ID ${product.posterId}.`);
      }
    }
    const user = await findUserById(customerId);
    if (!user) {
      console.log("customer not found for this order.");
    }
    if (process.env.SMTP2GO_API_KEY) {
      if (deliverySlots?.length) {
        function formatDateAndTime(dateTime) {
          const date = new Date(dateTime.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const time = dateTime.time;
          return `${date}, Time Slot: ${time}`;
        }
        const fourthTextField = deliverySlots
          ?.map((dateTime) => formatDateAndTime(dateTime))
          ?.join("<br>");
        const updatedSoldToDeliveryApprovedEmailMsg = {
          ...EmailData?.statusSoldTodeliveryApproved,
          "4thText": fourthTextField,
        };
        await sendEmail({
          updatedProduct,
          user,
          emailSubject: "Product Delivery",
          emailMsg: updatedSoldToDeliveryApprovedEmailMsg,
        });
      }
    }
    res.status(200).json({
      success: 1,
      message: `Product status updated successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};
const declineProductPayment = async (req, res) => {
  try {
    const { id, status, customerId, deliverySlots } = req.body;
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid product ID." });
    }
    if (!["sold"].includes(status)) {
      return res
        .status(400)
        .json({ success: 0, message: "Invalid status. Valid status( sold )" });
    }
    const product = await findProductById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: 0, message: "Product not found." });
    }
    const order = await findOrderById(req.body.order_id);
    if (!order) {
      return res.status(404).json({ success: 0, message: "Order not found." });
    }
    order.orderStatus = "decline";
    product.status = "deliveryNotApproved";

    console.log(product);
    const updateOrder = await singleupdateOrder(order);
    const updatedProduct = await updateProduct(product);
    const user = await findUserById(customerId);
    if (!user) {
      console.log("customer not found for this order.");
    }
    if (process.env.SMTP2GO_API_KEY) {
      if (deliverySlots?.length) {
        function formatDateAndTime(dateTime) {
          const date = new Date(dateTime.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const time = dateTime.time;
          return `${date}, Time Slot: ${time}`;
        }

        const updatedSoldToDeliveryApprovedEmailMsg = {
          "1stText": `We regret to inform you that your recent order with 24möbler has been declined due to one of the following reasons: <br>`,
          "2ndtText": `<b>•</b> <b>Payment Not Received</b>: We have not received the payment for your order. Please ensure that your payment is completed to proceed with the order. <br>`,
          "3rdText": `<b>•</b> <b>Item Unavailable</b>: Unfortunately, the item you ordered is currently unavailable. We apologize for any inconvenience this may cause. <br>`,
          "4thText": `<b>•</b> <b>Delivery Slot Unavailable</b>: We are unable to deliver your order in the available delivery slots. We apologize for the inconvenience and appreciate your understanding. <br>`,
          "5thText": `If you have any questions or need further assistance, please feel free to contact our customer support team via <a href="info@24mobler.se">info@24mobler.se</a> <br>`,
          "6thText": `Thank you for considering 24möbler for your furniture needs. We hope to serve you in the future <br>`,
          "7thText": `Best regards, <br>`,
          "8thText": `The 24möbler Team <br>`,
        };
        await sendEmail({
          updatedProduct,
          user,
          emailSubject: "Product Delivery",
          emailMsg: updatedSoldToDeliveryApprovedEmailMsg,
        });
      }
    }
    res.status(200).json({
      success: 1,
      message: `Product status updated successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: 0, message: "Internal server error." });
  }
};
async function findProductById(productId) {
  try {
    const product = await Product.findOne({ _id: productId, deleted: false });
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function findOrderById(orderId) {
  try {
    const order = await Order.findOne({ _id: orderId });
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findUserById(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateProduct(product) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      product,
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Product not found or update failed.");
    }
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function updateNestedFields(target, source) {
  if (source === undefined || source === null) {
    return; // Handle undefined or null source values
  }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (typeof sourceValue === "object" && !Array.isArray(sourceValue)) {
        // Nested object: Merge recursively
        target[key] = targetValue !== undefined ? targetValue : {};
        updateNestedFields(target[key], sourceValue);
      } else if (Array.isArray(sourceValue)) {
        // Array: Replace with a copy (avoid mutations)
        target[key] = [...sourceValue];
      } else {
        // Other data types: Assign directly
        target[key] = sourceValue;
      }
    }
  }
}

export {
  addNewProduct,
  getAllProducts,
  getProductsByUserId,
  getAllApprovedProducts,
  getAllPendingProducts,
  getProductsHistory,
  updateProductById,
  updateProductStatus,
  getSoldProducts,
  confirmProductPayment,
  declineProductPayment,
  deleteProductsHistory,
};
