import React, { Component } from 'react'
import Domain from './component/domainCom'
import _ from 'lodash';
import "./App.css"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{id: 1, domain: "一级域1", children: [{id: 11, domain: "二级域11", children: [{id: 111, domain: "三级域111"}]}, {id: 12, domain: "二级域12", children: [{id: 112, domain: "三级域112", children: [{id: 1111, domain: "四级域1111"}]}]}]},
                   {id: 2, domain: "一级域2", children: [{id: 21, domain: "二级域21", children: [{id: 211, domain: "三级域211"}]}, {id: 22, domain: "二级域22", children: [{id: 212, domain: "三级域212"}]}]},
                   {id: 3, domain: "一级域3", children: [{id: 31, domain: "二级域31", children: [{id: 311, domain: "三级域311"}]}, {id: 32, domain: "二级域32", children: [{id: 312, domain: "三级域312"}]}]},
                   {id: 4, domain: "一级域4", children: [{id: 41, domain: "二级域41", children: [{id: 411, domain: "三级域411"}]}, {id: 42, domain: "二级域42", children: [{id: 412, domain: "三级域412"}]}]},
                   {id: 5, domain: "一级域5", children: [{id: 51, domain: "二级域51", children: [{id: 511, domain: "三级域511"}]}, {id: 52, domain: "二级域52", children: [{id: 512, domain: "三级域512"}]}]}],
      data: [],
      selectItems: [],
      isShow: false
    }
    this.onItemClick = this.onItemClick.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
    this.onInit = this.onInit.bind(this);
    // this.getDomainById = this.getDomainById.bind(this);
    // this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.onInit();
  }

  onInit() {
    // let datax = [...this.state.dataSource];
    let datax = _.cloneDeep(this.state.dataSource)
    this.setState({
      data: [datax],
      selectItems: []
    })
  }

  onStartClick() {
    const isShow = this.state.isShow;
    this.setState({
      isShow: !isShow
    })
  }

  onItemClick(value, index, num) {
    //num 层级
    //index 第几
    //value 当前点击的对象
    console.log(value, index, num)
    if(value.children) {
      const { data, selectItems } = this.state;
      const child = value.children;
      data.forEach((items, i) => {
        if(i > num) {
          this.markCurrent(items)
        }
      })
      data.splice(num + 1)
      selectItems.splice(num);
      data[num + 1] = child;
      this.markCurrent(data[num], index)
      selectItems[num] = value.domain
      this.setState({
        data,
        selectItems
      })
    }else{
      const data = this.state.data
      this.markCurrent(data[num], index)
      this.setState({data})
    }
  }

  markCurrent(arr, index) { //标记current
    if(index === null) {
      arr.forEach((item) => {
        item.current = false;
      })
      return;
    }
    arr.forEach((item, i) => {
      if(i === index) {
        item.current = true
        return
      }
      item.current = false
    })
  }
  

  render() {
    const { data, isShow, selectItems } = this.state;
    
    return (
      <div>
        <div className="domain">
          <div className="select">
            <input type="text" className="input" placeholder="请选择域"/>
            <button className="btn" onClick={ this.onStartClick }>选择</button>
          </div>
          { isShow ? <div className="menu">
            <div className="all" onClick={ this.onInit }>全部</div>
            { data.map((item, num) => {
              return (
                <div key={num} className="domainArr">
                  <Domain  arr={ item } selectItem = {selectItems} onItemClick={ (value, index) => this.onItemClick(value, index, num) } />
                  {selectItems[num] ? <div  className="selectItem">{ selectItems[num] }</div> : null }
                </div>
              )
            }) }
          </div>: null }
        </div>
      </div>
    )
  }
}
