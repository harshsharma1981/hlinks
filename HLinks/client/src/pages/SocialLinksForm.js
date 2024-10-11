import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';


const SocialLinksForm = () => {
  if (!localStorage.getItem('hlinks')) {

    return <Navigate to="/"/>
     
     }
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [linkpage, setlinkpage] = useState(false);
  const [shortTitle, setShortTitle] = useState('');
  const [erorr2, setError] = useState('');
  const [linkmain, setlinkmain] = useState('');
  const [vanityLink, setVanityLink] = useState(''); // Vanity link state
  const [socialLinks, setSocialLinks] = useState([{ platform: '', link: '' ,icon:'fab fa-facebook'}]);
  const [selectedIcon, setSelectedIcon] = useState('fab fa-facebook');
  const [isOpen, setIsOpen] = useState({check:false,target:""});
  const [image, setImage] = useState(null); // State to store the uploaded image
  const [imagePreview, setImagePreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"); // State for the image preview
  const token = localStorage.getItem('hlinks');
const [loading ,setLoading]=useState(false)

  const icons = [
    { name: 'Facebook', iconClass: 'fab fa-facebook' },
    { name: 'Twitter', iconClass: 'fab fa-twitter' },
    { name: 'Instagram', iconClass: 'fab fa-instagram' },
    { name: 'LinkedIn', iconClass: 'fab fa-linkedin' },
    { name: 'YouTube', iconClass: 'fab fa-youtube' },
    { name: 'GitHub', iconClass: 'fab fa-github' },
    { name: 'Reddit', iconClass: 'fab fa-reddit' },
    { name: 'Pinterest', iconClass: 'fab fa-pinterest' },
    { name: 'Snapchat', iconClass: 'fab fa-snapchat' },
    { name: 'TikTok', iconClass: 'fab fa-tiktok' },
    { name: 'WhatsApp', iconClass: 'fab fa-whatsapp' },
    { name: 'Telegram', iconClass: 'fab fa-telegram' },
    { name: 'Vimeo', iconClass: 'fab fa-vimeo' },
    { name: 'Flickr', iconClass: 'fab fa-flickr' },
    { name: 'Discord', iconClass: 'fab fa-discord' },
    { name: 'Tumblr', iconClass: 'fab fa-tumblr' },
    { name: 'Foursquare', iconClass: 'fab fa-foursquare' },
    { name: 'SoundCloud', iconClass: 'fab fa-soundcloud' },
    { name: 'Yelp', iconClass: 'fab fa-yelp' },
    { name: 'Behance', iconClass: 'fab fa-behance' },
    { name: 'Dribbble', iconClass: 'fab fa-dribbble' },
    { name: 'Kickstarter', iconClass: 'fab fa-kickstarter' },
    { name: 'Steam', iconClass: 'fab fa-steam' },
    { name: 'Django', iconClass: 'fab fa-django' },
    { name: 'Blogger', iconClass: 'fab fa-blogger' },
    { name: 'Myspace', iconClass: 'fab fa-myspace' },
    { name: 'WordPress', iconClass: 'fab fa-wordpress' },
    { name: 'Xing', iconClass: 'fab fa-xing' },
    { name: 'Weibo', iconClass: 'fab fa-weibo' },
    { name: 'Tumblr', iconClass: 'fab fa-tumblr' },
    { name: 'Mastodon', iconClass: 'fab fa-mastodon' },
    { name: 'WeChat', iconClass: 'fab fa-weixin' },
    { name: 'Quora', iconClass: 'fab fa-quora' },
    { name: 'VK', iconClass: 'fab fa-vk' },
    { name: 'Foursquare', iconClass: 'fab fa-foursquare' },
    { name: 'Twitch', iconClass: 'fab fa-twitch' },
    { name: 'Mailchimp', iconClass: 'fab fa-mailchimp' },
    { name: 'Google Plus', iconClass: 'fab fa-google-plus' },
    { name: 'Baidu', iconClass: 'fab fa-baidu' },
    { name: 'Alibaba', iconClass: 'fab fa-alibaba' },
    { name: 'Trello', iconClass: 'fab fa-trello' },
    { name: 'Mix', iconClass: 'fab fa-mix' },
    { name: 'Product Hunt', iconClass: 'fab fa-product-hunt' },
    { name: 'Bitbucket', iconClass: 'fab fa-bitbucket' },
    { name: 'Salesforce', iconClass: 'fab fa-salesforce' },
    { name: 'Spotify', iconClass: 'fab fa-spotify' },
    { name: 'Stripe', iconClass: 'fab fa-stripe' },
    { name: 'Apple', iconClass: 'fab fa-apple' },
    { name: 'Microsoft', iconClass: 'fab fa-microsoft' },
    { name: 'Amazon', iconClass: 'fab fa-amazon' },
    { name: 'Netflix', iconClass: 'fab fa-netflix' },
    { name: 'Yandex', iconClass: 'fab fa-yandex' },
    { name: 'PayPal', iconClass: 'fab fa-paypal' },
    { name: 'Booking', iconClass: 'fab fa-booking.com' },
    { name: 'GitLab', iconClass: 'fab fa-gitlab' },
    { name: 'Mail.ru', iconClass: 'fab fa-mail.ru' },
    { name: 'Zalo', iconClass: 'fab fa-zalo' },
  ];
  
  const handleIconSelect =  (index, field, value) => {
    const updatedLinks = [...socialLinks];
  
     updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
    setSelectedIcon(value);
    setIsOpen(false);
  };

  const toggleDropdown = (targetid) => {
    setIsOpen(prevState => ({
      check: !prevState.check,
      target: targetid
    }));   
  };

  const location= useLocation()
  // Function to handle input changes for social links
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  
  };

  // Function to add a new social link input
  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', link: '' ,icon:""}]);
  };

  // Function to handle form submission
  const UploadImage= async(e)=>{
  
    e.preventDefault();
    if (!image) {
   
      return;
    }
  
    
  try {
  
    const response = await axios.post('http://localhost:3000/api/upload', {image}, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token
      },
    }); 
   
  } catch (error) {
  
  }
  
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the token from localStorage (assuming it's stored there after login)
    if (!image) {
      
      return;
    }
  
    // Create form data to send to the server
    const formData = {
      profileImage,
      name,
      shortTitle,
      vanityLink,
      socialLinks,
    };

    try {
    setLoading(true)
      // Send data to the server with the token in the headers
     
      const response = await axios.post('http://localhost:3000/api/social-links', formData, {
        headers: {
        // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Attach the token
        },
      });
      if (!response.data.success) {
        return <div>oops something went wrong</div>
      }
      setLoading(false)
  
    
     setlinkpage(true)
     setlinkmain(response.data.link)
      // Optionally handle success (e.g., show a success message or reset the form)
      setProfileImage('');
      setName('');
      setShortTitle('');
      setVanityLink('');
      setSocialLinks([{ platform: '', link: '' }]);
    } catch (error) {
    setError(error.response.data.message)
    
      // Optionally handle error (e.g., show an error message)
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set image preview to base64 string
 setImage(reader.result); // Set the base64 string
 setProfileImage(reader.result)
      
    };
    reader.readAsDataURL(file); // Convert the image file to a base64 string
    // Convert the image to base64
    
  
  };
if (loading){
return <h3 style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center",  height:"100vh"}}>loading...</h3>
}

  return (
  <div>
  <Navbar/>
    <div className="social-links-form">
    {
    linkpage?(
    
    <h3 className='d-flex justify-content-center flex-column align-items-center w-100' style={{height:"100vh"}}>This Is Link Of Your Social Page<a href={linkmain}>{linkmain}</a></h3>
    ):(
    <div> <h2 className='text-danger '>{erorr2}</h2>
    <h2 className='py-4 d-flex justify-content-center'>Add Your Social Links</h2>
      {/* <label>
        Profile Image URL:
        <input
          type="text"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          required
        />
      </label> */}
         <form onSubmit={handleSubmit} >
      <div className="image-input py-2">
      <img src={imagePreview} className='rounded-circle mb-3' width={100} height={100} alt="" />
   

          <label>
            Profile Image:
            <input
            className='btn btn-primary'
            name='image'
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
         

 
        </div>

 
      
      
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      
      <label>
        Short Title:
        <input
          type="text"
          value={shortTitle}
          onChange={(e) => setShortTitle(e.target.value)}
          required
        />
      </label>

      <label>
      Add here your back link Name
      
      <div class="input-group pt-3">
  <span className="input-group-text" id="basic-addon3">http://localhost:3001/</span>
  <input type="text"   value={vanityLink}
          onChange={(e) => setVanityLink(e.target.value)}
          placeholder=""
          required className="form-control m-0" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
</div>
     
      </label>

      <h3>Social Links</h3>
      {socialLinks.map((link, index) => (
        <div key={index} className="social-link">
          <label>
            Platform:
            <input
              type="text"
              value={link.platform}
              onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
              placeholder="e.g., Facebook, Twitter"
              required
            />
          </label>
          <label>
            Link:
            <input
              type="url"
              value={link.link}
              onChange={(e) => handleLinkChange(index, 'link', e.target.value)}
              placeholder="https://example.com"
              required
            />
          </label>
          
          
          <div>
      <h3>Select a Social Media Icon:</h3>
      <div className="custom-select" onClick={()=>toggleDropdown(index)}>
        <div className="select-selected fs-3 border border-dark">
          <i className={link.icon}></i> Choose Icon <i className="fas float-end fa-chevron-down p-2"></i>
        </div>
        {isOpen.check && index==isOpen.target?(
          <div className="select-items row">
            {icons.map((icon, i) => (
              <div key={i}  className='col-md-2 col-sm-6 col-12 mb-4 border border-dark py-2 fs-1 d-flex justify-content-center'      value={link.icon}
              onClick={() => handleIconSelect(index,"icon",icon.iconClass)}>
                <i className={icon.iconClass} ></i>
              </div>
            ))}
          </div>
        ):(null)}
      </div>
      <div className="icon-preview fs-3">
        <i className={link.icon} style={{ fontSize: '2.5rem' }}></i>
      </div>
    </div>
        </div>
      ))}
      <button type="button" onClick={addSocialLink}>Add More Links</button>
      <button type="submit">Submit</button>
    </form></div>
    )
    }
     </div>
    </div>
  );
};

export default SocialLinksForm;
