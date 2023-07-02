import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import Modal from '@mui/material/Modal';
import "./modal.css"

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

const InforModal = ({open, handleClose, user = null}) => {
    return (
        <>
        {Object.keys(user).length !== 0 && 
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backdropFilter: "blur(5px)" }}
    >
        <Box sx={style} className="modal-container">
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {user.name}
            </Typography>
            <div className='modal-address'>
                <div className='modal-subheader'>
                    <BusinessIcon sx={{color: "#931639"}}/>
                    <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1, fontWeight: 600 }}>
                        Company Name
                    </Typography>
                </div>
                <p className='modal-text-body'>
                    {user.company.name}
                </p>
            </div>
            <div className='modal-address'>
                <div className='modal-subheader'>
                    <HomeIcon sx={{color: "#931639"}}/>
                    <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1, fontWeight: 600 }}>
                        Address
                    </Typography>
                </div>
                <p className='modal-text-body'>
                    {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}.
                </p>
            </div>
            <div className='modal-address'>
                <div className='modal-subheader'>
                    <InfoIcon sx={{color: "#931639"}}/>
                    <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1, fontWeight: 600 }}>
                        Contact Information
                    </Typography>
                </div>
                <p className='modal-text-body'>
                    {user.email}
                </p>
                <p className='modal-text-body'>
                    {user.phone}
                </p>
                <p className='modal-text-body'>
                    {user.website}
                </p>
            </div>
            <div className='modal-footer'>
                <button className='modal-close' onClick={handleClose}>Close</button>
            </div>
        </Box>
    </Modal>
        }
            
        </>
    );
}

export default InforModal;