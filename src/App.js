import React,{ useEffect,useState } from "react";
import AdminLayout from "layouts/Admin.js";
import TeacherLayout from "layouts/Teacher.js";
import AuthLayout from "layouts/Auth.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
// import 'rsuite/dist/styles/rsuite-default.css';
import { Button } from 'rsuite';
import LORForm from './views/examples/LORForm'
import TeacherSideForm from './views/examples/TeacherSideForm.js'
import { withAlert } from 'react-alert'

export default function App() {

    var [user,SetUser]=useState({
        first_name:"",
        last_name:"",
    });

    var [token,SetToken]=useState("");


// check if already logged in
      useEffect(() => {
        if(token!=""){
          return
        }
        if(localStorage.getItem('token') || null!=null)
        {
          SetToken(localStorage.getItem('token'));
          console.log("asdfas");
        }
        else{
          <Redirect to="/"  /> 
        }
      
      
      }, [])

  useEffect(() => {
      
      console.log("token updated",token)
 
      axios.get(`http://51.11.111.43/api/loggedinuserdetails/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((res) => {
        SetUser(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error(error)
      })
    }, [token])




    return (
        <BrowserRouter>
    <Switch>

      {/* <Route exact path="/admin/lor-request" render={(props) => <LORForm {...props} />} /> */}
      {/* <Route exact path="/teacher/lor-form" render={(props) => <TeacherSideForm {...props} />} /> */}
      <Route  path="/admin"   render={(props) => <AdminLayout {...props}  SetToken={SetToken} user={user} token={token} />} />
      <Route  path="/teacher"   render={(props) => <TeacherLayout {...props}  SetToken={SetToken} user={user} token={token} />} />
      <Route path="/" render={(props) => <AuthLayout {...props } SetToken={SetToken} />} />



        {/* <Route path="/admin/index" render={(props) => <Index {...props} token={token} />} /> */}

      {/* <Redirect from="/" to="/admin/index" user={user}  /> */}
    </Switch>
  </BrowserRouter>
    )
}
