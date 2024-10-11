import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Dashboard() {
  if (!localStorage.getItem("hlinks")) {
    return <Navigate to="/" />;
  }
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("hlinks");

  useEffect(() => {
   
  
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/getSocialData`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token
            },
          }
        );
      
        
        if (!response.data.success) {
          throw new Error("User not found");
        }
      
  
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);
  
  const removeprofile= async(d1)=>{

    try {
        const response = await axios.post("http://localhost:3000/api/removeSocialData",{id:d1},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token
            },
          }
        );
     
        if (response.data.success) {
            setUser([]); // Clear user data after deletion
          } else {
            throw new Error("Failed to delete profile");
          }
      
    //   location.reload()
      } catch (err) {
        setError(err.message);
      }
  }
 
  return (
    <div>
      <Navbar />
      <div className="container my-3">
    {
        
        user&&user.user?(
            <div className="card mb-3" style={{ maxWidth: "540px;" }}>
            <div className="row g-0 d-flex">
              <div className="col-md-2 d-flex align-items-center justify-content-center">
                <img src={user.user.profileImage}  width={140} height={140} className="ms-3 border border-success border-4  rounded-circle" alt="..." />
              </div>
              <div className="col-md-8 d-flex w-75">
                <div className="card-body">
                  <h5 className="card-title">{user.user.name}</h5>
                  <p className="card-text">
                   {user.user.shortTitle
                   }
                  </p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {user.user.vanityLink
                      }
                    </small>
                  </p>
                </div>
              <div className="remove float-end d-flex align-items-center justify-content-center"  onClick={()=>removeprofile(user.user._id)}>  <i className="fas fa-trash fs-4"></i></div>
              </div>
            </div>
          </div>
        ):(
        null
        )
    }
      
   
      
 
       
      </div>
    </div>
  );
}

export default Dashboard;
