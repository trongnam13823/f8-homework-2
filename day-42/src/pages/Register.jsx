import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../schemas/registerSchema";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";

function Register() {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await register(data);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <AuthLayout title="Đăng ký tài khoản">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Họ tên"
          placeholder="Nhập họ tên của bạn"
          autoComplete="username"
          {...registerField("fullName")}
          error={errors.fullName?.message}
        />

        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          {...registerField("email")}
          error={errors.email?.message}
        />

        <InputField
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu"
          autoComplete="new-password"
          {...registerField("password")}
          error={errors.password?.message}
        />

        <InputField
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
          {...registerField("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error.data?.message || "Đăng ký thất bại. Vui lòng thử lại."}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Đăng nhập
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;
