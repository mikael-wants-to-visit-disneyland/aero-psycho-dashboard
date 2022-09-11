import * as React from "react";
import { Progress, Table } from "antd";
import { IAirport, IFlight, INDICATOR_CONFIGS, LOVE_SYMBOL } from "src/App";

export interface IFlightTableProps {
  flights: IFlight[];
  airports: IAirport[];
  rowClickCallback: (f: IFlight) => void;
}

const columns = [
  {
    title: "Flight",
    dataIndex: "flightCode",
    key: "flightCode",
    render: (code: string) => (
      <div
        style={{ display: "flex", overflow: "visible", alignItems: "center" }}
      >
        <div style={{ width: 0, overflow: "visible" }}>
          <div className="flight-warning" />
        </div>
        {code}
      </div>
    ),
  },
  {
    title: "Arrival time",
    dataIndex: "estimatedArrivalTime",
    key: "estimatedArrivalTime",
  },
  {
    title: "Origin",
    dataIndex: "departureAirport",
    key: "departureAirport",
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

export default function FlightTable(props: IFlightTableProps) {
  return (
    <Table
      columns={columns}
      dataSource={props.flights.map((row) => ({
        ...row,
        ...row.sensorData,
        departureAirport: `${
          props.airports.find((a) => a.airportCode === row.departureAirportCode)
            ?.location
        } (${row.departureAirportCode})`,
        key: row.flightCode,
      }))}
      className="flight-table"
      size="small"
      onRow={(record) => {
        return {
          onClick: () => {
            props.rowClickCallback(record);
          },
        };
      }}
    />
  );
}
