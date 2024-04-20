import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Breadcrumd from '../Breadcrumd'
import { set } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
import * as imageApi from '../../../api/image'


const Product = ({ idProduct }) => {
    const [imgActive, setImgActive] = useState(0)
    const [product, setProduct] = useState({})
    const Cart = useCartContext()
    const auth = useAuth()
    const navigate = useNavigate()
    function handleAddToCartClick(product) {
        if (auth.user.auth) {
            Cart.addToCart(product)
        }
        else
            navigate('/login', { replace: true })
    }
    const getProduct = async (id_prd) => {
        axios.get('/api/product/' + id_prd)
            .then(async (response) => {
                setProduct(response.data)
            })
    }

    useEffect(() => {
        getProduct(idProduct)
    }, [idProduct])

    const HandleButtonImgClick = (index) => {
        setImgActive(index)
    }




    return (
    <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                    <div>
                        <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                {product.images && product.images.length !== 0 && <img className='h-64 md:h-80' src={imageApi.watch+ product.images[imgActive].url_img} />}
                            </div>
                        </div>

                        <div className="flex mx-2 gap-1 mb-4">
                            {product.images && product.images.map((item, index) => {
                                if (index === imgActive)
                                    return (<button key={item.id_img} onClick={() => HandleButtonImgClick(index)} className='ring-2 ring-indigo-300 ring-inset h-24 md:h-32 '>
                                        <img className=' object-cover h-4/5' src={imageApi.watch + item.url_img} />
                                    </button>)
                                else
                                    return (<button key={item.id_img} onClick={() => HandleButtonImgClick(index)} className="focus:outline-none rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center">
                                        <img className=' object-cover h-4/5' src={imageApi.watch + item.url_img} />
                                    </button>)

                            })}
                        </div>
                    </div>
                </div>
                <div class="md:flex-1 px-4">
                    <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.name_prd}</h2>
                    {product.brand && <p class="text-gray-500 text-sm">By <a href="#" class="text-indigo-600 hover:underline">{product.brand.name_brand}</a></p>}

                    <div class="flex items-center space-x-4 my-4">
                        <div>
                            <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                                <span class="text-indigo-400 mr-1 mt-1">$</span>
                                <span class="font-bold text-indigo-600 text-3xl">{Number(product.price_prd).toLocaleString()}</span>
                            </div>
                        </div>
                        {/* <div class="flex-1">
                             <p class="text-green-500 text-xl font-semibold">Save 12%</p>
                             <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                         </div> */}
                    </div>

                    <p class="text-gray-500">{product.description_prd}</p>

                    <div class="flex py-4 space-x-4">
                        {/* <div class="relative">
                             <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
                             <select class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                                 <option>1</option>
                                 <option>2</option>
                                 <option>3</option>
                                 <option>4</option>
                                 <option>5</option>
                             </select>
                             <svg class="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                             </svg>
                         </div> */}

                        <button onClick={() => handleAddToCartClick(product)} type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Product