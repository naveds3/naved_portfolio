import React from 'react';
import { Box } from '@mui/material';

const GlowHalo = ({ top, left, right, bottom, size = '300px', color = 'rgba(20, 184, 166, 0.15)', blur = '80px', zIndex = 1 }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        filter: `blur(${blur})`,
        zIndex: zIndex,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GlowHalo;
