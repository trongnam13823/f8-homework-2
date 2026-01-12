import z from "zod";

const loginSchema = z.object({
  email: z.email("Email không đúng định dạng").min(1, "Email là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export default loginSchema;
