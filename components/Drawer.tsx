import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DescriptionIcon from "@mui/icons-material/Description";
import SpeedIcon from "@mui/icons-material/Speed";

const drawerWidth = 240;

type DrawerComponentProps = {
  open: boolean;
  handleDrawerClose: () => void;
  // 他のプロパティがある場合は、ここに追加
};

const DrawerComponent = ({ open, handleDrawerClose }: DrawerComponentProps) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
      <Divider />
      <List className="mt-6">
        {["Home", "Projects", "Activity", "Docs", "Speed"].map(
          (text, index) => {
            const icons = {
              Home: <HomeIcon />,
              Projects: <InsertChartIcon />,
              Activity: <EventNoteIcon />,
              Docs: <DescriptionIcon />,
              Speed: <SpeedIcon />,
            };
            return (
              <ListItem button key={text}>
                <ListItemIcon>{icons[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          }
        )}
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
