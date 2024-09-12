import { ActionFunctionArgs, Form, Link, useLoaderData } from 'react-router-dom'
import { getProducts, updateProductStock } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails'
import { Product } from '../types'
import { useState } from 'react'

export async function loader() {
  const product = await getProducts()
  return product
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductStock(+data.id, data)
  return {}
}

export default function Products() {
  const products = useLoaderData() as Product[]
  const [searchTerm, setSearchTerm] = useState('')
  const role = localStorage.getItem('role')

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-4xl font-black text-slate-500'>Products</h2>
        <div className='flex-grow flex justify-center'>
          <Form
            method='POST'
            className='flex items-center space-x-2'
          >
            <input
              type='text'
              name='productName'
              placeholder='Search product'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border rounded-md p-2'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
              Search
            </button>
          </Form>
        </div>
        {role === 'admin' && (
          <Link
            to='products/new'
            className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
          >
            Add Product
          </Link>
        )}
      </div>

      <div className='container mx-auto p-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredProducts.map((product) => (
            <ProductDetails
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  )
}
