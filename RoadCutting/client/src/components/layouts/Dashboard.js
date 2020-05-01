import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; //import redux
import data from "../../reducers/data";
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
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/form/cities", body, config); //  calling the api to store the localities data in redux
      console.log(res);
      res.data.wardnumbers[0] = "Select ward Number";
      await this.props.load_data(res.data); //saving data recieved from api to redux
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
            <h4>{data.Form.RCF[this.props.lang]}</h4>

            <Link to="Form">
              <Button className="mt-4" variant="dark">
                {data.N.NF[this.props.lang]}
              </Button>
            </Link>
          </div>
          <div className="effect text-center mt-5">
            <h4>{data.SFD[this.props.lang]}</h4>

            <Link to="Search">
              <Button className="mt-4" variant="dark">
                {data.N.S[this.props.lang]}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //Allows to access redux database
  return {
    user: state.user,
    password: state.password,
    auth_token: state.auth_token,
    formdata: state.formdata,
    mdmsdata: state.mdmsdata,
    lang: state.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  // To Functions defined redux to change variables stored in redux
  return {
    edit_user: (user) => {
      dispatch({ type: "EDIT_USERNAME", user: user });
    },
    edit_pass: (password) => {
      dispatch({ type: "EDIT_PASSWORD", password: password });
    },
    edit_auth: (auth_token) => {
      dispatch({ type: "AUTHENTICATE", auth_token: auth_token });
    },
    copy_form: (formdata) => {
      dispatch({ type: "COPYFORMDETAILS", formdata: formdata });
    },
    load_data: (mdmsdata) => {
      dispatch({ type: "DATALOAD", mdmsdata: mdmsdata });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard); //used to connect componenet with redux
