import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Col, Row, Container } from 'react-bootstrap'
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
                    <Form>
                        <br></br><br></br>
                        <p>{data.R.PI[this.props.lang]}</p>
                        <Form.Group as={Row}>
                            <Form.Label column sm='2'>{data.R.PID[this.props.lang]}</Form.Label>
                            <Col sm="6">
                                <Form.Control plaintext readOnly defaultValue={xx.data ? xx.data.Payments[0].id : 'Random'} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} colum sm='2'>
                            <Form.Label>{data.R.TN[this.props.lang]}</Form.Label>
                            <Col sm="6">
                                <Form.Control plaintext readOnly defaultValue={xx.data ? xx.data.Payments[0].transactionNumber : 'Random'} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} column sm='2'>
                            <Form.Label>{data.R.PA[this.props.lang]}</Form.Label>
                            <Col sm="6">
                                <Form.Control plaintext readOnly defaultValue={xx.data ? xx.data.Payments[0].totalAmountPaid : 'NULL'} />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={e => this.handleSubmit(e)}>{data.R.PR[this.props.lang]}</Button>
                    </Form></Container>
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