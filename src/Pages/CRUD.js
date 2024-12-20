import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const CRUD = () => {
  const [formType, setFormType] = useState(false);
  const [getData, setData] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '' });
  const [changeData, setChangeData] = useState({ id: null, name: '', phone: '' });
  // console.log("changedData =>", changeData);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost/server/get.php");
      setData(response.data);
    } catch (error) {
      setError("Failed to fetch data.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReplace = (e) => {
    const { name, value } = e.target;
    setChangeData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.phone) {
      setError("Name and Phone are required!");
      return;
    }

    try {
      await axios.post("http://localhost/server/post.php", userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setUserData({ name: '', phone: '' });
      fetchData();
      setError(null);
    } catch (error) {
      setError("Failed to add user.");
      console.error(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost/server/update.php", changeData,
        {
          headers: { 'Content-Type': 'application/json' },
        });

      setChangeData({ id: null, name: '', phone: '' });
      setFormType(false);
      fetchData();
      setError(null);
    } catch (error) {
      setError("Failed to update user.");
      console.error(error);
    }
  };







  const deleteData = async (id) => {
    try {
      await axios.delete("http://localhost/server/delete.php", {
        data: { userId: id },
        headers: { 'Content-Type': 'application/json' },
      });
      fetchData();
    } catch (error) {
      setError("Failed to delete user.");
      console.error(error);
    }
  };



  const handleEdit = (item) => {
    setFormType(true);
    setChangeData({ id: item.id, name: item.name, phone: item.phone });
  };

  return (
    <div className="bg-white w-[500px] h-[600px] shadow-md p-10 rounded-md">
      <div className="text-3xl text-center font-bold text-orange-500">CRUD Application</div>

      {/* Error message display */}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <form onSubmit={formType ? updateData : handleSubmit}>
        <div className="flex gap-2">
          <input
            className="mt-4 w-full shadow-md rounded-md px-4 py-2 outline-none border-2 border-gray-100 focus:shadow-green-300 focus:border-green-100 text-green-500"
            placeholder={formType ? "Change Name" : "Your Name"}
            type="text"
            name="name"
            onChange={formType ? handleReplace : handleChange}
            value={formType ? changeData.name : userData.name}
          />
          <input
            className="mt-4 w-full shadow-md rounded-md px-4 py-2 outline-none border-2 border-gray-100 focus:shadow-green-300 focus:border-green-100 text-green-500"
            placeholder={formType ? "Change Phone No." : "Your Phone number"}
            type="text"
            name="phone"
            onChange={formType ? handleReplace : handleChange}
            value={formType ? changeData.phone : userData.phone}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 rounded-md py-2 border font-bold shadow-md shadow-green-300 bg-green-400 text-white active:scale-105"
        >
          {formType ? "Update User" : "Add to List"}
        </button>
      </form>

      <div className="mt-14 h-[320px]">
        <div className="w-full h-[320px] rounded-md py-2 border font-bold shadow-md shadow-orange-300 bg-orange-400 text-white p-4">
          <h2 className="mx-auto w-2/4 text-center">User Data</h2>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[240px]">
            {getData.map((item) => (
              <div
                key={item.id}
                className="w-[360px] mt-4 rounded-md py-2 border font-bold shadow-md shadow-yellow-300 bg-yellow-400 text-white px-4 flex justify-between"
              >
                <div className="flex flex-col justify-center gap-2">
                  <span>{item.name}</span>
                  <span>{item.phone}</span>
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <button onClick={() => handleEdit(item)}>
                    <FontAwesomeIcon className="text-lg bg-red-400 p-2 rounded-md" icon={faPenToSquare} />
                  </button>
                  <button onClick={() => deleteData(item.id)}>
                    <FontAwesomeIcon className="text-lg bg-red-400 p-2 rounded-md" icon={faTrashCan} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRUD;
