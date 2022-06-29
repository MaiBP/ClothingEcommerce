import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) =>{
    return (
        <div className='group'> 
        <input className='form-input'
            {...otherProps}/>
            {label && (
                //(style)if the value is 0 shrink, if not leave it empty. 
                <label 
                className={`${otherProps.value.length ? 'shrink' : ''} 
                form-input-label`}
                >
                {label}
                </label> 
            )}
            
    </div>
    ) 
}
export default FormInput;