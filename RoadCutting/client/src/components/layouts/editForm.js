import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dashboard from './Dashboard';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import Menu from "./Menu";
import digit from "../../assets/digit.svg";
import data from "../../reducers/data";
import Sidebar from './Sidebar';
var nam = [];

class editForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      name: this.props.formdata.name,
      fatherName: this.props.formdata.fatherName,
      mobile: this.props.formdata.mobile,
      email: this.props.formdata.email,
      applicantType: this.props.formdata.applicantType,
      district: this.props.formdata.district,
      areaType: this.props.formdata.areaType,
      address1: this.props.formdata.address1,
      address2: this.props.formdata.address2,
      pincode: this.props.formdata.pincode,
      road_district: this.props.formdata.road_district,
      road_urban_local_body_name: this.props.formdata.road_urban_local_body_name,
      road_ward_no: this.props.formdata.road_ward_no,
      road_locality: this.props.formdata.road_locality,
      road_cuttingReason: this.props.formdata.road_cuttingReason,
      road_category: this.props.formdata.road_category,
      road_totalcost: this.props.formdata.road_totalcost,
      consumerCode: this.props.formdata.consumCode,
      localarr: [],
      error: null
    }
    const auth_token = this.props.auth_token;
    console.log(auth_token);
  }
  async handleFormSubmit(event) {
    event.preventDefault();
    console.log('submitted');
    const { name, fatherName, mobile, email, applicantType, district, areaType, address1, address2, pincode, road_district, road_urban_local_body_name, road_ward_no, road_locality, road_cuttingReason, road_category, road_totalcost, consumerCode } = this.state;
    const userid = this.props.formdata._id;
    console.log(userid);
    const body = JSON.stringify({ userid, name, fatherName, mobile, email, applicantType, district, areaType, address1, address2, pincode, road_district, road_urban_local_body_name, road_ward_no, road_locality, road_cuttingReason, road_category, road_totalcost, consumerCode });
    console.log(body);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/form/update', body, config);
      if (res.status === 200) {
        console.log("Succesfull");
        alert('Form submitted');
        console.log(res);
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    let nam = [];
    let wards = [];
    this.props.mdmsdata.wardnumbers = this.props.mdmsdata.wardnumbers
      ? this.props.mdmsdata.wardnumbers
      : [];
    for (let i = 0; i < this.props.mdmsdata.wardnumbers.length; i++) {
      wards.push({ id: i + 1, city: this.props.mdmsdata.wardnumbers[i] });
    }
    //console.log(this.props.mdmsdata.wardnumbers[1]);
    console.log(wards);
    nam = this.props.nam; //getting list of districts got in login page;
    return (
      <div>
        <Menu />
        <Container>
          <div className="effect">
            <h3 className="text-center mt-2 mb-5 font-weight-bold">
              {data.Form.RCF[this.props.lang]}
            </h3>
            <Form>
              <div>
                <h4 className="font-weight-bold mb-4">
                  {data.Form.UD[this.props.lang]}
                </h4>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.AN[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your name.."
                          value={this.state.name}
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.Fhn[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          placeholder="Your father's name.."
                          value={this.state.fatherName}
                          onChange={e =>
                            this.setState({ fatherName: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.MN[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="mobile"
                          name="mobile"
                          placeholder="Your mobile mobile.."
                          value={this.state.mobile}
                          onChange={e =>
                            this.setState({ mobile: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.email[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Your email.."
                          value={this.state.email}
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.AT[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="select"
                          value={this.state.applicantType}
                          onChange={e =>
                            this.setState({ applicantType: e.target.value })
                          }
                        >
                          <option value="">select</option>
                          <option value="type1">type1</option>
                          <option value="type2">type2</option>
                          <option value="type3">type3</option>
                          <option value="type4">type4</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.District[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="district"
                          name="district"
                          placeholder="Your district.."
                          value={this.state.district}
                          onChange={e =>
                            this.setState({ district: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.AL1[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          id="address1"
                          name="address1"
                          placeholder="Address line 1.."
                          value={this.state.address1}
                          onChange={e =>
                            this.setState({ address1: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.AL2[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          id="address2"
                          name="address2"
                          placeholder="Address Line 2.."
                          value={this.state.address2}
                          onChange={e =>
                            this.setState({ address2: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.Areatype[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="select"
                          value={this.state.areaType}
                          onChange={e =>
                            this.setState({ areaType: e.target.value })
                          }
                        >
                          <option value="">select</option>
                          <option value="Urban">Urban</option>
                          <option value="Rural">Rural</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.Pin[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="pincode"
                          name="pincode"
                          placeholder="pin code .."
                          value={this.state.pincode}
                          onChange={e =>
                            this.setState({ pincode: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <br></br>
              <div>
                <h4 className="font-weight-bold mt-5 mb-4">
                  {data.Form.LRS[this.props.lang]}
                </h4>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.District[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="select"
                          onChange={e =>
                            this.setState({ road_district: e.target.value })
                          }
                        >
                          {nam.map(item => (
                            <option key={item.id} value={item.city}>
                              {item.city}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.Ward[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="select"
                          value={this.state.road_ward_no}
                          onChange={e =>
                            this.setState({
                              road_ward_no: e.target.value,
                              localarr: this.props.mdmsdata.localarray[
                                e.target.value.match(/\d+/g)
                              ]
                            })
                          }
                        >
                          {wards.map(item => (
                            <option key={item.id} value={item.city}>
                              {item.city}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.ULBN[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="select"
                          value={this.state.road_urban_local_body_name}
                          onChange={e =>
                            this.setState({
                              road_urban_local_body_name: e.target.value
                            })
                          }
                        >
                          {this.state.localarr.map(item => (
                            <option value={item}>{item}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.Loc[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="road_locality"
                          name="road_locality"
                          placeholder="Locality/Street"
                          value={this.state.road_locality}
                          onChange={e =>
                            this.setState({ road_locality: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.RFRC[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="select"
                          value={this.state.road_cuttingReason}
                          onChange={e => {
                            this.setState({
                              road_cuttingReason: e.target.value
                            });
                            this.calculateCost(
                              "road_cuttingReason",
                              e.target.value
                            );
                          }}
                        >
                          <option value="">select type of work</option>
                          <option value="type1">type1</option>
                          <option value="type2">type2</option>
                          <option value="type3">type3</option>
                          <option value="type4">type4</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.CR[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          as="select"
                          value={this.state.road_category}
                          onChange={e => {
                            this.setState({ road_category: e.target.value });
                            this.calculateCost("road_category", e.target.value);
                          }}
                        >
                          <option value="">select work type</option>
                          <option value="Sewer Line">Sewer Line</option>
                          <option value="Jai Shanthan">Jai Shanthan</option>
                          <option value="Right of way">Right of way</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.RLength[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="road_length"
                          name="road_length"
                          placeholder="in Meters"
                          value={this.state.road_length}
                          onChange={e => {
                            this.setState({ road_length: e.target.value });
                            this.calculateCost("road_length", e.target.value);
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Col
                        sm={4}
                        className=" d-flex justify-content-end align-items-center "
                      >
                        <Form.Label className="mb-0 text-right">
                          {data.Form.Cost[this.props.lang]}
                        </Form.Label>
                      </Col>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          id="road_totalcost"
                          name="road_totalcost"
                          placeholder="in Rs."
                          value={this.state.road_totalcost}
                          onChange={e =>
                            this.setState({ road_totalcost: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-5">
                <Button
                  type="submit"
                  variant="dark"
                  onClick={e => this.handleFormSubmit(e)}
                >
                  {data.Form.Submit[this.props.lang]}
                </Button>
              </div>
            </Form>
          </div>
        </Container>
        <div className="d-flex justify-content-center align-items-center mt-5 mb-2">
          <h6 className="mb-0">Powered by </h6>{" "}
          <img src={digit} className="ml-2" alt="Digit" height="20" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    password: state.password,
    auth_token: state.auth_token,
    formdata: state.formdata,
    auth_tokenid: state.auth_tokenid,
    nam: state.nam,
    consumCode: state.consumCode,
    mdmsdata: state.mdmsdata,
    lang: state.lang
  }
}
export default connect(mapStateToProps)(editForm)
