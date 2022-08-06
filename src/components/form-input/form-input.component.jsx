import { FormInputLabel, Input, Group } from './form-input.styles'

const FormInput = ({ label, ...otherProps }) =>{
    return (
      <Group>
        <Input {...otherProps} />
        {label && (
          //(style)if the value is 0 shrink, if not leave it empty.
          <FormInputLabel
          shrink={otherProps.value.length}>
            {label}
          </FormInputLabel>
        )}
      </Group>
    ); 
}
export default FormInput;