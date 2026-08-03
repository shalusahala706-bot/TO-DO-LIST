import { Formik, Field, Form } from "formik";
import "./Signup.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import TechBtn from "../component/Button";

const validateSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .required("password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validateSchema}
          onSubmit={(values) => {
            signup(values);
            navigate("/");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <Field
                    name="name"
                    placeholder="Name"
                    type="text"
                    className="form-input"
                  />
                </div>
                {errors.name && touched.name ? (
                  <div className="error-message">{errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <Field
                    name="email"
                    placeholder="E-mail"
                    type="email"
                    className="form-input"
                  />
                </div>
                {errors.email && touched.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <Field
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="eye-icon" />
                    ) : (
                      <FiEye className="eye-icon" />
                    )}
                  </button>
                </div>
                {errors.password && touched.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </div>

              <TechBtn type="submit" text="CREATE AN ACCOUNT" />

              {/* <button type="submit" className="submit-button">
                CREATE ACCOUNT
              </button> */}

              <div className="login-link-group">
                <span>Already have an account?</span>
                <Link to="/" className="login-link">
                  Sign in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
