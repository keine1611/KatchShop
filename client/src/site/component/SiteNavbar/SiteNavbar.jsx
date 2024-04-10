import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import NavItem from './component/NavItem';
import CartItemNav from './component/CartItemNav';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ListCard from '../ListCard';
import { set } from 'react-hook-form';
import { useCartContext } from '../../../context/CartContext';
import { useDataContext } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import axios from 'axios';
import card from '@material-tailwind/react/theme/components/card';

const arrNavLink = [
  {
    title: 'HOME',
    link: '/'
  },
  {
    title: 'BRAND',
    link: '/brands'
  },
  {
    title: 'PRODUCT',
    link: '/products'
  },
  {
    title: 'BLOG',
    link: '/blog'
  },
  {
    title: 'NEWS',
    link: '/news'
  },

]




const SiteNavbar = () => {
  const auth = useAuth()
  const Cart = useCartContext()
  const navigate = useNavigate()
  const [openCartModal, setOpenCartModal] = useState(false)
  const [textSearch, setTextSearch] = useState('')

  const [products, setProducts] = useState([])
  const [searchData, setSearchData] = useState([])

  useEffect(()=>{
    axios.get('/api/product')
    .then((result) => {
      setProducts(result.data)
    })
  },[])


  function handleCartOnClick() {
    setOpenCartModal(true)
  }

  const handleOrderClick = () => {
    navigate('/my-order',{replace: true})
  }

  const handleLogoutClick = () => {
    auth.logOut()
  }


  function handleClose() {
    setOpenCartModal(false)
  }

  function handleSearchChange(e) {
    setTextSearch(e.target.value)
    setSearchData(products.filter(item => item.name_prd.toLowerCase().includes(e.target.value.toLowerCase())))
    return
  }

  function handleAddToCartClick(product){
    if(auth.user.auth){
      Cart.addToCart(product)
    }
    else
      navigate('/login',{replace:true})
  }

  function handleItemSearchClick(id_prd){
    setSearchData([])
    setTextSearch('')
    navigate('/products/'+id_prd, {replace: true})
  }



  return (

    <>
      <div className='top-0 fixed w-full box-border px-10 h-26 p-10 flex gap-4 z-40 bg-white flex-col  justify-around  rounded-md ' >
        <div className='hover: cursor-pointer'>
          <h1 className='font-Pacifico font-extrabold text-5xl text-center'>Katch Shop</h1>
        </div>
        <div className='flex flex-rows justify-between'>
          <div className='flex flex-rows grow flex-1 content-center gap-6'>
            <div className='flex flex-rows justify-around gap-5'>
              {arrNavLink.map(function (value, index) {
                return <NavItem key={index} title={value.title} link={value.link} />
              })}
            </div>
          </div>
          <div className='mt-4 gap-3 justify-around w-fit flex flex-row items-end'>
            <div className=' flex flex-row relative items-center h-fit w-full px-4 py-2 border-[1px] border-gray-200 shadow-md rounded-lg'>
              <SearchOutlinedIcon className='hover:cursor-pointer'></SearchOutlinedIcon>
              <input className='w-full outline-none ps-2 focus:border-none border-none px-2 py-0 bg-white' type='text' value={textSearch} onChange={(e) => handleSearchChange(e)} />
              {textSearch.length != 0 && searchData.length !=0 && <>
                <div className='absolute bg-white rounded-md right-0 left-0 -bottom-2 translate-y-full h-fit'>
                  <div className='p-1 overflow-y-auto max-h-80'>
                  {searchData.map((item) =>
                    <div key={item.id_prd} onClick={()=>handleItemSearchClick(item.id_prd)} className='flex flex-row gap-2 hover:cursor-pointer'>
                      <img className=' h-12 w-12 object-contain rounded-full'src={process.env.PUBLIC_URL + '/image/watch/' + item.main_img_prd} />
                      <div>
                        <p className=' font-medium text-[14px] text-ellipsis line-clamp-1'>{item.name_prd}</p>
                        <p className='font-thin text-gray-700 text-[12px]'>${item.price_prd.toLocaleString()}</p>
                      </div>
                    </div>)}
                  </div>
                </div>
              </>
              }
            </div>
           {auth.user.auth && <div className='h-fit relative w-fit px-4 py-2 border-[1px] border-gray-200 shadow-md rounded-lg hover:cursor-pointer' onClick={() => handleCartOnClick()}>
              <ShoppingCartOutlinedIcon className='hover:cursor-pointer'></ShoppingCartOutlinedIcon>
              <span class="absolute -top-1 left-6 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">{Cart.cartQuality}</span>
            </div>}
            <div>
              <Dropdown>
                <MenuButton><PermIdentityOutlinedIcon className='hover:cursor-pointer'></PermIdentityOutlinedIcon></MenuButton>
                <Menu style={{ zIndex: 100 }} slots={{ listbox: Listbox }}>
                  {auth.user.auth && <MenuItem onClick={() => handleOrderClick()}>Orders</MenuItem>}
                  {(auth.user.auth) ? (<MenuItem onClick={() => handleLogoutClick()}>Log out</MenuItem>)
                    : <MenuItem onClick={() => navigate('/login', { replace: true })} >Sign in</MenuItem>
                  }
                </Menu>
              </Dropdown>
            </div>
          </div>
        </div>

      </div>
      <div>
        <Modal
          sx={{ border: 'none' }}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openCartModal}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <div in={openCartModal} className='absolute container outline-none p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div class=" bg-gray-100 pt-20 sm:overflow-hidden sm:h-[600px] h-screen overflow-y-scroll border-[1px] rounded-xl border-r-gray-500">
              <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
              <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 h-4/5 pb-6">
                <div class="rounded-lg md:w-2/3 sm:overflow-y-scroll my-2 h-full">
                  {Cart.cartItems.map(function (value, index) {
                    return (<>
                      <div key={value.product.id_prd} class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src={process.env.PUBLIC_URL + '/image/watch/' + value.product.main_img_prd} alt="product-image" class="w-full rounded-lg sm:w-40" />
                        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div class="mt-5 sm:mt-0">
                            <h2 class="text-lg font-bold text-gray-900">{value.product.name_prd}</h2>
                            <p class="mt-1 text-xs text-gray-700 line-clamp-3">{value.product.description_prd}</p>
                          </div>
                          <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div class="flex items-center border-gray-100">
                              <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => Cart.removeFromCart(value.product)}> - </span>
                              <input class="h-8 w-8 border bg-white text-center text-xs outline-none" disabled value={value.quantity_cart} min="1" />
                              <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => Cart.addToCart(value.product)}> + </span>
                            </div>
                            <div class="flex items-center space-x-4">
                              <p class="text-sm">${Number(value.product.price_prd).toLocaleString()}</p>
                              <svg onClick={()=>Cart.removeProductFromCart(value.product)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    )

                  })}
                </div>
                <div class="mt-6 h-fit rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                  <div class="mb-2 flex justify-between">
                    <p class="text-gray-700">Subtotal</p>
                    <p class="text-gray-700">${Cart.getCartTotal().toLocaleString()}</p>
                  </div>
                  <hr class="my-4" />
                  <div class="flex justify-between">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                      <p class="mb-1 text-lg font-bold">${(Cart.getCartTotal()*(105/100)).toLocaleString()}</p>
                      <p class="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => (navigate('/checkout', { state: Cart.cartItems }))}>Check out</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>

    </>


  )
}
const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 100 !important;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);

export default SiteNavbar