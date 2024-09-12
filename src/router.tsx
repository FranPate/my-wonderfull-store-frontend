import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, {
  loader as productsLoader,
  action as updateStockAction
} from './views/Products'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction
} from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'
import Login, { action as loginpAction } from './views/Login'
import Signup, { action as signupAction } from './views/Signup'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateStockAction
      },
      {
        path: 'products/new',
        element: <NewProduct />,
        action: newProductAction
      },
      {
        path: 'products/:id/edit', // ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction
      },
      {
        path: 'products/:id/delete',
        action: deleteProductAction
      },
      {
        path: 'login',
        element: <Login />,
        action: loginpAction
      },
      {
        path: 'signup',
        element: <Signup />,
        action: signupAction
      }
    ]
  }
])
