const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewDescriptionSchema = new Schema(
  {
    header: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NewDescription = mongoose.model("NewDescription", NewDescriptionSchema);

module.exports = NewDescription;
