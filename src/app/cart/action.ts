import { eq } from 'drizzle-orm'

import { db } from '@/config/db'
import { cart, product } from '@/config/db/schema'

export const getCartWithProducts = async (userId: number) => {
  const cartItems = await db
    .select({
      cartId: cart.id,
      quantity: cart.quantity,
      totalPrice: cart.totalPrice,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      product
    })
    .from(cart)
    .innerJoin(product, eq(cart.productId, product.id))
    .where(eq(cart.userId, userId))

  return cartItems
}

export type CartItem = Awaited<ReturnType<typeof getCartWithProducts>>[number]
