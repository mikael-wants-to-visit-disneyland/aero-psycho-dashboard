import * as React from "react";
import { hexToRGB } from "src/util";
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
            background: hexToRGB(
              props.color,
              Math.random() * props.probability,
            ),
          }}
        />
      ))}
    </div>
  );
}
