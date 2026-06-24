import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Todologin.css";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email must be required"),
  password: Yup.string()
    .min(6, "password must ne atleast 6 characters")
    .required("password mustbe requied"),
});

const Todologin = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="overlay"></div>

      <nav className="navbar">
        <div className="logo">TODO</div>
      </nav>

      <div className="login-main">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const existingUsers =
              JSON.parse(localStorage.getItem("users")) || [];

            const user = existingUsers.find((u) => u.email === values.email);

            if (!user) {
              alert("Email does not exist");
              return;
            }

            if (user.password !== values.password) {
              alert("Incorrect password");
              return;
            }

            alert("Login successful");
            navigate("/home");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="input">
                <label>Email</label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div className="input">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
              <div className="end">
                <span>Don't have an account?</span>
                <Link to="/Signup">Register</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Todologin;
