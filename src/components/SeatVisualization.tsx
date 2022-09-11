import * as React from "react";
import "./SeatVisualization.css";
import SeatVisualizationRow from "./SeatVisualizationRow";

const SEATS_PER_ROW = 30;

export interface ISeatVisualizationProps {}

export default function SeatVisualization(props: ISeatVisualizationProps) {
  return (
    <div className="seat-visualization">
      <SeatVisualizationRow seatsN={SEATS_PER_ROW} />
      <SeatVisualizationRow seatsN={SEATS_PER_ROW} />
      <div style={{ height: "60px" }} />
      <SeatVisualizationRow seatsN={SEATS_PER_ROW} />
      <SeatVisualizationRow seatsN={SEATS_PER_ROW} />
    </div>
  );
}
