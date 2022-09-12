import { Modal, Tabs } from "antd";
import * as React from "react";
import { IFlight, INDICATORS, INDICATOR_CONFIGS } from "src/App";
import FlightChart from "./FlightChart";
import Gauge from "./Gauge";
import SeatVisualization from "./SeatVisualization";

const FLIGHT_MODAL_WIDTH = "70%";

export interface IFlightModalProps {
  flight?: IFlight;
  closeCallback: () => void;
}

export default function FlightModal(props: IFlightModalProps) {
  return (
    <Modal
      title={`Flight ${props.flight?.flightCode}`}
      open={!!props.flight}
      onCancel={props.closeCallback}
      footer={null}
      width={FLIGHT_MODAL_WIDTH}
    >
      <div>
        <Tabs defaultActiveKey="1">
          {INDICATORS.map((indicator) => (
            <Tabs.TabPane
              tab={indicator.charAt(0).toUpperCase() + indicator.slice(1)}
              key={indicator}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <SeatVisualization
                  color={INDICATOR_CONFIGS[indicator].color}
                  probability={
                    (props.flight?.sensorData[indicator] ?? 0) /
                    INDICATOR_CONFIGS[indicator].max
                  }
                />
                <div style={{ width: 20 }} />
                <Gauge
                  value={parseInt(
                    (
                      100 *
                        ((props.flight?.sensorData[indicator] ?? 0) /
                          INDICATOR_CONFIGS[indicator].max) ?? 0
                    ).toFixed(0),
                  )}
                  color={INDICATOR_CONFIGS[indicator].color}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ height: 140, width: "94%", marginTop: "30px" }}>
                  <FlightChart
                    color={INDICATOR_CONFIGS[indicator].color}
                    seriesName={indicator}
                  />
                </div>
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </Modal>
  );
}
