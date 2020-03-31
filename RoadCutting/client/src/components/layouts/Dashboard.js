import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu"; //To use top menu component;
import Card from "react-bootstrap/Card"; //import card to diplay existing forms as card
import Button from "react-bootstrap/Button";
import { CardGroup } from "react-bootstrap";
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
      </div>
    );
  }
}
