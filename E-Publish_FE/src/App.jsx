import React from 'react';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import ProfilePage from './Pages/ProfilePage';
import Dashboard from './Pages/Dashboard';
import BooksPage from './Pages/BooksPage';


function App() {

  
  return (
    <>
     <React.StrictMode>
      <Router>
        <Routes>
        
        <Route 
          path="/"
          element=
          {
              <Layout>
                <Home />
              </Layout> 
          }
        />

        <Route 
          path="/login"
          element={
            <Layout>
                <LoginPage/>
            </Layout>
          }
        />
      
      <Route 
          path="/register"
          element={
            <Layout>
                <SignUp/>
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage/>
            </Layout>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <Layout>
             <Dashboard/>
            </Layout>
          }
        />

        <Route
          path="/books"
          element={
            <Layout>
              <BooksPage/>
            </Layout>
          }
        />


        </Routes>
      </Router>


     </React.StrictMode>
  
    </>
  )
}

export default App
