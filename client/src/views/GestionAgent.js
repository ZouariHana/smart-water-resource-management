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
  const [userList, setUserList] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedNom, setEditedNom] = useState('');
  const [editedPrenom, setEditedPrenom] = useState('');
  const [editedBarrage, setEditedBarrage] = useState('');
  


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
      alert ('Agent has been deleted successfully ! ')
    })
    .catch(error => console.error(error));
  }
  
  const logoutUser = async () => {
      try {
        await httpClient.post("//localhost:5000/logout"); // make a request to the logout endpoint
        window.location.href = "/admin/admin-page"; // redirect to the login page
      } catch (error) {
        console.error(error);
        alert("Failed to logout");
      }
    }

  const handleEditClick = (userId,idBarrage,nom,prenom,email,password) => {
      setEditingUserId(userId);
      setEditedEmail(email);
      setEditedPassword(password);
      setEditedPassword(password);
      setEditedNom(nom);
      setEditedPrenom(prenom);
      setEditedBarrage( idBarrage);
   
    };
  const handleSaveClick = () => {
      const updatedUsers = userList.map((user) => {
        if (user.id === editingUserId) {
          return {
            ...user,
            email: editedEmail,
            password: editedPassword,
            Nom : editedNom,
            Prénom : editedPrenom,
            idBarrage: editedBarrage,
          };
        } else {
          return user;
        }
      });
  
      setUserList(updatedUsers);
      setEditingUserId(null);
      setEditedEmail('');
      setEditedPassword('');
      setEditedNom('');
      setEditedPrenom('');
      setEditedBarrage('');

      fetch(`http://localhost:5000/updateAgent/${editingUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: editedEmail,
            password: editedPassword,
            nom: editedNom,
            prenom: editedPrenom,
            idBarrage:  editedBarrage,
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log('Server response:', data);
            alert('agent has been edited successfully ')
          })
          .catch(error => console.error(error));
    }
  
    const sendEmail = (email, password) => {
      fetch('//localhost:5000/send-email', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          adminEmail: 'imen.rjab@ensi-uma.tn',
          adminPassword: '26648680',
          recipientEmail: email,
          recipientPassword: password
          
        })
      })
      .then(response => {
        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          throw new Error('Failed to send email.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Failed to send email.');
      });
    };
    
    
    
  
  
   return (
    <>
      <div className="content"> 
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Button  className="ml-15" color="primary" onClick={logoutUser}>Go back</Button>
                <CardTitle tag="h4" style={{textAlign: 'center', fontWeight: 'bold', color:' #eb6532' }}>Gestion des Agents</CardTitle>
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
                        <Button className="btn-round"color="primary" onClick={() => DeleteUser(user.id)}>Delete</Button>
                        {editingUserId === user.id ? (
                    <>
                      <input type="text" value={editedBarrage} onChange={(e) => setEditedBarrage(e.target.value)} />
                      <br/> 
                      <input type="text" value={editedNom} onChange={(e) => setEditedNom(e.target.value)} />
                      <br/> 
                      <input type="text" value={editedPrenom} onChange={(e) => setEditedPrenom(e.target.value)} />
                      <br/> 
                      <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                      <br/> 
                      <input type="text" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} />
                      <br/>
                      <Button className="btn-round" color="primary" onClick={handleSaveClick}>Save</Button>
                    </>
                  ) : (
                  <Button className="btn-round"color="primary"onClick={() => handleEditClick(user.id,user.idBarrage,user.Nom,user.Prénom,user.email, user.password)}>Edit</Button>
                  )}
                  <Button className="btn-round" color="primary" onClick={() => {
                      sendEmail(user.email, user.password);
                      }}>Send Email</Button>

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
export default GestionAgent;