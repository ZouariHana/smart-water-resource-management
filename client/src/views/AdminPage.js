import React from 'react'
import httpClient from "../httpClient";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";


function gogestionpageagent() {
  window.location.href = "/admin/gestion-agent" } 


function gogestionpageadmin() {
  window.location.href = "/admin/gestion-admin" }  

const AdminPage = () => {
  const logoutUser = async () => {
    try {
      await httpClient.post("//localhost:5000/logout"); // make a request to the logout endpoint
      window.location.href = "/admin/user-page"; // redirect to the login page
    } catch (error) {
      console.error(error);
      alert("Failed to logout");
    }
  };
  return (
    <div className="content" > 
    <Row>
      <Col className="px-1 mx-auto" md="8">
        <Card className="card-user">
          <br/>
          <CardHeader>
          <Button  className="ml-15" color="primary" onClick={logoutUser}>Déconnecter</Button>
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:' #eb6532' }}>Bienvenue sur la page d'administration</CardTitle>
          </CardHeader>
          <br/>
          <br/>
          <CardBody>
            <div className="update ml-auto mr-auto text-center">
                <Button type="button"  className="btn-round" color="primary" onClick={() => gogestionpageagent()}>Gestion des agents</Button>
                <Button type="button" className="btn-round ml-2" style={{ marginRight: '20px' }} color="primary" onClick={() => gogestionpageadmin()}>Gestion des admins</Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
  );
};

export default AdminPage;