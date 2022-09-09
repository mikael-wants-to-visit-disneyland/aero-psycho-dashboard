import "./App.css";

import * as React from "react";

import 'antd/dist/antd.css';
import { Space, Table, Tag, Progress, Spin } from 'antd';
import _ from 'lodash'
import Gauge from "./components/Gauge";
import axios from 'axios'

const LOVE_SYMBOL = '💗';

export interface IFlight {
  flightCode: string;
  date: string;
  estimatedDepartureTime: string;
  estimatedArrivalTime: string;
  originAirportId: string;
  destinationAirportId: string;
  mood: number;
  tiredness: number;
  love: number;
}

const columns = [
  {
    title: 'Flight',
    dataIndex: 'flightCode',
    key: 'flightCode',
  },
  // {
  //   title: 'Departure time',
  //   dataIndex: 'estimatedDepartureTime',
  //   key: 'estimatedDepartureTime',
  // },
  {
    title: 'Arrival time',
    dataIndex: 'estimatedArrivalTime',
    key: 'estimatedArrivalTime',
  },
  {
    title: 'Origin',
    dataIndex: 'originAirportId',
    key: 'originAirportId',
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

export default function App() {
  const [data, setData] = React.useState<IFlight[]>([])
  const [airport, setAirport] = React.useState<string>('London Heathrow')
  React.useEffect(() => {
    axios.get('https://d7n2m5unt8.execute-api.us-east-1.amazonaws.com/getFlights', { params: { originAirportId: 'BOO' } }).then((response) => setData(response.data))
  }, [airport])
  return (
    <div className="App">
      <div className="margin">
        <div className="header">
          <div className="header-airport-name">{airport}</div>
          <div className="header-gauges">
            <Gauge name='Mood' value={parseFloat(_.mean(data.map((row) => row.mood)).toFixed(0))} />
            <Gauge name='Tiredness' value={parseFloat(_.mean(data.map((row) => row.tiredness)).toFixed(0))} />
            </div>
        </div>
        <div className="content">
          {data.length > 0 ? <Table columns={columns} dataSource={data.map((row) => ({ ...row, key: row.flightCode }))} size='small' /> : <div className="centered"><Spin size='large'/></div>}
        </div>
      </div>
    </div>
  );
}
