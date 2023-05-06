import React, { useState } from "react";
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

/*const predictionPage =  () => {
  const [date, setdate] = useState(""); 

  const sendDate = async () => {
    try{
        await httpClient.post("//localhost:5000/predict", { 
        date,
      });
      alert("date envoyée!");
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("date invalide"); 
      }
    }

  };
  return (
    <>
   
   <div className="content mx-auto "style={{ height: "200vh"}}>
      <Row className="mx-auto"style={{ height: "100vh"}}>
         <Col className ="content mx-auto " md="10">
            <Card className="card-user">
          <CardHeader>
          <div className="col-12">
         
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:'#575757' }}> Prédiction</CardTitle>
          </div>
          </CardHeader>
          <CardBody>
            <Form >
            <Row>
              <Col className="px-1 mx-auto" md="4">
              <FormGroup>
                <label htmlFor="nom_barrage">Choisir une date</label>
                <input
                   className="form-control"
                   type="text"
                   value={date}
                   onChange={(e) => setdate(e.target.value)}
                   placeholder="DD-MM-YYYY"
                 
                 />
              </FormGroup>
         
             </Col>
            </Row>
          
            <Row>
                <div className="update ml-auto mr-auto text-center">
                  <Button
                    color="info"
                    onClick={() => sendDate()}
                  >
                    Predict 
                  </Button>
                </div>
              </Row>
              </Form>
              <br>{{pred}}</br>
            </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
    </>
    ); 
  }*/



function PredictionPage() {
  const [date, setdate] = useState('');
  const [pred, setpred] = useState('');
  
  const sendDate = async () => {
    const response = await fetch('//localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date })
    });
    const data = await response.json();
    setpred(data.prediction);
  }
  
    return (
      <>
      <div className="content mx-auto "style={{ height: "200vh"}}>
      <Row className="mx-auto"style={{ height: "100vh"}}>
      <Col className ="content mx-auto " md="10">
            <Card className="card-user">
          <CardHeader>
          <div className="col-11">
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:'#575757' }}>Page de Prédiction</CardTitle>
          </div>
          </CardHeader>
          <CardBody>
          <div className="col-11">
          <Form >
            <Row >
            <Col className="mx-auto" md="6">
        <FormGroup>
          <label >Choisir une date</label>
          <input
            className="form-control"
            type="text"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </FormGroup>
        </Col>
        </Row>
        </Form>
        </div>
  
        <Row>
          <div className="update ml-auto mr-auto text-center">
            <Button
              color="info"
              onClick={() => sendDate()}
            >
              Predict
            </Button>
          </div>
        </Row>
  
        {pred && (
      <div>
        <h2>Prediction: {pred}</h2>
      </div>
    )}
    </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
  </>
    );
  }
  

export default PredictionPage;

