"use client";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase_init";
import { useState, useEffect } from "react";
import {
 IconButton,
 Typography,
 Card,
 CardContent,
 Modal,
 Box,
 Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface Timestamp {
 seconds: number;
 nanoseconds: number;
}

interface MyComponentProps {
 id: string;
 name: string;
 exp_date: Timestamp;
 purch_date: Timestamp;
 desc: string;
}

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
 textAlign: "center",
};

function ItemCard({ id, name, exp_date, purch_date, desc }: MyComponentProps) {
 const [deleteItemModal, setDeleteItemModal] = useState(false);
 const handleDeleteItemModal = () => setDeleteItemModal(!deleteItemModal);

 const [expDate, setExpDate] = useState("");
 const [purchDate, setPurchDate] = useState("");

 async function deleteInventoryItem() {
  await deleteDoc(doc(db, "inventory", id));
 }
 useEffect(() => {
  if (exp_date) {
   let expDate = new Date(
    exp_date.seconds * 1000 + exp_date.nanoseconds / 1000000
   );

   let readableString = expDate.toLocaleString();
   setExpDate(
    readableString
     .split(" ")[0]
     .substring(0, readableString.split(" ")[0].length - 1)
   );
  }
  if (purch_date) {
   let purchDate = new Date(
    purch_date.seconds * 1000 + purch_date.nanoseconds / 1000000
   );
   let readableString = purchDate.toLocaleString();
   setPurchDate(
    readableString
     .split(" ")[0]
     .substring(0, readableString.split(" ")[0].length - 1)
   );
  }
 }, [exp_date, purch_date]);
 return (
  <>
   <Card
    key={id}
    sx={{
     maxWidth: 345,
     width: 250,
     height: 250,
     overflow: "auto",
     mt: 3,
     position: "relative",
    }}
    elevation={3}
   >
    <CardContent>
     <Typography variant="h5" component="div">
      {name}
     </Typography>
     <Typography sx={{ mb: 1.5 }} color="text.secondary">
      expires: {expDate}
     </Typography>
     <Typography sx={{ mb: 1.5 }} color="text.secondary">
      purchased: {purchDate}
     </Typography>
     <Typography variant="body2">{desc}</Typography>
    </CardContent>
    <IconButton
     aria-label="delete"
     color="error"
     sx={{ position: "absolute", bottom: 0, right: 0 }}
     onClick={handleDeleteItemModal}
    >
     <DeleteIcon />
    </IconButton>
   </Card>
   <Modal
    open={deleteItemModal}
    onClose={handleDeleteItemModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   >
    <Box sx={style}>
     <Typography id="modal-modal-title" variant="h6" component="h2">
      Are you sure you want to remove:{" "}
      <Typography
       variant="h6"
       component="span"
       sx={{ textDecoration: "underline", fontWeight: "bold" }}
      >
       {name}
      </Typography>
     </Typography>
     <Button
      component="label"
      variant="contained"
      color="error"
      onClick={deleteInventoryItem}
     >
      Yes Delete
     </Button>
    </Box>
   </Modal>
  </>
 );
}

export default ItemCard;
