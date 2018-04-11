import Node from './vdom/node.js'
import {diff} from './vdom/diff'
import {observe} from './observe/observe.js';
import {dom2Vdom , replaceData} from './vdom/dom2vdom';

class Reactivity{
  constructor(el,data){
    this.el = el ;
    this._data = data;
    this.srcData = JSON.parse(JSON.stringify(data));
    this.templateDom = el;
    this.proxy(data);
    observe(this._data,(key,val)=>{
      this.srcData[key] = val;
      this.preVdom = this.appVdom; //  保存上一次的vdom
      this.updatePage(); // patch 表示变化的数据
    })
    this.render(); // 初始化页面
  }

  render(){
    // 从app的第一个非text的 dom子元素 开始
    var  appChild = Array.from(this.el.childNodes).filter((val)=>{
      return val.nodeName!=='#text';
    })[0];


    var appJson = dom2Vdom(appChild, this.srcData);
    this.templateJson = JSON.parse(JSON.stringify(appJson)); // 先保存最初的模板格式
    var appVdom = new Node(this.replaceKey(appJson,this.srcData));
    this.appVdom  = appVdom;

    // 得到 所有 vdom 之后 ，清除 appChild
    this.el.innerHTML="";
    // 初始渲染页面
    diff(this.el , appVdom );
  }

  proxy(data){
    const that = this ;
    Object.keys(data).forEach((key)=>{
      Object.defineProperty(that , key ,{
          configurable: true,
          enumerable: true,
          get: function proxyGetter () {
              return that._data[key];
          },
          set: function proxySetter (val) {
              that._data[key] = val;
          }
      })
    })
  }

  // 修改数据 setter 触发页面变化
  updatePage(){
    // 重新结算 vdom 在用diff 更新 页面
    var appVdom = new Node(this.replaceKey(this.templateJson, this.srcData));
    this.appVdom  = appVdom;
    diff(this.el , appVdom , this.preVdom);
  }

  replaceKey (json,data){
    if(json.tag==="string"){
      json.value = replaceData(json.value,data);
      return json;
    }else{
      // 是 dom 节点 可能有children
      if(json.children && json.children.length>0){
        json.children = json.children.map(child=>{
          return  this.replaceKey(child,data);
        })
      }
    }
    return json
  }

}
