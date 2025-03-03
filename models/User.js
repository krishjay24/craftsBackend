const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Direction",
      "Screenplay Writing",
      "Cinematography",
      "Editing",
      "Sound Recording",
      "Sound Design",
      "Music Direction",
      "Lyric Writing",
      "Playback Singing",
      "Art Direction",
      "Production Design",
      "Costume Design",
      "Make-up",
      "Choreography",
      "Stunt Direction",
      "Special Effects",
      "Background Score",
      "Dialogue Writing",
      "Still Photography",
      "Publicity Design",
      "Dubbing",
      "Laboratory Processing",
      "Animation",
      "Film Criticism",
    ],
  },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
