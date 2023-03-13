import React from "react";
import { Box, Divider, Grid, List, ListItem, Typography, TextField, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import settings from "../settings.json";
import AuthContext from "../context/AuthContext";
import LogItem from "../components/LogItem";
import UserPreferences from "../context/UserPreferences";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import LogOtherItem from "../components/LogOtherItem";

export default function Records() {

    const { userSettings } = React.useContext(UserPreferences);
    const [logs, setLogs] = React.useState([]);
    const { tokens } = React.useContext(AuthContext);
    const [logItems, setLogItems] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [date, setDate] = React.useState(dayjs());
    const [addLogForm, setAddLogForm] = React.useState({ name: "", price: 0,quantity:1 })

    React.useEffect(() => {
        console.log(date.toISOString())
        const getLogs = async () => {
            let response = await fetch(`${settings.apiUrl}/get_logs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + tokens.access,
                },
                body: JSON.stringify({ date: date.toISOString() })

            })
            let data = await response.json();
            setLogs(data);
        }
        getLogs();
    }, [tokens.access, userSettings, date])

    React.useEffect(() => {
        setLogItems([]);
        setTotal(0);
        for (const [key, value] of Object.entries(logs)) {
            setLogItems(prevLogItems => [...prevLogItems, logs[key].map((log) => {
                if(key==="sold"){
                    return <LogItem key={log.id} log={log} />
                }
                if(key==="other_sold"){
                    return <LogOtherItem key={log.id} log={log} />
                }

            })]
            )
            setTotal(prevTotal=>(prevTotal+logs[key].reduce((acc, log) => {
                let quantity = log.quantity ? log.quantity : 1;
                return acc + parseFloat(log.price)*quantity;
            }, 0)))
        }
        
    }, [logs])

    function changeDateHandler(value) {
        setDate(value);
    }

    let addLog = async () => {
        let response = await fetch(`${settings.apiUrl}/add_log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + tokens.access,
            },
            body: JSON.stringify(addLogForm)
        })
        let data = await response.json();
        setLogs([...logs, data]);
    }

    function displayLogs() {
        return (<>
            <ListItem sx={{ paddingBottom: "30px" }}></ListItem>
            <Divider sx={{
                backgroundColor: "secondary.main",
            }} />
            {logItems}
            <Divider sx={{
                backgroundColor: "secondary.main",
            }} />
            <ListItem>
                <Grid container justifyContent="center" alignItems="center" textAlign="center">
                    <Grid item xs={10}>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{
                            color: "secondary.main",
                        }}>
                            Total: {total}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        </>
        )
    }

    return (

        <Box className="records--container" sx={{
            backgroundColor: "primary.main",
            color: "secondary.main",
        }}>
            <List sx={{
                width: "100%",
            }}>
                <ListItem>
                    <Grid container>
                        <Grid item xs={6} sm={4} md={2}>
                            <DatePicker value={date} onChange={(value) => changeDateHandler(value)} />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}></Grid>
                        <Grid item xs={4} sm={3} md={2}>
                            <TextField id="add-log" label="Other"
                                variant="outlined" value={addLogForm.name}
                                onChange={(e) => setAddLogForm({ ...addLogForm, name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3} sm={2} md={1}>
                            <TextField id="add-log" type="number" label="Price"
                                variant="outlined" value={addLogForm.price}
                                onChange={(e) => setAddLogForm({ ...addLogForm, price: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3} sm={2} md={1}>
                        <TextField id="add-log" type="number" label="Quantity"
                                variant="outlined" value={addLogForm.quantity}
                                onChange={(e) => setAddLogForm({ ...addLogForm, quantity: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton aria-label="add" onClick={addLog}>
                                <Add />
                            </IconButton>
                        </Grid>
                    </Grid>
                </ListItem>

                {logItems.length > 0 ? displayLogs() :
                    <ListItem sx={{justifyContent: "center", paddingTop:"100px"}}>
                        <Typography>nothing has happened yet today</Typography>
                    </ListItem>
                }

            </List>
        </Box>
    )
}