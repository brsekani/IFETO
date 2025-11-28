import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordMessage =
  "Password must be 8+ chars and include upper, lower, number & special character.";

export const SignupSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
});

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
});

export const VerifyCodeSchema = Yup.object({
  code1: Yup.string().required("").matches(/^\d$/, ""),
  code2: Yup.string().required("").matches(/^\d$/, ""),
  code3: Yup.string().required("").matches(/^\d$/, ""),
  code4: Yup.string().required("").matches(/^\d$/, ""),
  code5: Yup.string().required("").matches(/^\d$/, ""),
  code6: Yup.string().required("").matches(/^\d$/, ""),
}).test(
  "all-digits",
  "Please enter a valid 6-digit verification code",
  function (values) {
    if (!values) return false;
    const codes = [
      values.code1,
      values.code2,
      values.code3,
      values.code4,
      values.code5,
      values.code6,
    ];
    return codes.every((code) => code && /^\d$/.test(code));
  }
);
