import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu"; //To use top menu component;
import Card from "react-bootstrap/Card"; //import card to diplay existing forms as card
import Button from "react-bootstrap/Button";
import { CardGroup } from "react-bootstrap";
import digit from "../../assets/digit.svg";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

        <div className="d-flex justify-content-center align-items-center mt-5 mb-2 footer">
          <h6 className="mb-0">Powered by </h6>{" "}
          <img src={digit} className="ml-2" alt="Digit" height="20" />
        </div>
      </div>
    );
  }
}
