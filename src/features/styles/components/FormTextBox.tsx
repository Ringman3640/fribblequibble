import styled from "styled-components";
import { baseTextInputRegion } from "..";

export const TextBox = styled.input`
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
`;

interface FormTextBoxProps {
    value: string,
    setValue: (nextValue: string) => void,
    length?: 'short' | 'medium' | 'maximum',
    maxChars?: number,
    hideInput?: boolean,
    name?: string,
    disabled?: boolean,
}

export function FormTextBox({value, setValue, length, maxChars, hideInput, name, disabled}: FormTextBoxProps) {
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
            name={name}
            disabled={disabled}
        />
    );
}