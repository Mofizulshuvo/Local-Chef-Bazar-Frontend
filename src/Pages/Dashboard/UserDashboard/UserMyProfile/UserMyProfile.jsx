import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/AuthContext';
import axios from 'axios';

const UserMyProfile = () => {
    const {user,setUserAllDataFromDB,UsersAllDataFromDB}=useContext(AuthContext);
    console.log(user);
    console.log(UsersAllDataFromDB);

    return (
        <div className='w-full text-center items-center'>
            <div className='mx-auto'>
                <img src="" alt="" />
            <div>
                <h1>{UsersAllDataFromDB.email}</h1>
                <h1>{UsersAllDataFromDB.name}</h1>
                <h1>{UsersAllDataFromDB.address}</h1>
                <h1>{UsersAllDataFromDB.role}</h1>
                <h1>{UsersAllDataFromDB.profileImage}</h1>
                <h1>{UsersAllDataFromDB.name}</h1>
                
            </div>
            </div>
        </div>
    );
};

export default UserMyProfile;