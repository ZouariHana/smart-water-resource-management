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
  const [nomBarrage, setNomBarrage] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
 

  const handleSubmit = (event) =>{
    event.preventDefault();

    /*if (props.editingUserId) {
      // Send a PUT request to the server to update the user
      fetch(`//localhost:5000/update_user/${props.editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom_barrage: nomBarrage,
          nom: nom,
          prenom: prenom,
          email: email,
          password: JSON.stringify(password)
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        // Update the selected user in the table
        props.handleEditUser(data);
        // Clear the form and close the modal
        setNomBarrage('');
        setNom('');
        setPrenom('');
        setEmail('');
        setPassword('');
        props.onClose();
      })
      .catch(error => console.error(error));
    } else {*/
  
    // Send a POST request to the server to create a new agent
    fetch('//localhost:5000/create_agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      nom_barrage: nomBarrage,
      nom: nom,
      prenom: prenom,
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
    idBarrage: data.idBarrage,
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    password: data.password,
    };
    console.log('New user:', newUser);
    props.onAddUser(newUser);

   // Clear the form and close the modal
    setNomBarrage('');
    setNom('');
    setPrenom('');
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
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:' #eb6532' }}>Ajouter Un Agent </CardTitle>
          </CardHeader>
          <CardBody>
            <Form >
            <Row>
              <Col className="px-1 mx-auto" md="6">
              <FormGroup>
              <label>Nom Barrage:</label>
               <select
               className="form-control"
               value={nomBarrage}
               onChange={(event) => setNomBarrage(event.target.value)}
              >
              <option value="mellegue">mellegue</option>
              <option value="benmetir">benmetir</option>
              <option value="kasseb">kasseb</option>
              <option value="barbara">barbara</option>
              <option value="sidisalem">sidisalem</option>
              <option value="bouheurtma">bouheurtma</option>
              <option value="joumine">joumine</option>
              <option value="ghezala">ghezala</option>
              <option value="sejnane">sejnane</option>
              <option value="zarga">zarga</option>
              <option value="selbarrak">selbarrak</option>
              <option value="ziatine">ziatine</option>
              <option value="gamgoum">gamgoum</option> 
              </select>
      
    </FormGroup>
  </Col>
</Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Nom:</label>
                    <Input
                     type="text"
                     value={nom}
                     onChange={(event) => setNom(event.target.value)}
                     id="nom"
                     required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Prénom</label>
                    <Input
                     type="text"
                     value={prenom}
                     onChange={(event) => setPrenom(event.target.value)}
                     id="prenom"
                     required
                    />
                  </FormGroup>
                </Col>
              </Row>
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


const GestionAgent = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/getAgents");
        setUsers(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const DeleteUser = (userId) => {
    fetch(`http://localhost:5000/deleteAgent/${userId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      // Remove the user from the table
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    })
    .catch(error => console.error(error));
  }
  
 
  const handleEditUser = (updatedUser) => {
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setEditingUserId(null);
    };
    
  const handleAddUser = (newUser) => {
      setUsers([...users, newUser]);
    };

  const handleEditButtonClick = (userId) => {
      setEditingUserId(userId);
      
    };
  
   return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Gestion des Agents</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID Admin</th>
                      <th>ID Barrage</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Password</th>   
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                     {users.map((user) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.idBarrage}</td>
                        <td>{user.Nom}</td>
                        <td>{user.Prénom}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>
                        <Button onClick={() => DeleteUser(user.id)}>Delete</Button>
                        <Button onClick={() => handleEditButtonClick(user.id)}>Edit</Button>
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
                <AgentForm editingUserId={editingUserId} 
                 onAddUser={handleAddUser} 
                 handleEditUser={handleEditUser} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  
  );
 
};
export default GestionAgent;