/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/

import React from "react";
// react plugin for creating notifications over the dashboard

import Carousel from "../index-sections/Carousel.js";
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
  Col
} from "reactstrap";

function Accueil() {
 
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
              <div className="section section-about-us">
                <Container>
                  <Row>
                    <Col className="ml-auto mr-auto text-center" md="10">
                      <h2 className="title">Qui sommes nous ?</h2>
                      <h5 className="description">
                      L'Observatoire National de l'Agriculture (ONAGRI) est un établissement public à caractère administratif sous tutelle du Ministère de l'Agriculture, des Ressources Hydrauliques et de la Pêche.
                      </h5>
                      <br/>
                    </Col>
                    <Carousel />
                    <br/>
                  </Row>
                </Container>
                <Row>
                  <Col md="6">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle tag="h5">Notre Mission</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Alert color="info">
                          <div>L’ONAGRI a été créé par le décret n°308 du 1 février 1999, il est chargé d'accomplir les missions suivantes : 
˗ Mettre en place un système d'information fiable permettant d'analyser la situation du secteur de l’agriculture et de la pêche aux niveaux national et international à travers des indicateurs pertinents, fiables et périodiques.
˗ Collecter les informations et les données nationales et internationales relatives au secteur de l’agriculture et de la pêche, les analyser, et les traiter.
˗ Diffuser les informations et les données collectées et les mettre à la disposition des différents intervenants tels que décideurs, planificateurs, chercheurs, producteurs, exportateurs et autres…
</div>
                        </Alert>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle tag="h5">Publications phares</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Alert color="info">
                          <div>Depuis l’année 2014, de nombreuses innovations ont été introduites sur le site de l’ONAGRI. Avec un nouveau look et plus d’informations analysées sur le secteur agricole, plus de facilité de lecture et plus de convivialité au niveau de la recherche.
Cette rénovation a pu avoir lieu aujourd’hui pour mieux servir les différents acteurs. Il s’agit de :
 Notes de veille
, Notes de conjoncture
, Notes d’analyse
, Onagri Vigilance
, Lettre de l’observatoire
, ONAGRI vigilance (mensuelle)...<br/><br/><br/><br/></div>
                        </Alert>
                      </CardBody>
                    </Card>
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
