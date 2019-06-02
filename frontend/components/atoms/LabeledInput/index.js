const LabeledInput = (props) => {
  return <div className="field labeled-input">
    <label className="label" htmlFor={props.id}>{props.label}</label>
    <div className="control">
      <input type={props.type ? props.type : 'text'}
             className="input"
             id={props.id}
             name={props.name ? props.name : props.id}
             placeholder={props.placeholder ? props.placeholder : ''}
      />
    </div>
    (props.help ? <p className={"help is-danger"}>{props.help}</p> : '')
  </div>
}

export default LabeledInput