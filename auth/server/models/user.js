const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Encrypt
userSchema.pre('save', function(next){
  const user = this;
  // Generate salt
  bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err); }

    // Hash password
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){ return next(err); }

      user.password = hash;
      next();
    });
  });
});

// Compare Password helper
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) { return callback(err); }
    callback(null, isMatch);
  });
}

// Create
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;