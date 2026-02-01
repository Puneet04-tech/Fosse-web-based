import React from 'react';
import { ReferenceLine as RechartsReferenceLine } from 'recharts';

// ReferenceLine wrapper with all defaultProps to eliminate warnings
const ReferenceLine = (props) => {
  const defaultProps = {
    isFront: false,
    ifOverflow: 'extendDomain',
    labelPosition: 'right',
    segment: undefined,
    strokeWidth: 2
  };

  return <RechartsReferenceLine {...defaultProps} {...props} />;
};

export default ReferenceLine;
