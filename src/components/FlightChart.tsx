import moment from "moment";
import * as React from "react";
import { Chart } from "react-charts";

export interface IFlightChartProps {
  color: string;
  seriesName: string;
}

export default function FlightChart(props: IFlightChartProps) {
  const dummyData = [
    {
      label: props.seriesName,
      data: [
        { time: moment("18:30:00", "HH:mm:ss").toDate(), value: 10 },
        { time: moment("18:40:00", "HH:mm:ss").toDate(), value: 13 },
        { time: moment("18:50:00", "HH:mm:ss").toDate(), value: 12 },
        { time: moment("19:00:00", "HH:mm:ss").toDate(), value: 16 },
        { time: moment("19:10:00", "HH:mm:ss").toDate(), value: 19 },
        { time: moment("19:20:00", "HH:mm:ss").toDate(), value: 20 },
        { time: moment("19:30:00", "HH:mm:ss").toDate(), value: 20 },
        { time: moment("19:40:00", "HH:mm:ss").toDate(), value: 22 },
        { time: moment("19:50:00", "HH:mm:ss").toDate(), value: 24 },
        { time: moment("20:00:00", "HH:mm:ss").toDate(), value: 23 },
        { time: moment("20:10:00", "HH:mm:ss").toDate(), value: 15 },
        { time: moment("20:20:00", "HH:mm:ss").toDate(), value: 20 },
        { time: moment("20:30:00", "HH:mm:ss").toDate(), value: 24 },
        { time: moment("20:40:00", "HH:mm:ss").toDate(), value: 30 },
        { time: moment("20:50:00", "HH:mm:ss").toDate(), value: 29 },
        { time: moment("21:00:00", "HH:mm:ss").toDate(), value: 31 },
        { time: moment("21:10:00", "HH:mm:ss").toDate(), value: 32 },
        { time: moment("21:20:00", "HH:mm:ss").toDate(), value: null },
        { time: moment("21:30:00", "HH:mm:ss").toDate(), value: null },
      ],
    },
  ];
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: any) => datum.time,
    }),
    [],
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum: any) => datum.value,
      },
    ],
    [],
  );
  return (
    <Chart
      options={{
        data: dummyData,
        primaryAxis,
        secondaryAxes,
        getSeriesStyle: () => ({
          color: props.color,
        }),
      }}
    />
  );
}
