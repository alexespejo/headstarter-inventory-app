"use client";
import { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";

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

function ItemCard({ id, name, exp_date, purch_date, desc }: MyComponentProps) {
 const [expDate, setExpDate] = useState("");
 const [purchDate, setPurchDate] = useState("");

 useEffect(() => {
  let expDate = new Date(
   exp_date.seconds * 1000 + exp_date.nanoseconds / 1000000
  );

  let readableString = expDate.toLocaleString();
  setExpDate(
   readableString
    .split(" ")[0]
    .substring(0, readableString.split(" ")[0].length - 1)
  );

  let purchDate = new Date(
   purch_date.seconds * 1000 + purch_date.nanoseconds / 1000000
  );
  readableString = purchDate.toLocaleString();
  setPurchDate(
   readableString
    .split(" ")[0]
    .substring(0, readableString.split(" ")[0].length - 1)
  );
 }, [
  exp_date.seconds,
  exp_date.nanoseconds,
  purch_date.seconds,
  purch_date.nanoseconds,
 ]);
 return (
  <Card
   key={id}
   sx={{ maxWidth: 345, width: 250, height: 300, overflow: "auto", mt: 3 }}
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
  </Card>
 );
}

export default ItemCard;
