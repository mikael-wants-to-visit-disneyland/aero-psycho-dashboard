import * as React from "react";
import "./SeatVisualization.css";

export interface ISeatVisualizationRowProps {
  seatsN: number;
  color: string;
  probability: number;
}

export default function SeatVisualizationRow(
  props: ISeatVisualizationRowProps,
) {
  return (
    <div className="seat-visualization-row">
      {[...Array(props.seatsN)].map((_, i) => (
        <div
          key={i}
          className="seat-visualization-seat"
          style={{
            background: `rgba(100, 100, 3, ${Math.random() * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}
