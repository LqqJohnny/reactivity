import {observe , defineReactivity} from './observe.js';


class Observer{

  constructor(eleId,data){
    // 不能直接改变data  所以在内部需要一个备份
    this._data = data;
    this.proxy(data);
    observe(this._data,function(val){
      console.log('更新了数据：'+val+",你瞅啥，快去 更新dom呀！");
    })
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
}
