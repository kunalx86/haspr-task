const yup = require("yup");

// TODO: Add appropriate regex
const RegisterSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});

module.exports = {
  register: RegisterSchema
}