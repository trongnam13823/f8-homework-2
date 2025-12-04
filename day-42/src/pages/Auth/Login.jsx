import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/loginSchema";
import { setCredentials } from "../../features/auth/authSlice";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/InputField";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "trantrongnam@gmail.com",
      password: "matkhau.",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      console.log(result);
      dispatch(setCredentials(result));
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <AuthLayout title="Đăng nhập">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Email"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <InputField
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password?.message}
        />

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{"Đăng nhập thất bại. Kiểm tra lại email và mật khẩu."}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Đăng ký
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
