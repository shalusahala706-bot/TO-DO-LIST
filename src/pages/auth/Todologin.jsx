import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Todologin.css";
import { login } from "../../services/authService";
import * as Yup from "yup";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .required("password is required"),
});

const Todologin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}

          onSubmit={async (values) => {
            try {
              await login(values);
              alert("Login successfull");
              navigate ("/home");
            } catch (error) {
              alert (error.response?.data?.message ||"Login Failed")
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-input"
                  />
                </div>
                {errors.email && touched.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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

              <button type="submit" className="submit-button">
                Login
              </button>
              <div className="signup-link-group">
                <span>Don't have an account?</span>
                <Link to="/signup" className="signup-link">
                  Sign up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Todologin;
