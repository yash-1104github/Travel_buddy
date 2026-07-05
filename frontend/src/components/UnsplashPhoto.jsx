import { useEffect, useRef } from "react";
import { trackPhotoDownload, withUnsplashUtm } from "@/service/GlobalAPI";

export function UnsplashCredit({ credit, className = "" }) {
  if (!credit) return null;

  return (
    <p className={`text-[10px] text-white/90 ${className}`}>
      Photo by{" "}
      <a
        href={withUnsplashUtm(credit.photographerUrl)}
        target="_blank"
        rel="noreferrer"
        className="underline"
        onClick={(e) => e.stopPropagation()}
      >
        {credit.photographer}
      </a>{" "}
      on{" "}
      <a
        href={withUnsplashUtm("https://unsplash.com/")}
        target="_blank"
        rel="noreferrer"
        className="underline"
        onClick={(e) => e.stopPropagation()}
      >
        Unsplash
      </a>
    </p>
  );
}

export function UnsplashPhoto({
  credit,
  src,
  alt,
  className,
  creditClassName = "absolute bottom-1 left-1 right-1 truncate",
  onClickStopPropagation = false,
}) {
  const trackedRef = useRef(false);

  useEffect(() => {
    trackedRef.current = false;
  }, [credit?.downloadLocation]);

  const handleLoad = () => {
    if (!credit?.downloadLocation || trackedRef.current) return;

    trackedRef.current = true;
    trackPhotoDownload(credit.downloadLocation).catch(() => {});
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onClick={onClickStopPropagation ? (e) => e.stopPropagation() : undefined}
      />
      <UnsplashCredit credit={credit} className={creditClassName} />
    </div>
  );
}
