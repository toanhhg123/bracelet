import {
  boolean,
  float,
  int,
  json,
  mysqlTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  age: int('age'),
  password: varchar('password', { length: 255 }).notNull(),
  address: text('address'),
  avatar: varchar('avatar', { length: 255 })
})

export const category = mysqlTable('category', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique()
})

export type Category = typeof category.$inferSelect

export const product = mysqlTable('product', {
  id: int('id').primaryKey().autoincrement(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  coverImage: varchar('cover_image', { length: 500 }).notNull(),
  currentPrice: float('current_price').notNull(),
  previousPrice: float('previous_price'),
  categoryId: int('category_id').references(() => category.id, {
    onDelete: 'cascade'
  }),
  rating: float('rating').notNull(),
  reviews: int('reviews').notNull(),
  piecesSold: int('pieces_sold').notNull(),
  justIn: boolean('just_in').default(false),
  shots: json('shots'),
  overview: text('overview'),
  shipmentDetails: json('shipment_details'),
  attributes: json('attributes') // Trường JSON chứa thông tin thuộc tính sản phẩm
})

export const cart = mysqlTable('cart', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id')
    .notNull()
    .references(() => users.id),
  productId: int('product_id')
    .notNull()
    .references(() => product.id),
  quantity: int('quantity').notNull().default(1),
  totalPrice: float('total_price').notNull(),
  productAttributes: json('product_attributes'), // Trường JSON chứa thông tin thuộc tính sản phẩm
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow()
})

export type Product = typeof product.$inferSelect

export const orders = mysqlTable('orders', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id')
    .notNull()
    .references(() => users.id), // Tham chiếu đến bảng users
  contactName: varchar('contact_name', { length: 255 }).notNull(), // Tên người liên hệ
  contactPhone: varchar('contact_phone', { length: 20 }).notNull(), // Số điện thoại liên hệ
  shippingAddressLine1: varchar('shipping_address_line1', {
    length: 255
  }).notNull(), // Địa chỉ giao hàng (dòng 1)
  shippingAddressLine2: varchar('shipping_address_line2', { length: 255 }), // Địa chỉ giao hàng (dòng 2)
  shippingCity: varchar('shipping_city', { length: 100 }).notNull(), // Thành phố
  shippingState: varchar('shipping_state', { length: 100 }), // Bang/Tỉnh
  shippingPostalCode: varchar('shipping_postal_code', { length: 20 }).notNull(), // Mã bưu điện
  shippingCountry: varchar('shipping_country', { length: 100 }).notNull(), // Quốc gia
  addressType: varchar('address_type', { length: 50 }), // Loại địa chỉ (Nhà riêng/Văn phòng)
  paymentMethod: varchar('payment_method', { length: 255 }).notNull(), // Phương thức thanh toán
  status: varchar('status', { length: 50 }).notNull().default('pending'), // Trạng thái đơn hàng
  totalPrice: float('total_price').notNull(), // Tổng giá trị đơn hàng
  notes: text('notes'), // Ghi chú chung về đơn hàng
  productAttributes: json('product_attributes'), // Trường JSON chứa thông tin thuộc tính sản phẩm
  createdAt: timestamp('created_at').defaultNow(), // Thời gian tạo đơn hàng
  updatedAt: timestamp('updated_at').onUpdateNow() // Thời gian cập nhật đơn hàng
})

export const ADDRESS_TYPE = {
  HOME: 'home',
  WORK: 'work'
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

export type Order = typeof orders.$inferSelect

export const orderItems = mysqlTable('order_items', {
  id: int('id').primaryKey().autoincrement(),
  orderId: int('order_id')
    .notNull()
    .references(() => orders.id), // Tham chiếu đến bảng orders
  productId: int('product_id')
    .notNull()
    .references(() => product.id), // Tham chiếu đến bảng product
  quantity: int('quantity').notNull().default(1), // Số lượng sản phẩm
  price: float('price').notNull(), // Giá của sản phẩm tại thời điểm đặt hàng
  notes: text('notes'), // Ghi chú về sản phẩm (ví dụ: size, màu sắc)
  productDetails: json('product_details') // Thông tin chi tiết về sản phẩm (ví dụ: size, màu sắc)
})

export type OrderItem = typeof orderItems.$inferSelect
