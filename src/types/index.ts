import { object, string, number, InferOutput, array } from 'valibot'

export const DraftProductSchema = object({
  title: string(),
  description: string(),
  category: string(),
  price: number(),
  stock: number(),
  thumbnail: string()
})

export const ProductSchema = object({
  id: number(),
  title: string(),
  description: string(),
  category: string(),
  price: number(),
  stock: number(),
  thumbnail: string()
})

export const DraftUserSchema = object({
  email: string(),
  password: string(),
  firstName: string(),
  lastName: string(),
  role: string()
})

export const DraftUserLoginSchema = object({
  email: string(),
  password: string()
})

export const TokenSchema = string

export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>
