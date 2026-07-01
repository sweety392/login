import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  image: String,
  buttonText: String,
  buttonLink: String,
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Banner =
  mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;