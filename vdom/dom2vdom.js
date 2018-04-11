export function dom2Vdom(el,data,REPLACE = false){
  //  如果是 文字元素
  if(!el.localName){
    var json = {
      tag :"string",
      value : el.textContent
    }
    return json;
  }

  var json = {
    tag: el.localName,
    props:getProps(el),
  }
  // 如果有子元素
  if(el.childNodes.length>0){
    var children = Array.from(el.childNodes).map(val=>{
      return dom2Vdom(val,data,REPLACE);
    })
    json.children = children;
  }
  return json;
}



export function getProps(el){
  var props = {};
  if(!el.attributes){return props}
  Array.from(el.attributes).forEach(val=>{
    props[val.name] = val.value;
  })
  return props;
}

export function replaceData(srcText , srcData){
  var keyMatch = srcText.match(/\{[\S\s]+\}/);
  if(keyMatch!=null){
    var srcKey = keyMatch[0].replace(/{|}/g,"").trim();
    srcText =  srcText.replace(new RegExp(keyMatch[0],"g"),srcData[srcKey]);
  }

  return srcText;
}
