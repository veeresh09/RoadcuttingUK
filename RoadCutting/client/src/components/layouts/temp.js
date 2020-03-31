import React from "react";
import Topbar from "./Menu";
import digit from "../../assets/digit.svg";

import { Container, Form, Row, Col, Button } from "react-bootstrap";

const thispropslang = 1;
export default () => {
  return (
    <div>
      <Container>
        <Form>
          <div>
            <h4 className="mb-4">Sample</h4>
            <Row className="mb-2">
              <Col>
                <Row>
                  <Col
                    sm={4}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <Form.Label className="mb-0">Sample0</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control size="sm" type="text" placeholder="Sample0" />
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row>
                  <Col
                    sm={4}
                    className=" d-flex justify-content-end align-items-center "
                  >
                    <Form.Label className="mb-0">Sample1</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control size="sm" type="text" placeholder="sample" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Row>
                  <Col
                    sm={4}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <Form.Label className="mb-0">lengthy Sample0</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control size="sm" type="text" placeholder="Sample0" />
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row>
                  <Col
                    sm={4}
                    className=" d-flex justify-content-end align-items-center "
                  >
                    <Form.Label className="mb-0">Sample1</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control size="sm" type="text" placeholder="sample" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Row>
                  <Col
                    sm={4}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <Form.Label className="mb-0">small</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Control size="sm" type="text" placeholder="Sample0" />
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
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <h6 className="mb-0">Powered by </h6>{" "}
        <img src={digit} className="ml-2" alt="Digit" height="20" />
      </div>
    </div>
  );
};
