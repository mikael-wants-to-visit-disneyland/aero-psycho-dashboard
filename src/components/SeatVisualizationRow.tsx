import * as React from "react";
import "./SeatVisualization.css";

export interface ISeatVisualizationRowProps {
  seatsN: number;
}

export default function SeatVisualizationRow(
  props: ISeatVisualizationRowProps,
) {
  return (
    <div className="seat-visualization-row">
      {[...Array(props.seatsN)].map((_, i) => (
        <div key={i} className="seat-visualization-seat" />
      ))}
    </div>
  );
}
