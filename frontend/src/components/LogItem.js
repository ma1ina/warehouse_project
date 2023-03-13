import React from 'react';
import { Typography, Grid, ListItem, } from '@mui/material';
import dayjs from 'dayjs';

export default function LogItem(props) {
    let date = new dayjs(props.log.date);
    return (
        <ListItem divider>
            <Grid container spacing={3}>
                <Grid item xs={3} sm={3} md={1} >
                    <Typography>{date.format("hh:mm:ss")}</Typography>
                </Grid>
                <Grid  item xs={3} sm={3} md={1} >
                    <Typography>{props.log.user}</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={2} >
                    <Typography>{props.log.item_name}</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={2} >
                    <Typography>{props.log.item_phone_brand}</Typography>
                </Grid>
                <Grid  item xs={3} sm={3} md={2} >
                    <Typography >{props.log.item_phone_model}</Typography>
                </Grid>
                <Grid  item xs={3} sm={3} md={1} >
                    <Typography>{props.log.item_color}</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={1} ></Grid>

                <Grid item xs={3} sm={3} md={2} >
                    <Typography>{props.log.quantity}x {props.log.price}$</Typography>
                </Grid>
            </Grid>
        </ListItem>

    )
}
