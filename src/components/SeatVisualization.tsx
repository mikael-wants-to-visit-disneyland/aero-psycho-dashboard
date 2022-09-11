import * as React from "react";
import { IndicatorConfig } from "src/App";
import "./SeatVisualization.css";
import SeatVisualizationRow from "./SeatVisualizationRow";

const SEATS_PER_ROW = 30;

export interface ISeatVisualizationProps {
  color: string;
  probability: number;
}

export default function SeatVisualization(props: ISeatVisualizationProps) {
  return (
    <div className="seat-visualization">
      <SeatVisualizationRow
        name="A"
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
      <SeatVisualizationRow
        name="B"
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
      <div style={{ height: "86px" }} />
      <SeatVisualizationRow
        name="C"
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
      <SeatVisualizationRow
        name="D"
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
    </div>
  );
}
