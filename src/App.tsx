import "./App.css";

import * as React from "react";

import "antd/dist/antd.css";
import { Spin, Modal } from "antd";
import _ from "lodash";
import axios from "axios";
import GaugeRow from "./components/GaugeRow";
import FlightModal from "./components/FlightModal";
import FlightTable from "./components/FlightTable";
import moment from "moment";

export const API_URL = "https://g0bi5gtpef.execute-api.us-east-1.amazonaws.com";
export const FLIGHTS_ROUTE = "getFlights";
export const AIRPORTS_ROUTE = "getAirports";

export const LOVE_SYMBOL = "💗";
export const MAX_LOVE = 3;

export const INDICATORS = ["mood", "tiredness", "love"];
export type Indicator = typeof INDICATORS[number];

export interface IndicatorConfig {
  color: string;
  max: number;
}
// TODO: configs do not belong in the frontend; move this to the db.
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

const getTimeSortedFlights = (flights: IFlight[]) =>
  _.sortBy(flights, (flight) =>
    moment(flight.estimatedArrivalTime, "HH:mm:ss").toDate(),
  ).reverse();

const addMinutes = (date: Date, minutes: number) => {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

export default function App() {
  const [airportSelectionModal, setAirportSelectionModal] =
    React.useState<boolean>(false);
  const [flights, setFlights] = React.useState<IFlight[]>([]);
  const [airports, setAirports] = React.useState<IAirport[]>([]);
  const [selectedAirport, setSelectedAirport] = React.useState<
    IAirport | undefined
  >(undefined);
  const [selectedFlight, setSelectedFlight] = React.useState<
    IFlight | undefined
  >(undefined);

  React.useEffect(() => {
    !selectedAirport && setSelectedAirport(airports[0]);
  }, [airports]);

  React.useEffect(() => {
    if (!selectedAirport) {
      return;
    }
    axios
      .get([API_URL, FLIGHTS_ROUTE].join("/"), {
        params: {
          airportCode: selectedAirport.airportCode,
        },
      })
      .then((response) => setFlights(response.data));
  }, [selectedAirport]);

  React.useEffect(() => {
    if (airports.length > 0) {
      return;
    }
    axios
      .get([API_URL, AIRPORTS_ROUTE].join("/"))
      .then((response) => setAirports(response.data));
  }, []);

  const getMeanMetric = (indicator: Indicator) =>
    parseInt(
      _.mean(flights.map((row) => row.sensorData[indicator])).toFixed(0),
    );

  return (
    <div className="App">
      <Modal
        title="Select airport"
        open={airportSelectionModal}
        onCancel={() => setAirportSelectionModal(false)}
        footer={null}
        width={"60%"}
        className="airport-selection-modal"
      >
        <div className="airport-selection-modal-content">
          {airports.map((airport) => (
            <div
              className="airport-selection-modal-airport-name"
              onClick={() => {
                setSelectedAirport(airport);
                setAirportSelectionModal(false);
              }}
            >{`${airport?.location} ${airport?.suffix}`}</div>
          ))}
        </div>
      </Modal>
      <FlightModal
        flight={selectedFlight}
        closeCallback={() => setSelectedFlight(undefined)}
      />
      <div className="margin">
        <div className="header">
          <div className="header-row">
            <div
              className="header-airport-name"
              onClick={() => setAirportSelectionModal(true)}
            >
              {selectedAirport
                ? `${selectedAirport?.location} ${selectedAirport?.suffix}`
                : ""}
            </div>
            <GaugeRow
              data={{
                mood: getMeanMetric("mood"),
                tiredness: getMeanMetric("tiredness"),
                love: getMeanMetric("love"),
              }}
            />
          </div>
        </div>
        <div className="content">
          {flights.length > 0 ? (
            <FlightTable
              flights={getTimeSortedFlights(flights)}
              airports={airports}
              rowClickCallback={(flight) => setSelectedFlight(flight)}
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
