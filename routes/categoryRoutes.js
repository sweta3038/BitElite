import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  categoryPhotoController,
  createCategoryController,
  deleteCategoryCOntroller,
  getCategoryById,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";
//added
import formidable from "express-formidable";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  //added
  formidable(),
  createCategoryController
);

//get category by id
router.get('/get-category/:id', getCategoryById);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

router.get("/category-photo/:cid", categoryPhotoController);

export default router;
