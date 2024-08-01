"use client";
import { useState } from "react";
import {
 Fab,
 TextField,
 Modal,
 Button,
 Typography,
 Box,
 Stack,
 IconButton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const style = {
 position: "absolute" as "absolute",
 top: "50%",
 left: "50%",
 transform: "translate(-50%, -50%)",
 width: 400,
 bgcolor: "background.paper",
 border: "2px solid #000",
 boxShadow: 24,

 p: 4,
};
function AddInventoryMenu() {
 const [open, setOpen] = useState(true);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 return (
  <>
   {" "}
   <Button onClick={handleOpen} color="inherit" endIcon={<ControlPointIcon />}>
    Add Inventory
   </Button>
   <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <Box sx={style}>
     <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      color="primary.main"
     >
      Add Inventory
     </Typography>
     <IconButton
      aria-label="delete"
      sx={{ width: "fit-content", position: "absolute", top: 0, right: 0 }}
     >
      <CloseIcon onClick={handleClose}/>
     </IconButton>
     <Stack sx={{ mt: 1 }} spacing={2}>
      <TextField id="outlined-basic" label="Item Name" variant="outlined" />
      <TextField
       id="outlined-textarea"
       label="Description"
       placeholder="Type Here"
       rows={4}
       multiline
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DatePicker label="Expiration Date" />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DatePicker label="Purchase Date" />
      </LocalizationProvider>
      <Fab color="primary" aria-label="add" sx={{ alignSelf: "end" }}>
       <AddIcon />
      </Fab>
     </Stack>
    </Box>
   </Modal>
  </>
 );
}

export default AddInventoryMenu;
