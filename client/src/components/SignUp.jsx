import React from "react";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import axios from "axios";

const onSubmit = (values) => {
  axios
    .post("http://localhost:5000/user", values)
    .then((data) => {
      //this console.log will be in our frontend console
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const SignUp = () => {
  return (
    <div className="wrapper signUp">
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="first_name">
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      {...input}
                      id="first_name"
                      placeholder="First Name"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="last_name">
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      {...input}
                      id="last_name"
                      placeholder="Last Name"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="phone_number">
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      {...input}
                      id="Phone Number"
                      placeholder="Phone Number"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      {...input}
                      id="Email"
                      placeholder="Email"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="text"
                      {...input}
                      id="password"
                      placeholder="Password"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="confirm_password">
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="confirm_password">Password</label>
                    <input
                      type="text"
                      {...input}
                      id="confirm_password"
                      placeholder="Confirm Password"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <button type="submit">Submit</button>
            </form>
          )}
        />
        <p>
          Have an account ? <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
