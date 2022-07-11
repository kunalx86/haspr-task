const { register } = require("../utils/validationSchema");

const validator = (type) => {
  let validator = null;
  switch (type) {
    // Both login and register can use same schema
    case "login":
      validator = register;
      break;
    case "register":
      validator = register; 
      break;
    default:
      throw new Error("Validator type not recognized");
  }

  return async (req, res, next) => {
    try {
      await validator.validate(req.body, { earlyAbort: false });
      next();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = {
  validator
};