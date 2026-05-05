import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/common/forms/Form";
import FormInput from "../../components/common/forms/FormInput";
import Button from "../../components/common/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { registerUser } from "../../features/auth/authActions";
import { clearError } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const registerSchema = z
  .object({
    username: z.string().min(2, "Full name must have at least 2 characters"),
    email: z.string().email("Email is invalid"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
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
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [error]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    const registerPromise = dispatch(
      registerUser({
        name: data.username,
        email: data.email,
        password: data.password,
      }),
    ).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        return result;
      } else {
        throw new Error("Registration failed");
      }
    });

    toast.promise(registerPromise, {
      pending: "Creating your account...",
      success: "Account created successfully! Redirecting to login...",
      error: "Failed to create account",
    });

    registerPromise.then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">✨</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Start managing your projects with AI
          </p>

          {/* Form */}
          <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
            <FormInput
              label="Full Name"
              name="username"
              register={register}
              error={errors.username}
              placeholder="John Doe"
              type="text"
            />
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
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              placeholder="Enter your password"
              type="password"
            />
            <div className="py-2">
              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input type="checkbox" className="mt-1 rounded" required />
                <span>
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
            <Button
              type="submit"
              label={isLoading ? "Creating Account..." : "Create Account"}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold"
            />
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
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
        </div>

        {/* Footer Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
