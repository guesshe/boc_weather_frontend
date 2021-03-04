import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Detail(props) {

  const [station, setStation] = useState({});
  const {id} = props.match.params
  console.log(id);
  const getStation = () => {
    console.log('props form link', props.id)
    axios.get(`http://localhost:8090/weatherstations/${id}`).then(res => {
      setStation(res.data);
    }).catch(err => {
      setStation({});
    });
  }

  useEffect(() => {
    getStation();
  }, []);

  return (
  <body>
        <h2>
          Detailed View of Weather Station
        </h2>
    <table bordered="true" hover="true">
      <tbody>
        <tr>
          <th>Station Name</th>
          <th>{station.name}</th>
        </tr>
        <tr>
          <th>Province</th>
          <th>{station.province}</th>
        </tr>
        <tr>
          <th>Date</th>
          <th>{station.date}</th>
        </tr>
        <tr>
          <th>Mean Temperature</th>
          <th>{station.meanTemp}</th>
        </tr>
        <tr>
          <th>Highest Monthly Maximum Temperature</th>
          <th>{station.highestMonthlyMaxTemp}</th>
        </tr>
        <tr>
          <th>Lowest Monthly Minimum Temperature</th>
          <th>{station.lowestMonthlyMinTemp}</th>
        </tr>
      </tbody>
    </table>
  </body>
  )
}

export default Detail;