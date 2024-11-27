
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUserDetails } from "../../services/operations/adminApi";
import Users from './users';

const AllUsersList = () => {
  const dispatch = useDispatch();

  const {token} = useSelector((state) => state.auth);
  const {allUsers, currentUser} = useSelector((state) => state.admin);
  
  console.log(currentUser, '-currentUser');

  function editUserRoleHandler(user) {
    console.log(user._id, '-user')
    dispatch(getUserDetails(token, user._id));
  }

  useEffect(() => {
    dispatch(getAllUsers(token))
  },[])

  return (
    <div className='w-full'>
      {/* {
        allUsers.map((user) => (
          <p key={user._id} onClick={() => {editUserRoleHandler(user)}}>{user.firstName}</p>
        ))
      } */}
      <Users users={allUsers} />
    </div>
  )
}

export default AllUsersList
