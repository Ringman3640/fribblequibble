// VisibilityTrigger
// 
// Intersection observer component that triggers a callback function when it
// becomes visible to the viewport. 

import { useEffect, useRef, useState } from "react";
import { styled, CSSProp } from "styled-components";

const Trigger = styled.div<{$customStyle?: CSSProp}>`
    min-height: 10px;
    ${props => props.$customStyle}
`;

interface VisibilityTriggerProps {
    callback: (isVisible: boolean) => void,
    children?: React.ReactNode,
    disabled?: boolean,
    customCss?: CSSProp
}

export function VisibilityTrigger({children, callback, disabled, customCss}: VisibilityTriggerProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (triggerRef.current === null) {
            console.error('VisibilityTrigger error: trigger reference was null');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            setIsVisible(entries[0].isIntersecting);
        });
        observer.observe(triggerRef.current);

        return () => {
            observer.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!disabled) {
            callback(isVisible);
        }
    }, [isVisible]);

    return (
        <Trigger ref={triggerRef} $customStyle={customCss}>
            {children}
        </Trigger>
    );
}