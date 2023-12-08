import { baseTextInputRegion } from "..";
import { styled, CSSProp } from "styled-components";

const TextArea = styled.textarea<{$customStyle: CSSProp}>`
    ${baseTextInputRegion};
    resize: none;
    width: min(300px, 100%);

    &.short {
        width: min(var(--short-width), 100%);
    }

    &.medium {
        width: min(var(--medium-width), 100%);
    }

    &.maximum {
        width: 100%;
    }

    ${props => props.$customStyle};
`;

interface FormTextAreaProps {
    value: string,
    setValue: (nextValue: string) => void,
    length?: 'short' | 'medium' | 'maximum',
    height?: 'short' | 'medium' | 'large',
    maxChars?: number,
    name?: string,
    disabled?: boolean,
    customCss?: CSSProp
}

export function FormTextArea({value, setValue, length, height, maxChars, name, disabled, customCss}: FormTextAreaProps) {
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        if (maxChars && event.target.value.length > maxChars) {
            setValue(event.target.value.substring(0, maxChars));
        }
        else {
            setValue(event.target.value);
        }
    }

    const lengthName = length || 'short';
    let rowCount;
    switch (height) {
        default:
        case 'short':
            rowCount = 3;
            break;
        case 'medium':
            rowCount = 6;
            break;
        case 'large':
            rowCount = 12;
            break;
    }

    return (
        <TextArea
            className={lengthName}
            value={value}
            onChange={handleChange}
            name={name}
            disabled={disabled}
            rows={rowCount}
            $customStyle={customCss}
        />
    );
}