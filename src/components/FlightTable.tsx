import * as React from "react";
import { Progress, Table, Tooltip } from "antd";
import {
  IAirport,
  IFlight,
  INDICATOR_CONFIGS,
  ISensorData,
  LOVE_SYMBOL,
} from "src/App";

export interface IFlightTableProps {
  flights: IFlight[];
  airports: IAirport[];
  rowClickCallback: (f: IFlight) => void;
}

const CRITICALITY_THRESHOLD = 0.03;
const isCriticallyBadFlight = (sensorData: ISensorData) =>
  CRITICALITY_THRESHOLD >
  (sensorData.mood / 100) *
    (1 - sensorData.tiredness / 100) *
    ((sensorData.love + 1) / 4);

export default function FlightTable(props: IFlightTableProps) {
  const columns = [
    {
      title: "Flight",
      dataIndex: "flightCode",
      key: "flightCode",
      render: (code: string) => (
        <div
          style={{ display: "flex", overflow: "visible", alignItems: "center" }}
        >
          {isCriticallyBadFlight(
            props.flights.find((flight) => flight.flightCode === code)
              ?.sensorData ?? {
              mood: 1,
              tiredness: 1,
              love: 1,
            },
          ) && (
            <Tooltip placement="left" title="Critically bad. 😞">
              <div style={{ width: 0, overflow: "visible" }}>
                <div className="flight-warning" />
              </div>
            </Tooltip>
          )}
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
