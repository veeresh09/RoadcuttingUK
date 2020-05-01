import React, { Component } from "react";
import {
  Navbar,
  Form,
  Nav,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import ukdlogo from "../../assets/ukdlogo.svg";
import { connect } from "react-redux"; //import redux
import { Link } from "react-router-dom";
import data from "../../reducers/data";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmite = this.handleSubmite.bind(this);
    console.log(this.props);
  }
  async handleSubmit(event) {
    //Function used to change the language of text displayed to english
    event.preventDefault();
    this.props.edit_lang(0);
    console.log(this.props);
  }
  async handleSubmite(event) {
    //Function used to change the language of text displayed to hindi
    event.preventDefault();
    this.props.edit_lang(1);
  }
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            {/*Inserting Logo */}
            <img
              alt=""
              src={ukdlogo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <h4 className="d-inline-block align-top mb-0 ml-2 font-weight-bold">
              Road Cutting
            </h4>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {/* <Nav.Link>
              <Link className="link" to="Dashboard">
                {data.N.D[this.props.lang]}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="Form">
                {data.N.NF[this.props.lang]}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="Search">
                {data.N.S[this.props.lang]}
              </Link>
            </Nav.Link> */}
            <NavDropdown title="Choose Language" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={(e) => this.handleSubmit(e)}>
                English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => this.handleSubmite(e)}>
                हिन्दी
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={data.RC[this.props.lang]}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link className="link" to="Search">
                  {data.N.S[this.props.lang]}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="link" to="Form">
                  {data.N.NF[this.props.lang]}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="link" to="Dashboard">
                  {data.N.D[this.props.lang]}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/">{data.N.SO[this.props.lang]}</Nav.Link>
          </Nav>
        </Navbar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  //Allows to access redux database
  return {
    lang: state.lang,
  };
};
const mapDispatchToProps = (dispatch) => {
  // To Functions defined redux to change variables stored in redux

  return {
    edit_lang: (lang) => {
      dispatch({ type: "CHANGELANG", lang: lang });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar); //used to connect componenet with redux
