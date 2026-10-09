export function Video({ video, poster, onError, onCanPlay, className }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      suppressHydrationWarning
      onError={onError}
      onCanPlay={onCanPlay}
      className={className}
    >
      <source src={video} type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  );
}
