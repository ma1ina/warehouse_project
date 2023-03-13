import React from "react";
import AuthContext from "./AuthContext";
import settings from "../settings";

const UserPreferences = React.createContext();

export default UserPreferences;

export const UserPreferencesProvider = ({ children }) => {



    const {tokens}=React.useContext(AuthContext);
    const [userSettings, setUserSettings] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const getUserSettings= async ()=> {
        let response = await fetch(`${settings.apiUrl}/get_user_settings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.access,
            },
        });
        if (response.status === 200) {
            let data = await response.json();
            setUserSettings(data);
            setLoading(false);
        }}

    const setActiveWarehouse = async (warehouseId) => {
        let response = await fetch(`${settings.apiUrl}/set_active_warehouse`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.access,
            },
            body: JSON.stringify({
                id: warehouseId,
            })
        });
        if (response.status === 204) {
            getUserSettings();
        }
    };

    const value = {
        userSettings,
        setActiveWarehouse,
    };

    React.useEffect(() => {
        
        getUserSettings();

    },[]);


    return (
        <UserPreferences.Provider value={value}>
            {loading?null:children}
        </UserPreferences.Provider>
    );
};


