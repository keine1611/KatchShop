import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { MyToast } from '../../admin/components/Toast'


function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

const ModalChangePassword = () => {

    const {user} = useAuth()

    const [data, setData] = useState({
        password: '',
        newPassword: '',
        retypePassword: ''
    })

    const [errors, setErrors] = useState({
        password: '',
        newPassword: '',
        retypePassword: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        switch (name) {
            case 'password':
                if (value.trim().length <= 0) {
                    setErrors(prev => ({
                        ...prev,
                        password: 'Please type your password'
                    }))
                }
                else{
                    setErrors(prev => ({
                        ...prev,
                        password: ''
                    }))
                }
                break
            case 'newPassword':
                if (value.trim().length <= 0) {
                    setErrors(prev => ({
                        ...prev,
                        newPassword: 'Please type your new password'
                    }))
                }
                else{
                    if(value.trim().length < 8){
                        setErrors(prev => ({
                            ...prev,
                            newPassword: 'Min length password is 8 character'
                        }))
                    }
                    else{
                        setErrors(prev => ({
                            ...prev,
                            newPassword: ''
                        }))
                    }
                }
                break
            case 'retypePassword':
                if (value.trim().length <= 0) {
                    setErrors(prev => ({
                        ...prev,
                        retypePassword: 'Please type your new password'
                    }))
                }
                else{
                    setErrors(prev => ({
                        ...prev,
                        retypePassword: ''
                    })) 
                }
                break
        }

        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSave = ()=>{
        if(data.retypePassword !== data.newPassword){
            setErrors(prev=>({
                ...prev,
                newPassword: "Retype password not match new password",
                retypePassword: "Retype password not match new password"
            }))   
            return         
        }

        const dataSend = {
            password: data.password,
            newPassword: data.newPassword
        }
    
        api.authApi.changePassword(user.user.id_acc, dataSend)
        .then((result) => {
            MyToast('success', result.data.message)
        }).catch((err) => {
            MyToast('error', err.response.data.error)
        });
    }

    return (
        <>
            <button className='ml-2 hover:bg-greyButton px-5 py-2 rounded-lg hover:text-white bg-bluee text-black transition-colors duration-500'
                onClick={() => document.getElementById('my_modal_1').showModal()}>Change password</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className=" font-semibold font-Pacifico text-3xl text-center">Change password</h3>
                    <div>
                        <div class="bg-white p-4 rounded-lg w-full">
                            <div class="relative bg-inherit">
                                <input onChange={handleInputChange} value={data.password} type="password" id="password" name="password" className={`peer bg-transparent h-10 w-full rounded-lg ${errors.password ? `text-red-600 ring-red-500`:`text-gray-900 ring-gray-700`}   placeholder-transparent ring-2 px-2  focus:ring-sky-600 focus:outline-none focus:border-rose-600`} placeholder="" />
                                <label for="password" class={`absolute cursor-text left-0 -top-3 text-sm   ${errors.password ? `text-red-500` : `text-gray-900` } bg-inherit mx-1 px-1 peer-placeholder-shown:${errors.password ? `text-red-500` : `text-gray-500`} peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all`}>Password</label>
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                            </div>
                            
                        </div>
                        <div class="bg-white p-4 rounded-lg w-full">
                            <div class="relative bg-inherit">
                                <input onChange={handleInputChange} value={data.newPassword} type="password" id="newPassword" name="newPassword" className={`peer bg-transparent h-10 w-full rounded-lg ${errors.newPassword ? `text-red-600 ring-red-500`:`text-gray-900 ring-gray-700`}   placeholder-transparent ring-2 px-2  focus:ring-sky-600 focus:outline-none focus:border-rose-600`} placeholder="" />
                                <label for="password" class={`absolute cursor-text left-0 -top-3 text-sm   ${errors.newPassword ? `text-red-500` : `text-gray-900` } bg-inherit mx-1 px-1 peer-placeholder-shown:${errors.newPassword ? `text-red-500` : `text-gray-500`} peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all`}>New password</label>
                                {errors.newPassword && <div className="text-red-500 text-sm mt-1">{errors.newPassword}</div>}
                            </div>
                            
                        </div>
                        <div class="bg-white p-4 rounded-lg w-full">
                            <div class="relative bg-inherit">
                                <input onChange={handleInputChange} value={data.retypePassword} type="password" id="retypePassword" name="retypePassword" className={`peer bg-transparent h-10 w-full rounded-lg ${errors.retypePassword ? `text-red-600 ring-red-500`:`text-gray-900 ring-gray-700`}   placeholder-transparent ring-2 px-2  focus:ring-sky-600 focus:outline-none focus:border-rose-600`} placeholder="" />
                                <label for="password" class={`absolute cursor-text left-0 -top-3 text-sm   ${errors.retypePassword ? `text-red-500` : `text-gray-900` } bg-inherit mx-1 px-1 peer-placeholder-shown:${errors.retypePassword ? `text-red-500` : `text-gray-500`} peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all`}>Retype password</label>
                                {errors.retypePassword && <div className="text-red-500 text-sm mt-1">{errors.retypePassword}</div>}
                            </div>
                            
                        </div>
                    </div>
                    <div className="modal-action">
                        <button className="btn mr-2" onClick={handleSave}>Save</button>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                        
                    </div>
                </div>
            </dialog>
        </>
    )
}

const Profile = () => {
    const { user, setUser } = useAuth();
    const [profile, setProfile] = useState({
        id_cus: user.user.customer.id_cus,
        username_acc: user.user.username_acc,
        password_acc: user.user.password_acc,
        name_cus: user.user.customer.name_cus,
        email_cus: user.user.customer.email_cus,
        phone_cus: user.user.customer.phone_cus,
        address_cus: user.user.customer.address_cus,
        avatar_acc: '/uploads/images/avatars/' + user.user.avatar_acc
    });

    const [errors, setErrors] = useState({
        name_cus: '',
        email_cus: '',
        phone_cus: '',
        address_cus: ''
    });

    const [editState, setEditState] = useState(false);

    useEffect(() => {
        if (editState) {
            setProfile({
                id_cus: user.user.customer.id_cus,
                username_acc: user.user.username_acc,
                password_acc: user.user.password_acc,
                name_cus: user.user.customer.name_cus,
                email_cus: user.user.customer.email_cus,
                phone_cus: user.user.customer.phone_cus,
                address_cus: user.user.customer.address_cus,
                avatar_acc: '/uploads/images/avatars/' + user.user.avatar_acc
            })
        }

    }, [editState])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validation rules for specific fields
        switch (name) {
            case 'name_cus':
                if (value.trim() === '') {
                    setErrors(prev => ({ ...prev, name_cus: 'Name is required' }));
                } else if (value.length > 50) {
                    setErrors(prev => ({ ...prev, name_cus: 'Name is too long' }));
                } else {
                    setErrors(prev => ({ ...prev, name_cus: '' }));
                }
                break;
            case 'email_cus':
                if (value.trim() === '') {
                    setErrors(prev => ({ ...prev, email_cus: 'Email is required' }));
                } else if (value.length > 50) {
                    setErrors(prev => ({ ...prev, email_cus: 'Email is too long' }));
                } else {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        setErrors(prev => ({ ...prev, email_cus: 'Invalid email address' }));
                    } else {
                        setErrors(prev => ({ ...prev, email_cus: '' }));
                    }
                }
                break;
            case 'phone_cus':
                if (value.trim() === '') {
                    setErrors(prev => ({ ...prev, phone_cus: 'Phone number is required' }));
                } else if (value.length !== 10) {
                    setErrors(prev => ({ ...prev, phone_cus: 'Phone number must be 10 digits' }));
                } else {
                    const phoneRegex = /^(84|0[35789])+([0-9]{8})$/;
                    if (!phoneRegex.test(value)) {
                        setErrors(prev => ({ ...prev, phone_cus: 'Invalid phone number' }));
                    } else {
                        setErrors(prev => ({ ...prev, phone_cus: '' }));
                    }
                }
                break;
            case 'address_cus':
                if (value.trim() === '') {
                    setErrors(prev => ({ ...prev, address_cus: 'Address is required' }));
                } else if (value.length > 50) {
                    setErrors(prev => ({ ...prev, address_cus: 'Address is too long' }));
                } else {
                    setErrors(prev => ({ ...prev, address_cus: '' }));
                }
                break;
            default:
                break;
        }

        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleCancelEdit = () => {
        setEditState(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile(prevProfile => ({
                    ...prevProfile,
                    avatar_acc: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }



    }

    const handleOnSave = () => {
        const formData = new FormData()
        formData.append('id_cus', profile.id_cus)
        formData.append('name_cus', profile.name_cus)
        formData.append('email_cus', profile.email_cus)
        formData.append('phone_cus', profile.phone_cus)
        formData.append('address_cus', profile.address_cus)
        formData.append('avatar_acc', profile.avatar_acc)

        try {
            const blob = dataURItoBlob(profile.avatar_acc)
            const file = new File([blob], 'avatar.png', { type: 'image/png' })
            formData.append('avatar_acc', file)
        } catch (error) { }

        api.authApi.updateProfile(user.user.id_acc, formData)
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result.data))
                setUser({
                    auth: true,
                    user: result.data
                })
                MyToast('success', 'Update successful')
                setEditState(false)

            }).catch((err) => {
                MyToast('success', 'Update failed')
            });

    }


    return (
        <div className='max-w-md mt-[220px] mx-auto flex flex-col items-center gap-5'>
            <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={profile.avatar_acc} alt="Avatar" />
                </div>
                {editState &&
                    <label className='absolute bottom-0 right-0 bg-white rounded-md hover:cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <g transform="translate(2 3)">
                                <path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z" />
                                <circle cx="10" cy="10" r="4" />
                            </g>
                        </svg>
                        <input
                            id="upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                }
            </div>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input value={profile.username_acc} onChange={handleInputChange} type="text" className="grow" placeholder="Username" name='username_acc' disabled />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className='opacity-70' fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type="password" className="grow disabled" placeholder="Password" value={'password'} disabled />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className='opacity-70' stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                <input type="text" className="grow" placeholder="Name" value={profile.name_cus} onChange={handleInputChange} name='name_cus' disabled={!editState} />
                {errors.name_cus && <div className="text-red-500 text-sm">{errors.name_cus}</div>}
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" value={profile.email_cus} onChange={handleInputChange} name='email_cus' disabled={!editState} />
                {errors.email_cus && <div className="text-red-500 text-sm">{errors.email_cus}</div>}
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className='opacity-70' stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </svg>
                <input type="text" className="grow" placeholder="Phone" value={profile.phone_cus} onChange={handleInputChange} name='phone_cus' disabled={!editState} />
                {errors.phone_cus && <div className="text-red-500 text-sm">{errors.phone_cus}</div>}
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className='opacity-70' stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <input type="text" className="grow" placeholder="Address" value={profile.address_cus} onChange={handleInputChange} name='address_cus' disabled={!editState} />
                {errors.address_cus && <div className="text-red-500 text-sm">{errors.address_cus}</div>}
            </label>
            <div>
                {editState ?
                    <>
                        <button
                            className={`px-5 py-2 border rounded-lg  ${!Object.values(errors).some(error => error !== '') ? 'hover:bg-greyButton rounded-lg bg-bluee text-black transition-colors duration-500' : 'btn-disabled'}`}
                            onClick={handleOnSave}
                        >
                            Save
                        </button>
                        <button className='ml-2 hover:bg-greyButton px-5 py-2 rounded-lg hover:text-white bg-bluee text-black transition-colors duration-500' onClick={handleCancelEdit}>Cancel</button>
                    </>
                    :
                    <>
                        <button className='hover:bg-greyButton px-5 py-2 rounded-lg hover:text-white bg-bluee text-black transition-colors duration-500' onClick={() => setEditState(true)}>Edit</button>
                        <ModalChangePassword />
                    </>
                }
            </div>
        </div>
    )
}


export default Profile;
