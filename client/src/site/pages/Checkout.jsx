import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import InputCheckout from '../component/InputCheckout'
import { useAuth } from '../../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { PayPalButtons } from '@paypal/react-paypal-js'
import PayPal from '../component/PayPal'
import Toast from '../../admin/components/Toast'
import PayPalComponent from '../component/PayPal'
import PreLoading from '../component/PreLoading'

const Checkout = () => {
  const { state } = useLocation()
  const [priceShip, setPriceShip] = useState(5)
  const [subTotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    document.title = 'Checkout'
},[])

  useEffect(function () {
    setSubtotal(getSubTotal())
  }, [])

  useEffect(function () {
    setTotal(getTotal())
  }, [priceShip])

  useEffect(() => {
    async function fn() {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setLoading(false)
    }
    fn()
  },[])


  function getSubTotal() {
    return state.reduce((total, item) =>
      total + item.product.price_prd * item.quantity_cart
      , 0)
  }

  function getTotal() {
    return getSubTotal() + priceShip
  }

  function handleChangeDelivery(e) {
    setPriceShip(Number(e.target.value))
  }


  return (
  <>
    {loading ? <PreLoading /> :
      <div>
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <a href="#" className="text-4xl font-bold font-Pacifico text-gray-800">KatchShop</a>
          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
                  ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
                    ></a>
                  <span className="font-semibold text-gray-900">Shop</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                  <span className="font-semibold text-gray-900">Shipping</span>
                </li>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-2">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div className="mt-2 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 h-80 overflow-y-auto">
              {state && state.map(function (product, index) {
                return (
                  <div key={product.id_prd} className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img className="m-2 h-24 w-24 rounded-md border object-cover object-center" src={process.env.PUBLIC_URL + '/image/watch/' + product.product.main_img_prd} alt="" />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold truncate">{product.product.name_prd}</span>
                      <span className="float-right text-gray-400">Quantity: {product.quantity_cart}</span>
                      <p className="mt-auto text-lg font-bold">${Number(product.product.price_prd).toLocaleString()}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className=" mt-6 text-lg font-medium">Shipping Methods</p>
            <div className="mt-2 grid gap-4" onChange={(e) => handleChangeDelivery(e)}>
              <div className="relative">
                <input className="peer hidden" id="radio_1" type="radio" name="radio" checked={priceShip === 5} onChange={(e) => handleChangeDelivery(e)} value='5' />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                  <img className=" w-10 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Slowly Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">Delivery: 5-7 Days</p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input className="peer hidden" id="radio_2" type="radio" name="radio" checked={priceShip === 10} onChange={(e) => handleChangeDelivery(e)} value='10' />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                  <img className="w-10 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fast Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">${subTotal.toLocaleString()}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">${priceShip}</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">${total.toLocaleString()}</p>
            </div>
            <PayPalComponent amount={total} orderItem={state} />
          </div>
        </div>
        <Toast />
      </div>
    }
  </>


  )
}



export default Checkout