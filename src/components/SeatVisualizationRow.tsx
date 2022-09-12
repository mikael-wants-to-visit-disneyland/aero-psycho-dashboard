import { Popover } from "antd";
import * as React from "react";
import { IndicatorConfig } from "src/App";
import { hexToRGB } from "src/util";
import Gauge from "./Gauge";
import "./SeatVisualization.css";

export interface ISeatVisualizationRowProps {
  name: string;
  seatsN: number;
  color: string;
  probability: number; // TODO: no need for this when we get the actual values for each seat.
}

const STD_DEV = 0.5;
const getSeatOpacity = (probability: number) =>
  probability > 0
    ? Math.max(
        Math.min(
          1,
          (Math.random() > 0.5 ? 1 : -1) * (Math.random() * STD_DEV) +
            probability,
        ),
        0,
      )
    : 0;

export default function SeatVisualizationRow(
  props: ISeatVisualizationRowProps,
) {
  return (
    <div className="seat-visualization-row">
      {[...Array(props.seatsN)].map((_, i) => {
        const opacity = getSeatOpacity(props.probability);
        return (
          <Popover
            key={i}
            content={
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Gauge
                  value={parseInt((opacity * 100).toFixed(0))}
                  color={props.color}
                />
              </div>
            }
            title={`Seat ${i}${props.name}`}
            overlayClassName="seat-visualization-tooltip"
          >
            <div
              className="seat-visualization-seat"
              style={{
                background: hexToRGB(props.color, opacity),
              }}
            />
          </Popover>
        );
      })}
    </div>
  );
}
