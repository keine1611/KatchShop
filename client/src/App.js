import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Toast from './admin/components/Toast'
import Home from './admin/pages/Home'
import AdminBrand from './admin/pages/AdminBrand'
import Sidebar from './admin/components/Sidebar'
import Nav from './admin/components/Nav'
import AdminProduct from './admin/pages/AdminProduct'
import { AuthProvider, useAuth } from './context/AuthContext'
import Register from './site/pages/Register'
import SiteHome from './site/pages/SiteHome'
import SiteNavbar from './site/component/SiteNavbar/SiteNavbar'
import SiteFooter from './site/component/SiteFooter'
import Brand from './site/pages/Brand'
import ProductList from './site/pages/ProductList'
import DataProvider from './context/DataContext'
import Checkout from './site/pages/Checkout'
import Product from './site/pages/Product'
import Login from './site/pages/Login'
import AdminOrder from './admin/pages/AdminOrder'
import Order from './site/pages/Order'
import { Navigate } from 'react-router-dom'
import AdminAccount from './admin/pages/AdminAccount'
import MyChatbot from './site/component/BotChat/MyChatbot'
import Chat from './site/component/Chat/Chat'
import Chatt from './admin/components/Chat/AdminChat'
import { SocketContextProvider } from './admin/contexts/SocketChatContext'
import AdminChat from './admin/components/Chat/AdminChat'


const AdminLayout = () => {
  return (

    <AuthProvider>
      <div className='flex flex-row max-w-screen max-h-screen'>
        <Sidebar />
        <div className='flex grow p-4 flex-col w-100'>
          <Nav />
          <Outlet />
        </div>
      </div>
      <Toast />
    </AuthProvider>
  )
}

const SiteLayout = () => {
  return (
      <AuthProvider>
          <SiteNavbar />
          <Outlet />
          <SiteFooter />
          <Toast />
          <Chat/>
      </AuthProvider>
  )
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}) => {
  const AuthContext = useAuth()
  const {user} = AuthContext
  console.log(user)
  if (user.user.role_acc !== isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};




function App() {

 
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: <ProtectedRoute isAllowed={'admin'}><AdminLayout/></ProtectedRoute>,
      children: [
        {
          path: '',
          element: <Home />,
  
        },
        {
          path: 'brand',
          element: <AdminBrand />
        },
        {
          path: 'account',
          element: <AdminAccount/>
        },
        {
          path: 'product',
          element: <AdminProduct />
        },
        {
          path: 'order',
          element: <AdminOrder/>
        },
        {
          path: 'chat',
          element: <AdminChat/>
        },
      ]
    },
    {
      path: '/login',
      element:<Login />
    },
    {
      path:'/register',
      element: <Register/>
    },
    {
      path: '/',
      element: <DataProvider><SiteLayout /></DataProvider>,
      children: [
        {
          path: '',
          element: <SiteHome />
        },
        {
          path: 'brands',
          element: <Brand />
        },
        {
          path: 'products',
          element: <ProductList />
        },
        {
          path:'products/:id',
          element: <Product/>
        },
        {
          path: 'my-order',
          element: <Order/>
        }
      ],  
    },
    {
      path:'/checkout',
      element:<Checkout/>
    }
    
  ])
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
