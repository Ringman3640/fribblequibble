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
    hideInput?: boolean,
    name?: string,
    disabled?: boolean,
}

export function FormTextBox({value, setValue, length, hideInput, name, disabled}: FormTextBoxProps) {
    const targetLength = length || 'short';

    return (
        <TextBox
            className={targetLength}
            type={hideInput ? 'password' : 'text'}
            value={value}
            onChange={event => setValue(event.target.value)}
            name={name}
            disabled={disabled}/>
    );
}