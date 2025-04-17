import { Image } from "@imagekit/next";

const ImageKit = ({
  src,
  width,
  height,
  alt,
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) => {
  return (
    <Image
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT} // New prop
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default ImageKit;
