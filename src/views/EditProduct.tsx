import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
  redirect,
  LoaderFunctionArgs,
  useLoaderData
} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { getProductById, updateProduct } from '../services/ProductService'
import { Product } from '../types'
import ProductForm from '../components/ProductForm'

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id)
    if (!product) {
      return redirect('/')
    }
    return product
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const token = formData.token
  const { token: _, ...productData } = formData
  let error = ''
  if (Object.values(formData).includes('')) {
    error = 'Todos los campos son obligatorios'
  }
  if (error.length) {
    return error
  }

  if (params.id !== undefined) {
    await updateProduct(productData, +params.id, token)
    return redirect('/')
  }
}

export default function EditProduct() {
  const product = useLoaderData() as Product
  const error = useActionData() as string
  const token = localStorage.getItem('token') as string

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Edit Product</h2>
        <Link
          to='/'
          className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
        >
          Go Back
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form
        className='mt-10'
        method='POST'
      >
        <input
          type='hidden'
          name='token'
          value={token}
        />
        <ProductForm product={product} />
        <input
          type='submit'
          className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
          value='Registrar Producto'
        />
      </Form>
    </>
  )
}
