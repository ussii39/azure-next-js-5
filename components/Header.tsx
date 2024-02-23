// components/HeaderComponent.tsx
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type HeaderComponentProps = {
  onMenuClick: () => void; // onMenuClick という名前の関数型プロパティを受け取る
  // 他のプロパティがある場合は、ここに追加
};

const HeaderComponent = ({ onMenuClick }: HeaderComponentProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" noWrap sx={{ marginRight: 2 }}>
          John Doe
        </Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
