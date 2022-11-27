import React from 'react';
import Image from 'next/image';

// types
import { ImageDataProps } from './types';

export default function NextImage({
  src,
  alt,
  className,
  transform,
}: ImageDataProps) {
  if (!src) {
    return null;
  }

  let props: any = { layout: 'fill' };

  if (transform?.height && transform?.width) {
    props = { ...transform };
  }

  return (
    <Image
      src={src}
      objectFit='cover'
      alt={alt || 'some image with no alt text'}
      className={className}
      {...props}
    />
  );
}
