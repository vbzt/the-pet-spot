import styles from './input.module.css'

const Input = ({type, text, name, placeholder, handleOnChange, value, multiple}) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}: </label>
      <input 
        type={type} 
        name={name} 
        id={name} 
        placeholder={placeholder} 
        onChange={handleOnChange} 
        value={value}
        accept={type === 'file' ? 'image/png, image/jpeg' : undefined}
        multiple={multiple ? true : undefined}
      />
    </div>
  )
}

export default Input
