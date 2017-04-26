import bcrypt from 'bcryptjs';

module.exports = {

  encodePassword: function(submittedPassword) {
    return bcrypt.hashSync(submittedPassword, 10);
  },

  validatePassword: function(submittedPassword, hashedPassword) {
    return bcrypt.compareSync(submittedPassword, hashedPassword);
  }

};
