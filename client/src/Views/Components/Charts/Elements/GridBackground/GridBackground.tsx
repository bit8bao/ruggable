import React from 'react';

interface IProps {
  readonly squareSize: number;
  readonly lineStroke: string;
}

const GridBackground = (props: IProps) => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%">
    <defs id="svg-defs">
      <pattern id="pattern" width={props.squareSize} height={props.squareSize} patternUnits="userSpaceOnUse">
        <path
          d={`M 0 0 L ${props.squareSize} 0 ${props.squareSize} ${props.squareSize} 0 ${props.squareSize} z`}
          fill="transparent"
          stroke={props.lineStroke}
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect fill="url(#pattern)" height="100%" width="100%" y="0" x="0" />
  </svg>
);

export default GridBackground;
