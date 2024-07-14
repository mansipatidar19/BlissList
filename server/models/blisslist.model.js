import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  affirmation: {
    type: String,
    default:
      "I have completed this task before time.",
  },
  gratitude: {
    type: String,
    default:
      "Thank you to the Universe for giving me the chance to do this task!",
  },
  completed: { 
    type: Boolean,
    default: false,
  },
  taskby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: "24h" },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// Middleware to update the updatedAt field on save
listSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const ListModel = mongoose.model("ListModel", listSchema);
