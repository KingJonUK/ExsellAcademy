import type { CSSProperties, ImgHTMLAttributes } from "react";

type StaticImage = { src: string; height?: number; width?: number };

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | StaticImage;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  unoptimized?: boolean;
  placeholder?: string;
  blurDataURL?: string;
};

/** Drop-in replacement for `next/image` that renders a plain `<img>`. */
export default function Image({
  src,
  alt = "",
  width,
  height,
  fill,
  priority,
  quality: _quality,
  sizes: _sizes,
  unoptimized: _unoptimized,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  loading,
  style,
  ...rest
}: NextImageProps) {
  const resolved = typeof src === "string" ? src : src?.src;
  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }
    : undefined;

  return (
    <img
      src={resolved}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : loading ?? "lazy"}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  );
}
