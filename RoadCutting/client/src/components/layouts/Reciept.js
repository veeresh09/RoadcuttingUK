import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Col, Row, Container, Card } from 'react-bootstrap'
import Menu from './Menu';
import data from '../../reducers/data';
import axios from 'axios';
import { xx } from './Payment';
import { Redirect } from 'react-router-dom';
class Reciept extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        console.log(xx);
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const body = {
            "RequestInfo": {

                "authToken": this.props.auth_token
            },
            "Payments": xx.data.Payments
        }

        try {
            const res = await axios.post("/reciept/pdfgen", body);
            const body2 = {
                "id": res.data.filestoreIds[0]
            }
            const res2 = await axios.post("/reciept/print", body2);
            console.log(res2);
            window.open(res2.data.fileStoreIds[0].url);
        } catch (error) {
            console.log(error);
        }

    }
    render() {
        return (
            <div className="pay">
                <Menu />
                <Container>

                    <h2 className="large text-primary">{data.R.R[this.props.lang]}</h2>
                    <Card className="text-center">
                        <Card.Header>{data.R.PI[this.props.lang]}</Card.Header>
                        <Form>
                            <Row className="mb-4">
                                <Col><Row><Col sm={4} className=" d-flex justify-content-end align-items-center ">
                                    <Form.Label className="mb-0">{data.R.PID[this.props.lang]}</Form.Label></Col>
                                    <Col sm={8}>
                                        <Form.Control plaintext readOnly defaultValue={xx.data ? xx.data.Payments[0].id : 'Random'} />
                                    </Col></Row></Col>
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
                            <Row className="mb-4">
                                <Col><Row><Col sm={4} className=" d-flex justify-content-end align-items-center ">
                                    <Form.Label className="mb-0">{data.R.TN[this.props.lang]}</Form.Label></Col>
                                    <Col sm={8}>
                                        <Form.Control plaintext readOnly defaultValue={xx.data ? xx.data.Payments[0].transactionNumber : 'Random'} />
                                    </Col></Row></Col>
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
                            <Row className="mb-4">
                                <Col><Row><Col sm={4} className=" d-flex justify-content-end align-items-center ">
                                    <Form.Label>{data.R.PA[this.props.lang]}</Form.Label></Col>
                                    <Col sm={8}>
                                        <Form.Control plaintext readOnly defaultValue={xx.data ? xx.data.Payments[0].totalAmountPaid : 'NULL'} />
                                    </Col></Row></Col>
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
                            <Button variant="primary" type="submit" onClick={e => this.handleSubmit(e)}>{data.R.PR[this.props.lang]}</Button>
                        </Form>
                    </Card>
                </Container>

            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        password: state.password,
        auth_token: state.auth_token,
        consumCode: state.consumCode,
        lang: state.lang,

    }
}
export default connect(mapStateToProps)(Reciept)
