import "./App.css";

import * as React from "react";

import "antd/dist/antd.css";
//import { Table, Tag, Progress, Spin } from "antd";
import { Table, Progress, Spin, Select, Modal } from "antd";
import _ from "lodash";
import axios from "axios";
import { Option } from "antd/lib/mentions";
import GaugeRow from "./components/GaugeRow";
import SeatVisualization from "./components/SeatVisualization";

export const LOVE_SYMBOL = "💗";
export const MAX_LOVE = 3;
const FLIGHT_MODAL_WIDTH = "70%";

export const INDICATORS = ["mood", "tiredness", "love"];
export type Indicator = typeof INDICATORS[number];

export interface IndicatorConfig {
  color: string;
  max: number;
}
export const INDICATOR_CONFIGS: Record<Indicator, IndicatorConfig> = {
  mood: { color: "#10f000", max: 100 },
  tiredness: { color: "#177fff", max: 100 },
  love: { color: "#ff3ba7", max: 3 },
};

export interface IFlight {
  flightCode: string;
  date: string;
  estimatedDepartureTime: string;
  estimatedArrivalTime: string;
  airportCode: string;
  departureAirportCode: string;
  sensorData: ISensorData;
}

export interface IAirport {
  airportCode: string;
  location: string;
  suffix: string;
}

export interface ISensorData {
  [indicator: Indicator]: number;
}

const columns = [
  {
    title: "Flight",
    dataIndex: "flightCode",
    key: "flightCode",
  },
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
      <Progress
        percent={value}
        size="small"
        showInfo={false}
        strokeColor={INDICATOR_CONFIGS.mood.color}
      />
    ),
  },
  {
    title: "Tiredness",
    dataIndex: "tiredness",
    key: "tiredness",
    render: (value: number) => (
      <Progress
        percent={value}
        size="small"
        showInfo={false}
        strokeColor={INDICATOR_CONFIGS.tiredness.color}
      />
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
  const [flights, setFlights] = React.useState<IFlight[]>([]);
  const [airports, setAirports] = React.useState<IAirport[]>([]);
  const [selectedAirport, setSelectedAirport] = React.useState<
    IAirport | undefined
  >(undefined);
  const [selectedFlight, setSelectedFlight] = React.useState<
    IFlight | undefined
  >(undefined);
  const [selectedIndicator, setSelectedIndicator] =
    React.useState<Indicator>("mood");

  React.useEffect(() => {
    !selectedAirport && setSelectedAirport(airports[0]);
  }, [airports]);

  React.useEffect(() => {
    if (!selectedAirport) {
      return;
    }
    axios
      .get(
        "https://g0bi5gtpef.execute-api.us-east-1.amazonaws.com/getFlights",
        {
          params: {
            airportCode: selectedAirport.airportCode,
          },
        },
      )
      .then((response) => setFlights(response.data));
  }, [selectedAirport]);

  React.useEffect(() => {
    if (airports.length > 0) {
      return;
    }
    axios
      .get("https://g0bi5gtpef.execute-api.us-east-1.amazonaws.com/getAirports")
      .then((response) => setAirports(response.data));
  }, []);

  return (
    <div className="App">
      <Modal
        title={`Flight ${selectedFlight?.flightCode}`}
        open={!!selectedFlight}
        onCancel={() => setSelectedFlight(undefined)}
        footer={null}
        width={FLIGHT_MODAL_WIDTH}
      >
        <div>
          <GaugeRow
            data={{
              mood: selectedFlight?.sensorData.mood ?? 0,
              tiredness: selectedFlight?.sensorData.tiredness ?? 0,
              love: selectedFlight?.sensorData.love ?? 0,
            }}
          />
          <SeatVisualization
            color={INDICATOR_CONFIGS.mood.color}
            probability={
              (selectedFlight?.sensorData[selectedIndicator] ?? 0) /
              INDICATOR_CONFIGS[selectedIndicator].max
            }
          />
        </div>
      </Modal>
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
            <GaugeRow
              data={{
                mood: parseFloat(
                  _.mean(flights.map((row) => row.sensorData.mood)).toFixed(0),
                ),
                tiredness: parseFloat(
                  _.mean(
                    flights.map((row) => row.sensorData.tiredness),
                  ).toFixed(0),
                ),
                love: parseInt(
                  _.mean(flights.map((row) => row.sensorData.love)).toFixed(0),
                ),
              }}
            />
          </div>
        </div>
        <div className="content">
          {flights.length > 0 ? (
            <Table
              columns={columns}
              dataSource={flights.map((row) => ({
                ...row,
                ...row.sensorData,
                key: row.flightCode,
              }))}
              size="small"
              onRow={(record) => {
                return {
                  onClick: () => {
                    setSelectedFlight(record);
                  },
                };
              }}
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
