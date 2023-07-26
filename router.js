const express = require("express");

const router = express.Router();
// import all controllers
const auth = require("../controllers/AuthController");
const blog = require("../controllers/BlogController");
const users = require("../controllers/UsersController.js");
const products = require("../controllers/ProductController");
const invoices = require("../controllers/InvoicesController");

const publicAuth = require("../middleware/public-auth");
const privateAuth = require("../middleware/private-auth");
const upload = require("../middleware/multer");

/******************** AUTH CONTROLLER ROUTES ***********************/

// user login
router.post("/auth/login", auth.userLogin);

// create new user
router.post("/auth/register", auth.userRegister);

// send sms
router.post("/auth/sms_send", auth.userSendSms);

// check and verify sms
router.post("/auth/sms_verify", auth.userCheckSms);

/******************** USER CONTROLLER ROUTES ***********************/
// get all users
router.get("/users", privateAuth, users.getUsers);

// get user by id
router.get("/users/:id", publicAuth, users.getUserById);

// update/edit  existing user
router.put("/users/:id", privateAuth, users.updateUser);

// update user shopping cart
router.put("/cart/user", publicAuth, users.updateUserCart);

// delete user
router.delete("/users/:id", privateAuth, users.deleteUser);

// get user by token
router.get("/token", publicAuth, users.getUserByToken);

// dev only : delete all users
router.delete("/users/", users.deleteAllUsers);

/******************** PRODUCT CONTROLLER ROUTES ***********************/

// get all products

router.get("/products", products.getProducts);

//
router.get("/products/:id", products.getProductsById);

// get products by category
router.get("/products/:category", products.getProductsByCategory);
// add product
router.post(
  "/products/add",
  upload.array("images_files", 5),
  products.addProduct
);

// Dev only : delete all users

router.delete("/products/", products.deleteAllProducts);

// shopping Cart :

router.get("/cart/check", products.checkCart);
router.post("/cart/add", products.addToCart);
// router.post("/cart/subtract", products.subtractFromCart);
router.post("/cart/remove", products.removeFromCart);

// product edit

/******************** INVOICES CONTROLLER ROUTES ***********************/

// create new invoice
router.post("/invoices/new", invoices.newInvoice);

// get invoice by id
router.get("/invoices/:id", invoices.getInvoicesById);

// delete invoice with id
router.delete("/invoices/:id", invoices.deleteInvoice);

// update invoice by id
router.put("/invoices/:id", invoices.updateInvoice);

/******************** BLOG CONTROLLER ROUTES ***********************/

router.get("/blog", blog.getAllBlogs);
router.get("/blog/:id", blog.getBlogById);
router.post("/blog/add", upload.array("images_files", 1), blog.newBlog);

module.exports = router;
