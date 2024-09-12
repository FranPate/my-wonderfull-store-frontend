import { Product } from '../types'

type ProductFromProps = {
  product?: Product
}

export default function ProductForm({ product }: ProductFromProps) {
  return (
    <>
      <div className='mb-4'>
        <label
          className='text-gray-800'
          htmlFor='title'
        >
          Product Name:
        </label>
        <input
          id='title'
          type='text'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Product Name'
          name='title'
          defaultValue={product?.title}
        />
      </div>
      <div className='mb-4'>
        <label
          className='text-gray-800'
          htmlFor='description'
        >
          Description:
        </label>
        <input
          id='description'
          type='text'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Product Description'
          name='description'
          defaultValue={product?.description}
        />
      </div>
      <div className='mb-4'>
        <label
          className='text-gray-800'
          htmlFor='category'
        >
          Category:
        </label>
        <input
          id='category'
          type='text'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Product Category'
          name='category'
          defaultValue={product?.category}
        />
      </div>
      <div className='mb-4'>
        <label
          className='text-gray-800'
          htmlFor='price'
        >
          Price:
        </label>
        <input
          id='price'
          type='number'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Product Price. ej. 200, 300'
          name='price'
          defaultValue={product?.price}
        />
      </div>
      <div className='mb-4'>
        <label
          className='text-gray-800'
          htmlFor='stock'
        >
          Stock:
        </label>
        <input
          id='stock'
          type='number'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Product Stock. ej. 10, 50'
          name='stock'
          defaultValue={product?.stock}
        />
      </div>
      <div className='mb-4'>
        <label
          className='text-gray-800'
          htmlFor='thumbnail'
        >
          Thumbnail:
        </label>
        <input
          id='thumbnail'
          type='text'
          className='mt-2 block w-full p-3 bg-gray-50'
          placeholder='Product thumbnail URL'
          name='thumbnail'
          defaultValue={product?.thumbnail}
        />
      </div>
    </>
  )
}
