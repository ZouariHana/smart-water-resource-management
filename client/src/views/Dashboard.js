import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from "axios";
import ReactDOMServer from 'react-dom/server';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/css/map.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWater } from '@fortawesome/free-solid-svg-icons'
import {faArrowUpFromGroundWater} from '@fortawesome/free-solid-svg-icons';
import {faHandHoldingDroplet} from '@fortawesome/free-solid-svg-icons';
import {faPercent} from '@fortawesome/free-solid-svg-icons';
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
  exploitationPieChart,
  evolutionLineChart,
  lacherChart
} from "variables/charts.js";

function Dashboard() {
  const [value, onChange] = useState(new Date());
  const [data1, setData1] = useState([]);
  const [damId, setDamId] = useState(1);
  // const [data2, setData2] = useState([]);
  const [remplissage, setRemplissage] = useState(0);
  const [stock, setStock] = useState(0);
  const [monthNumbers, setMonthNumbers] = useState(1);
  const [capacity, setCapacity] = useState(0);
  const [exp, setExp] = useState([]);
  const [lacher, setLacher] = useState([]);
  const [apport, setApport] = useState([]);
  const [ichkeul, setIchkeul] = useState('-');
  const [dataPDF, setDataPDF] = useState([]);
  const [barrages, setBarrages] = useState([]);
  const damDictionary = {
    'MELLEGUE': 1,
    'SARRAT': 36,
    'BENMETIR': 2,
    'KASSEB': 3,
    'BARBARA': 4,
    'SIDISALEM': 5,
    'BOU-HEURTMA': 6,
    'JOUMINE': 7,
    'GHEZALA': 8,
    'MELAH': 33,
    'TINE': 34,
    'SEJNANE': 9,
    'Zarga': 10,
    'Kebir': 31,
    'Moula': 32,
    'S.ELBARRAK': 11,
    'Ziatine': 12,
    'Gamgoum': 13,
    'Harka': 35,
    'SILIANA': 14,
    'LAKHMESS': 15,
    'RMIL': 16,
    "BIRM'CHERGA": 17,
    'RMEL': 18,
    'NEBHANA': 19,
    'SIDISAAD': 20,
    'ELHAOUAREB': 21,
    'Sficifa': 22,
    'SIDIAÏCH': 23,
    'ELBREK': 24,
    'BEZIRK': 25,
    'CHIBA': 26,
    'MASRI': 27,
    'LEBNA': 28,
    'HMA': 29,
    'ABID': 30,
  };
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
      axios
      .get(`http://localhost:5000/lacherIchkeul/${formattedDate}`)
      .then((response) => {
        console.log(response.data);
        setIchkeul(response.data);
      })
      axios.get(`http://localhost:5000/barrage/${formattedDate}`).then(
      res => {
        setDataPDF(res.data);
        console.log(res.data);
      }
    )
  
  }
  ,[value]);
  useEffect(() => {
    const lastYearDate = new Date(value.getFullYear() - 1, value.getMonth(), value.getDate());
    const formattedDate = value.toLocaleDateString('en-GB').replace(/\//g, '-');
    const formattedDate2 = lastYearDate.toLocaleDateString('en-GB').replace(/\//g, '-');
   
      axios
      .get(`http://localhost:5000/tauxRemplissage/${damId}/${formattedDate}`)
      .then((response) => {
        setRemplissage(response.data[0]); 
        setStock(response.data[1]);
        setCapacity(response.data[2]);
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

  useEffect(() => {
    const formattedDate = value.toLocaleDateString('en-GB').replace(/\//g, '-');
    axios
      .get(`http://localhost:5000/stocks/${damId}/${formattedDate}/${monthNumbers}`)
      .then((response) => {
        setData1(response.data['stocks']);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });}, [value, damId, monthNumbers]);

  const dateValues = data1.map((item) => {
    const dateParts = item.Date_Stock.split('-');
    const month = dateParts[1];
    const day = dateParts[0];
    return `${day}-${month}`;
  });
  const stockValues1 = data1.map((item) => item.Valeur_Stock);
  // const stockValues2 = data2.map((item) => item.Valeur_Stock);
  console.log(data1)
  const generateHTML = () => {
    
    const style = {
      border: '1px solid black',
      padding: '5px'
    };
    console.log('hello');
    const html = ReactDOMServer.renderToString(
      <div className="SitHyd">
        <h1> Situation hydraulique des Barrages</h1>
        <h2>Journee du {value.toLocaleDateString('en-GB').replace(/\//g, '-')} </h2>
  
        <table className='tableSitHyd' style={{ border: '1px solid black' }}>
          <thead>
            <tr>
              <th>Barrage</th>
              <th>Annee de mise en service</th> 
              <th>Position</th>
              <th>Bassin versant Km2</th>
              <th>Volume regul Calcule m3/s</th>
              <th>cote m </th>
              <th>Debit max Evacu m3/s</th>
              <th>Cap utile actuelle M m3</th>
              <th>Apports du jour M m3 </th>
              <th>Lachers du jour M m3</th>
              <th>*</th>
              <th>Stock aux barrages M/m3</th>
              <th>Pluviometrie mm</th>
              <th>R.S g/l</th>
            </tr>
          </thead>
          <tbody>
            {dataPDF.map(barrage => {
              return (
                <tr key={barrage["Nom"]} >
                  <td style={style}>{barrage["Nom"]}</td>
                  <td style={style}>{barrage['AnneeMiseEnService']}</td>
                  <td style={style}>{barrage["Region"]}</td>
                  <td style={style}>{barrage["Bassin"]}</td>
                  <td style={style}>{barrage["volume_regul_calcule"]}</td>
                  <td style={style}>{barrage["cote"]}</td>
                  <td style={style}>{barrage["debit"]}</td>
                  <td style={style}>{barrage["cap_utile_actuelle"]}</td>
                  <td style={style}>{barrage["valeur_apport"]}</td>
                  <td style={style}>{barrage["valeur_lacher"]}</td>
                  <td style={style}>{barrage["utilisation"]}</td>
                  <td style={style}>{barrage["Valeur_Stock"]}</td>
                  <td style={style}>{barrage["valeur_Pluv"]}</td>
                  <td style={style}>{barrage["valeur_RS"]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
    sendHTMLToFlask(html);
  };

  const sendHTMLToFlask = (html) => {
    axios.post('http://localhost:5000/down', { html }, { responseType: 'blob' })
    .then(response => {
      // create a blob URL for the returned file data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // create a hidden anchor element with the download attribute and set the href to the blob URL
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'situation_hydraulique.pdf');
      // simulate a click on the anchor element to trigger the download
      document.body.appendChild(link);
      link.click();
      // clean up the URL object after the download is complete
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      // handle error
      console.error(error);
    });
}
  const handleDamChange = (event) => {
    const selectedName = event.target.value;
    const selectedId = damDictionary[selectedName];
    setDamId(selectedId);
  };
  const handleNumberChange = (event) => {
     setMonthNumbers(event.target.value);
    
  };
  const handleDownload = () => {
    generateHTML();
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
        {Object.keys(damDictionary).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
          <option>Barrages ST Nord</option>
          <option>Barrages ST Centre</option>
          <option>Barrages ST Cap-Bon</option>
          <option>Tous les barrages</option>
        </select>
        <button  className="btn-round"
        color="primary" onClick={handleDownload}>Télécharger PDF</button>
       <br/><br/>
        <Calendar onChange={onChange} value={value} />
        <br/><br/><br/>
        
        </CardBody>
        </Card>
        </Col>

        <Col lg="6" md="6" sm="6">
        <Card className="card-stats">
        <CardHeader>
        <CardTitle tag="h5" >Répartition des barrages</CardTitle>
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
              <CardBody style={{ height: '105px' }}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <FontAwesomeIcon icon={faPercent} style={{color: "6bd098",}}/>
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
              <CardBody style={{ height: '105px' }}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <FontAwesomeIcon icon={faArrowUpFromGroundWater} style={{color: "#fcc468",}} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Stock</p>
                      <CardTitle tag="p">{stock}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody style={{ height: '105px' }}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <FontAwesomeIcon icon={faHandHoldingDroplet} style={{color: "#ef8157",}}/>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Capacité actuelle utile</p>
                      <CardTitle tag="p">{capacity}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody style={{ height: '105px' }}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <FontAwesomeIcon icon={faWater} style={{color: "#4acccd",}} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category" >Alimentation de Ichkeul</p>
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
            <Card style={{ width: "38vw" }}>
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
            <Card style={{ width: "38vw" }}>
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
            <Card style={{ height: '620px' }}>
              <CardHeader>
                <CardTitle tag="h5">Exploitation des lâchers</CardTitle>
                <p className="card-category">Répartition de l'exploitation des Lâchers le {value.toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
              </CardHeader>
              <CardBody>
                <Pie
                  data={exploitationPieChart(exp).data}
                  options={exploitationPieChart(exp).options}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> D : Déversement, E : Exploitation, tr : Transfert, a : déstockage pour abaissement du plan d'eau, d : dévasement, T : Turbinage, P : fuite de drainage
                </div>
              </CardFooter>
            </Card>
          </Col>
      <Col md="8">
        <Card className="card-chart" style={{ height: '620px' }}>
      <CardHeader>
        <CardTitle tag="h5">Courbe de variation de Stock</CardTitle>
        <p className="card-category">Line Chart with Points</p>
      </CardHeader>
      <CardBody>
        <Line
                  datasetIdKey='id'
                  data={evolutionLineChart(dateValues,stockValues1).data}
                  options={evolutionLineChart(dateValues,stockValues1).options}
                  width={400}
                  height={200}
                />
  
      </CardBody>
      <CardFooter>
          <hr />
          <div className="card-stats">
            <i className="fa fa-check" /> Evolution du stock pendant les 
            <select name="numbers"onChange={handleNumberChange} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select> 
            mois précédant le {value.toLocaleDateString('en-GB').replace(/\//g, '-')}
          </div>
      </CardFooter>
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
