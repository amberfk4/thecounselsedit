type ImageLoaderInput = {
  src: string;
  width: number;
};

export default function imageLoader({ src, width }: ImageLoaderInput) {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}w=${width}&fit=max&fm=webp&q=80`;
  }
  return src.replace(/\.webp$/, `-${width}.webp`);
}
