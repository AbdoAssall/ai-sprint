import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../components/common/forms/Form";
import FormInput from "../../components/common/forms/FormInput";
import Button from "../../components/common/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loginUser } from "../../features/auth/authActions";
import { clearError } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user, token } = useAppSelector(
    (state) => state.auth,
  );

  // Redirect if already logged in
  useEffect(() => {
    if (user && token) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, token, navigate]);

  // Clear errors on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right", autoClose: 5000 });
    }
  }, [error]);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const loginPromise = dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      }),
    ).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        return result;
      } else {
        throw new Error("Login failed");
      }
    });

    toast.promise(loginPromise, {
      pending: "Signing you in...",
      success: "Welcome back! Redirecting to dashboard...",
      error: "Invalid email or password",
    });

    loginPromise.then(() => {
      setTimeout(() => navigate("/dashboard"), 1000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">✨</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in to AI-Sprint to continue
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <FormInput
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              placeholder="you@company.com"
              type="email"
            />
            <FormInput
              label="Password"
              name="password"
              register={register}
              error={errors.password}
              placeholder="Enter your password"
              type="password"
            />
            <Button
              type="submit"
              label={isLoading ? "Signing in..." : "Sign in"}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
            />
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-lg">G</span>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-lg">⚙</span>
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
