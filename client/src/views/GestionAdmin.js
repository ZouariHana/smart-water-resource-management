import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";

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
  Col,
  Table
} from "reactstrap";


function AgentForm(props) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
 

  const handleSubmit = (event) =>{
    event.preventDefault();
  
    // Send a POST request to the server to create a new agent
    fetch('//localhost:5000/create_admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      email: email,
      password: JSON.stringify(password)
     })
    })
    .then(response => response.json())
    .then(data => {
     console.log('Server response:', data);
     // Add the new user to the table
     const newUser = {
    id: data.id,
    email: data.email,
    password: data.password,
    };
    console.log('New user:', newUser);
    props.onAddUser(newUser);

   // Clear the form and close the modal
    setEmail('');
    setPassword('');
    props.onClose();
   })
   .catch(error => console.error(error));
   
  } 
 
  
  return (
    <>
    <div className="content mx-auto "style={{ height: "200vh"}}>
      <Row className="mx-auto"style={{ height: "100vh"}}>
         <Col className ="content mx-auto " md="8">
            <Card className="card-user">
          <CardHeader>
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:' #eb6532' }}>Ajouter Un Admin </CardTitle>
          </CardHeader>
          <CardBody>
            <Form >
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Email:</label>
                    <Input
                     type="email"
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                     id="email"
                     required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Mot de passe</label>
                    <Input
                     type="password"
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     id="password"
                     required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <div className="update ml-auto mr-auto text-center">
                  <Button
                    className="btn-round"
                    color="primary"
                    onClick={handleSubmit}>
                    Enregistrer
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


const GestionAdmin = () => {
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/getAdmin");
        setUsers(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const DeleteUser = (userId) => {
    fetch(`http://localhost:5000/deleteAdmin/${userId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      // Remove the user from the table
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      alert('Admin has been deleted successfully !')
    })
    .catch(error => console.error(error));
  }
  
  const logoutUser = async () => {
      try {
        await httpClient.post("//localhost:5000/logout"); 
        window.location.href = "/admin/admin-page";
      } catch (error) {
        console.error(error);
        alert("Failed to logout");
      }
    };  
  const handleEditClick = (userId, email, password) => {
      setEditingUserId(userId);
      setEditedEmail(email);
      setEditedPassword(password);
    };
  const handleSaveClick = () => {
      const updatedUsers = userList.map((user) => {
        if (user.id === editingUserId) {
          return {
            ...user,
            email: editedEmail,
            password: editedPassword,
          };
        } else {
          return user;
        }
      });
  
      setUserList(updatedUsers);
      setEditingUserId(null);
      setEditedEmail('');
      setEditedPassword('');
      // save the updated users array using your preferred method (e.g. API call, local storage)
      fetch(`http://localhost:5000/updateAdmin/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: editedEmail,
          password: editedPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Server response:', data);
          alert('admin has been edited successfully !!')
        })
        .catch((error) => console.error(error));
    }
  
   return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Button  className="mr-8Q" color="primary" onClick={logoutUser}>Go Back</Button>
                <CardTitle tag="h4" style={{textAlign: 'center', fontWeight: 'bold', color:' #eb6532' }}>Gestion des Admins</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID Admin</th>
                      <th>Email</th>
                      <th>Password</th>   
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                     {users.map((user) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                        <Button  className="btn-round"color="primary" onClick={() => DeleteUser(user.id)}>Delete</Button>
                        {editingUserId === user.id ? (
                    <>
                      <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                      <br/> 
                      <input type="text" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} />
                      <br/>
                      <Button className="btn-round" color="primary" onClick={handleSaveClick}>Save</Button>
                    </>
                  ) : (
                  <Button className="btn-round"color="primary"onClick={() => handleEditClick(user.id, user.email, user.password)}>Edit</Button>
                  )}
                 </td>
                 </tr>
                 ))}
                  </tbody>
                </Table> 
              </CardBody>
            </Card>
          </Col>
          </Row>
                  
          <Row>
          <Col md="12">
            <Card className="card-plain">
               <CardBody>
               <AgentForm/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  
  );
 
};
export default GestionAdmin  