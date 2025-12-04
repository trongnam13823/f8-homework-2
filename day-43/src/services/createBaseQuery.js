import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/auth/authSlice";

const API_URL = "https://api01.f8team.dev/api";

const isRefreshToken = false;
const refreshQueue = [];

export function createBaseQuery(path) {
  // baseQuery gốc của RTK
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_URL + path,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;
      if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  });

  // baseQuery có thêm logic refresh token
  return async (args, api, extraOptions) => {
    // gọi api lần đầu
    let result = await rawBaseQuery(args, api, extraOptions);

    // nếu token hết hạn
    if (result.error && result.error.status === 401) {
      if (isRefreshToken) {
        // nếu đang có request refresh token thì đẩy request hiện tại vào hàng đợi
        await new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        });
      } else {
        const refreshToken = api.getState().auth.refreshToken;

        // nếu không có refresh token thì logout luôn
        if (!refreshToken) {
          api.dispatch(logout());
        }

        const response = await fetch(`${API_URL}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const newToken = await response.json();

        // nếu lấy token mới thành công
        if (newToken.data) {
          // lưu token mới
          api.dispatch(setCredentials(newToken.data));
          // thông báo cho các request trong hàng đợi tiếp tục
          refreshQueue.forEach((p) => p.resolve());
        } else {
          // refresh token thất bại thì logout
          api.dispatch(logout());
          // thông báo lỗi cho các request trong hàng đợi
          refreshQueue.forEach((p) => p.reject());
        }
      }

      refreshQueue.length = 0;

      // gọi lại api ban đầu với token mới
      result = await rawBaseQuery(args, api, extraOptions);
    }

    return result.data;
  };
}
