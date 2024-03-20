import React, { useCallback, useEffect, useMemo, useState} from 'react'
import { useForm, FormProvider } from "react-hook-form"
import Input from '../../admin/components/Input'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import Toast, { MyToast } from '../../admin/components/Toast'
import { useAuth } from '../../context/AuthContext'
import LoadingButton from '../component/LoadingButton'
import LoginNavigate from '../../context/LoginNavigate'



const Login = () => {
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const {login} = auth
  const methods = useForm()
  const navigate = useNavigate()
  useEffect(()=>{
    document.title = 'Login'
},[])
  


  const onSubmit = methods.handleSubmit(async function(data){
      setLoading(true) 
      await new Promise(resolve => setTimeout(resolve, 2000))
      login(data)
      .then(async(result) => {
        MyToast('success', 'Login success')
        await new Promise(resolve => setTimeout(resolve, 2000))
        setLoading(false)
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        if (user) {
          if (user.role_acc === 'admin')
              navigate('/admin')
          else {
            if (user.role_acc === 'customer')
              navigate('/')
          }
      }
      }).catch((err) => {
          MyToast('error', 'Username or password incorrect')
          setLoading(false)
      });
      
    })

  const username_validation = {
    name: 'username_acc',
    label: 'Username',
    type: 'text',
    id: 'username',
    placeholder: 'Type your username ...',
    validation: {
      required: {
        value: true,
        message: 'Username is require',
      },
      maxLength: {
        value: 20,
        message: 'The longest password is 20 characters',
      },
    },
  }

  const password_validation = {
    name: 'password_acc',
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Type your password ...',
    validation: {
      required: {
        value: true,
        message: 'Please enter your password',
      },
      minLength: {
        value: 6,
        message: 'Password of at least 6 characters',
      },
    },
  }
    return (
      <>
        <div className="border-radius border-black border-10 max-w-screen max-h-screen">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto h-20 max-h-20 w-auto" src="/logo_katchshop.png" alt="Your Company" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <FormProvider {...methods}>
                <form className="space-y-6" noValidate onSubmit={e => e.preventDefault()}>
                  <Input {...username_validation}></Input>
                  <Input {...password_validation}></Input>
                  <div>
                    <LoadingButton loading={loading} type='submit' text="Sign in" onClick={onSubmit} className={"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"}></LoadingButton>
                  </div>
                </form>
              </FormProvider>


              <p className="mt-10 text-center text-sm text-gray-500">
                Don't have account?
                <Link className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to={'/register'}>Register</Link>
              </p>
            </div>
          </div>
        </div>
        <Toast />
        {/* <PropagateLoader className=' top-1/2 left-1/2 z-100 w-fit h-fit' cssOverride={{position: 'absolute'}} color="#36d7b7"/> */}
      </>


    )

}

export default Login