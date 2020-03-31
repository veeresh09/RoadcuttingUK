import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; //import redux
import Menu from "./Menu"; //To use top menu component;
import Card from "react-bootstrap/Card"; //import card to diplay existing forms as card
import Button from "react-bootstrap/Button";
import axios from "axios";
import { CardGroup } from "react-bootstrap";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  render() {
    return (
      <div>
        <Menu />
        {/* top menu component */}
        <div className="dashboard d-flex flex-column justify-content-center align-items-center ">
          <div className="effect text-center mt-5">
            <h4>RoadCutting Form</h4>

            <Link to="Form">
              <Button className="mt-4" variant="dark">
                New Form
              </Button>
            </Link>
          </div>
          <div className="effect text-center mt-5">
            <h4>Search Filled forms</h4>

            <Link to="Search">
              <Button className="mt-4" variant="dark">
                Search
              </Button>
            </Link>
          </div>
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

