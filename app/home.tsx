// Home.tsx
import React, { useState } from "react";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import HeaderComponent from "../components/Header";
import DrawerComponent from "../components/Drawer";

const drawerWidth = 240; // Define the width of the drawer

const Home = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HeaderComponent onMenuClick={handleDrawerOpen} />{" "}
      {/* onMenuClick として関数を渡す */}
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
        }}
      >
        <Toolbar />
        {/* Content goes here */}
        <Typography paragraph>
          This is the main content area. Adjust the width calculation based on
          the drawer state.
        </Typography>
        {/* Add more content or components here as needed */}
      </Box>
    </Box>
  );
};

export default Home;
