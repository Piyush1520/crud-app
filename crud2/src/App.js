import './App.css';
import React, {useState} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {PlusCircle,Edit,Trash2} from 'react-feather';
function App() {

   const blankuser={
    "name":"",
    "email":"",
    "role":"",
    "address":""
   }

  const [open, setOpen] = useState(false);
  const [user, setuser] = useState(blankuser);
  const [userdata, setuserdata] = useState([]);
  const [action, setaction] = useState('add');
  const [editindex, seteditindex] = useState(null);


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () =>
    { setOpen(false);
      setaction('add');
    }

  const adduser= ()=>{
    setuserdata([...userdata,user]);
    setuser(blankuser);
    onCloseModal();
  }
  const edituser=(index)=>{
    setaction('Edit');
    const selecteduser=userdata.find((x,i) =>i== index);
    setuser(selecteduser);
    seteditindex(index);
    onOpenModal();


  }
    const updateuser=()=>{
      const newuser=userdata.map((x,i) => {
        if(i === editindex){

          x=user
        }
return x
      });

      setuserdata(newuser);
      setuser(blankuser);
      seteditindex(null);
      onCloseModal();
    }
    const deleteuser=(index)=>{
    const newuser=userdata.filter((x,i) => { return i != index});
    setuserdata(newuser);
    }
    
    

  return (
    <div className="container">
      <div className='d-flex'>
        <h1 className='heading'>CRUD APP</h1>

      </div>
      <div className='toolbar'>
        <button className='btn' onClick={onOpenModal}>
          <PlusCircle size={16}></PlusCircle>
          <span>Add</span>
        </button>
      </div>
      <hr />
      <p>{JSON.stringify(userdata)}</p>
     
      <table className='table'>
        <thead>
          <tr>
            <th>name</th>
            <th> Email</th>
            <th> role</th>
            <th>address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { userdata.length> 0 && userdata.map((user,index)=>{
           return (<tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td> {user.role}</td>
            <td>{user.address}</td>
            <td>
              <button className='btn ml2' onClick={()=>edituser(index)}>
                <Edit size={16}></Edit>
                <span>Edit</span>
              </button>
              <button className='btn ml2 ' onClick={()=> deleteuser(index)}>
                <Trash2 size={16}></Trash2>
                <span>Delete</span>

              </button>
            </td>
           </tr>)
          })
          }
           
        </tbody>
      </table>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>{action} user</h2>
        <p>{JSON.stringify(user)}</p>
        <div className='form'>
        <label htmlFor="name">name</label>
        <input type="text" value={user.name} onChange={(e)=> setuser({...user,"name":e.target.value})}/>
        <label htmlFor="name">E-mail</label>
        <input type="text" value={user.email}  onChange={(e)=> setuser({...user,"email":e.target.value})}/>
        <label htmlFor="name">role</label>
        <input type="text" value={user.role} onChange={(e)=> setuser({...user,"role":e.target.value})} />
        <label htmlFor="name">Address</label>
        <textarea name="address" id="" cols='30' rows='4'value={user.address} onChange={(e)=> setuser({...user,"address":e.target.value})}></textarea>
        { action =='add' && <button className='btn' onClick={()=>adduser()}>  Submit</button>}
        { action =='Edit' && <button className='btn' onClick={()=>updateuser()}>  update</button>}
       
        </div>

      </Modal>
       
    </div>
  );
};

export default App;
