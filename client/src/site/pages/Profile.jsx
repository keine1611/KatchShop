import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
    const { user } = useAuth()
    const [profile, setProfile] = useState({
        username_acc: user.user.username_acc,
        password_acc: user.user.password_acc,
        name_cus: user.user.customer.name_cus,
        email_cus: user.user.customer.email_cus,
        phone_cus: user.user.customer.phone_cus,
        address_cus: user.user.customer.address_cus,
        avatar_acc: '/uploads/images/avatars/'+user.user.avatar_acc
    })
    const [editState, setEditState] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }))
    }

    const handleCancelEdit = () => {
        setEditState(false)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                setProfile(prevProfile => ({
                    ...prevProfile,
                    avatar_acc: imageData
                }));
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div className=' max-w-md mt-[220px] mx-auto flex flex-col items-center gap-5'>
            <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={profile.avatar_acc}/>
                </div>
                {editState &&
                    <label className=' absolute bottom-0 right-0 bg-white rounded-md hover:cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2 3)"><path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z" /><circle cx="10" cy="10" r="4" /></g></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input value={profile.username_acc} onChange={handleInputChange} type="text" className="grow" placeholder="Username" name='username_acc' disabled={!editState} />
            </label>
            <label class="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className='opacity-70' fill="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input type="password" class="grow disabled" placeholder="Password" value={'password'} disabled />
            </label>
            <label class="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className=' opacity-70' viewBox="0 0 24 24" fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                <input type="text" class="grow" placeholder="Name" value={profile.name_cus} onChange={handleInputChange} name='name_cus' disabled={!editState} />
            </label>
            <label class="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input type="text" class="grow" placeholder="Email" value={profile.email_cus} onChange={handleInputChange} name='email_cus' disabled={!editState} />
            </label>
            <label class="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className=' opacity-70' stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <input type="text" class="grow" placeholder="Phone" value={profile.phone_cus} onChange={handleInputChange} name='phone_cus' disabled={!editState} />
            </label>
            <label class="input input-bordered flex items-center gap-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className=' opacity-70' stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg>
                <input type="text" class="grow" placeholder="Address" value={profile.address_cus} onChange={handleInputChange} name='address_cus' disabled={!editState} />
            </label>
            <div>
                {editState ?
                    <>
                        <button className=' hover:bg-greyButton px-5 py-2 rounded-lg hover:text-white bg-bluee text-black transition-colors duration-500' onClick={() => { }}>Save</button>
                        <button className=' ml-2 hover:bg-greyButton px-5 py-2 rounded-lg hover:text-white bg-bluee text-black transition-colors duration-500' onClick={handleCancelEdit}>Cancel</button>
                    </>
                    :
                    <>
                        <button className=' hover:bg-greyButton px-5 py-2 rounded-lg hover:text-white bg-bluee text-black transition-colors duration-500' onClick={() => setEditState(true)}>Edit</button>
                        <button className=' ml-2 hover:bg-greyButton px-5 py-2 rounded-lg hover:text-white bg-bluee text-black transition-colors duration-500'>Change password</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Profile