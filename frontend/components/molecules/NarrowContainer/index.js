const NarrowContainer = (props) => {
  return <div className="section narrow-container-section">
    <div className="container narrow-container">
      {props.children}
    </div>
  </div>
}

export default NarrowContainer