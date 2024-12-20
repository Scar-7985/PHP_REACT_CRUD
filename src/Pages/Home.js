import axios from 'axios';
import React, { useState } from 'react'
import CRUD from './CRUD';

const Home = () => {

  //================= POST DATA Starts =================//
  
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
  })
  
  // console.log("UserData => ", userData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost/server/post.php", userData, {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      console.log(error);

    } finally {
      setUserData({
        name: '',
        phone: '',
      })
    }
    
    // setUserData({ name: '', phone: '' });
  }
  
  //================= POST DATA Starts =================//
  
  return (
    <div className="bg-white w-[500px] h-[600px] shadow-md p-10 rounded-md">
      <div className="text-3xl text-center font-bold text-orange-500">CRUD Application</div>

      {/*======================== Form Start ========================*/}

      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            className="mt-4 w-full shadow-md rounded-md px-4 py-2 outline-none
                     border-2 border-gray-100 focus:shadow-green-300 
                     focus:border-green-100 text-green-500"
            placeholder="Your Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={userData.name}
          />
          <input
            className="mt-4 w-full shadow-md rounded-md px-4 py-2 outline-none
                     border-2 border-gray-100 focus:shadow-green-300 
                     focus:border-green-100 text-green-500"
            placeholder="Your Phone number"
            type="text"
            name="phone"
            onChange={handleChange}
            value={userData.phone}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 rounded-md py-2 border font-bold shadow-md
         shadow-green-300 bg-green-400 text-white active:scale-105"
        >
          Add to list
        </button>
      </form>

      {/*======================== Form Ends ========================*/}

      {/* User List Starts */}

      <div className='mt-14 h-[320px]'>
        <CRUD />
      </div>

      {/* User List Ends */}

    </div>
  )
}

export default Home;
