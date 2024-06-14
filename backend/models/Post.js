var mongoose = require("mongoose");

var postSchema = mongoose.Schema(
    {
        // @AssetPlus: Describe schema here
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Post", postSchema)