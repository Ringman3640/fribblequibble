interface LoadingBlobIconProps {
    delaySeconds?: number
}

export function LoadingBlobIcon({delaySeconds}: LoadingBlobIconProps) {
    const beginDelay = delaySeconds || 0;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 32 32">
            <ellipse fill="none" stroke="currentColor" strokeWidth="2" cx="16" cy="16" rx="12" ry="12">
                <animate
                    attributeName="cy"
                    repeatCount="indefinite"
                    values="16;22;16"
                    keyTimes="0;0.5;1"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1;"
                    calcMode="spline"
                    dur="0.6s"
                    begin={`${beginDelay}s`}/>
                <animate
                    attributeName="ry"
                    repeatCount="indefinite"
                    values="12;6;12"
                    keyTimes="0;0.5;1"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1;"
                    calcMode="spline"
                    dur="0.6s"
                    begin={`${beginDelay}s`}/>
            </ellipse>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9,20s4-1 7-1 7 1 7 1">
                <animate
                    attributeName="d"
                    repeatCount="indefinite"
                    values="M9,20s4-1 7-1 7 1 7 1;M 10,25 s4,-0.5 6,-0.5 6 0.5 6 0.5;M9,20s4-1 7-1 7 1 7 1"
                    keyTimes="0;0.5;1"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1;"
                    calcMode="spline"
                    dur="0.6s"
                    begin={`${beginDelay}s`}/>
            </path>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M 11,13 l 0,0">
                <animate
                    attributeName="d"
                    repeatCount="indefinite"
                    values="M 11,13 l 0,0;M 10,21 l 3,1;M 11,13 l 0,0"
                    keyTimes="0;0.5;1"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1;"
                    calcMode="spline"
                    dur="0.6s"
                    begin={`${beginDelay}s`}/>
                <animate
                    attributeName="stroke-width"
                    repeatCount="indefinite"
                    values="4;2;4"
                    keyTimes="0;0.5;1"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1;"
                    calcMode="spline"
                    dur="0.6s"
                    begin={`${beginDelay}s`}/>
            </path>
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M 21,13 l 0,0">
                <animate
                    attributeName="d"
                    repeatCount="indefinite"
                    values="M 21,13 l 0,0;M 22,21 l -3,1;M 21,13 l 0,0"
                    keyTimes="0;0.5;1"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1;"
                    calcMode="spline"
                    dur="0.6s"
                    begin={`${beginDelay}s`}/>
                <animate
                    attributeName="stroke-width"
                    repeatCount="indefinite"
                    values="4;2;4"
                    keyTimes="0;0.5;1"
                    keySplines="0.5 0 0.5 1; 0.5 0 0.5 1;"
                    calcMode="spline"
                    dur="0.6s"
                    begin={`${beginDelay}s`}/>
            </path>
        </svg>
    );
}