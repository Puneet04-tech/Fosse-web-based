import React from 'react';
import { XAxis as RechartsXAxis } from 'recharts';

// XAxis wrapper with all defaultProps to eliminate warnings
const XAxis = (props) => {
  const defaultProps = {
    xAxisId: 0,
    allowDecimals: false,
    axisLine: { stroke: '#9ca3af' },
    tickLine: { stroke: '#9ca3af' },
    type: 'category',
    domain: [0, 'dataMax'],
    tickCount: 6,
    padding: { left: 10, right: 10 },
    mirror: false,
    reversed: false,
    scale: 'auto',
    allowDataOverflow: false,
    allowDuplicatedCategory: false,
    tickFormatter: undefined,
    angle: 0,
    textAnchor: 'middle',
    verticalAnchor: 'middle',
    height: 30,
    width: 0,
    hide: false,
    label: undefined,
    name: undefined,
    unit: undefined,
    nameKey: undefined,
    stroke: '#9ca3af',
    tick: { fontSize: 12 }
  };

  // Ensure xAxisId is always set, either from props or defaultProps
  const finalProps = {
    ...defaultProps,
    ...props,
    xAxisId: props.xAxisId !== undefined ? props.xAxisId : defaultProps.xAxisId
  };

  return <RechartsXAxis {...finalProps} />;
};

export default XAxis;
