import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { UserPreferencesProvider } from "../context/UserPreferences";

export default function Layout(props) {
    const [openNavBar, setOpenNavBar] = React.useState(false);

    return (
        <div className="app--container">
            <UserPreferencesProvider>
                <Header setOpenNavBar={setOpenNavBar}/>
                <Navbar setOpenNavBar={setOpenNavBar} openNavBar={openNavBar} />
                <Outlet />
            </UserPreferencesProvider>
        </div>
    );
}