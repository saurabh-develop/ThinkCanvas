import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema({
  userId: String,
  name: String,
  canvasData: String,
  width: Number,
  height: Number,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Design = mongoose.models.Design || mongoose.model("Design", DesignSchema);
<<<<<<< HEAD

export default Design;
=======
module.exports = Design;
>>>>>>> 7c9b44c35740188387cf259e2aabab1bb92d876d
