class Node {

  constructor({tag, props , children, value}){
    this.tag = tag ;
    this.props = props ;
    if(value) this.value=value;
    if(children){
      this.children =this.createVirtualDom(children);
    }
  }

  createVirtualDom(children){
    let vnode_children = children.map(child =>{
      var  vnode_child = new Node(child);
      return vnode_child;
    })
    return vnode_children;
  }
  /**
   * [render 生成真实dom]  把 插值 替换成真实数据
   * @return {[Node]} [返回当前生成的真实dom节点]
   */
  render(){
    if(!document){throw new Error("document is undefined")}
    else{
      // 先创建一个最外层的父元素
      let fatherEle = document.createElement(this.tag);
      if(this.props){
        Object.keys(this.props).forEach((key)=>{
          fatherEle.setAttribute(key,this.props[key]);
        })
      }
      return this.appendChildNode(fatherEle , this.children);
    }
  }
/**
 * [appendChildNode 插入子元素 并返回父元素]
 * @param  {[type]} el       [父元素]
 * @param  {[type]} children [子元素数组]
 * @return {[type]}el          [父元素]
 */
  appendChildNode(el,children){
    children.forEach(child =>{
      let  childEl = null;
        // 文字节点
        if(child.tag==="string"){
            childEl = document.createTextNode(child.value);
        }else{
          // dom 节点
          childEl = document.createElement(child.tag);
          // 设置 dom元素 的属性
          Object.keys(child.props).forEach((key)=>{
            childEl.setAttribute(key,child.props[key]);
          })
          // 插入子元素
          if(child.children instanceof Array && child.children.length > 0){
            childEl = this.appendChildNode(childEl,child.children);
          }
        }
        el.appendChild(childEl);
    })
    return el;
  }

}

export default Node ;
