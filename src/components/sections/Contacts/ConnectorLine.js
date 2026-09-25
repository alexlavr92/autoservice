export default function ConnectorLine({side, marker, embedded = false, width = 0}) {
    const LEFT = {
        path: embedded
            ? 'M521 0V7.72727C521 13.2501 516.523 17.7273 511 17.7273H11C5.47716 17.7273 1 22.2044 1 27.7273V32.5'
            : 'M506 0V19.3023C506 24.8252 501.523 29.3023 496 29.3023H11C5.47715 29.3023 1 33.7795 1 39.3023V55.5',
        viewBox: embedded ? '0 0 522 40' : '0 0 507 56',
        /** Anchor = right end of path (marker) */
        anchorX: 547 / 548,
        anchorY: embedded ? 5.02055 / 44 : 1.52055 / 38,
    };

    const RIGHT = {
        path: embedded
            ? 'M540 0V13.5C540 19.0228 535.523 23.5 530 23.5H11C5.47717 23.5 1 19.0228 1 13.5V0'
            : 'M1 5.06152V23.5616C1 29.0845 5.47715 33.5616 11 33.5616H560C565.523 33.5616 570 29.0845 570 23.5616V0',
        viewBox: embedded ? '0 0 541 25' : '0 0 571 36',
        /** Anchor = left end of path (marker) */
        anchorX: embedded ? 1 / 609 : 1 / 612,
        anchorY: 0,
    };

    const isLeft = side === 'left';
    const cfg = isLeft ? LEFT : RIGHT;

    return (
        <svg
            className="absolute h-auto text-primary"
            style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                width: `${width}px`,
                transform: `translate(-${cfg.anchorX * 100}%, -${cfg.anchorY * 100}%)`,
            }}
            viewBox={cfg.viewBox}
            preserveAspectRatio={isLeft ? 'xMaxYMin meet' : 'xMinYMin meet'}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path
                d={cfg.path}
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
            />
        </svg>
    );
}