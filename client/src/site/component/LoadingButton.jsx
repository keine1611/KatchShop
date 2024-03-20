import React from 'react'
import { PuffLoader } from 'react-spinners'

const LoadingButton = ({ loading,text, type, onClick, className }) => {
    if (loading)
        return (<button disabled type={type} onClick={onClick} className={className}>
            <PuffLoader
                color="#36d7b7"
                size={30}
            />

        </button>)

    else return (<button type={type} onClick={onClick} className={className}>{text}</button>)

}

export default LoadingButton