import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from 'axios';

var defaultStartDate = new Date(2016,1,1);
var defaultEndDate = new Date(2017,1,1);
var init = true;
var searchButtonInit = false;

const columns = [
  {
    name: 'Station Name',
    selector: 'name',
    sortable: true
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true
  },
  {
    name: 'Mean Temperature',
    cell: row =><Link to={{ pathname: `/detail/${row.id}`}} style={{display: "table-cell"}} target="_blank">{row.meanTemp}</Link>,
    selector: 'meanTemp',
    sortable: true
  }
];

function Home() {

  const [stations, setStations] = useState({});
  const [metaData, setMetaData] = useState({});
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const getStationList = () => {
    axios.get(`http://localhost:8090/weatherstations?page=${page}&max=${countPerPage}`).then(res => {
      setStations(res.data.stations);
      setMetaData(res.data.metaData);
    }).catch(err => {
      setStations({});
    });
    if(init === true) {
      init = false;
    }
  }

  useEffect(() => {
    if(init === true || searchButtonInit === false) {
      getStationList();
    } else {
      searchList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, countPerPage]);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const searchList = () => {
    const payload = { startDate: `${startDate.toISOString().replace(/T.*/,'').split('-').join('-')}`,
                      endDate: `${endDate.toISOString().replace(/T.*/,'').split('-').join('-')}`,
                      page : { max : `${countPerPage}`, page : `${page}`} };
    axios.post(`http://localhost:8090/weatherstations/filter/`, payload).then(res => {
      setStations(res.data.stations);
      setMetaData(res.data.metaData);
    }).catch(err => {
      setStations({});
    });
    if(searchButtonInit === false){
      searchButtonInit = true;
    }
  }

  return (
    <div className="App">
      <h3>Weather Station Data Table with Pagination</h3>
      <h4>
        Start Date <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        />
      </h4>
      <h4>
        End Date <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        />
      </h4>
      <h4>
      <button onClick={searchList}>Search</button>
      </h4>
      <Card>
      <DataTable
        title="Weather Stations"
        columns={columns}
        data={stations instanceof Array ? stations : []}
        defaultSortField="name"
        sortIcon={<SortIcon />}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={metaData.itemsCount}
        onChangePage={page => setPage(page)}
        onChangeRowsPerPage={currentRowsPerPage => setCountPerPage(currentRowsPerPage)}
      />
      </Card>
    </div>
  );
}

export default Home;
