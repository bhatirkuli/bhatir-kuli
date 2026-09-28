import mongoose from "mongoose";
import { slugify } from "../lib/slugify.js";

// Flexible key-value specs: { key: "Power", value: "5 HP" }, etc.
// An array of {key, value} pairs (rather than a Mongoose Map) so it
// serializes to plain, predictable JSON with no special handling needed
// on the client, and preserves the order the admin entered them in.
const SpecificationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Specification key is required"],
      trim: true,
      maxlength: [100, "Specification key cannot exceed 100 characters"],
    },
    value: {
      type: String,
      required: [true, "Specification value is required"],
      trim: true,
      maxlength: [300, "Specification value cannot exceed 300 characters"],
    },
  },
  { _id: false }
);

// Populated by the Cloudinary upload flow (Module 5).
const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: null },
    alt: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters"],
      default: "",
    },
    specifications: {
      type: [SpecificationSchema],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    images: {
      type: [ImageSchema],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Lets staff hide a product from the storefront without deleting it
    // (and losing its order history / references). No UI for this yet.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Same slug policy as Category: generate once from the title if missing,
// never auto-overwrite an existing slug on update.
ProductSchema.pre("validate", function generateSlug() {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
});

// Indexes chosen for the access patterns this catalog will actually need:
ProductSchema.index({ slug: 1 }, { unique: true }); // product detail page lookup
ProductSchema.index({ category: 1 }); // "products in category X"
ProductSchema.index({ isActive: 1, category: 1 }); // storefront browsing (active only)
ProductSchema.index({ price: 1 }); // sort/filter by price
ProductSchema.index({ title: "text", description: "text" }); // groundwork for the Search module

// Prevents Mongoose from redefining the model on every hot reload in dev.
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);