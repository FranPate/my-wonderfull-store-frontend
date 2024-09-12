import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
  redirect
} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addProduct } from '../services/ProductService'
import ProductForm from '../components/ProductForm'

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const token = formData.token
  const { token: _, ...productData } = formData
  let error = ''
  if (Object.values(productData).includes('')) {
    error = 'Todos los campos son obligatorios'
  }
  if (error.length) {
    return error
  }
  await addProduct(productData, token)

  return redirect('/')
}

export default function NewProduct() {
  const error = useActionData() as string
  const token = localStorage.getItem('token') as string

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Add New Product</h2>
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
        <ProductForm />
        <input
          type='submit'
          className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
          value='Registrar Producto'
        />
      </Form>
    </>
  )
}
