import React, { useContext, useState, useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form"
import Input from '../../admin/components/Input'
import { Navigate, useNavigate } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'
import Toast, { MyToast } from '../../admin/components/Toast'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'


const arrInput = [
  { label: 'UserName', type: 'text', id: 'username', placehoder: 'Type username...' },
  { label: 'Password', type: 'password', id: 'password', placehoder: 'Type password...' },
]

const Register = () => {

  const auth = useAuth()
  useEffect(() => {
    document.title = 'Register'
  }, [])

  const navigate = useNavigate()

  const methods = useForm()
  const onSubmit = methods.handleSubmit(async data => {
    auth.register(data)
      .then(function (data) {
        MyToast('success', 'Register success')
        setTimeout(async function () {
          navigate('/', {replace:true})
        }, 2000)
      })
      .catch(function (err) {
        MyToast('error', err.response.data)
      })


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
  const confirm_password_validation = {
    name: 'confirm_password',
    label: 'Confirm password',
    type: 'password',
    id: 'confirm_password',
    placeholder: 'Type confirm password ...',
    validation: {
      required: {
        value: true,
        message: 'Please enter confirm password',
      },
      minLength: {
        value: 6,
        message: 'Password of at least 6 characters',
      },
    }
  }
  const name_validation = {
    name: 'name_cus',
    label: 'Full Name',
    type: 'text',
    id: 'fullname',
    placeholder: 'Type your name ...',
    validation: {
      required: {
        value: true,
        message: 'Full name is require',
      },
      maxLength: {
        value: 50,
        message: 'The longest full name is 50 characters',
      },
    },
  }

  const address_validation = {
    name: 'address_cus',
    label: 'Address',
    type: 'text',
    id: 'address',
    placeholder: 'Type your address ...',
    validation: {
      required: {
        value: true,
        message: 'Please enter your address',
      },
      maxLenght: {
        value: 100,
        message: 'Address of at least 100 characters',
      },
    },
  }

  const phone_validation = {
    name: 'phone_cus',
    label: 'Phone Number',
    type: 'text',
    id: 'phone',
    placeholder: 'Type your phone number ...',
    validation: {
      required: {
        value: true,
        message: 'Phone number is require',
      },
      maxLength: {
        value: 10,
        message: 'The longest password is 10 characters',
      },
      minLength: {
        value: 10,
        message: 'Phone number of at least 10 characters',
      },
      pattern: {
        value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
        message: 'Wrong phone number fomat'
      }
    }
  }

  const email_validation = {
    name: 'email_cus',
    label: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'Type your email ...',
    validation: {
      required: {
        value: true,
        message: 'Email is require',
      },
      maxLength: {
        value: 50,
        message: 'The longest email is 50 characters',
      },
      pattern: {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: 'Wrong email fomat'
      }
    },
  }
  //check user loginned
  // if (auth.user) {
  //   if (auth.user.role_acc === 'admin')
  //     return <Navigate to={'/admin'} />
  //   else {
  //     if (auth.user.role_acc === 'user')
  //       return <Navigate to={'/home'} />
  //   }
  // }
  // else
    return (
      <>
        <div className="border-radius border-black border-10 max-w-screen max-h-screen">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto h-20 max-h-20 w-auto" src="/logo_katchshop.png" alt="Your Company" />
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-2xl ">
              <FormProvider {...methods}>
                <form className="space-y-2 " noValidate onSubmit={e => e.preventDefault()}>
                  <div className='flex flex-col gap-4 w-100 lg:flex-row'>
                    <Input {...username_validation}></Input>
                    <Input {...password_validation}></Input>
                    <Input {...confirm_password_validation}></Input>
                  </div>
                  <div className='flex flex-col gap-4 lg:flex-row'>
                    <Input {...name_validation}></Input>
                    <Input {...phone_validation}></Input>
                  </div>
                  <Input {...email_validation}></Input>
                  <Input {...address_validation}></Input>

                  <div>
                    <button onClick={onSubmit} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                  </div>
                </form>
              </FormProvider>


              <p className="mt-10 text-center text-sm text-gray-500">
                If have account
                <Link className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to={'/login'}>Login</Link>
              </p>
            </div>

          </div>

        </div>
        <Toast />
        {/* <PropagateLoader className=' top-1/2 left-1/2 z-100 w-fit h-fit' cssOverride={{position: 'absolute'}} color="#36d7b7"/> */}
      </>
    )

}

export default Register