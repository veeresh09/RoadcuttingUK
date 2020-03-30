import React,{Component} from "react";
import { Navbar, Form, Nav, FormControl, Button } from "react-bootstrap";
import ukdlogo from "../../assets/ukdlogo.svg";
import { connect } from 'react-redux';//import redux
import { Link } from 'react-router-dom'
import data from '../../reducers/data';
class Sidebar extends Component{
  render(){
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={ukdlogo}
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          {"    Road Cutting"}
        </Navbar.Brand>
        <Nav className="ml-auto">
        <Nav.Link ><Link to='Dashboard'>{data.N.D[this.props.lang]}</Link></Nav.Link>
        <Nav.Link><Link to='Form'>{data.N.NF[this.props.lang]}</Link></Nav.Link>
        <Nav.Link><Link to='Search'>{data.N.S[this.props.lang]}</Link></Nav.Link>
        <Nav.Link href="/">{data.N.SO[this.props.lang]}</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );}
};
const mapStateToProps = (state) => {
  return {
      lang: state.lang,

  }
}
export default connect(mapStateToProps)(Sidebar)