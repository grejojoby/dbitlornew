
import React,{useState,useEffect} from "react";
import { generatePath, Link } from "react-router-dom";
import axios from 'axios';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Input } from "reactstrap";

const Header = (props) => {
  var [application, SetApplication] = useState([]);
  var [selectedLorDown, SetselectedLorDown] = useState(-1);
  useEffect(() => {

    
    axios.get(`https://dbitlor.hayden.co.in/api/loggedinusersapplications/`, {
      headers: {
        'Authorization': `Token ${props.token}`
      }
    })
      .then((res) => {
        SetApplication(res.data);
        // console.log(res.data);
     
      })
      .catch((error) => {
        console.log(props.token);

        console.error(error)
      })
  }, [props.token])
  function GeneratePdf() {
    if(selectedLorDown==-1){
      alert("Please Select an option from the dropdown");
      return 
    }
    // console.log(props.token);
    const article = { appID: selectedLorDown };
    const headers = {
      'Authorization': `Token ${props.token}`,


    };
    axios.post('https://dbitlor.hayden.co.in/api/generatepdf/', article, { headers })
      .then(
        (response) => {

          console.log(response.data.downloadLink);

          window.location=response.data.downloadLink;
        }
      )
      .catch((error) => {
        console.error(error, "failed to download");
      });



  }
  console.log(props);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="4" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted text-center mb-0">Place New Request for LOR</CardTitle>
                      </div>
                    </Row>
                    <Row className="align-items-center justify-content-center">
                      <Link to="/admin/lor-request">
                        <Button color="default mt-3" type="button">Request LOR</Button>
                      </Link>
                    </Row>

                  </CardBody>
                </Card>
              </Col>
              <Col lg="8" xl="8">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted text-center mb-0">Download your LOR</CardTitle>
                      </div>
                    </Row>
                    <Row className="align-items-center justify-content-center">
                      {/* <Button color="default mt-3" type="button">Approve LOR</Button> */}

                    </Row>
                    <Row className="align-items-center justify-content-center align-middle">
                      <Col lg="8" xl="8" className="align-middle">
                        <Input className="form-control-alternative" type="select" name="select" id="input-faculty-name" onChange={(e)=>SetselectedLorDown(e.target.value)}>
                        <option value={null}></option>
                            {application.filter((item) => item.status == "approved").map((obj, idx) => <option value={obj.id}>{obj.teacher.first_name} {obj.teacher.last_name}</option>)}

                        </Input>
                      </Col>

                      <Col lg="4" xl="4" className="align-middle">
                        <Button color="default mt-3" type="button" onClick={GeneratePdf}>Download</Button>
                      </Col>

                    </Row>

                  </CardBody>
                </Card>
              </Col>
              {/* <Col lg="4" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted text-center mb-0">Download Your LOR</CardTitle>
                      </div>
                    </Row>
                    <Row className="align-items-center justify-content-center">
                      <Button color="default mt-3" type="button" onClick={GeneratePdf}>Download</Button>

                    </Row>

                  </CardBody>
                </Card>
              </Col> */}
              {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
