import React from 'react';
import { YAxis as RechartsYAxis } from 'recharts';

// YAxis wrapper with all defaultProps to eliminate warnings
const YAxis = (props) => {
  const defaultProps = {
    yAxisId: 0,
    allowDecimals: false,
    axisLine: { stroke: '#9ca3af' },
    tickLine: { stroke: '#9ca3af' },
    type: 'number',
    domain: [0, 'dataMax'],
    tickCount: 5,
    padding: { top: 10, bottom: 10 },
    mirror: false,
    reversed: false,
    scale: 'auto',
    allowDataOverflow: false,
    tickFormatter: undefined,
    angle: 0,
    textAnchor: 'end',
    verticalAnchor: 'middle',
    width: 60,
    height: 0,
    hide: false,
    label: undefined,
    orientation: 'left',
    dataKey: undefined,
    name: undefined,
    unit: undefined,
    nameKey: undefined,
    stroke: '#9ca3af',
    tick: { fontSize: 12 }
  };

  // Ensure yAxisId is always set, either from props or defaultProps
  const finalProps = {
    ...defaultProps,
    ...props,
    yAxisId: props.yAxisId !== undefined ? props.yAxisId : defaultProps.yAxisId
  };

  return <RechartsYAxis {...finalProps} />;
};

export default YAxis;
