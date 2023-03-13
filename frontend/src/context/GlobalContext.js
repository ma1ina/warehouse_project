import React from "react";
import { AuthProvider } from './AuthContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export default function GlobalContext({ children }) {
    return (
        <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
            </LocalizationProvider>
        </AuthProvider>
    )
}
