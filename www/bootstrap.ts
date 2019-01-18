import { BaseComponent } from "./core/BaseComponent";
import { EVENT_ATTRS, VNODE_ID } from "./core/attribute";
import { VNode } from "./core/VNode";
import { GetJSModule } from "./dynamic-require";

/**@import "./assets/css/common.scss" */
declare let $noreact_roots:{name:string,data:any}[];
if($noreact_roots){
    let promises:Promise<any>[]=[];
    $noreact_roots.forEach(root=>{
        let promise=GetJSModule(root.name);
        if(promise){
            promise.then(module=>{
                let component:BaseComponent<any>=new module(root.data);
                let tree=component.GetVNode();
                RestoreVNode(tree,null);
                tree.Rendered();
            });
            promises.push(promise);
        }
    });
}

// let ws=new WebSocket("ws://localhost:8002/noreact-tool");
// ws.onmessage=msg=>{
//     if(msg.data=="refresh"){
//         window.location.reload();
//     }
// };

function RestoreVNode(vnode:VNode,elem:HTMLElement){
    let nodeId=vnode.GetAttr(VNODE_ID);
    let selector=`[${VNODE_ID}='${nodeId}']`;

    let dom=(elem || document).querySelector(selector) as HTMLElement;
    if(dom){
        vnode.AttachDom(dom);
        for(let attrname in EVENT_ATTRS){
            let value=vnode.GetAttr(attrname);
            if(value)
                EVENT_ATTRS[attrname](dom,value);
        }
        vnode.GetChildren().forEach(child=>{
            RestoreVNode(child,dom);
        });
    }
}


