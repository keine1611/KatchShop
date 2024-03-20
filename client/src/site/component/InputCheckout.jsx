import React from 'react'
import { findInputError } from '../../admin/js/findInputError'
import isFormInvalid from '../../admin/js/isFormInvalid'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormContext } from 'react-hook-form'


const InputCheckout = ({ name, label, type, id, placeholder, validation, multiline, svg,value, ftChange}) => {

    const {
        register,
        formState: { errors },
    } = useFormContext()

    const inputError = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputError)

    return (
        <div>
            <label htmlFor={name} className="mt-4 mb-2 block text-sm font-medium">{label}</label>
            <div className="relative">
                <input type={type} id={id} name={name} onChange={()=>ftChange()} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={placeholder} value={value}   {...register(name, validation)} />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    {svg}
                </div>
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

export default InputCheckout