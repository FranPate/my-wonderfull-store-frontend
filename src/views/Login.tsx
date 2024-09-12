import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData
} from 'react-router-dom'
import { loginUser } from '../services/UserService'
import ErrorMessage from '../components/ErrorMessage'

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  let error = ''
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }
  if (error.length) {
    return error
  }
  await loginUser(data)

  return redirect('/')
}

export default function Login() {
  const error = useActionData() as string
  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form method='POST'>
        <div className='mb-4'>
          <label
            className='text-gray-800'
            htmlFor='email'
          >
            Email:
          </label>
          <input
            id='email'
            type='email'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Your Email'
            name='email'
          />
        </div>
        <div className='mb-4'>
          <label
            className='text-gray-800'
            htmlFor='password'
          >
            Password:
          </label>
          <input
            id='password'
            type='password'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Your Password'
            name='password'
          />
        </div>
        <button
          type='submit'
          className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
        >
          Login
        </button>
      </Form>
    </>
  )
}
