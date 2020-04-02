import React, { Component } from 'react'

export default class domainCom extends Component {
  render() {
    const { arr, onItemClick } = this.props;
    return (
      <div className="items">
          { arr.map((item, index) => {
            return <div className={item.current ? "current item" : "item"} key={ index } onClick={ e => onItemClick(item, index) }>{ item.domain }</div>
          }) }
      </div>
    )
  }
}
