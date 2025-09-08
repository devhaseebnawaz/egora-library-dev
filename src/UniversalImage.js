import React from 'react';


let NextImage;
try {
  NextImage = require('next/image').default;
} catch (e) {
  NextImage = null;
}

export default function UniversalImage({ src, alt = "image", width = '100%', height = '100%', objectFit = 'contain', style = {} }) {
  const commonStyle = {
    width,
    height,
    objectFit,
    ...style,
  };

  if (NextImage) {
    return (
      <div style={{ position: 'relative', width, height }}>
        <NextImage src={src} alt={alt} layout="fill" objectFit={objectFit} />
      </div>
    );
  }

  return <img src={src} alt={alt} style={commonStyle} />;
}
