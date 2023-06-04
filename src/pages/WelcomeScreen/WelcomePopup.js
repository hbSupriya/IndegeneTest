import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import elancoPopupImg from "../../assets/images_logos/elancoPopupImg.png";

function WelcomePopup({ closePopup }) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleOverlayClick = (event) => {
  };

  return (
    <Dialog open={isDialogOpen}  onClose={closeDialog} disableEscapeKeyDown
    onClick={handleOverlayClick}>
      <DialogTitle sx={{ display:'flex', flexDirection:'column', margin:'auto', padding:'16px 24px 0px'}}>
        <img src={elancoPopupImg} alt="Elanco" style={{margin:'auto'}} width={150} height={85} />
        <p style={{color:"#063970", fontWeight:'600'}}>Welcome To ELANCO Dashboard</p>
      </DialogTitle>
      <DialogContent sx={{paddingTop:'0'}}>
        <DialogContentText sx={{textAlign:'center'}}>
          Elanco is a global leader in animal health.
        </DialogContentText>
        <DialogContentText sx={{textAlign:'justify'}}>
          We are dedicated to innovating and delivering products and services to prevent and treat disease in farm animals and pets, creating value for farmers, pet owners, veterinarians, stakeholders, and society as a whole.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{justifyContent:'center'}}>
        <Button variant='contained' sx={{backgroundColor:"#063970"}}  className="popup-close-btn" onClick={closePopup}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  );
}

export default WelcomePopup;
