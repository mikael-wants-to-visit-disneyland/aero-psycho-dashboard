import * as React from "react";
import { Progress } from 'antd';

export interface IGaugeProps {
    name: string;
    value: number;
}

export default function Gauge(props: IGaugeProps) {
return <div className="gauge">
<div className="gauge-name">{props.name}</div>
<Progress type="circle" width={70} percent={props.value} />

</div>
}