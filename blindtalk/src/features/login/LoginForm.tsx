import { Formik, Form, Field } from "formik";
import { AuthData } from "../../types";

type Props = {
  onLogin: ({ email, password }: AuthData) => void;
};

interface MyFormValues {
  email: string;
  password: string;
}

export const LoginForm = ({ onLogin }: Props) => {
  const initialValues: MyFormValues = { email: "", password: "" };
  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={initialValues}
        onSubmit={({ email, password }) => {
          onLogin({ email, password });
        }}
      >
        <Form className="box-border h-50 w-50 p-4 border-2 rounded-md bg-basic-gray-5">
          <h1 className="text-center mb-2">Welcome back!</h1>
          <div className="mb-2">
            <div className="mb-1">
              <label htmlFor="email" className="mr-1">
                Email
              </label>
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className="bg-gray-5"
              />
            </div>
            <div>
              <label htmlFor="password" className="mr-1">
                Password
              </label>
              <Field
                id="password"
                name="password"
                placeholder="Password"
                className="bg-gray-5"
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit">Sing in</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
