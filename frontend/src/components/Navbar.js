import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router-dom";


export default function Navbar({ openNavBar, setOpenNavBar }) {

    const navigate = useNavigate();

    function handleDrawerClose() {
        setOpenNavBar(false);
    }

    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-div': {
                    width: 240,
                    boxSizing: 'border-box',
                    position: 'relative',

                },
            }}
            className="Navbar--drawer"
            variant="persistent"
            anchor="left"
            open={openNavBar}
        >
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            <Divider />
            <List >
                <ListItem >
                    <ListItemButton onClick={()=>navigate("/items")}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Items"} />
                    </ListItemButton>
                </ListItem>
                <ListItem >
                    <ListItemButton onClick={()=>navigate("/records")}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Records"} />
                    </ListItemButton>

                </ListItem>
            </List>
        </Drawer>
    );
}