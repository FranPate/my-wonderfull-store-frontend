import { useState } from 'react'
import { Product } from '../types'
import { formatCurrency } from '../utils'
import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect
} from 'react-router-dom'
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
  product: Product
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const token = formData.token
  if (params.id !== undefined) {
    await deleteProduct(+params.id, token)
    return redirect('/')
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [isEditingStock, setIsEditingStock] = useState(false)
  const [stock, setStock] = useState(product.stock)

  const token = localStorage.getItem('token') as string
  const role = localStorage.getItem('role')

  const navigateEdit = useNavigate()

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStock = parseFloat(e.target.value)
    setStock(newStock)
  }
  const handleStockSave = () => {
    setIsEditingStock(false)
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-4 m-4 w-60'>
      <img
        src={product.thumbnail}
        alt={product.title}
        className='w-full h-40 object-cover rounded-md'
      />
      <h2 className='text-xl font-semibold mt-2'>{product.title}</h2>
      <p className='text-gray-500'>{formatCurrency(product.price)}</p>

      {role === 'admin' && (
        <>
          {isEditingStock ? (
            <div className='mt-2 flex items-center justify-between'>
              <Form
                method='POST'
                className='w-full flex'
                onSubmit={handleStockSave}
              >
                <input
                  type='hidden'
                  name='token'
                  value={token}
                />
                <input
                  type='number'
                  name='stock'
                  value={stock}
                  onChange={handleStockChange}
                  className='border rounded-md p-1 flex-grow min-w-0'
                />
                <button
                  type='submit'
                  name='id'
                  value={product.id}
                  className='bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 ml-2'
                >
                  Save
                </button>
              </Form>
            </div>
          ) : (
            <p className='text-gray-500 mt-2'>
              Stock:{' '}
              <span
                onClick={() => setIsEditingStock(true)}
                className='cursor-pointer underline'
              >
                {stock}
              </span>
            </p>
          )}
          <div className='flex items-center justify-between mt-4'>
            <button
              onClick={() => navigateEdit(`/products/${product.id}/edit`)}
              className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600'
            >
              Editar
            </button>
            <Form
              method='POST'
              action={`products/${product.id}/delete`}
              onSubmit={(e) => {
                if (!confirm('Delete?')) {
                  e.preventDefault()
                }
              }}
            >
              <input
                type='hidden'
                name='token'
                value={token}
              />
              <input
                type='submit'
                value='Delete'
                className='bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600'
              />
            </Form>
          </div>
        </>
      )}
      {role === 'client' && (
        <button className='bg-blue-500 text-white w-full px-4 py-2 rounded-md mt-4 hover:bg-blue-600'>
          Agregar al carrito
        </button>
      )}
    </div>
  )
}
