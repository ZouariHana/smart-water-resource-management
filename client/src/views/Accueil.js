import React from "react";
// react plugin for creating notifications over the dashboard
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Carousal from "../index-sections/Carousal.js"; 

// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardText
} from "reactstrap";

function Accueil() {
 
  return (
    <>
      <div className="content">
        <Card>
          
          <CardHeader>
          <CardTitle tag="h5" style={{textAlign: 'center', fontWeight: 'bold', color:'#575757', fontSize: '24px', margin: '0 auto'}}>Situation des Barrages en Tunisie</CardTitle>
          </CardHeader>
          <br/>
          </Card>

        <Row>
          <Col md="12">
            <Card>
              <CardBody>
              <div className="section section-about-us">
              <Carousal/>
                </div>
            </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
          <Card>
          <div class="row">
            <div class="col-md-6">
            <CardHeader>
              <CardTitle tag="h5" style={{color:"info", fontSize: '24px'}}>Les Barrages En Tunisie</CardTitle>
            </CardHeader>
            <CardBody>
        La Tunisie demeure un pays aride à semi-aride sur les 3/4 de son territoire. Elle se caractérise par la rareté de ses ressources en eau et par une variabilité accentuée du climat dans l’espace et dans le temps.
        L’eau est un facteur essentiel pour le développement du secteur agricole, industriel et touristique et vital pour l’alimentation en eau potable. Le maintien de la croissance économique reste tributaire du facteur eau qui est cependant un facteur limitant et limité. 
        La construction des barrages en Tunisie a permis une meilleure gestion des ressources hydrauliques.
        Les barrages tunisiens sont aujourd'hui gérés par la direction générale des barrages et des grands travaux hydrauliques (DGBGTH) La généralité des barrages tunisiens est des barrages en terre et la majorité de ces barrages se trouvent dans le nord.
      </CardBody>
      <br/>
      <br/>
    </div>
    <br/>
    <br/>
    <div  style={{display: "flex;" , marginTop:"30px" , marginRight:"0px"}}>
      <img src={require("assets/img/Barrage-Mellègue-Tunisie2.jpg")} alt="Your Image" style={{width: "500px;", height:" 300px" }}/>
    </div>

  </div>
</Card>
          </Col>
        </Row>


        <Row>
        <Col md="12">
          
              <Card>
  <CardBody>
    <div className="places-buttons">
      <Row>
        <Col className="ml-auto mr-auto text-center" md="6">
          <CardTitle tag="h4"style={{color:"info", fontSize: '24px'}}> Les Barrages Du Tunisie </CardTitle> 
          <p className="category">Il existe 36 barrages</p> 
        </Col>
      </Row>
      <Row>
        <Col className="ml-auto mr-auto" lg="12">
          <Row>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>Mellègue</CardTitle>
                <CardText>Le barrage, de type voûtes multiples de grande portée, a une hauteur de 65 mètres et sa longueur en crête est de 470 mètres. 
              Le déversoir, du type saut de ski avec étalement de la lame, a un débit maximum de 5 400 m3/s.</CardText>
              </Card>
            </Col>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>BENI MTIR</CardTitle>
                <CardText>Le barrage de Beni M'Tir compte parmi les plus importants en Tunisie.Situé sur l'oued Ellil, au sud-ouest d'Aïn Draham, ce barrage contribuait à l'approvisionnement en eau de la région de Tunis.
               Désormais, il approvisionne le gouvernorat de Jendouba, Béja et autres régions situées au nord de Tunis.
              Il sert également à l'irrigation de la basse vallée de la Medjerda ainsi qu'à la production d'électricité.</CardText>
              </Card>
            </Col>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>SIDI SALEM</CardTitle>
                <CardText>Le barrage de Sidi Salem est construit au niveau de la ville de Testour,
               à 8 kilomètres au nord-ouest de cette dernière, il se trouve sur le cours de la Medjerda.Avec une hauteur de 57 mètres, 
               une longueur en crête de 340 mètres et une capacité à retenue normale de 555 millions de m³ pour une surface de réservoir de 4300 hectares, 
               il constitue le plus grand barrage du pays</CardText>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="ml-auto mr-auto" lg="12">
          <Row>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>SIDI EL BARRAK</CardTitle>
                <CardText>Le barrage de Sidi el Barrak se localise au niveau de la côte nord de le Tunisie : gouvernorat de Béja .
               Le barrage de Sidi el Barrak présente celui le plus important de Tunisie, après le barrage de Sidi Salem, il a été destiné pour les besoins suivantes :  L'irrigation , alimentation en eau potable du grand Tunis,
               le sahel et Sfax et l'amélioration de la qualité des eaux du canal du Medjerda Cap Bon.</CardText>
              </Card>
            </Col>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>KASSEB</CardTitle>
                <CardText>Le barrage Kasseb est un barrage tunisien inauguré en 1969, sur l'oued Kasseb, situé à une vingtaine de kilomètres à l'ouest de Béja.
               D'une hauteur de 57,6 mètres et d'une longueur en crête de 245 mètres, il peut retenir jusqu'à 80 millions de mètres cubes d'eau dans un réservoir
              d'une superficie de 437 hectares. L'eau du réservoir est principalement destinée à l'alimentation en eau potable de la ville de Tunis 
              et non à l'irrigation.</CardText>
              </Card>
            </Col>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>SEJNANE</CardTitle>
                <CardText>Le barrage de Sejnane est un barrage tunisien inauguré en 1994 sur l'oued Sejnane, à environ 23 kilomètres au nord-est de Sejnane.Barrage en terre, il peut retenir jusqu'à 113,580 millions de mètres cubes d'eau. L'eau du réservoir est principalement destinée à l'eau potable. 
              L'ouvrage est par ailleurs interconnecté avec le barrage de Sidi El Barrak.</CardText>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="ml-auto mr-auto" lg="12">
          <Row>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>BOU-HEURTMA</CardTitle>
                <CardText>Le barrage de Bou Heurtma est un barrage hydroélectrique de Tunisie. Il se situe dans le nord-ouest du pays, dans le gouvernorat de Jendouba.</CardText>
              </Card>
            </Col>
            <Col md="4">
              <Card >
              <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>SILIANA</CardTitle>
                <CardText>Le barrage de Siliana est un barrage tunisien inauguré en 2005 sur l'oued Siliana, à sept kilomètres au nord de Siliana. Le barrage a une capacité de 53 millions de mètres cubes1.</CardText>
              </Card>
            </Col>
            <Col md="4">
              <Card >
                <CardTitle tag="h5"style={{textAlign:"center",color: "#51bcda",}}>LAKHMESS</CardTitle>
                <CardText>Le barrage Lakhmess est un barrage tunisien inauguré en 1966, sur l'oued Lakhmess, situé à environ quinze kilomètres au sud-est de Siliana.Les principaux oueds qui alimentent le barrage en eau ruissèlent des hauteurs du Djebel Serj assez proche.
              D'une hauteur de 32 mètres et d'une longueur en crête de 660 mètres, il peut retenir jusqu'à 14 millions de mètres cubes d'eau dans un réservoir d'une superficie de 1 120 hectares. L'eau du réservoir est destinée à l'irrigation de cultures annuelles et arboricoles dans la région de Siliana avec un volume annuel prévu de 7 millions de mètres cubes.</CardText>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </CardBody>
</Card>

         
        </Col>
        </Row>

        <Row>
        <Col md="12">
          
              <Card>
                <CardBody>
                <div className="places-buttons">
      <Row>
        <Col className="ml-auto mr-auto" lg="8">
          <Row>
            <Col md="3">
              <Card >
                <CardTitle tag="h5" style={{textAlign:"center",color: "#078ed4",}}>BARRAGES</CardTitle>
                <CardText style={{textAlign:"center"}} >36</CardText>
              </Card>
            </Col>
            <Col md="3">
              <Card >
                <CardTitle tag="h5"style={{textAlign:"center",color: "#078ed4",}}>S/T NORD</CardTitle>
                <CardText style={{textAlign:"center"}} >13</CardText>
              </Card>
            </Col>
            <Col md="3">
              <Card >
                <CardTitle tag="h5"style={{textAlign:"center",color: "#078ed4",}}>S/T CENTRE</CardTitle>
                <CardText style={{textAlign:"center"}}>7</CardText>
              </Card>
            </Col>
            <Col md="3"> 
              <Card >
                <CardTitle tag="h5"style={{textAlign:"center",color: "#078ed4",}}>S/T CAP-BON</CardTitle>
                <CardText style={{textAlign:"center"}} >6</CardText>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
                </CardBody>
              </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Accueil;
