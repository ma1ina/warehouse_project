import React from "react";
import { Autocomplete, TextField } from "@mui/material";


export default function ContentSearchBox(props) {

    const { searchData, search, setSearch, category,labelText } = props

    let optionsArray = []
    
    if(category==="phone_model"){
        if(search.phone_brand!==""){
            optionsArray = ["",...new Set(searchData.filter((item) => item.phone_brand===search.phone_brand).map((item) => item[category]))]
        }
        else{
            optionsArray = []
        }
    }
    else{
        optionsArray = ["",...new Set(searchData.map((item) => item[category]))]
    }


    return (
        <Autocomplete
            onInputChange={(event, value) => {setSearch(prevSearch => ({ ...prevSearch, [category]: value })) }}
            size="small"
            value={search[category]}
            id={"search-box-category-"+{category}}
            options={optionsArray}
            renderInput={(params) => <TextField {...params} label={labelText} />}
        />
    )
}