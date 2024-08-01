"use client";
import { db } from "../firebase/firebase_init";
import { collection, addDoc } from "firebase/firestore";

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
import dayjs, { Dayjs } from "dayjs";
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
 boxShadow: 24,
 p: 4,
 borderRadius: 3,
};

// interface documentData {
//  name: string;
//  description: string;
//  exp_date: firebase.firestore.Timestamp;
//  purch_date: firebase.firestore.Timestamp;
// }

function AddInventoryMenu() {
 const [itemName, setItemName] = useState("");
 const [itemDesc, setItemDesc] = useState("");
 const [itemExpDate, setItemExpDate] = useState<Dayjs | null>(dayjs(""));
 const [itemPurchDate, setItemPurchDate] = useState<Dayjs | null>(dayjs(""));

 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 async function addInventoryItem() {
  const data = {
   name: itemName,
   description: itemDesc,
   exp_date: itemExpDate ? itemExpDate.toDate() : null, // Convert Dayjs to Date
   purch_date: itemPurchDate ? itemPurchDate.toDate() : null, // Convert Dayjs to Date
  };

  await addDoc(collection(db, "inventory"), data);
  setItemName("");
  setItemDesc("");
  setItemExpDate(null);
  setItemPurchDate(null);
  handleClose();
 }
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
      <CloseIcon onClick={handleClose} />
     </IconButton>

     <Stack sx={{ mt: 1 }} spacing={2}>
      {/* name of item text box */}
      <TextField
       id="outlined-basic"
       label="Item Name"
       variant="outlined"
       onChange={(e) => setItemName(e.target.value)}
      />

      {/* Description Textare */}
      <TextField
       id="outlined-textarea"
       label="Description"
       placeholder="Type Here"
       rows={4}
       multiline
       onChange={(e) => setItemDesc(e.target.value)}
      />

      {/* Expiration Date picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DatePicker
        label="Expiration Date"
        onChange={(newValue) => setItemExpDate(newValue)}
       />
      </LocalizationProvider>

      {/* Pruchase Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DatePicker
        label="Purchase Date"
        onChange={(newValue) => setItemPurchDate(newValue)}
       />
      </LocalizationProvider>

      {/* Add Inventory Button */}
      <Fab
       color="primary"
       aria-label="add"
       sx={{ alignSelf: "end" }}
       onClick={addInventoryItem}
      >
       <AddIcon />
      </Fab>
     </Stack>
    </Box>
   </Modal>
  </>
 );
}

export default AddInventoryMenu;
