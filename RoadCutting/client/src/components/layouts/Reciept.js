import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Col, Row, Container, Card } from "react-bootstrap";
import Menu from "./Menu";
import data from "../../reducers/data";
import axios from "axios";
import { xx } from "./Payment";
import { Redirect } from "react-router-dom";
import digit from "../../assets/digit.svg";

class Reciept extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log(xx);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const body = {
      RequestInfo: {
        authToken: this.props.auth_token,
      },
      Payments: xx.data.Payments,
    };

    try {
      const res = await axios.post("/reciept/pdfgen", body); //used to get file store id of pdf generated for reciept
      console.log(res);
      console.log(res.data);
      console.log(res.data.filestoreIds);
      console.log(res.data.filestoreIds[0]);
      const body2 = {
        id: res.data.filestoreIds[0],
      };
      const res2 = await axios.post("/reciept/print", body2); //used to get link generate pdf
      console.log(res2.data[res.data.filestoreIds[0]]);
      window.open(res2.data[res.data.filestoreIds[0]]); //opens link in new window to download pdf
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="pay">
        <Menu />
        <Container>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="effect">
              <h3 className="text-center mt-2 mb-5 font-weight-bold">
                {data.R.R[this.props.lang]}
              </h3>
              <Form>
                <Row>
                  <Col className="d-flex justify-content-end align-items-center">
                    <Form.Label className="mb-0">
                      {data.R.CC[this.props.lang]}
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={this.props.consumCode}
                      className="font-weight-bold"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="d-flex justify-content-end align-items-center">
                    <Form.Label className="mb-0">
                      {data.R.TN[this.props.lang]}
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={
                        xx.data
                          ? xx.data.Payments[0].transactionNumber
                          : "Random"
                      }
                      className="font-weight-bold"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="d-flex justify-content-end align-items-center">
                    <Form.Label className="mb-0">
                      {data.R.PA[this.props.lang]}
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={
                        xx.data ? xx.data.Payments[0].totalAmountPaid : "NULL"
                      }
                      className="font-weight-bold"
                    />
                  </Col>
                </Row>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Button
                    variant="dark"
                    type="submit"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    {data.R.PR[this.props.lang]}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Container>
        <div className="d-flex justify-content-center align-items-center mt-5 mb-2 footer">
          <h6 className="mb-0">Powered by </h6>{" "}
          <img
            src={digit}
            className="ml-2"
            className="ml-2"
            alt="Digit"
            height="20"
          />
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
    consumCode: state.consumCode,
    lang: state.lang,
  };
};
export default connect(mapStateToProps)(Reciept); //used to connect componenet with redux
