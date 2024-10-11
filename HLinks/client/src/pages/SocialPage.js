
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SocialPage = ({  }) => {
  const [socialLinks, setSocialLinks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"); // State for the image preview

const location= useLocation()

  // Fetch user social links on page load
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/:${location.pathname}`);

      
   
        if (response.data.success) {
       
              setImagePreview(response.data.socialLinks.profileImage); // Set image preview to base64 string
      
          setSocialLinks(response.data.socialLinks);
        } else {
          setError(data.message);
        }
      } catch (err) {
   
        setError('Failed to fetch social links');
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, [location.pathname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
      <h2>{socialLinks.name}</h2>
      <p className="short-title">{socialLinks.shortTitle}</p>
      <img src={imagePreview}  className="profile-image" alt="Profile" width={100} />

      <h3>Social Links:</h3>
      <ul className="social-links ">
        {socialLinks.socialLinks.map((link, index) => (
          <li className=' my-3 fs-2 d-flex justify-content-center align-items-center' key={index}>
          <i className={link.icon}></i>
          
            <a href={link.link} className='mx-3 fs-5 w-75' target="_blank"  rel="noopener noreferrer">
          {link.platform}
            </a>
          </li>
        ))}
      </ul>
      
      <p className="vanity-link">{socialLinks.vanityLink}</p>
    </div>
  );
};

export default SocialPage;
