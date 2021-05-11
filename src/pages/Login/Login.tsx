import React, { FunctionComponent, useState } from "react";
import UserAPI from "../../api/user";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useApp } from "../../context/app-context";

const Login: FunctionComponent = () => {
  const { authenticated } = useApp();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = React.useState<string>("");

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    try {
      const user = await UserAPI.login(email, password);

      if (user) {
        authenticated(user);
      } else {
        setErrors("invalid");
      }
    } catch (e) {
      setErrors(e.message);
    }
  };
  return (
    <div className="fit-60 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {errors && (
          <div className="font-medium text-red-600">
            Invalid email and password.
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input
                id="email-address"
                label="Email address"
                type="email"
                name="email"
                placeholder="Email address"
                onChange={setEmail}
              />
            </div>
            <div>
              <Input
                id="password"
                label="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={setPassword}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={!(email.length || password.length < 4)}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
