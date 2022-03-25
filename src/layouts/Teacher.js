/*!

=========================================================
*
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{useState,useEffect} from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import TeacherSidebar from "components/Sidebar/TeacherSidebar.js";
import TeacherDashboard from '../views/TeacherDashboard.js';
// import LORForm from '../views/examples/LORForm';
import routes from "routes.js";
import TeacherSideForm from "views/examples/TeacherSideForm.js";

const Teacher = (props) => {
  var [selectedLor,SetselectedLor]=useState("");
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <TeacherSidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/teacher/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
        SetToken={props.SetToken}
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
        <Route path="/teacher/lor-form" >
        <TeacherSideForm token={props.token} {...props} selectedLor={selectedLor}/>
          </Route>
      <Route path="/teacher">
      <TeacherDashboard token={props.token} {...props} SetselectedLor={SetselectedLor}></TeacherDashboard>
    </Route>
        </Switch>
        
        
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Teacher;
