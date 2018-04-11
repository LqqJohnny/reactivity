
/**
 * [observe description]
 * @param  {[type]}   value [需要观察的对象]
 * @param  {Function} cb    [观察到值变化后的回调]
 */
export function observe (value , cb){
  Object.keys(value).forEach((key)=>{
      defineReactivity(value,key,value[key] , cb);
  })
}

/**
 * [defineReactivity description]
 * @param  {[type]}   obj   [原对象]
 * @param  {[type]}   key   [键]
 * @param  {[type]}   value [值]
 * @param  {Function} cb    [回调函数]
 */
export function defineReactivity(obj , key ,value ,cb ){
  Object.defineProperty(obj,key,{
    enumerable: true,
    configurable: true,
    get:()=>{
      return value;
    },
    set:(newVal)=>{
      cb(key,newVal);
    }
  })
}
