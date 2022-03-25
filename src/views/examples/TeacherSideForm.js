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
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import axios from 'axios'
import { useAlert } from 'react-alert'


const TeacherSideForm = (props) => {
  const alert = useAlert()
  var [studentID, SetstudentID] = useState("");
  var [studentEmail, SetstudentEmail] = useState("");
  var [firstName, SetfirstName] = useState("");
  var [lastName, SetlastName] = useState("");
  var [branch, Setbranch] = useState("");
  var [passoutYear, SetpassoutYear] = useState("");
  var [content, Setcontent] = useState("");
  var [lor_status, Setlor_status] = useState("");
 

  var [teachers, SetTeachers] = useState([]);
  var [departments, SetDepartments] = useState([]);
  var [selectedTeacher, SetSelectedTeacher] = useState(null);
  var [selectedDept, SetSelectedDept] = useState(null);




  function ApproveForm(){
    var article = { appID: props.selectedLor.id,status:"approved",content:content };
    if (article['content']===null)
    {
      article['content']="";
    }

    const headers = {
      'Authorization': `Token ${props.token}`,


    };
    axios.post('http://51.11.111.43/api/loggedinteachereditapplications/', article, { headers })
      .then(
        (response) => {

     

        }
      )
      .catch((error) => {
        console.error(error, "failed to approve");
      });
      alert.success("Approved LOR")
      props.history.push('/teacher')

  }





  function RejectForm(){
    var article = { appID: props.selectedLor.id,status:"rejected",content:content };
    if (article['content']===null)
    {
      article['content']="";
    }
    console.log(article,"df");
    const headers = {
      'Authorization': `Token ${props.token}`,


    };
    axios.post('http://51.11.111.43/api/loggedinteachereditapplications/', article, { headers })
      .then(
        (response) => {

          // console.log(response.data,"Asf");

        }
      )
      .catch((error) => {
        // console.error(error, "failed to approve");
      });
      alert.success("Rejected LOR")
    props.history.push('/teacher')


  }


// get logeed in users info
  useEffect(() => {
      console.log(props.selectedLor)
      try{
        SetfirstName(props.selectedLor.student.first_name)
        SetlastName(props.selectedLor.student.last_name)
        SetstudentEmail(props.selectedLor.student.email)
        SetpassoutYear(props.selectedLor.student.yearofpassout)
        SetstudentID(props.selectedLor.student.studentID)
        Setbranch(props.selectedLor.student.dept)
        Setcontent(props.selectedLor.content)
        Setlor_status(props.selectedLor.status)
      }
      catch{
        
      }

  }, [props.selectedLor])


  // get list of all dept
  useEffect(() => {

    //   console.log(`Token ${token}`);
    axios.get(`http://51.11.111.43/api/listofdepartments/`, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    })
      .then((res) => {
        SetDepartments(res.data);
        SetSelectedDept(res.data[0].name)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [props.token])


  //get list of teachers 
  useEffect(() => {

    //   console.log(`Token ${token}`);
    axios.get(`http://51.11.111.43/api/listallteachers/`, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    })
      .then((res) => {
        SetTeachers(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error(error)
      })
  }, [props.token])


useEffect(() => {
  // console.log(selectedDept);
}, [selectedDept])


  function SubmitFormForLor() {
    
    if (selectedTeacher==null){
      alert("Please select teacher");
      return;
    }
    console.log("form submitted");
      const article = { teacherID: parseInt(selectedTeacher) ,
        content:content
      };
      const headers = {
        'Authorization': `Token ${props.token}`,

        // 'My-Custom-Header': 'foobar'
      };
      axios.post('http://51.11.111.43/api/applyforlor/', article, { headers })
        .then(
          (response) => {
            console.log(response.data);
            props.history.push('/admin');
          }
        );
 

  }




  return (
    <>
      {/* <UserHeader /> */}
      <div
        className="header pb-4 pt-3 pt-lg-4 d-flex align-items-center"
        style={{
          minHeight: "400px",
          // backgroundImage:
          //   "url(" +
          //   require("../../assets/img/theme/profile-cover.jpg").default +
          //   ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Approve/Reject LOR</h1>
              <p className="text-white mt-0 mb-5">
              Click on approve or reject.
              </p>
              {/* <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-1" xl="11">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">LOR for Approval</h3>
                  </Col>
                  {lor_status == "pending" ?
                  <Col className="text-right" xs="4">
                    
                    <Button
                      color="success"
                      href="#pablo"
                      onClick={ApproveForm}
                      // block
                      size="lg"
                    >
                      Approve
                    </Button>
                    <Button
                      color="danger"
                      href="#pablo"
                      onClick={RejectForm}
                      // block
                      size="lg"
                    >
                      Reject
                    </Button>
                  </Col> : <></>
}
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Student information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-student-id"
                          >
                            Student ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue="2018190010"
                            id="input-student-id"
                            placeholder="Student ID"
                            type="number"
                            minLength={10}
                            maxLength={10}
                            onChange={(e) => SetstudentID(e.target.value)}
                            value={studentID}
                            required
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            onChange={(e) => SetstudentEmail(e.target.value)}
                            value={studentEmail}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            onChange={(e) => SetfirstName(e.target.value)}
                            value={firstName}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            onChange={(e) => SetlastName(e.target.value)}
                            value={lastName}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-passout-year"
                          >
                            Branch
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue="2020"
                            id="input-passout-year"
                            placeholder="2020"
                            type="text"
                         
                            value={branch}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-passout-year"
                          >
                            Year of Passout
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue="2020"
                            id="input-passout-year"
                            placeholder="2020"
                            type="text"
                            onChange={(e) => SetpassoutYear(e.target.value)}
                            value={passoutYear}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">LOR Draft</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Enter your complete LOR Content</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="20"
                        // defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        // Open Source."
                        type="textarea"
                        onChange={(e) => Setcontent(e.target.value)}
                        value={content}
                      />
                    </FormGroup>
                  </div>
                  {/* <Row>

                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button onClick={SubmitFormForLor}>Submit</Button>
                      </Col>
                    </FormGroup>
                  </Row> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TeacherSideForm;
