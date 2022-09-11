import * as React from "react";
import { INDICATOR_CONFIGS, ISensorData, LOVE_SYMBOL, MAX_LOVE } from "src/App";
import Gauge from "./Gauge";

export interface IGaugeProps {
  data: ISensorData;
}

export default function GaugeRow(props: IGaugeProps) {
  return (
    <div className="header-gauges">
      <Gauge
        name="Mood"
        value={props.data.mood}
        color={INDICATOR_CONFIGS.mood.color}
      />
      <div style={{ marginLeft: 23 }} />
      <Gauge
        name="Tiredness"
        value={props.data.tiredness}
        color={INDICATOR_CONFIGS.tiredness.color}
      />
      <div style={{ marginLeft: 28 }} />
      <div className="gauge">
        <div className="gauge-name">{"Love"}</div>
        {_.range(MAX_LOVE)
          .slice()
          .reverse()
          .map((i) => (
            <div
              style={{
                fontSize: 21,
                opacity: i < props.data.love ? 1 : 0.3,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {LOVE_SYMBOL}
            </div>
          ))}
      </div>
    </div>
  );
}
