import React, { Component } from 'react';
import { connect } from 'react-redux';//import redux
import Card from 'react-bootstrap/Card';//import card to diplay existing forms as card
import { Button, Form, Col, Row, Container } from 'react-bootstrap';

class Land extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmite = this.handleSubmite.bind(this);
    console.log(this.props);
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.props.edit_lang(0);
    console.log(this.props);
    this.props.history.push('/login');
  }
  async handleSubmite(event) {
    event.preventDefault();
    this.props.edit_lang(1);
    this.props.history.push('/login');
  }
  render() {
    return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Select Language/ भाषा का चयन करें</Card.Title>

            <Button variant="primary" size='lg' onClick={e => this.handleSubmit(e)}>English</Button>{' '}
            <Button variant="primary" size='lg' onClick={e => this.handleSubmite(e)}>हिंदी</Button>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {//Allows to access redux database
  return {
    lang: state.lang,
  }
}

const mapDispatchToProps = (dispatch) => {//Functions provided by redux
  return {
    edit_lang: (lang) => { dispatch({ type: 'CHANGELANG', lang: lang }) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Land)