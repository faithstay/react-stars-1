import React, { Component } from 'react'

const defaultStyles = {
  cursor: 'pointer'
}

class ReactStars extends Component {

  constructor(props) {

    super(props)

    this.state = {
      value: props.value || 0
    }

    this.state.config = {
      count:  props.starCount || 5,
      size:   props.size || 24,
      char:   props.char || '★',
      edit:   props.edit,
      half:   props.half,
      // default color of inactive star
      color1: props.color1 || 'gray',
      // color of an active star
      color2: props.color2 || '#ffd700',
      // color color of a hovered star
      color3: props.color3 || props.color2 || 'orange'
    }

  }

  componentWillMount() {
    this.state.stars = []
  }

  componentDidMount() {
    this.setState({
      stars: this.getArrayOfStars(this.state.value)
    })
  }

  /** Returns an array of stars with their properties */
  getArrayOfStars(numberActive) {
    let stars = []
    for(let i = 0; i < this.state.config.count; i++) {
      stars.push({
        active: i <= numberActive
      })
    }
    return stars
  }

  mouseOver(event) {
    var dataKey = Number(event.target.getAttribute('data-key'))
    this.setState({
      stars: this.getArrayOfStars(dataKey)
    })
  }

  mouseLeave() {
    this.setState({
      stars: this.getArrayOfStars(this.state.value)
    })
  }

  renderStars() {
    const { color1, color2, size, char } = this.state.config
    return this.state.stars.map((star, i) => {
      // will be merged with default styles later
      const style = Object.assign({
        color: star.active ? color2 : color1,
        fontSize: `${size}px`
      }, defaultStyles)
      return (
        <span style={style}
          key={i}
          data-key={i}
          onMouseOver={this.mouseOver.bind(this)}
          onMouseMove={this.mouseOver.bind(this)}
          onMouseLeave={this.mouseLeave.bind(this)}>
          {char}
        </span>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderStars()}
      </div>
    )
  }

}

export default ReactStars
