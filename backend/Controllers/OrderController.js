const catchAsyncError = require("../Middleware/catchAsyncError");
const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandle");

//create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "orderItems",
    populate: {
      path: "product",
      select: "images.url",
    },
  });
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged user orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    order,
  });
});

// get all order --admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((e) => {
    totalAmount += e.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("order not found with this Id", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next("You have already delivered this product");
  }
  order.orderItems.forEach(async (e) => {
    await updateStock(e.product, e.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}
//delete order - admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("order not found with this Id", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});
