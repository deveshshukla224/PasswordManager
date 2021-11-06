import './App.css';
import { useState,useEffect} from 'react';
import Axios from 'axios';


function App() {
  const[password,setPassword]=useState('');
  const[plateform,setPlateform]=useState('');
  const[passwordList,setPasswordList]=useState([]);
  
  
  useEffect(()=>{
  Axios.get("http://localhost:3001/showpasswords").then((response)=>{
    setPasswordList(response.data);
  })
  },[]);


  const addPassword =()=>{
  Axios.post("http://localhost:3001/addpassword",{
    plateform :plateform,
    password:password,
  });
  };

const decryptPassword = (encryption)=>{
  Axios.post("http://localhost:3001/decryptpassword",
  {
    password:encryption.password,
    iv:encryption.iv,}).then((response)=>{
    console.log(response.data);
    });
};


  return (
    <div className="App">
      <div className="AddingPassword">
        <input type="text" 
        placeholder="Plateform Name"
        onChange={
          (event)=>{setPlateform(event.target.value)
          }}></input>
        <input type="text" 
        placeholder="Enter Your Password" 
        onChange={
          (event)=>{setPassword(event.target.value)
          }}></input>
        <button type="submit" onClick={addPassword}>Save Password</button>
      </div>
      <div className="Passwords">
        {passwordList.map((val,index)=>{
             return <div key={index}
             className="password" 
             onClick={()=>{decryptPassword({password:val.password,iv:val.iv,id:val.id})}}>
              <h3>{val.platform}</h3>
              </div>
        })}
      </div>
    </div>
  );
}

export default App;
