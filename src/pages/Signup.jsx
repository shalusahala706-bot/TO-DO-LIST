import { Formik, Field, Form } from "formik";
import "./Signup.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validateSchema =Yup.object().shape({
    email: Yup.string()
    .email("invalid email")
    .required("email must be required"),
    password:Yup.string()
    .min(6,"password must ne atleast 6 characters")
    .required("password mustbe requied")
})

const Signup = () => {
  const navigate=useNavigate()
  return (
    <div className="containers">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validateSchema}

        onSubmit={(values) => {
          const users = JSON.parse(localStorage.getItem("users"))||[];

          users.push(values);
          localStorage.setItem("users",JSON.stringify(users));

          navigate('')
        }}
      >
        {({ errors, touched }) => (
        <Form>
          <div className="input">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="shalu@shaas.com"
              type="email"
            />
            {errors.email && touched.email ? (
              <div>{errors.email}</div>
            ) : null}
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="******"
              type="password"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className="button">Signup</button>
          <br /><br />
          <button className="button">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Signup;
