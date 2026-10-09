export function Video({video, poster, className}) {
    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            suppressHydrationWarning
            poster={poster}
            className={className}
        >
            <source src={video} type="video/mp4"/>
            Ваш браузер не поддерживает видео.
        </video>
    )
}