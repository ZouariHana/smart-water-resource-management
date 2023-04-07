import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

function DownloadPDF() {
  const [Barrages, setBarrages] = useState([])
  const { date } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/barrage/${date}`).then(
      res => {
        setBarrages(res.data);
        console.log(res.data);
      }
    )
  }, []);

  const generateHTML = () => {
    
    const style = {
      border: '1px solid black',
      padding: '5px'
    };
    const html = ReactDOMServer.renderToString(
      <div className="SitHyd">
        <h1> Situation hydraulique des Barrages</h1>
        <h2>Journee du {date} </h2>
  
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
            {Barrages.map(barrage => {
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
    axios.post('`http://localhost:5000/api/download', { html }, { responseType: 'blob' })
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
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Téléchargement PDF</CardHeader>
              <CardBody>
                <div >
                  <button onClick={generateHTML}>Télécharger PDF</button>
    
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DownloadPDF;