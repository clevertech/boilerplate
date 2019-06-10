const NarrowContainer = (props) => {
  return <div className="narrow-container">
    <div className="container">
      {props.children}
    </div>
  </div>
}

export default NarrowContainer