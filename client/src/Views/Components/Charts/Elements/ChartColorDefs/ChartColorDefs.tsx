import React from 'react';

const CELL_FILLS: any = {
  NEG_SOL: 'negativeSolid',
  NEG_GRAD: 'negativeGrad',
  POS_SOL: 'positiveSolid',
  POS_GRAD: 'positiveGrad',
};

const VERTICAL = 'Vertical';

export const getCellColor = ({ solid, positive, vertical }: any) => {
  if (solid) {
    return positive ? `url(#${CELL_FILLS.POS_SOL})` : `url(#${CELL_FILLS.NEG_SOL})`;
  }

  return `url(#${positive ? CELL_FILLS.POS_GRAD : CELL_FILLS.NEG_GRAD}${vertical ? VERTICAL : ''})`;
};

const ChartColorDefs = () => {
  return (
    <svg height="0">
      <defs>
        <linearGradient id={`${CELL_FILLS.POS_SOL}`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#17EAD9" />
        </linearGradient>
        <linearGradient id={`${CELL_FILLS.POS_GRAD}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="5%" stopColor="#607AE8" />
          <stop offset="95%" stopColor="#17EAD9" />
        </linearGradient>
        <linearGradient id={`${CELL_FILLS.POS_GRAD}${VERTICAL}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#17EAD9" />
          <stop offset="95%" stopColor="#607AE8" />
        </linearGradient>
        <linearGradient id={`${CELL_FILLS.NEG_SOL}`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#FF9F40" />
        </linearGradient>
        <linearGradient id={`${CELL_FILLS.NEG_GRAD}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="5%" stopColor="#EF4836" />
          <stop offset="95%" stopColor="#FF9F40" />
        </linearGradient>
        <linearGradient id={`${CELL_FILLS.NEG_GRAD}${VERTICAL}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FF9F40" />
          <stop offset="95%" stopColor="#EF4836" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ChartColorDefs;
