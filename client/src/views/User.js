import React, { useState } from "react";
import httpClient from "../../src/httpClient";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

function LoginPage () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const logInUser = async () => {
    console.log(email, password);

    try{
      const resp = await httpClient.post("http://localhost:5000/login", {
        email,
        password,
      });
      // Check response data to determine which page to redirect to
      if (resp.data.user_type === "admin"){

        window.location.href ="/admin/admin-page"
      } 
      else {
        window.location.href ="/admin/agent-page"  
       
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        console.error(error);
      }
    }
  };
 
  return (
    <>
    <div className="content mx-auto "style={{ height: "200vh"}}>
      <Row className="mx-auto"style={{ height: "100vh"}}>
         <Col className ="content mx-auto " md="8">
            <Card className="card-user">
          <CardHeader>
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:' #eb6532' }}>Se Connecter</CardTitle>
          </CardHeader>
          <CardBody>
            <Form >
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Email</label>
                    <Input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email"
                     type="email"
                     id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Mot De Passe</label>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <div className="update ml-auto mr-auto text-center">
                  <Button
                    className="btn-round"
                    color="primary"
                    onClick={() => logInUser()} 
                    //type="submit"
                  >
                    Connecter
                  </Button>
                </div>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
 
 </>
  );
}

export default LoginPage ;
