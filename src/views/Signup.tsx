import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData
} from 'react-router-dom'
import { addUser } from '../services/UserService'
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
  await addUser(data)

  return redirect('/login')
}

export default function Signup() {
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
        <div className='mb-4'>
          <label
            className='text-gray-800'
            htmlFor='firstName'
          >
            First Name:
          </label>
          <input
            id='firstName'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Your First Name'
            name='firstName'
          />
        </div>
        <div className='mb-4'>
          <label
            className='text-gray-800'
            htmlFor='lastName'
          >
            Last Name:
          </label>
          <input
            id='lastName'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Your Last Name'
            name='lastName'
          />
        </div>
        <div className='mb-4'>
          <label
            className='text-gray-800'
            htmlFor='role'
          >
            Role:
          </label>
          <select
            id='role'
            name='role'
            className='mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md'
          >
            <option value='client'>Client</option>
            <option value='staff'>Staff</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <button
          type='submit'
          className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
        >
          Signup
        </button>
      </Form>
    </>
  )
}
