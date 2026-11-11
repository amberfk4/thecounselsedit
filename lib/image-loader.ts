type ImageLoaderInput = {
  src: string;
  width: number;
};

export default function imageLoader({ src, width }: ImageLoaderInput) {
  return src.replace(/\.webp$/, `-${width}.webp`);
}
