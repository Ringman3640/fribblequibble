import styled from "styled-components";

export const TextBox = styled.input`
    display: block;
    width: min(300px, 100%);
    padding: var(--medium-text-padding);
    margin-bottom: 30px;
    border: 0px;
    border-radius: var(--medium-border-radius);
    font-size: var(--p-font-size);

    background-color: ${props => props.theme.backgroundColorLight};
    color: ${props => props.theme.primaryColorLight};

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