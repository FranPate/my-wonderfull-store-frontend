import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  const token = localStorage.getItem('token')

  return (
    <>
      <header className='bg-slate-800'>
        <div className='mx-auto max-w-6xl py-10 flex justify-between items-center'>
          <h1 className='text-4xl font-extrabold text-white'>
            My Wonderful Store
          </h1>
          <div className='space-x-4'>
            {!token ? (
              <>
                <Link
                  to='/login'
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={localStorage.clear}
                className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <main className='mt-10 mx-auto max-w-6xl p-10 bg-gray-200 shadow rounded-xl'>
        <Outlet />
      </main>
    </>
  )
}
