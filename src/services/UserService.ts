import axios from 'axios'
import { safeParse } from 'valibot'
import { DraftUserLoginSchema, DraftUserSchema } from '../types'

type ProductData = {
  [k: string]: FormDataEntryValue
}

export async function addUser(data: ProductData) {
  try {
    const result = safeParse(DraftUserSchema, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role
    })
    console.log(result)
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/auth/signup`
      await axios.post(url, {
        email: result.output.email,
        password: result.output.password,
        firstName: result.output.firstName,
        lastName: result.output.lastName,
        role: result.output.role
      })
    } else {
      throw new Error('Invalid data')
    }
  } catch (error) {
    console.log(error)
  }
}

export async function loginUser(data: ProductData) {
  try {
    const result = safeParse(DraftUserLoginSchema, {
      email: data.email,
      password: data.password
    })
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/auth/login`
      const { data } = await axios.post(url, {
        email: result.output.email,
        password: result.output.password
      })
      const token = data.token
      const role = data.role

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
    } else {
      throw new Error('Invalid data')
    }
  } catch (error) {
    console.log(error)
  }
}
