import Image from "next/image";
import type { Photo } from "@/lib/content";

type SanityImageProps = {
  photo: Photo;
  sizes: string;
  preload?: boolean;
};

export function SanityImage({ photo, sizes, preload }: SanityImageProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      preload={preload}
      sizes={sizes}
      className="object-cover"
      style={{ objectPosition: photo.position }}
    />
  );
}
