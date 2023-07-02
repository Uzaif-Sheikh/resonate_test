import logo from './logo.svg';
import { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import './App.css';
import NavBar from './components/navbar/navbar';
import Button from '@mui/material/Button';
import InforModal from './components/Modal/modal';




function App() {

  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (userIn) => {
    setOpen(true)
    setUserInfo({ ...userIn })
  };
  const handleClose = () => setOpen(false);



  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(res => {
        setUsers(res);
        console.log(res);
      })
      .catch(err => {
        alert(err);
      })
  }, []);

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className='main-container'>

        {users.map(user => {
          return (
            <div className="card" key={user.id}>
              <div className="card-details">
                <p className="text-title">{user.name}</p>
                <div className="card-body">
                  <div className="email-info">
                    <div className="email-icon"><EmailIcon /></div>
                    <p className="text-body">{user.email}</p>
                  </div>
                  <div className="phone-info">
                    <div className="phone-icon"><PhoneIcon /></div>
                    <p className="text-body">{user.phone}</p>
                  </div>
                  <div className="web-info">
                    <div className="web-icon"><LanguageIcon /></div>
                    <p className="text-body">{user.website}</p>
                  </div>

                </div>
              </div>
              <button className="card-button" onClick={() => handleOpen(user)}>More info</button>
            </div>
          );
        })}

        <InforModal open={open} handleClose={handleClose} user={userInfo}></InforModal>
      </div>
    </div>
  );
}

export default App;
