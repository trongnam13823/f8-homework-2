import z from "zod";

const registerSchema = z
  .object({
    fullName: z.string().min(1, "Họ tên là bắt buộc"),
    email: z.email("Email không đúng định dạng"),
    password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export default registerSchema;
