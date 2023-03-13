import React from "react";
import { Box,Snackbar, Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Autocomplete, DialogActions } from "@mui/material";
import settings from "../settings.json";
import AuthContext from "../context/AuthContext";
import UserPreferences from "../context/UserPreferences";
import MuiAlert from '@mui/material/Alert';



export default function ContentAddItemDialog(props) {
    const { userSettings } = React.useContext(UserPreferences);
    const { tokens } = React.useContext(AuthContext);
    const { open, fetchedData } = props
    let [openAlert, setOpenAlert] = React.useState(false);

    let [alertSeverity,setAlertSeverity]=React.useState("success")
    let [alertMessage,setAlertMessage]=React.useState("Item added successfully")

    var [addItem, setAddItem] = React.useState({
        name: "",
        category: "",
        phone_brand: "",
        phone_model: "",
        description: "",
        color: "",
        price: 0,
        quantity: 1,
        warehouse: userSettings.active_warehouse.id
    })

    let handleAddItem = async () => {
        let response = await fetch(`${settings.apiUrl}/new_item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.access
            },
            body: JSON.stringify(addItem)
        });
        if(response.status===201){
            setAlertMessage("Item added successfully")
            setAlertSeverity("success")
            setOpenAlert(true)
        }
        else if(response.status===400){
            setAlertMessage("Wrong input data")
            setAlertSeverity("error")
            setOpenAlert(true)
        }
        else if(response.status===303){
            setAlertMessage = ("Item already exists")
            setAlertSeverity("error")
            setOpenAlert(true)
        }
        console.log(response.status);
    };

    

    return (

        <div className="addItemDialog">

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={()=>setOpenAlert(false)}>
                <MuiAlert onClose={()=>setOpenAlert(false)} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
            
            <Dialog
                open={open} onClose={props.handleClickClose}
                fullWidth={true}
                maxWidth="sm"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <Grid spacing={2} p={2} container>
                        <Grid item xs={12}>
                            <Box>
                                <Autocomplete
                                    size="small"
                                    onInputChange={(event, value) => { setAddItem(prevAddItem => ({ ...prevAddItem, name: value })) }}
                                    freeSolo
                                    id="add-item-name"
                                    options={[...new Set(fetchedData.map((item) => item.name))]}
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Product Name" />}
                                    value={addItem.name}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Autocomplete
                                    size="small"
                                    onInputChange={(event, value) => { setAddItem(prevAddItem => ({ ...prevAddItem, category: value })) }}
                                    id="add-item-category"
                                    options={[...new Set(fetchedData.map((item) => item.category))]}
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Category" />}
                                    value={addItem.category}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Autocomplete
                                    size="small"
                                    onInputChange={(event, value) => { setAddItem(prevAddItem => ({ ...prevAddItem, phone_brand: value })) }}
                                    id="add-item-phone-brand"
                                    options={[...new Set(fetchedData.map((item) => item.phone_brand))]}
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Phone brand" />}
                                    value={addItem.phone_brand}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Autocomplete
                                    size="small"
                                    onInputChange={(event, value) => { setAddItem(prevAddItem => ({ ...prevAddItem, phone_model: value })) }}
                                    id="add-item-phone-model"
                                    options={[...new Set(fetchedData.map((item) => item.phone_model))]}
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Phone model" />}
                                    value={addItem.phone_model}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Autocomplete
                                    size="small"
                                    id="add-item-color"
                                    onInputChange={(event, value) => { setAddItem(prevAddItem => ({ ...prevAddItem, color: value })) }}
                                    options={[...new Set(fetchedData.map((item) => item.color))]}
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Color" />}
                                    value={addItem.color}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <TextField
                                    size="small"
                                    id="add-item-description"
                                    label="Description"
                                    onChange={(event) => { setAddItem(prevAddItem => ({ ...prevAddItem, description: event.target.value })) }}
                                    multiline
                                    rows={4}
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    value={addItem.description}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <TextField
                                    size="small"
                                    onChange={(event) => {
                                        setAddItem(prevAddItem => ({ ...prevAddItem, price: event.target.value }))
                                    }}
                                    id="add-item-price"
                                    label="Price"
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    value={addItem.price}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <TextField
                                    size="small" s
                                    onChange={(event) => { setAddItem(prevAddItem => ({ ...prevAddItem, quantity: event.target.value })) }}
                                    id="add-item-quantity"
                                    label="Quantity"
                                    type="number"
                                    sx={{
                                        minWidth: "110px",
                                        width: "auto"
                                    }}
                                    value={addItem.quantity}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClickClose}>Cancel</Button>
                    <Button onClick={handleAddItem}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}