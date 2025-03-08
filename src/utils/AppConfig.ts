// FIXME: Update this configuration file based on your project information

export const AppConfig = {
  site_name: 'Starter',
  title: 'Hotkicks Ecommerce Template',
  description:
    'Hotkicks Ecommerce Template in NextJS, React, HTML and TailwindCSS',
  locale: 'en'
}

export type SUBMIT_RESPONSE = {
  type: 'success' | 'error'
  message: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any
}

export const TOAST_TYPE = {
  SUCCESS: 'success' as SUBMIT_RESPONSE['type'],
  ERROR: 'error' as SUBMIT_RESPONSE['type']
}

export const LINKS = {
  HOME: '/',
  PRODUCTS: '/products',
  MANAGER_PRODUCT: '/manager/product',
  CREATE_PRODUCT: '/manager/product/create',
  EDIT_PRODUCT: (id: number | string) => `/manager/product/edit/${id}`,
  PRODUCT: (slug: string) => `/products/${slug}`,
  LOGIN: '/login',
  REGISTER: '/signup',
  LOGOUT: '/logout',
  PROFILE: '/profile',
  CART: '/cart',
  USER_MANAGER: '/user-manager',
  ORDER_MANAGER: '/manager/order',
  BLOG_MANAGER: '/manager/blog',
  CHECK_OUT: '/checkout',
  NOT_FOUND: '/404',
  CHECK_OUT_SUCCESS: '/checkout-success',
  ORDER_DETAILS: (id: number | string) => `/manager/order/${id}`,
  CATEGORY_MANAGER: '/manager/category',
  CREATE_CATEGORY: '/manager/category/create',
  EDIT_CATEGORY: (id: number | string) => `/manager/category/edit/${id}`,
  EDIT_BLOG: (id: number | string) => `/manager/blog/${id}`
}

export const ALL_PAGES = Object.values(LINKS).filter(
  (link) => typeof link === 'string'
)

export const IMAGES = {
  NO_IMAGE: '/assets/images/no-image.png'
}

export const renderUploadImage = (image?: string | null) => {
  if (!image) return IMAGES.NO_IMAGE
  return image?.startsWith('http') ? image : `/assets/uploads/${image}`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
    .format(amount)
    .replace('₫', 'đ')
}
