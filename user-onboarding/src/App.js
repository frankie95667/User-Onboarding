import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardText, CardBody } from "reactstrap";
import Form from "./components/Form";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then(res =>
        setUsers(
          res.data.data.map(user => {
            return {
              id: user.id,
              email: user.email,
              name: user.first_name + " " + user.last_name
            };
          })
        )
      )
      .catch(err => console.error(err));
  }, []);

  const addUser = (user) => {
    setUsers(users => [...users, user])
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form addUser={addUser} />
        </Col>
        <Col>
          {users.map(user => {
            return (
              <Container key={user.id}>
                <Card >
                  <CardBody>
                    <CardText>{user.name}</CardText>
                    <CardText>{user.email}</CardText>
                  </CardBody>
                </Card>
              </Container>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
