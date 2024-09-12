import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema
} from '../types'
import { safeParse } from 'valibot'
import axios from 'axios'

type ProductData = {
  [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData, token: FormDataEntryValue) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const result = safeParse(DraftProductSchema, {
      title: data.title,
      description: data.description,
      category: data.category,
      price: +data.price,
      stock: +data.stock,
      thumbnail: data.thumbnail
    })
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/products/product`
      await axios.post(
        url,
        {
          title: result.output.title,
          description: result.output.description,
          category: result.output.category,
          price: result.output.price,
          stock: result.output.stock,
          thumbnail: result.output.thumbnail
        },
        config
      )
    } else {
      throw new Error('Invalid data')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/products`
    const { data } = await axios.get(url)
    const result = safeParse(ProductsSchema, data.data)
    if (result.success) {
      return result.output
    } else {
      throw new Error('There was an error')
    }
  } catch (error) {}
}

export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/product/get/${id}`
    const { data } = await axios.get(url)
    const result = safeParse(ProductSchema, data.data)
    if (result.success) {
      return result.output
    } else {
      throw new Error('There was an error')
    }
  } catch (error) {}
}

export async function updateProduct(
  data: ProductData,
  id: Product['id'],
  token: FormDataEntryValue
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const result = safeParse(ProductSchema, {
      id,
      title: data.title,
      description: data.description,
      category: data.category,
      price: +data.price,
      stock: +data.stock,
      thumbnail: data.thumbnail
    })
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/products/product/id/${
        result.output.id
      }`
      await axios.put(url, result.output, config)
    } else {
      throw new Error('Invalid data')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function deleteProduct(
  id: Product['id'],
  token: FormDataEntryValue
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/product/id/${id}`
    await axios.delete(url, config)
  } catch (error) {
    console.log(error)
  }
}

export async function updateProductStock(
  id: Product['id'],
  data: ProductData,
  token: FormDataEntryValue
) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/product/id/${id}`
    await axios.patch(url, data, config)
  } catch (error) {
    console.log(error)
  }
}

export async function getProductByTitle(title: Product['title']) {
  try {
    const url = `${
      import.meta.env.VITE_API_URL
    }/products/product/search/${title}`
    const { data } = await axios.get(url)
    const result = safeParse(ProductSchema, data.data)
    if (result.success) {
      return result.output
    } else {
      throw new Error('There was an error')
    }
  } catch (error) {}
}
