import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'//For the icons used in side menu 
import { faBars, faTimes, faQrcode,faRoad,faSearch,faAddressCard,faQuestionCircle,faSlidersH,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import Menu from './Menu';//To use top menu component;
import Card from 'react-bootstrap/Card';//import card to diplay existing forms as card
import Button from 'react-bootstrap/Button';
import { Navbar, Nav, NavItem,CardGroup} from 'react-bootstrap';
import Sidebar from './Sidebar';
export default class Dashboard  extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  render() {
    return (
    
    
      <div>
          <Menu />{/* top menu component */}

 <div className = 'centerr'>
   <CardGroup>
 <Card className='carddd'>
  
  <Card.Body>
    <Card.Text>
      RoadCutting Form
    </Card.Text>
    
      <Link to = 'Form'><Button variant="primary">New Form</Button></Link>
  </Card.Body>
</Card>
<Card className = 'carddd'>
  
  <Card.Body>

    <Card.Text>
      Search Filled forms
    </Card.Text>
    
      <Link to = 'Search'><Button variant="primary">Search</Button></Link>
  </Card.Body>
</Card></CardGroup>
 </div>


  </div>
    );
  }
}