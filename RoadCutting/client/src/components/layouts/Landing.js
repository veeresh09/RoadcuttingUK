//Login Page
import React, { Component } from 'react';
import { connect } from 'react-redux';//import redux
import axios from 'axios';
import data from '../../reducers/data';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import digit from "../../assets/digit.svg";
import ukdlogo from "../../assets/ukdlogo.svg";
var obj;
var nam = [];
class Landing extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);//binds function to make it usable in render using this
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.handlechang = this.handlechang.bind(this);
    this.state = {
      dist: "",
    }
  }

  async  componentDidMount() {//To get the district list from database using api calls as soon as component displays
    try {
      obj = await axios.get('/api/auth');
      console.log(obj);
      nam.push({ id: 0, city: "Select City" })
      for (let i = 0; i < obj.data.MdmsRes.tenant.tenants.length; i++) {
        nam.push({ id: i + 1, city: obj.data.MdmsRes.tenant.tenants[i].name });
      }
      this.props.edit_nam(nam);
    } catch (error) {
      alert(error);
    }

  }
  handlechang(event) {//Store value of district as user select
    this.setState({ dist: 'uk.' + event.target.value.toLowerCase() });
  }

  handleChange(event) {//store value of username as user enter
    this.props.edit_user(event.target.value);
  }
  handlechange(event) {//store value of password as user enters
    this.props.edit_pass(event.target.value);
  }

  async handleSubmit(event) {//function to send user data entered in login page and generate auth id using api calls when user submit.
    event.preventDefault();
    console.log('submitted');
    var user = this.props.user;
    var password = this.props.password;
    var tenant_Id = this.state.dist;
    const body = JSON.stringify({ user, password, tenant_Id });
    const body2 = JSON.stringify({
      "user": "EMP-000006",
      "password": "09ue9aU1",
      "tenant_Id": "uk.haldwani"
    });
    console.log(body);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res1 = await axios.post('/api/auth', body2, config);
      const res = await axios.post('/api/auth', body, config);
      console.log(this.props);
      console.log(res1.data.access_token);
      console.log(res.data.access_token);
      console.log(body);
      console.log(res);
      if (res.status === 200) {
        this.props.edit_auth(res.data.access_token);
        this.props.edit_authid(res1.data.access_token);
        console.log(res);
        console.log("Succesfull");
        console.log(this.props);
        this.props.history.push("/search");
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {//User interface of Login Page
    console.log(data.URD[this.props.lang]);
    return (
      <div>
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col lg={4} className="justify-content-center align-items-center">
            <div className="box my-4">
              <div className="d-flex justify-content-center align-items-center my-5 ">
                <img src={ukdlogo} alt="Digit" height="150" />
              </div>
              <Form>
                <Form.Group controlId="formBasic">
                  <Form.Label>{data.Username[this.props.lang]}</Form.Label>
                  <Form.Control type="text" placeholder="Enter userName" value={this.props.user} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>{data.Password[this.props.lang]}</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={this.props.password} onChange={this.handlechange}  />
                </Form.Group>
                <Form.Group>
              
            <Form.Label>{data.City[this.props.lang]}</Form.Label>

            <Form.Control as = 'select' onChange={this.handlechang}>{/* Dropdown for selecting district of user */}
              {nam.map(item => (
                <option key={item.id} value={item.city}>
                  {item.city}
                </option>
              ))}
            </Form.Control></Form.Group>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button variant="primary" type="submit"  onClick={this.handleSubmit} >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-center align-items-center footer">
          <h6 className="mb-0">Backed by </h6>{" "}
          <img src={digit} alt="Digit" height="20" />
        </div>
      </Container>
    </div>
    );
  }
}

const mapStateToProps = (state) => {//Allows to access redux database
  return {
    user: state.user,
    password: state.password,
    auth_token: state.auth_token,
    auth_tokenid: state.auth_tokenid,
    nam: state.nam,
    lang : state.lang,
  }
}

const mapDispatchToProps = (dispatch) => {//Functions provided by redux
  return {
    edit_user: (user) => { dispatch({ type: 'EDIT_USERNAME', user: user }) },
    edit_pass: (password) => { dispatch({ type: 'EDIT_PASSWORD', password: password }) },
    edit_auth: (auth_token) => { dispatch({ type: 'AUTHENTICATE', auth_token: auth_token }) },
    edit_authid: (auth_tokenid) => { dispatch({ type: 'AUTHENTICATEID', auth_tokenid: auth_tokenid }) },
    edit_nam: (nam) => { dispatch({ type: 'CITIESLIST', nam: nam }) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing)