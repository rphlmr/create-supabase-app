import React, { useEffect, useState } from "react";

import { Box, Text } from "ink";
import terminalImage from "terminal-image";

type Dimension = string | number;

const cache = new Map<string, string>();

/**
 * Don't work very well with Iterm :/
 * I keep it here for reference.
 */
export const Image = ({
  src,
  height,
  width,
  alt,
  preserveAspectRatio,
}: {
  src: string;
  height?: Dimension;
  width?: Dimension;
  alt: string;
  preserveAspectRatio?: boolean;
}) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    if (cache.has(src)) {
      setImg(cache.get(src) ?? "");
    } else {
      terminalImage
        .file(src, {
          height,
          width,
          preserveAspectRatio,
        })
        .then((asset) => {
          cache.set(src, asset);
          setImg(asset);
        })
        .catch(() => setImg(alt));
    }
  }, [alt, height, preserveAspectRatio, src, width]);

  return (
    <Box>
      <Text>{img}</Text>
    </Box>
  );
};
