import React from 'react';
import Layout from './pages/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContentItems from './pages/ContentItems';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import GlobalContext from './context/GlobalContext';
import Records from './pages/Records';

export default function App() {


    return (
        <GlobalContext>
            <Router>
                <Routes>

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Layout />}>
                            <Route path="/items" element={<ContentItems />} />
                            <Route path="/phones" element={<ContentItems />} />
                            <Route path="/records" element={<Records />} />
                            <Route path="*" element={<Navigate to="/items" replace />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </GlobalContext>
    );
}
