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

import React, { useState, useEffect} from "react";
import axios from 'axios';
import { eachDayOfInterval, format } from 'date-fns';
import { useParams, Link, BrowserRouter } from 'react-router-dom';

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

function GeneratedPDF() {
  const startDate = new Date(2018, 0, 1);
  const endDate = new Date(2022, 12, 31);

  const dates = eachDayOfInterval({ start: startDate, end: endDate }).reverse();

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Création du PDF présentant les informations relatives à la situation hydraulique quotidienne en Tunisie:</h5>
                
              </CardHeader>
              <CardBody>
                <div className="typography-line">
                  <blockquote>
                    <p className="blockquote blockquote-primary">
                    <form>
                      <label>
                        <select display={Blob}   value={selectedDate} onChange={handleDateChange}>
                          <option value="">Choisissez une date</option>
                          {dates.map((date) => (
                            <option key={date} value={format(date, 'yyyy-MM-dd')}>
                              {format(date, 'dd/MM/yyyy')}
                            </option>
                          ))}
                        </select>
                      </label>
                      <Link to={`/admin/DownloadPDF/${selectedDate}`}>
                        <button className="btn-round"
                        color="primary" type="submit" style={{ margin: '10px' }}>Génération du PDF </button>
                      </Link>
                    </form>
                      <br />
                      <small>- Prière de choisir une date dans 2018-2022 </small>
                    </p>
                  </blockquote>
                  <br />
                  <br />

                </div>
                <br />
                  <br />
                  <br />

                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default GeneratedPDF;
