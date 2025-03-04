// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   category: {
//     type: String,
//     required: true,
//     enum: [
//       "Direction",
//       "Screenplay Writing",
//       "Cinematography",
//       "Editing",
//       "Sound Recording",
//       "Sound Design",
//       "Music Direction",
//       "Lyric Writing",
//       "Playback Singing",
//       "Art Direction",
//       "Production Design",
//       "Costume Design",
//       "Make-up",
//       "Choreography",
//       "Stunt Direction",
//       "Special Effects",
//       "Background Score",
//       "Dialogue Writing",
//       "Still Photography",
//       "Publicity Design",
//       "Dubbing",
//       "Laboratory Processing",
//       "Animation",
//       "Film Criticism",
//     ],
//   },
//   mobile: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   gender: { type: String, required: true, enum: ["Male", "Female", "Others"] },
//   age: { type: Number, required: true },
//   height: { type: String, required: true }, // Height can be in feet/inches or cm
//   color: { type: String, required: true }, // Skin complexion
//   weight: { type: String, required: true }, // Weight can be in kg/lbs
//   youtubeLink: { type: String },
//   facebookLink: { type: String },
//   instagramLink: { type: String },
//   category: {
//     type: String,
//     required: true,
//     enum: [
//       "Actors", "Actresses", "Directors", "Producers", "Music Directors", "Dubbing Artists", 
//       "Camera & DOP", "Editors", "Cinematographers", "Singers", "Art Directors", 
//       "Choreographers & Dancers", "Still Photographers", "Casting Coordinators", 
//       "Costume Designers", "Makeup Artists", "Hair Stylists", "Visual Effects Supervisors", 
//       "Special Effects Coordinators", "Unit Production Managers", "Lightmen", "Lyricists", 
//       "Screenplay & Story Writers", "Set Property/Decorators", "Production Managers", 
//       "Mimicry Artists", "Location Managers", "Stunt Directors/Masters"
//     ],
//   },
//   subcategory: { 
//     type: String, 
//     required: false, 
//     enum: [
//       "Lead Actor", "Supporting Actor", "Child Actor", "Villain", // Subcategories for Actors
//       "Lead Actress", "Supporting Actress", "Child Actress", "Villain", // Subcategories for Actresses
//       "Film Director", "Assistant Director", "Casting Director", "Co-Director", // Directors
//       "Executive Producer", "Associate Producer", "Line Producer", // Producers
//       "Composer", "Arranger", "Music Programmer", "Orchestrator", // Music Directors
//       "Dubbing Artist", "Translator", "Voice Modulator", // Dubbing Artists
//       "Cinematographer", "Camera Operator", "Drone Operator", // Camera & DOP
//       "Video Editor", "Sound Editor", "VFX Editor", "Colorist", // Editors
//       "Still Photographer", "Event Photographer", "Fashion Photographer", // Photographers
//       "Costume Designer", "Wardrobe Stylist", "Fashion Consultant", // Costume Designers
//       "Makeup Artist", "Special Effects Makeup", "Cosmetologist", // Makeup Artists
//       "Hair Stylist", "Hair Colorist", "Wig Specialist", // Hair Stylists
//       "VFX Supervisor", "Compositor", "CGI Artist", // VFX Supervisors
//       "Special Effects Coordinator", "Stunt Coordinator", "FX Engineer", // Special Effects
//       "Unit Production Manager", "Location Manager", "Production Coordinator", // Production
//       "Lighting Technician", "Gaffer", "Best Boy Electric", // Lightmen
//       "Lyricist", "Songwriter", "Poet", // Lyricists
//       "Screenplay Writer", "Dialogue Writer", "Story Writer", // Screenplay & Story Writers
//       "Set Decorator", "Prop Master", "Set Designer", // Set Property/Decorators
//       "Mimicry Artist", "Voice Over Artist", "Impressionist", // Mimicry Artists
//       "Fight Choreographer", "Stunt Performer", "Action Director" // Stunt Directors/Masters
//     ],
//   },
//   mobile: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Others"] },
  age: { type: Number, required: true },
  height: { type: String, required: true },
  color: { type: String, required: true },
  weight: { type: String, required: true },
  youtubeLink: { type: String },
  facebookLink: { type: String },
  instagramLink: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", default: null },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false } // 🛑 Admin Field Added
});

module.exports = mongoose.model("User", userSchema);
