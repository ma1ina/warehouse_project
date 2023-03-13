import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import AuthContext from "../context/AuthContext";
import { FormControl, MenuItem, Select, IconButton } from "@mui/material";
import UserPreferences from "../context/UserPreferences";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header({setOpenNavBar}) {
    const { logout } = React.useContext(AuthContext);
    const { userSettings, setActiveWarehouse } = React.useContext(UserPreferences);
    const [localActiveWarehouse, setLocalActiveWarehouse] = React.useState(userSettings.active_warehouse.id);

    React.useEffect(() => {
        setLocalActiveWarehouse(userSettings.active_warehouse.id)
    }, [userSettings])

    function changeWarehouseForm() {
        return (
            <FormControl size="small">
                <Select sx={{color:"secondary.main", backgroundColor:"primary.dark"}}
                    value={localActiveWarehouse}
                    onChange={(e) => {
                        setActiveWarehouse(e.target.value);
                    }

                    }>
                    {userSettings.assigned_warehouses.map((warehouse) => {
                        return (
                            <MenuItem key={warehouse.id} value={warehouse.id}>{warehouse.name}</MenuItem>

                        )
                    })}

                </Select>

            </FormControl>
        )
    }

    return (
        <Box sx={{
            backgroundColor:"primary.dark",
            color:"secondary.main",
            }}
            className="header--container"
        >
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <IconButton  sx={{color:"secondary.main"}} aria-label="navbarMenu" onClick={()=>setOpenNavBar(true)}>
                    <MenuIcon />
                </IconButton>
                <Grid item xs>
                    <Typography variant="h6">INVENTORY</Typography>
                </Grid>
                <Grid item xs={4} minWidth="300px">
                    <Grid container justifyContent="center" alignItems="center" textAlign="center">
                        <Grid item xs={2} minWidth="150px">
                            {/* <Typography variant="h6">WAREHOUSE</Typography> */}
                        </Grid>
                        <Grid item xs={2} minWidth="100px">

                            {userSettings.assigned_warehouses.length > 1 ?
                                changeWarehouseForm() :
                                <Typography variant="h6">
                                    {userSettings.active_warehouse.name}
                                </Typography>
                            }

                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton sx={{color:"secondary.main"}} aria-label="logoutButton" onClick={logout}>
                                <LogoutIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </Box>
    );
}