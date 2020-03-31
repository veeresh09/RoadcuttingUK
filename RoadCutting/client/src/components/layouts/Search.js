//Page to either go to road cutting form or search existing form and edit it
import React, { Component } from "react";
import axios from "axios";
import data from "../../reducers/data";
import { connect } from "react-redux"; //import redux
import Card from "react-bootstrap/Card"; //import card to diplay existing forms as card
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Topbar from "./Menu";
import digit from "../../assets/digit.svg";

var items = [];
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wardno: "",
      todispl: false,
      obj: []
    };
    this.onC = this.onC.bind(this);
    this.FormSubmit = this.FormSubmit.bind(this);
    this.chang = this.chang.bind(this);
    this.handlebutton = this.handlebutton.bind(this);
    this.errands = this.errands.bind(this);
    console.log(this.state);
  }

  async componentDidMount() {
    //To get the district list from database using api calls as soon as component displays
    try {
      const auth_token = this.props.auth_token;
      const body = JSON.stringify({ auth_token });
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/form/cities", body, config);
      console.log(res);
      res.data.wardnumbers[0] = "Select ward Number";
      await this.props.load_data(res.data);
    } catch (error) {
      alert(error);
    }
  }
  async FormSubmit(event) {
    //function to the list of existing forms of particular ward no and displaying them when user hit search after entering valid ward no
    event.preventDefault();
    var road_ward_n = this.state.wardno;
    try {
      const res = await axios.get("/profile/form", {
        params: {
          road_ward_no: road_ward_n
        }
      });
      if (res.status === 200) {
        console.log(res.data);
        console.log("Succesfull");
        items = res.data;
        for (let i = 0; i < items.length; i++) {
          items[i].slno = i;
        }
        this.chang();
        console.log(this.state.todispl);
        console.log(items);
      }
    } catch (error) {
      alert(error);
    }
  }
  errands() {
    //to send user to edit page
    this.props.history.push("/edit");
  }
  onC() {
    //to send user to road cutting form page when he selects to form
    this.props.history.push("/form");
  }
  chang() {
    //to store value when user enter or changes ward no
    this.setState({ todispl: true });
  }
  async handlebutton(e, idx) {
    //to get the specific form data when user click on edit and save it in redux
    e.preventDefault();
    await this.props.copy_form(items[idx]);
    console.log(idx);
    this.errands();
  }
  render() {
    let disp;
    let pos = 0;
    if (!this.state.todispl || items.length == 0) {
      //To diplay when user entered invalid ward no
      disp = <h5 className="text-center mt-4 mb-6"></h5>;
    } else {
      //to diplay all form with ward no entered by user
      {
        /* map to display all forms with ward no */
      }
      disp = items.map(d => (
        <div key={d._id} className="centerrr">
          <Card key={d._id} className="card">
            {/* Card to diplay form data */}
            <Card.Body>
              <Row>
                <Col xs={2} className="font-weight-bold">
                  Form No
                </Col>
                <Col>{d._id}</Col>
              </Row>
              <Row>
                <Col xs={2} className="font-weight-bold">
                  Name
                </Col>
                <Col>{d.name}</Col>
              </Row>
              <Row>
                <Col xs={2} className="font-weight-bold">
                  Email
                </Col>
                <Col>{d.email}</Col>
              </Row>
              <Row>
                <Col xs={2} className="font-weight-bold">
                  Locality
                </Col>
                <Col>{d.road_locality}</Col>
              </Row>
              <Row>
                <Col xs={2} className="font-weight-bold">
                  Category
                </Col>
                <Col>{d.road_category}</Col>
              </Row>
              <Row>
                <Col xs={2} className="font-weight-bold">
                  Reason
                </Col>
                <Col>{d.road_cuttingReason}</Col>
              </Row>
              <Button
                className="abc mt-4"
                variant="dark"
                onClick={e => this.handlebutton(e, d.slno)}
              >
                Edit Form
              </Button>
              {/* edit button */}
            </Card.Body>
          </Card>
          <br></br>
        </div>
      ));
    }
    return (
      <>
        <Topbar />
        <Container>
          <div className="effect">
            <h3 className="text-center mt-4 mb-5 font-weight-bold">
              {data.searchaeform[this.props.lang]}
            </h3>
            <Form>
              <div>
                <Row>
                  <Col
                    sm={{ span: 2, offset: 3 }}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <Form.Label className="mb-0">
                      {data.wardno[this.props.lang]}
                    </Form.Label>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      type="text"
                      id="wardno"
                      name="wardno"
                      placeholder={data.validwardno[this.props.lang]}
                      value={this.state.wardno}
                      onChange={e =>
                        this.setState({
                          wardno: e.target.value,
                          todispl: "false"
                        })
                      }
                    />
                  </Col>
                </Row>
                <div className="Buttoncontainer mt-4">
                  <input
                    type="submit"
                    className="btn btn-dark my-1"
                    onClick={e => this.FormSubmit(e)}
                    value={data.Search[this.props.lang]}
                  />
                </div>
              </div>
            </Form>
          </div>

          <div>{disp}</div>
        </Container>
        <div className="d-flex justify-content-center align-items-center mt-5 mb-2">
          <h6 className="mb-0">Powered by </h6>{" "}
          <img src={digit} className="ml-2" alt="Digit" height="20" />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  //Allows to access redux database
  return {
    user: state.user,
    password: state.password,
    auth_token: state.auth_token,
    formdata: state.formdata,
    mdmsdata: state.mdmsdata,
    lang: state.lang
  };
};

const mapDispatchToProps = dispatch => {
  //Functions provided by redux
  return {
    edit_user: user => {
      dispatch({ type: "EDIT_USERNAME", user: user });
    },
    edit_pass: password => {
      dispatch({ type: "EDIT_PASSWORD", password: password });
    },
    edit_auth: auth_token => {
      dispatch({ type: "AUTHENTICATE", auth_token: auth_token });
    },
    copy_form: formdata => {
      dispatch({ type: "COPYFORMDETAILS", formdata: formdata });
    },
    load_data: mdmsdata => {
      dispatch({ type: "DATALOAD", mdmsdata: mdmsdata });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
