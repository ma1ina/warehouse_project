import React, { useContext } from "react";
import Item from "../components/Item";
import settings from "../settings.json";
import ContentSearchBox from "../components/ContentSearchBox";
import { IconButton, Grid,Typography,Box,List} from "@mui/material";
import { Search, Clear, Add } from "@mui/icons-material";
import ContentAddItemDialog from "../components/ContentAddItemDialog";
import AuthContext from "../context/AuthContext";
import UserPreferences from "../context/UserPreferences";


export default function ContentItems(props) {
  var [fetchedData, setFetchedData] = React.useState([]);
  var [searchData, setSearchData] = React.useState([]);
  var [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const { tokens } = useContext(AuthContext);
  const { userSettings } = useContext(UserPreferences);

  var [search, setSearch] = React.useState({
    name: "",
    category: "",
    phone_brand: "",
    phone_model: "",
    color: "",
  })

  React.useEffect(() => {
    const getData = async () => {
      await fetch(`${settings.apiUrl}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + tokens.access,
        },
      }).then(response => response.json())
        .then(data => setFetchedData(data))
    }
    getData();
  }, [userSettings, tokens])

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClickCloseDialog = () => {
    setOpen(false);
  };



  function clearSearch() {
    setSearch({
      name: "",
      category: "",
      phone_brand: "",
      phone_model: "",
      color: "",
    });
    setSearchData(fetchedData);
  }

  function handleSearchButton() {
    setSearchData(fetchedData.filter((item) => {
      if (item.name.toLowerCase().includes(search.name.toLowerCase()) &&
        item.category.toLowerCase().includes(search.category.toLowerCase()) &&
        item.phone_brand.toLowerCase().includes(search.phone_brand.toLowerCase()) &&
        item.phone_model.toLowerCase().includes(search.phone_model.toLowerCase()) &&
        item.color.toLowerCase().includes(search.color.toLowerCase())
      ) {
        return item;
      }
      else return null;
    }))
  }
  function quantityButtonsHandler(id, operation) {
    console.log(id, operation);
    fetch(`${settings.apiUrl}/${operation}_item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + tokens.access
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      .then(() => {

        setFetchedData(fetchedData.map((item) => {
          if (item.id === id) {
            if (operation === "remove") {
              item.quantity -= 1;
            } else {
              item.quantity += 1;
            }
          }
          return item;
        }))
      })
  }


  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setItems(searchData.map((item) => {
      return (
        <Item key={item.id} item={item} quantityButtonsHandler={quantityButtonsHandler} />
      )
    }))
  }, [searchData])

  React.useEffect(() => {
    setSearchData(fetchedData);
  }, [fetchedData])





  return (
    <>
      <Box sx={{
        backgroundColor: "primary.main",
        color: "secondary.main",
      }} className="contentItems--container">
        <Grid container alignContent="center" textAlign="center" columns={13}>
          <Grid item xs={6} sm={4} md={2}>
            <ContentSearchBox key={1} searchData={searchData} search={search} setSearch={setSearch} category={"name"} labelText={"Product name"} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ContentSearchBox key={2} searchData={searchData} search={search} setSearch={setSearch} category={"category"} labelText={"Category"} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ContentSearchBox key={3} searchData={searchData} search={search} setSearch={setSearch} category={"phone_brand"} labelText={"Phone"} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ContentSearchBox key={4} searchData={searchData} search={search} setSearch={setSearch} category={"phone_model"} labelText={"Model"} />

          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ContentSearchBox key={5} searchData={searchData} search={search} setSearch={setSearch} category={"color"} labelText={"Color"} />
          </Grid>
          <Grid item xs={3} sm={3} md={2}>
            <IconButton aria-label="search" onClick={handleSearchButton}>
              <Search />
            </IconButton>
            <IconButton aria-label="clear" onClick={clearSearch}>
              <Clear />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="add" onClick={handleClickOpenDialog}>
              <Add />
            </IconButton>
          </Grid>

          <Grid item xs={13} height={"50px"}>
            <div>{/* Space here */}</div>
          </Grid>
          <Grid item xs={2}>
            <Typography>Item name</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Category</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Phone</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Color</Typography>
          </Grid>
          <Grid item xs={1}>
            {/* Free space for description */}
          </Grid>
          <Grid item xs={1}>
            <Typography>Price</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Quantity</Typography>
          </Grid>
          <Grid item xs={13}><br></br><br></br></Grid>
          <List sx={{
            width: '100%',
          }}>
            {items}
          </List>
        </Grid>
      </Box>
      <ContentAddItemDialog open={open} fetchedData={fetchedData} handleClickClose={handleClickCloseDialog} />

    </>
  )
}