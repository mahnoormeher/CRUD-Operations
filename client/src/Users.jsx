import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Users() {
    const [ users, setUsers] = useState([])

    useEffect(()=>{
axios.get('https://crud-operations-backened.onrender.com')
.then(result=> setUsers(result.data))
.catch(err=>console.log(err))

    },[])

    const handlrDelete=(id)=>{
      axios.delete('https://crud-operations-backened.onrender.com/deleteUser/'+id)
     .then(res=> {console.log(res)
      window.location.reload()
     })
.catch(err=>console.log(err))
 
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='container bg-white rounded p-3'>
        <Link to ='/create' className='btn btn-success'>Add +</Link>
<div className="table-responsive">
<table className='table'>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
        </tr>
    </thead>
<tbody>
{
  Array.isArray(users) && users.length > 0 ? (
    users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.age}</td>
        <td>
          <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
          <button className='btn btn-danger' onClick={() => handlrDelete(user._id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center">No users found.</td>
    </tr>
  )
}
</tbody>

</table>
</div>
      </div>
    </div>
  )
}

export default Users
