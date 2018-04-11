import Node from './node'

export function diff ($parent ,newNode, oldNode, index = 0) {
  if (!oldNode) {         // 不存在旧节点
    $parent.appendChild(newNode.render());
  } else if (!newNode) {   //  不存在新节点
    $parent.removeChild(
      $parent.childNodes[index]
    )
  } else if (isChanged(newNode, oldNode)) {   // 新旧节点 类型不同

    $parent.replaceChild(
      newNode.render(),
      $parent.childNodes[index]
    )
  // 新旧节点类型相同
  } else if (newNode.tag) {
    // 如果 都没有 子节点
    if(!newNode.children && !oldNode.children){
      if(newNode.tag === 'string' && oldNode.tag === "string" && newNode.value !== oldNode.value){
        $parent.innerHTML= newNode.value;
      }

    }else{

      const newLen = Math.max(
        newNode.children.length,
        oldNode.children.length
      )
      for (let i = 0; i < newLen; i++) {
        diff(
          $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        )
      }
    }
    }
}

function isChanged(node1 ,node2){
  return (
    (typeof node1 !== typeof node2) ||
    (typeof node1 === 'string' && node1 !== node2) ||
    (node1.tag !== node2.tag)
  )
}
