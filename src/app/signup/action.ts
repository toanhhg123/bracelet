"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { cookies } from "next/headers";

import { db } from "@/config/db";
import { users } from "@/config/db/schema";
import { type SUBMIT_RESPONSE, TOAST_TYPE } from "@/utils/AppConfig";

const MESSAGES = {
  REGISTER_SUCCESS: "Đăng ký thành công",
  EMAIL_EXISTS: "Email đã được sử dụng",
  BAD_CREDENTIALS: "Email hoặc mật khẩu không đúng",
  LOGIN_SUCCESS: "Đăng nhập thành công",
};

export type UserSession = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

const JWT = {
  secret: process.env.JWT_SECRET ?? "",
  expiresIn: "1d" as StringValue,
};

const COOKIES = {
  name: "auth_token",
  userInfo: "user_info",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
  },
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};

export type userLogin = {
  email: string;
  password: string;
};

// Hàm đăng nhập
export async function loginUser(data: FormData): Promise<SUBMIT_RESPONSE> {
  const parsedData = Object.fromEntries(data) as userLogin;

  const { email, password } = parsedData;

  // Tìm người dùng trong cơ sở dữ liệu
  const userDB = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = userDB[0];

  if (userDB.length < 1 || !user) {
    return {
      type: TOAST_TYPE.ERROR,
      message: MESSAGES.BAD_CREDENTIALS,
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      type: TOAST_TYPE.ERROR,
      message: MESSAGES.BAD_CREDENTIALS,
    };
  }

  // Tạo JWT
  const token = jwt.sign({ userId: user.id }, JWT.secret, {
    expiresIn: JWT.expiresIn,
  });

  // set user info to cookie

  // Lưu token vào cookie
  const cookie = await cookies();
  cookie.set(COOKIES.name, token, {
    httpOnly: COOKIES.options.httpOnly,
    secure: COOKIES.options.secure,
    maxAge: COOKIES.options.maxAge,
    path: "/",
  });

  // encode and set user info

  const userEncode = JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar ?? "",
  });

  cookie.set(COOKIES.userInfo, btoa(userEncode), {
    httpOnly: COOKIES.options.httpOnly,
    secure: COOKIES.options.secure,
    maxAge: COOKIES.options.maxAge,
    path: "/",
  });

  return { type: TOAST_TYPE.SUCCESS, message: MESSAGES.LOGIN_SUCCESS };
}

export const register = async (form: FormData): Promise<SUBMIT_RESPONSE> => {
  const { name, email, password } = Object.fromEntries(form) as UserRegister;

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { type: TOAST_TYPE.ERROR, message: MESSAGES.EMAIL_EXISTS };
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Thêm người dùng mới vào cơ sở dữ liệu
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  await loginUser(form);
  return { type: TOAST_TYPE.SUCCESS, message: MESSAGES.REGISTER_SUCCESS };
};

export const getUser = async () => {
  const cookie = await cookies();
  const token = cookie.get(COOKIES.name)?.value;
  if (!token) {
    return null;
  }
  try {
    jwt.verify(token, JWT.secret);

    const userDecode = JSON.parse(
      atob(cookie.get(COOKIES.userInfo)?.value ?? "")
    );

    if (!userDecode) return null;
    return userDecode;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  const cookie = await cookies();
  cookie.set(COOKIES.name, "", {
    httpOnly: COOKIES.options.httpOnly,
    secure: COOKIES.options.secure,
    maxAge: 0,
    path: "/",
  });

  cookie.set(COOKIES.userInfo, "", {
    httpOnly: COOKIES.options.httpOnly,
    secure: COOKIES.options.secure,
    maxAge: 0,
    path: "/",
  });
};
