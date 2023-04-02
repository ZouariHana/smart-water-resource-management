import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.js";
function Dashboard() {
  const [value, onChange] = useState(new Date());
  const [damId, setDamId] = useState("1");
  const [data1, setData1] = useState([]);
  const [remplissage, setRemplissage] = useState(0);
  const [exp, setExp] = useState([]);
  useEffect(() => {
    console.log(value);
    const formattedDate = value.toLocaleDateString('en-GB').replace(/\//g, '-');
    console.log(formattedDate)
    axios
      .get(`http://localhost:5000/pourcentageexp/${formattedDate}`)
      .then((response) => {
        console.log(response.data);
        setExp(response.data)
      })
  
  }
  ,[value]);
  useEffect(() => {
    const formattedDate = value.toLocaleDateString('en-GB').replace(/\//g, '-');
    axios
      .get(`http://localhost:5000/stocks/${damId}/${formattedDate}`)
      .then((response) => {
        setData1(response.data['stocks']);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`http://localhost:5000/tauxRemplissage/${damId}/${formattedDate}`)
      .then((response) => {
        setRemplissage(response.data[0]); 
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, [value, damId]);
  const dateValues = data1.map((item) => {
    const dateParts = item.Date_Stock.split('-');
    const month = dateParts[1];
    const day = dateParts[0];
    return `${day}-${month}`;
  });
  const stockValues1 = data1.map((item) => item.Valeur_Stock);
  
  const handleDamChange = (e) => {
    setDamId(e.target.value);
  };
  const options = [];
  for (let i = 1; i <= 36; i++) {
    options.push(<option value={i}>{i}</option>);
  }
  return (
    <>
      <div className="content">
      <ul>
        <select onChange={handleDamChange}>
          {options}
          <option>Barrages S/T Nord</option>
          <option>Barrages S/T Centre</option>
          <option>Barrages S/T Cap-Bon</option>
          <option>Tous les barrages</option>
        </select>
        <Calendar onChange={onChange} value={value} />
        </ul>
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Taux de remplissage</p>
                      <CardTitle tag="p">{remplissage}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <CardTitle tag="p">$ 1,345</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Exploitation des lâchers</CardTitle>
                <p className="card-category"></p>
              </CardHeader>
              <CardBody style={{ height: "366px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart(exp).data}
                  options={dashboardEmailStatisticsChart(exp).options}
                />
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
          <Card className="card-chart">
      <CardHeader>
        <CardTitle tag="h5">Courbe de variation de Stock</CardTitle>
        <p className="card-category">Line Chart with Points</p>
      </CardHeader>
      <CardBody>
        <Line
                  data={dashboardNASDAQChart(dateValues,stockValues1).data}
                  options={dashboardNASDAQChart(dateValues,stockValues1).options}
                  width={400}
                  height={100}
                />
  
      </CardBody>
      <CardFooter>
        <div className="chart-legend">
          <i className="fa fa-circle text-info" />
        </div>
        <hr />
        <div className="card-stats">
          <i className="fa fa-check" /> Data information certified
        </div>
      </CardFooter>
    </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
