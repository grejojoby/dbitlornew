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

// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useAlert } from 'react-alert'

import axios from 'axios';
import  { Redirect } from 'react-router-dom'

const Login = (props) => {
  const alert = useAlert()
  const [username,Setusername]=useState("");
  const [password,Setpassword]=useState("");
  function usernameInp(e){
    Setusername(e.target.value);
  }
  function passInp(e){
    Setpassword(e.target.value);
  }

useEffect(() => {
  if(localStorage.getItem('token') || null!=null)
  {
    props.SetToken(localStorage.getItem('token'));
    props.history.push('/admin')
  }


}, [])

  function LoginUser(){
    // props.GetUserToken(username,password);
    const article = { username:username,password:password };
    const headers = { 
        // 'Authorization': 'Bearer my-token',
        // 'My-Custom-Header': 'foobar'
    };
    axios.post('https://dbitlor.hayden.co.in/token/loginwithuser/', article, { headers })
    .then(
        (response)=>{
          console.log(props)
            props.SetToken(response.data.token);
            // console.log("asdfa");
          alert.success("Logging you in...");

            localStorage.setItem('token', response.data.token);
            console.log(response.data.token)
            
            if(response.data.whoami==="student"){
              props.history.push('/admin')

            }
            else{
              props.history.push('/teacher')

            }
            
        }  
        )
        .catch((error) => {
          alert.error("Incorrect username or password!");
          console.error(error,"failed to login");
        });
    
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              {/* <small> */}
                <h2>Sign in with credentials</h2>
                {/* </small> */}
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={usernameInp}
                    value={username}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={passInp}
                    value={password}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={LoginUser}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
