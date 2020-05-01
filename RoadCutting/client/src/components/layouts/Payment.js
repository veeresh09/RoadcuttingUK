///Payment Page
import React, { Component } from "react";
import { connect } from "react-redux";
import Menu from "./Menu";
import axios from "axios";
import data from "../../reducers/data";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import digit from "../../assets/digit.svg";

var ppp;
export var xx = [];
class Payment extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      payId: "",
      amount: "",
      paidBy: "",
      payerName: "",
      payerMobNo: "",
      msRecieptNo: "",
      msIssueDate: new Date(),
    };
    this.gr = this.gr.bind(this); //binds function so make it usable in render by this.
  }
  async componentDidMount() {
    const body = JSON.stringify({
      consumcode: this.props.consumCode,
      auth_token: this.props.auth_token,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/form/payment", body, config);
      console.log(res);
      this.setState({ payId: res.data.Bill[0].id });
      ppp = res.data.Bill[0].totalAmount;
      this.setState({ amount: ppp });
    } catch (error) {}
  }
  async gr(event) {
    event.preventDefault();
    var auth_token = this.props.auth_token;
    var billId = this.state.payId;
    var totalAmountPaid = this.state.amount;
    var mobileNumber = this.state.payerMobNo;
    var payerName = this.state.payerName;
    const body = JSON.stringify({
      auth_token,
      billId,
      totalAmountPaid,
      mobileNumber,
      payerName,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/form/collect", body, config);
      console.log(res);
      xx = res;
      xx.data.Payments[0].paidBy = this.state.paidBy; //sending data recieved from input to api
      xx.data.Payments[0].payerName = this.state.payerName;
      xx.data.Payments[0].mobileNumber = this.state.payerMobNo;
      this.props.history.push("/reciept"); //redirecting to payment page
    } catch (error) {
      alert(error);
    }
  }
  render() {
    return (
      <div>
        <Menu />
        <Container>
          <div className="effect">
            <h3 className="text-center mt-2 mb-5 font-weight-bold">
              {data.PP.PP[this.props.lang]}
            </h3>
            <br></br>
            <h4 className="font-weight-bold mb-4">
              {data.PP.PCD[this.props.lang]}
            </h4>
            <Form>
              <Row className="mb-4">
                <Col>
                  <Row>
                    <Col
                      sm={4}
                      className=" d-flex justify-content-end align-items-center "
                    >
                      <Form.Label className="mb-0 text-right">
                        {data.PP.CC[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={this.props.consumCode}
                        className="font-weight-bold"
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
                        {data.PP.FD[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue="Road Cutting Charges"
                        className="font-weight-bold"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Row>
                    <Col
                      sm={4}
                      className=" d-flex justify-content-end align-items-center "
                    >
                      <Form.Label className="mb-0 text-right">
                        {data.PP.TA[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={this.state.amount}
                        className="font-weight-bold"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col
                      sm={4}
                      className=" d-flex justify-content-end align-items-center "
                    ></Col>
                    <Col sm={8}></Col>
                  </Row>
                </Col>
              </Row>
            </Form>
            <br></br>
            <h4 className="font-weight-bold mb-4">
              {data.PP.CP[this.props.lang]}
            </h4>
            <Form>
              <Row className="mb-4">
                <Col>
                  <Row>
                    <Col
                      sm={4}
                      className=" d-flex justify-content-end align-items-center "
                    >
                      <Form.Label className="mb-0 text-right">
                        {data.PP.PB[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        as="select"
                        value={this.state.paidBy}
                        onChange={(e) =>
                          this.setState({ paidBy: e.target.value })
                        }
                      >
                        <option value="">select</option>
                        <option value="Owner">Owner</option>
                        <option value="Other">Other</option>
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
                        {data.PP.PN[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        id="payerName"
                        name="payerName"
                        placeholder="Enter Your Name"
                        value={this.payerName}
                        onChange={(e) =>
                          this.setState({ payerName: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Row>
                    <Col
                      sm={4}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Form.Label className="mb-0 text-right">
                        {data.PP.PCont[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        id="payerMobNo"
                        name="payerMobNo"
                        placeholder="Enter Your Mobile No"
                        value={this.payerMobNo}
                        onChange={(e) =>
                          this.setState({ payerMobNo: e.target.value })
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
                    ></Col>
                    <Col sm={8}></Col>
                  </Row>
                </Col>
              </Row>
              <br></br>
              <h4 className="font-weight-bold mb-4">
                {data.PP.MSCRD[this.props.lang]}
              </h4>

              <Row className="mb-4">
                <Col>
                  <Row>
                    <Col
                      sm={4}
                      className=" d-flex justify-content-end align-items-center "
                    >
                      <Form.Label className="mb-0 text-right">
                        {data.PP.MSCRNO[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        id="msRecieptNo"
                        name="msRecieptNo"
                        placeholder="Enter MSC5/MSC2 Reciept No."
                        value={this.msRecieptNo}
                        onChange={(e) =>
                          this.setState({ msRecieptNo: e.target.value })
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
                        {data.PP.MSCRID[this.props.lang]}
                      </Form.Label>
                    </Col>
                    <Col sm={8}>
                      <Form.Control
                        type="date"
                        id="msIssueDate"
                        name="msIssueDate"
                        placeholder="Enter MSC5/MSC2 Issue Date."
                        value={this.msIssueDate}
                        onChange={(e) =>
                          this.setState({ msIssueDate: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  type="button"
                  className="btn btn-dark mt-5"
                  onClick={(e) => this.gr(e)}
                >
                  {data.PP.colp[this.props.lang]}
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
  //Allows to access redux database
  return {
    user: state.user,
    password: state.password,
    auth_token: state.auth_token,
    consumCode: state.consumCode,
    lang: state.lang,
  };
};
export default connect(mapStateToProps)(Payment); //used to connect component with redux
