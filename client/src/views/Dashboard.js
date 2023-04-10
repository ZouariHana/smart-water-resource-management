import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/css/map.css'

// react plugin used to create charts
import { Line, Pie, Bar } from "react-chartjs-2";
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
  dashboardNASDAQChart,
  lacherChart
} from "variables/charts.js";
function Dashboard() {
  const [value, onChange] = useState(new Date());
  const [damId, setDamId] = useState("1");
  const [data1, setData1] = useState([]);
  // const [data2, setData2] = useState([]);
  const [remplissage, setRemplissage] = useState(0);
  const [exp, setExp] = useState([]);
  const [lacher, setLacher] = useState([]);
  const [apport, setApport] = useState([]);
  const [ichkeul, setIchkeul] = useState(0);

  const [barrages, setBarrages] = useState([]);
  
  // fetch barrage locations from Flask API endpoint
  useEffect(() => {
    axios.get('http://localhost:5000/barrages').then(response => {
      setBarrages(response.data);
    });
  }, []);

  const position = [36.81897, 10.16579];

  const markerList = barrages.map((barrage) => (
    <Marker
      key={barrage.Nom}
      position={[barrage.Latitude, barrage.Longitude]}
      title={barrage.Nom}
    >
      <Popup>
        <h3>{barrage.Nom}</h3>
        <p>
          Latitude: {barrage.Latitude}, Longitude: {barrage.Longitude}
        </p>
      </Popup>
    </Marker>
  ));

  const mapStyle = {
    height: "100vh",
    width: "100%",
  };

  // Create LatLngBounds object and extend it to include each marker position
  const bounds = L.latLngBounds(
    barrages
      .filter((barrage) => barrage.Latitude !== null && barrage.Longitude !== null)
      .map((barrage) => [barrage.Latitude, barrage.Longitude])
  );


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
    const lastYearDate = new Date(value.getFullYear() - 1, value.getMonth(), value.getDate());
    const formattedDate = value.toLocaleDateString('en-GB').replace(/\//g, '-');
    const formattedDate2 = lastYearDate.toLocaleDateString('en-GB').replace(/\//g, '-');
    axios
      .get(`http://localhost:5000/stocks/${damId}/${formattedDate}`)
      .then((response) => {
        setData1(response.data['stocks']);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      // axios
      // .get(`http://localhost:5000/stocks/${damId}/${formattedDate2}`)
      // .then((response) => {
      //   setData2(response.data['stocks']);
      //   console.log(response.data)
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      axios
      .get(`http://localhost:5000/tauxRemplissage/${damId}/${formattedDate}`)
      .then((response) => {
        setRemplissage(response.data[0]); 
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`http://localhost:5000/lacher/${damId}/${formattedDate}`)
      .then((response) => {
        setLacher(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`http://localhost:5000/apport/${damId}/${formattedDate}`)
      .then((response) => {
        setApport(response.data)
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
  // const stockValues2 = data2.map((item) => item.Valeur_Stock);
  console.log(data1)
  const handleDamChange = (e) => {
    const value = e.target.value;
      setDamId(value);
  };
  const options = [];
  for (let i = 1; i <= 36; i++) {
    options.push(<option value={i}>{i}</option>);
  }

  return (
    <>
      <div className="content">
        <Row>
        <Col lg="6" md="6" sm="6">
        <Card className="card-stats">
        <CardHeader>
        <CardTitle tag="h5">Observer la situation hydraulique du barrage d'Id x à une date spécifique</CardTitle>
      </CardHeader>
        <CardBody>
        <select onChange={handleDamChange}>
          {options}
          <option>Barrages ST Nord</option>
          <option>Barrages ST Centre</option>
          <option>Barrages ST Cap-Bon</option>
          <option>Tous les barrages</option>
        </select>
        
       <br/><br/>
        <Calendar onChange={onChange} value={value} />
        <br/><br/><br/>
        
        </CardBody>
        </Card>
        </Col>

        <Col lg="6" md="6" sm="6">
        <Card className="card-stats">
        <CardHeader>
        <CardTitle tag="h5">Répartition des barrages</CardTitle>
      </CardHeader>
        <CardBody>
        <div className="map-container">
          <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markerList}
          </MapContainer>
        </div>

        </CardBody>
        </Card>
        </Col>



        </Row>
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
                  <Col md="7" xs="7">
                    <div className="numbers">
                      <p className="card-category">Taux de remplissage</p>
                      <CardTitle tag="p">{remplissage}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
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
                      <p className="card-category">Alimentation de Ichkeul</p>
                      <CardTitle tag="p">{ichkeul}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Lâchers du jour</CardTitle>
                <p className="card-category"></p>
              </CardHeader>
              <CardBody style={{ height: "366px" }}>
                <Bar
                  data={lacherChart(value,lacher[0], lacher[1]).data}
                  options={lacherChart(value,lacher[0],lacher[1]).options}
                />
              </CardBody>
            </Card>
         
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Apports du jour</CardTitle>
                <p className="card-category"></p>
              </CardHeader>
              <CardBody style={{ height: "366px" }}>
                <Bar
                  data={lacherChart(value,apport[0], apport[1]).data}
                  options={lacherChart(value,apport[0],apport[1]).options}
                />
              </CardBody>
            </Card>
         
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Exploitation des lâchers</CardTitle>
                <p className="card-category">Répartition de l'exploitation des Lâchers le {value.toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
              </CardHeader>
              <CardBody style={{ height: "380px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart(exp).data}
                  options={dashboardEmailStatisticsChart(exp).options}
                />
              </CardBody>
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
                  datasetIdKey='id'
                  data={dashboardNASDAQChart(dateValues,stockValues1).data}
                  options={dashboardNASDAQChart(dateValues,stockValues1).options}
                  width={400}
                  height={100}
                />
  
      </CardBody>
    </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

let DefaultIcon = L.icon({
  iconUrl: "http://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  iconSize: [20, 35],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;
export default Dashboard;
