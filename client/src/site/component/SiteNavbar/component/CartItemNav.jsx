import React from 'react'

const CartItemNav = () => {
  return (
    <>
      <div className='w-full mt-4 flex flex-row gap-2 justify-between'>
        <img className='w-10 h-10 object-fill' src={process.env.PUBLIC_URL+'/image/watch/5fa2c318-7495-11ee-b962-0242ac120002.png'}></img>
        <p className='text-sm text-justify truncate text-ellipsis break-words'>San phaadsfdasfassdfasdfasdfasffdasdfasdfsdfasm ne</p>
        <p className='text-sm text-justify'>$Gia ndsafdase</p>
      </div>
    </>
  )
}

export default CartItemNav