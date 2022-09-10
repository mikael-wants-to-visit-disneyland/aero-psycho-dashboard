import "./App.css";

import * as React from "react";

import "antd/dist/antd.css";
//import { Table, Tag, Progress, Spin } from "antd";
import { Table, Progress, Spin, Select } from "antd";
import _ from "lodash";
import Gauge from "./components/Gauge";
import axios from "axios";
import { Option } from "antd/lib/mentions";

const LOVE_SYMBOL = "💗";

export interface IFlight {
  flightCode: string;
  date: string;
  estimatedDepartureTime: string;
  estimatedArrivalTime: string;
  airportCode: string;
  departureAirportCode: string;
  mood: number;
  tiredness: number;
  love: number;
}

export interface IAirport {
  airportCode: string;
  location: string;
  suffix: string;
}

const columns = [
  {
    title: "Flight",
    dataIndex: "flightCode",
    key: "flightCode",
  },
  // {
  //   title: 'Departure time',
  //   dataIndex: 'estimatedDepartureTime',
  //   key: 'estimatedDepartureTime',
  // },
  {
    title: "Arrival time",
    dataIndex: "estimatedArrivalTime",
    key: "estimatedArrivalTime",
  },
  {
    title: "Origin",
    dataIndex: "originAirportCode",
    key: "originAirportCode",
  },
  {
    title: "Mood",
    dataIndex: "mood",
    key: "mood",
    render: (value: number) => (
      <Progress percent={value} size="small" showInfo={false} />
    ),
  },
  {
    title: "Tiredness",
    dataIndex: "tiredness",
    key: "tiredness",
    render: (value: number) => (
      <Progress percent={value} size="small" showInfo={false} />
    ),
  },
  {
    title: "Love",
    dataIndex: "love",
    key: "love",
    render: (value: number) => LOVE_SYMBOL.repeat(value),
  },
];

export default function App() {
  const [data, setData] = React.useState<IFlight[]>([]);
  const [airports, setAirports] = React.useState<IAirport[]>([]);
  const [selectedAirport, setSelectedAirport] = React.useState<
    IAirport | undefined
  >(undefined);

  React.useEffect(() => {
    !selectedAirport && setSelectedAirport(airports[0]);
  }, [airports]);

  React.useEffect(() => {
    axios
      .get(
        "https://ny0tqhxb45.execute-api.us-east-1.amazonaws.com/getFlights",
        {
          params: {
            airportCode: "HOO",
          },
        },
      )
      .then((response) => setData(response.data));
  }, [selectedAirport]);

  React.useEffect(() => {
    if (airports.length > 0) {
      return;
    }
    axios
      .get("https://ny0tqhxb45.execute-api.us-east-1.amazonaws.com/getAirports")
      .then((response) => setAirports(response.data));
  }, []);

  return (
    <div className="App">
      <div className="margin">
        <div className="header">
          <Select
            value={selectedAirport?.airportCode}
            optionFilterProp="children"
            onChange={(code) =>
              setSelectedAirport(airports.find((a) => a.airportCode === code))
            }
          >
            {airports.map((a) => (
              <Option
                key={a.airportCode}
                value={a.airportCode}
              >{`${a.location} ${a.suffix}`}</Option>
            ))}
          </Select>
          <div className="header-row">
            <div className="header-airport-name">{`${selectedAirport?.location} ${selectedAirport?.suffix}`}</div>
            <div className="header-gauges">
              <Gauge
                name="Mood"
                value={parseFloat(
                  _.mean(data.map((row) => row.mood)).toFixed(0),
                )}
              />
              <Gauge
                name="Tiredness"
                value={parseFloat(
                  _.mean(data.map((row) => row.tiredness)).toFixed(0),
                )}
              />
            </div>
          </div>
        </div>
        <div className="content">
          {data.length > 0 ? (
            <Table
              columns={columns}
              dataSource={data.map((row) => ({
                ...row,
                key: row.flightCode,
              }))}
              size="small"
            />
          ) : (
            <div className="centered">
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
