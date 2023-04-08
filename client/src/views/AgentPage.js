import React ,{ useState } from 'react'
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
  Col
} from "reactstrap";



const TacheAgent = () => { 
  const [nom_barrage, setnom_barrage ]= useState("");
  const [valeur_lacher, setvaleur_lacher] = useState("");
  const [utilisation, setutilisation] = useState("");
  const [valeur_apport, setvaleur_apport] = useState("");
  const [Valeur_Stock, setValeur_Stock] = useState("");
  const [valeur_lachIch, setvaleur_lachIch] = useState("");
  const [valeur_RS, setvaleur_RS] = useState("");
  const [valeur_Pluv, setvaleur_Pluv] = useState("");
  const [date, setdate] = useState("");        

  const ajouterAgent = async () => {
    try {
        await httpClient.post("//localhost:5000/gestionAgent", { 
        nom_barrage,
        valeur_lacher,
        utilisation,
        valeur_apport,
        Valeur_Stock,
        valeur_lachIch,
        valeur_RS,
        valeur_Pluv,
        date,
      });
      alert("bien enregistré!");
      window.location.href = "/admin/agent-page";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
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
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:' #eb6532' }}>Gestion Agent Page</CardTitle>
          </CardHeader>
          <CardBody>
            <Form >
            <Row>
              <Col className="px-1 mx-auto" md="6">
              <FormGroup>
              <label>Nom Barrage:</label>
               <select
               className="form-control"
               value={nom_barrage}
               onChange={(event) => setnom_barrage(event.target.value)}
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
                    <label>Date du jour:</label>
                    <Input
                     type="text"
                     value={date}
                     onChange={(e) => setdate(e.target.value)}
                     id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Lachers du jour:</label>
                    <Input
                      type="number"
                      value={valeur_lacher}
                      onChange={(e) => setvaleur_lacher(e.target.value)}
                      id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Utilisation:</label>
                    <select
                     className="form-control"
                     value={utilisation}
                     onChange={(event) => setutilisation (event.target.value)}
                     >
                      <option value="T">T</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="p">p</option>
                      <option value="tr,p">tr,p</option>
                      <option value="tr">tr</option>
                      <option value="E,d">E,d</option>
                      <option value="-">-</option>
                      <option value="p,T">p,T</option>
                      <option value="p,tr">p,tr</option>
                      <option value="tr,D">tr,D</option>
                     </select>
                   
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>les apports de jour:</label>
                    <Input
                      type="number"
                      value={valeur_apport}
                      onChange={(e) => setvaleur_apport(e.target.value)}
                      id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Valeur du stock</label>
                    <Input
                        type="number"
                        value={Valeur_Stock}
                        onChange={(e) => setValeur_Stock(e.target.value)}
                        id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Valeur des lachers pour Ichkeul:</label>
                    <Input
                      type="number"
                      value={valeur_lachIch}
                      onChange={(e) => setvaleur_lachIch(e.target.value)}
                      id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>RS:</label>
                    <Input
                       type="number"
                       value={valeur_RS}
                       onChange={(e) => setvaleur_RS(e.target.value)}
                       id=""
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-1 mx-auto" md="6">
                  <FormGroup>
                    <label>Pluviomètrie:</label>
                    <Input
                       type="number"
                       value={valeur_Pluv}
                       onChange={(e) => setvaleur_Pluv(e.target.value)}
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
                    onClick={() => ajouterAgent()}
                  >
                    Ajouter
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

export default TacheAgent;
