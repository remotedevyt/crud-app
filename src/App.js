import './App.css';
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { PlusCircle, Edit, Trash2 } from 'react-feather';
import { Modal } from 'react-responsive-modal';
function App() {

  const blankuser = {
    "name":"",
    "email":"",
    "address":""
  }

  const [open, setOpen] = useState(false);
  const [action,setAction] = useState('Add');
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useState(blankuser);
  const [editIndex, setEditIndex] = useState(null);


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setAction('Add')
  }

  const addUser = () => {
    setUserdata([...userdata,user]);
    setUser(blankuser);
    onCloseModal();
  }

  const editUser = (index) => {
    console.log("index",index);
    setAction('Edit');
    const selectedUser = userdata.find((x,i) => i == index);
    setUser(selectedUser);
    setEditIndex(index);
    onOpenModal(); 
  }

  const updateUser = () => {
    const newusers = userdata.map((x,i) => {
      if(i === editIndex){
        x = user
      }
      return x
    });
    setUserdata(newusers);
    setUser(blankuser);
    setEditIndex(null);
    onCloseModal();
  }

  const deleteUser = (index) => {
    const newusers = userdata.filter((x,i) => {return i !== index});
    setUserdata(newusers);
  }

  return (
    
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
      <button className='btn btn-p' onClick={onOpenModal}><PlusCircle size={16}></PlusCircle><span>Add</span></button>
      </div>
      <hr />
      {/* <p>{JSON.stringify(userdata)}</p> */}
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userdata.length > 0 && userdata.map((user,index) => {
            return (<tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button className='btn ml2' onClick={() => editUser(index)}><Edit size={16}></Edit><span>Edit</span></button>
                <button className='btn ml2' onClick={() => deleteUser(index)}><Trash2 size={16}></Trash2><span>Delete</span></button>
              </td>
            </tr>)
          })
          }
        </tbody>
      </table>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} User</h2>
        {/* <p>{JSON.stringify(user)}</p> */}
        <div className='form'>
          <label htmlFor="">Name</label>
          <input type="text" value={user.name} onChange={(e) => setUser({...user,"name":e.target.value})} />
          <label htmlFor="">Email</label>
          <input type="text" value={user.email} onChange={(e) => setUser({...user,"email":e.target.value})} />
          <label htmlFor="">Address</label>
          <textarea name="" id="" value={user.address} cols="30" rows="5" onChange={(e) => setUser({...user,"address":e.target.value})}></textarea>
          {action == 'Add' && <button className='btn' onClick={() => addUser()}>Submit</button>}
          {action == 'Edit' && <button className='btn' onClick={() => updateUser()}>Update</button>}
        </div>
      </Modal>
    </div>
  );
}

export default App;
