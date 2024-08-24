import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:5000/login", values, { withCredentials: true })
      .then((data) => {
        navigate(`/${data.data.id}/products`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="wrapper signIn">
      <div className="form">
        <div className="heading">LOGIN</div>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <label htmlFor="e-mail">Email</label>
                    <input
                      type="text"
                      {...input}
                      id="email"
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
                      placeholder="Email"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <button type="submit">Login</button>
            </form>
          )}
        />
        <p>
          Don't have an account ? <Link to="/signup"> Sign In </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
