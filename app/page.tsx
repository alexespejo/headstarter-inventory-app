"use client";
import { db } from "./firebase/firebase_init";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import ItemCard from "./components/ItemCard";
import AddInventoryMenu from "./components/AddInventoryMenu";
import {
 Skeleton,
 Container,
 AppBar,
 Toolbar,
 Typography,
 Paper,
 Stack,
} from "@mui/material";
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default function Home() {
 const [value, loading, error] = useCollection(collection(db, "inventory"), {
  snapshotListenOptions: { includeMetadataChanges: true },
 });

 return (
  <Container>
   <Paper elevation={3}>
    <AppBar position="static">
     <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       Alex&apos;s Stuff
      </Typography>

      <AddInventoryMenu />
     </Toolbar>
    </AppBar>
   </Paper>
   {/* <Box display="flex" flexWrap="wrap" sx={{ mt: 5 }}> */}
   <Stack
    direction={{ xs: "column", sm: "row" }}
    flexWrap="wrap"
    justifyContent={{ sm: "space-evenly" }}
    // spacing={{ xs: 3, sm: 0 }}
    sx={{ mt: 3 }}
   >
    {/* Display cards */}
    {value?.docs.map((doc, i) =>
     loading || error ? (
      <Skeleton key={i} variant="rectangular" width={300} height={300} />
     ) : (
      <>
       <ItemCard
        id={doc.id}
        name={doc.data().name}
        exp_date={doc.data().exp_date}
        purch_date={doc.data().purch_date}
        desc={doc.data().description}
       />
      </>
     )
    )}
   </Stack>
  </Container>
 );
}
