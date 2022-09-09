import "./App.css";

import * as React from "react";

import 'antd/dist/antd.css';
import { Space, Table, Tag, Progress } from 'antd';
import _ from 'lodash'
import Gauge from "./components/Gauge";
import axios from 'axios'

const client = axios.create({ baseURL: 'https://d7n2m5unt8.execute-api.us-east-1.amazonaws.com' })

const LOVE_SYMBOL = '💗';

const columns = [
  {
    title: 'Flight',
    dataIndex: 'flight_id',
    key: 'flight_id',
  },
  {
    title: 'Departure time',
    dataIndex: 'est_departure',
    key: 'est_departure',
  },
  {
    title: 'Arrival time',
    dataIndex: 'est_arrival',
    key: 'est_arrival',
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: 'Mood',
    dataIndex: 'mood',
    key: 'mood',
    render: (value: number) => <Progress percent={value} size='small' showInfo={false} />,
  },
  {
    title: 'Tiredness',
    dataIndex: 'tiredness',
    key: 'tiredness',
    render: (value: number) => <Progress percent={value} size='small' showInfo={false} />,
  },
  {
    title: 'Love',
    dataIndex: 'love',
    key: 'love',
    render: (value: number) => LOVE_SYMBOL.repeat(value),
  },
]

const dummyData = [
  {
    "id": 0,
    "flight_id": "BA1387",
    "destination": 0,
    "origin": 1,
    "est_departure": "13:05",
    "est_arrival": "16:07",
    "mood": 45,
    "tiredness": 4,
    "love": 1
  },
  {
    "id": 1,
    "flight_id": "BA1330",
    "destination": 0,
    "origin": 6,
    "est_departure": "13:18",
    "est_arrival": "18:00",
    "mood": 10,
    "tiredness": 9,
    "love": 0
  },
  {
    "id": 2,
    "flight_id": "TI1087",
    "destination": 0,
    "origin": 3,
    "est_departure": "16:39",
    "est_arrival": "19:20",
    "mood": 20,
    "tiredness": 59,
    "love": 0
  },
  {
    "id": 3,
    "flight_id": "TG17",
    "destination": 0,
    "origin": 1,
    "est_departure": "13:55",
    "est_arrival": "14:56",
    "mood": -9,
    "tiredness": 40,
    "love": 0
  },
  {
    "id": 4,
    "flight_id": "EE570",
    "destination": 0,
    "origin": 2,
    "est_departure": "14:20",
    "est_arrival": "15:30",
    "mood": 5,
    "tiredness": 28,
    "love": 0
  },
  {
    "id": 5,
    "flight_id": "EE579",
    "destination": 0,
    "origin": 6,
    "est_departure": "16:10",
    "est_arrival": "18:55",
    "mood": -76,
    "tiredness": 27,
    "love": 0
  },
  {
    "id": 6,
    "flight_id": "EE537",
    "destination": 0,
    "origin": 5,
    "est_departure": "15:53",
    "est_arrival": "19:27",
    "mood": 4,
    "tiredness": 45,
    "love": 1
  },
  {
    "id": 7,
    "flight_id": "SP5700",
    "destination": 0,
    "origin": 1,
    "est_departure": "15:11",
    "est_arrival": "21:30",
    "mood": 12,
    "tiredness": 81,
    "love": 1
  },
  {
    "id": 8,
    "flight_id": "SP5702",
    "destination": 0,
    "origin": 4,
    "est_departure": "14:35",
    "est_arrival": "22:45",
    "mood": 78,
    "tiredness": 4,
    "love": 3
  },
  {
    "id": 9,
    "flight_id": "SP589",
    "destination": 0,
    "origin": 3,
    "est_departure": "17:01",
    "est_arrival": "19:21",
    "mood": 13,
    "tiredness": 53,
    "love": 2
  },
  {
    "id": 10,
    "flight_id": "SP5609",
    "destination": 0,
    "origin": 4,
    "est_departure": "16:49",
    "est_arrival": "18:23",
    "mood": -6,
    "tiredness": 68,
    "love": 0
  }
 ]

/**
 * Our Web Application
 */
export default function App() {
  const [boo, setBoo] = React.useState(false)
  React.useEffect(() => {
    if (!boo) {
      axios.get('https://d7n2m5unt8.execute-api.us-east-1.amazonaws.com/getFlights', { params: { originAirportId: 'BOO' } }).then((response) => console.log(response.data))
      setBoo(true);
    }
  }, [])
  return (
    <div className="App">
      <div className="centralized">
        <div className="header">
          <div className="header-airport-name">London</div>
          <div className="header-gauges">
            <Gauge name='Mood' value={parseFloat(_.mean(dummyData.map((row) => row.mood)).toFixed(0))} />
            <Gauge name='Tiredness' value={parseFloat(_.mean(dummyData.map((row) => row.tiredness)).toFixed(0))} />
            </div>
        </div>
        <div className="content">
          <Table columns={columns} dataSource={dummyData.map((row) => ({ ...row, key: row.id }))} size='small' />
        </div>
      </div>
    </div>
  );
}
