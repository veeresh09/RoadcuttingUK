import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import data from '../../reducers/data';
import { connect } from 'react-redux';//import redux
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'//For the icons used in side menu 
import { Nav, Container, Col, Row, Navbar, Badge, NavbarBrand } from 'react-bootstrap';//importing navbar items for top menu
import { faBars, faTimes, faQrcode, faRoad, faSearch, faAddressCard, faQuestionCircle, faSlidersH, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Menu from './Menu';//To use top menu component;
 class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Menu></Menu>
        <Row>
          <Col xs md lg="1.5">
            <Nav
              className="flex-column"
            >
              <br></br> <br></br> <br></br> <br></br>
              <br></br> <br></br> <br></br> <br></br>
              <Nav.Item>
                <Nav.Link ><Link to='Dashboard'>{data.N.D[this.props.lang]}</Link></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link><Link to='Form'>{data.N.NF[this.props.lang]}</Link></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link><Link to='Search'>{data.N.S[this.props.lang]}</Link></Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs md lg="10">
            {this.props.children}
          </Col>
        </Row>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
      lang: state.lang,

  }
}
export default connect(mapStateToProps)(Sidebar)