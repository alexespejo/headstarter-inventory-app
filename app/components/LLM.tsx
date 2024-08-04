"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase_init";
import { collection, getDocs } from "firebase/firestore";
import { Stack, Box, CircularProgress } from "@mui/material";
import OpenAI from "openai";

const openai = new OpenAI({
 apiKey: process.env.NEXT_PUBLIC_OPEN_AI_SECRET,
 dangerouslyAllowBrowser: true,
});

interface Timestamp {
 seconds: number;
 nanoseconds: number;
}
interface Dish {
 dish: string;
 ingredients: string[];
}
interface InventoryItemType {
 id: string;
 name: string;
 exp_date: Timestamp;
 purch_date: Timestamp;
 desc: string;
}

async function getData() {
 const querySnapshot = await getDocs(collection(db, "inventory"));
 let data: InventoryItemType[] = [];
 querySnapshot.forEach((doc) => {
  data = [...data, doc.data() as InventoryItemType];
 });
 const completion = await openai.chat.completions.create({
  messages: [
   {
    role: "user",
    content: `
  **this is a list of ingredients using these ingredients and any given description provide just a list of dishes/snacks/food that can be made with these ingredients alone** 

  **data**
  ${JSON.stringify(data)}

  **provide information in JSON array format**
  `,
   },
  ],
  model: "gpt-4o-mini",
 });
 const cleanData = completion.choices[0].message.content
  ?.replace(/```json|```/g, "")
  .trim();
 return JSON.parse(cleanData ?? "");
}

function LLM() {
 //  const data = await getData();
 const [dum, setDum] = useState([]);

 async function bruhMoment() {
  const fdata = await getData();
  setDum(fdata);
 }
 useEffect(() => {
  bruhMoment();
 }, []);
 return (
  <Stack spacing={1.5}>
   {dum.length > 0 ? (
    dum.map((item: Dish) => <Box sx={{ fontSize: 20 }}>{item.dish}</Box>)
   ) : (
    <Box
     sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     }}
    >
     <CircularProgress />
    </Box>
   )}
  </Stack>
 );
}

export default LLM;
