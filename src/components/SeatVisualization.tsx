import * as React from "react";
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
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
      <SeatVisualizationRow
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
      <div style={{ height: "86px" }} />
      <SeatVisualizationRow
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
      <SeatVisualizationRow
        seatsN={SEATS_PER_ROW}
        color={props.color}
        probability={props.probability}
      />
    </div>
  );
}
