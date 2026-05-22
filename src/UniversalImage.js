import React from "react";

let NextImage;
try {
  NextImage = require("next/image").default;
} catch (e) {
  NextImage = null;
}

const shouldBypassNextOptimizer = (src) => {
  if (!src || typeof src !== "string") return false;

  return (
    src.includes("api.egora.pk/v1/images") ||
    src.includes("api.dev.egora.pk/v1/images") ||
    src.includes("api.staging.egora.pk/v1/images")
  );
};

export default function UniversalImage({
  src,
  alt = "image",
  width = "100%",
  height = "100%",
  objectFit = "contain",
  style = {},
  onError,
}) {
  const commonStyle = {
    width,
    height,
    objectFit,
    display: "block",
    ...style,
  };

  if (!src) return null;

  if (NextImage) {
    const bypassOptimizer = shouldBypassNextOptimizer(src);

    return (
      <div style={{ position: "relative", width, height, ...style }}>
        <NextImage
          src={src}
          alt={alt}
          layout="fill"
          objectFit={objectFit}
          onError={onError}
          unoptimized={bypassOptimizer}
        />
      </div>
    );
  }

  return <img src={src} alt={alt} style={commonStyle} onError={onError} />;
}

// import React from 'react';


// let NextImage;
// try {
//   NextImage = require('next/image').default;
// } catch (e) {
//   NextImage = null;
// }

// export default function UniversalImage({ src, alt = "image", width = '100%', height = '100%', objectFit = 'contain', style = {} }) {
//   const commonStyle = {
//     width,
//     height,
//     objectFit,
//     ...style,
//   };

//   if (NextImage) {
//     return (
//       <div style={{ position: 'relative', width, height }}>
//         <NextImage src={src} alt={alt} layout="fill" objectFit={objectFit} />
//       </div>
//     );
//   }

//   return <img src={src} alt={alt} style={commonStyle} />;
// }
