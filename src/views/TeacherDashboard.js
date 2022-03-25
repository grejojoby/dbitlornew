
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
// import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// reactstrap components

import axios from 'axios';

import { Steps } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
import 'assets/css/styles.css';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  // CardTitle,
  // NavItem,
  // NavLink,
  // Nav,
  // Progress,
  // Table,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";



// core components
import {
  chartOptions,
  parseOptions,
  // chartExample1,
  // chartExample2,
} from "variables/charts.js";

import TeacherHeader from "components/Headers/TeacherHeader.js";
// import { TRUE } from "node-sass";

const TeacherDashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  var [application, SetApplication] = useState([]);

 
function ViewLor(e){
  console.log(e.target.value);
  props.SetselectedLor(application[parseInt(e.target.value)])
  props.history.push('/teacher/lor-form')
}

function historyStatusColor(inp) {
  switch (inp) {

    case "pending": return <td style={{ color: 'orange' }}>Pending</td>;
    case "approved": return <td style={{ color: 'green' }}>Approved</td>;
    case "rejected": return <td style={{ color: 'red' }}>Rejected</td>;


    default: return <td style={{ color: 'blue' }}>Processing</td>
  }
}



  useEffect(() => {

    
    axios.get(`https://dbitlor.hayden.co.in/api/loggedinteachersapplications/`, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    })
      .then((res) => {
        SetApplication(res.data);
        // console.log(res.data);

      })
      .catch((error) => {
        console.error(error)
      })
  }, [props.token])


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const timelineStyles = {
    // width: '200px',
    height: '100%',
    display: 'inline-table',
    verticalAlign: 'top',
    color: 'white'
  };





  return (
    <>
      <TeacherHeader token={props.token}  />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
     
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Pending Requests
                    </h6>
                    <h2 className="mb-0">Approve LOR</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart lorHistoryTable" style={{height:'100%'}}>
                  <table className="table" borderless={1}>
                    <tr>
                           <th>Student Name</th>
                           <th>Subject</th>
                           <th>View LOR</th>
                      </tr>
                      {application.map((obj,i)=> 
                                            <tr key={obj.id}>
                                              <td>{obj.student.first_name} {obj.student.lastt_name}</td>
                                              {/* <td>Algorithms</td> */}
                                              {historyStatusColor(obj.status)}
                                              <td><Button className="default" value={i} onClick={ViewLor}>View</Button></td>
                                            </tr>
                                            
                      
                      )}
                
                   


                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </Container>
    </>
  );
};

export default TeacherDashboard;
