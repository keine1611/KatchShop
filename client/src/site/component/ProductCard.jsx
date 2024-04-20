import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import * as image from '../../api/image'



const ProductCard = ({ product }) => {
    const Cart = useCartContext()
    const auth = useAuth()
    const navigate = useNavigate()
    function handleAddToCartClick(product){
        if(auth.user.auth){
          Cart.addToCart(product)
        }
        else
          navigate('/login',{replace:true})
      }
    

    return (

        <div className="relative flex flex-col w-full h-full rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transform transition duration-500 hover:scale-110 hover:bg-blue-gray-200 justify-center items-center">
            <Link to={'/products/' + product.id_prd}>
                <div className="relative mx-4 mt-4 h-52  justify-items-center overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                        src={image.watch+ product.main_img_prd}
                        className="h-full w-full object-cover"
                    />
                </div>
            </Link>


            <div className="p-6">
                <div className="mb-2 flex gap-2 items-start justify-between">
                    <Link to={'/products/' + product.id_prd}>
                        <p className=" flex-1 break-words line-clamp-2 font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {product.name_prd}
                        </p>
                    </Link>
                    <p className="block flex-1 text-right break-words font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        {'$' + Number(product.price_prd).toLocaleString()}
                    </p>
                </div>
                <p className="font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75 line-clamp-3">
                    {product.description_prd}
                </p>
            </div>
            <div className="p-6 pt-0 mt-auto">
                <button
                    className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button" onClick={() => { handleAddToCartClick(product) }}>
                    Add to Cart
                </button>
            </div>
        </div>

    )
}

export default ProductCard