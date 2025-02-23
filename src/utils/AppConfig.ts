// FIXME: Update this configuration file based on your project information

export const AppConfig = {
  site_name: "Starter",
  title: "Hotkicks Ecommerce Template",
  description:
    "Hotkicks Ecommerce Template in NextJS, React, HTML and TailwindCSS",
  locale: "en",
};

export type SUBMIT_RESPONSE = {
  type: "success" | "error";
  message: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
};

export const TOAST_TYPE = {
  SUCCESS: "success" as SUBMIT_RESPONSE["type"],
  ERROR: "error" as SUBMIT_RESPONSE["type"],
};

export const LINKS = {
  MANAGER_PRODUCT: "/manager/product",
  CREATE_PRODUCT: "/manager/product/create",
  EDIT_PRODUCT: (id: number | string) => `/manager/product/edit/${id}`,
  PRODUCT: (slug: string) => `/product/${slug}`,
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  PROFILE: "/profile",
  CART: "/cart",
  USER_MANAGER: "/user-manager",
  ORDER_MANAGER: "/order-manager",
  NOT_FOUND: "/404",
};

export const ALL_PAGES = Object.values(LINKS).filter(
  (link) => typeof link === "string"
);

export const IMAGES = {
  NO_IMAGE: "/assets/uploads/no-image.png",
};

export const renderUploadImage = (image: string) => {
  return image.startsWith("http") ? image : `/assets/uploads/${image}`;
};
