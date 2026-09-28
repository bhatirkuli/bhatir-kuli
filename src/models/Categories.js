import mongoose from "mongoose";
import { slugify } from "../lib/slugify.js";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: "",
    },
    // Populated by the Cloudinary upload flow (Module 5). Left as a plain
    // object now so the schema shape doesn't need to change later.
    image: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
  },
  { timestamps: true }
);

// Auto-generate the slug from the name, but only if one wasn't already set.
// Existing slugs are never silently overwritten on update — a category
// that's already linked/bookmarked keeps working even if its name changes.
CategorySchema.pre("validate", function generateSlug() {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
});

CategorySchema.index({ slug: 1 }, { unique: true });

// Prevents Mongoose from redefining the model on every hot reload in dev.
export default mongoose.models.Category || mongoose.model("Category", CategorySchema);