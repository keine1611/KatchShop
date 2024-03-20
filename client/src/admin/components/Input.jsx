import React from 'react'
import { findInputError } from '../js/findInputError'
import isFormInvalid from '../js/isFormInvalid'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormContext } from 'react-hook-form'


const Input = ({ name, label, type, id, placeholder, validation, multiline }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputError = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputError)
    return (
        <div className='w-full'>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                {multiline ? (
                    <textarea id={id} type={type} placeholder={placeholder} className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 min-h-[10rem] max-h-[20rem] resize-y"
                        {...register(name, validation)} />
                ) : (
                    <input id={id} type={type} placeholder={placeholder} className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register(name, validation)} />
                )}

            </div>
            <div className='mt-1'>
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence>
            </div>

        </div>
    )
}
const InputError = ({ message }) => {
    return (
        <motion.p
            className="flex items-center font-sans font-light text-sm gap-1 px-2 text-red-500 bg-red-100 rounded-md"
            {...framer_error}
        >
            {message}
        </motion.p>
    )
}
const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}
export default Input