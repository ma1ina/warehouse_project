import React from "react"
import { IconButton, Grid, ListItem, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CommentIcon from '@mui/icons-material/Comment';

export default function Item(props) {
    return (
        <ListItem sx={{
            width: '100%',
            paddingLeft: '0px',
            paddingRight: '0px',
        }} divider>
            <Grid item xs={2}>
                <div className="item--name"><Typography>{props.item.name}</Typography></div>
            </Grid>
            <Grid item xs={2}>
                <div className="item--category"><Typography>{props.item.category}</Typography></div>
            </Grid>
            <Grid item xs={3}>
                <div className="item--phone"><Typography>{props.item.phone_brand} {props.item.phone_model}</Typography></div>
            </Grid>
            <Grid item xs={2}>
                <div className="item--color"><Typography>{props.item.color}</Typography></div>
            </Grid>
            <Grid item xs={1}>
                <div className="item--description">
                    <IconButton aria-label="comment-show">
                        <CommentIcon fontSize="small" />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={1} sx={{justifyContent: 'center'}}>
                <div className="item--price"><Typography>{props.item.price}</Typography></div>
            </Grid>
            <Grid item xs={2}>
                <Grid container justifyContent="center" alignItems="center" textAlign="center">
                    <Grid item xs={4}>
                        <IconButton color="secondary" onClick={() => props.quantityButtonsHandler(props.item.id, "remove")} aria-label="remove">
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>{props.item.quantity}</Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <IconButton color="secondary" aria-label="add" onClick={() => props.quantityButtonsHandler(props.item.id, "add")}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    )
}