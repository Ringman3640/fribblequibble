import { baseTextInputRegion } from "..";
import { styled, CSSProp } from "styled-components";

export const TextBox = styled.input<{$customStyle: CSSProp}>`
    ${baseTextInputRegion};
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

interface FormTextBoxProps {
    value: string,
    setValue: (nextValue: string) => void,
    length?: 'short' | 'medium' | 'maximum',
    maxChars?: number,
    hideInput?: boolean,
    id?: string,
    name?: string,
    disabled?: boolean,
    autocomplete?: boolean,
    customCss?: CSSProp
}

export function FormTextBox({value, setValue, length, maxChars, hideInput, id, name, disabled, autocomplete, customCss}: FormTextBoxProps) {
    const targetLength = length || 'short';

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (maxChars && event.target.value.length > maxChars) {
            setValue(event.target.value.substring(0, maxChars));
        }
        else {
            setValue(event.target.value);
        }
    }

    return (
        <TextBox
            className={targetLength}
            type={hideInput ? 'password' : 'text'}
            value={value}
            onChange={handleChange}
            id={id}
            name={name}
            disabled={disabled}
            autoComplete={autocomplete ? 'on' : 'off'}
            $customStyle={customCss}
        />
    );
}