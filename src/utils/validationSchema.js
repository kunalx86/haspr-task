const yup = require("yup");

// TODO: Add appropriate regex
const RegisterSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});


const UserInfoSchema = yup.object().shape({
  key: yup.string().required("Key is required"),
  value: yup.string().required("Value is required")
});

const UserInfoListSchema = yup.object().shape({
  data: yup.array().of(
    UserInfoSchema
  ).min(1).required("Data list is required"),
})

module.exports = {
  register: RegisterSchema,
  userInfo: UserInfoListSchema,
  userInfoModify: UserInfoSchema
};