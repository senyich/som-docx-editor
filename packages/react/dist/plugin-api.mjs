export{a as RenderedDomContextImpl,b as createRenderedDomContext}from'./chunk-TVQ7AS5D.mjs';import {s,r}from'./chunk-MMBXUM5I.mjs';import'./chunk-2KWBRAYR.mjs';import'./chunk-5J3AB6XE.mjs';import'./chunk-QYNJOZEZ.mjs';import'./chunk-QW6IADPL.mjs';import'./chunk-QHW7YVKA.mjs';import'./chunk-2WMY74QP.mjs';import'./chunk-EVIWPLWS.mjs';import'./chunk-2B5PNGQN.mjs';import'./chunk-V6VCMMYR.mjs';import me,{forwardRef,useState,useRef,useMemo,useSyncExternalStore,useEffect,useCallback,useImperativeHandle,cloneElement}from'react';import {TextSelection,PluginKey,Plugin}from'prosemirror-state';import {jsx,jsxs}from'react/jsx-runtime';import {DecorationSet,Decoration}from'prosemirror-view';var O={position:"right",defaultSize:280,minSize:200,maxSize:500,resizable:true,collapsible:true,defaultCollapsed:false},te=r,ne=`
.plugin-host {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
}

.plugin-host-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: visible;
}


.plugin-panels-left,
.plugin-panels-right {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: #f8f9fa;
  border-color: #e9ecef;
}

.plugin-panels-left {
  border-right: 1px solid #e9ecef;
}

.plugin-panels-right {
  border-left: 1px solid #e9ecef;
}

.plugin-panels-bottom {
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
}

.plugin-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease, height 0.2s ease;
}

.plugin-panel.collapsed {
  overflow: visible;
}

.plugin-panel-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
}

.plugin-panel.collapsed .plugin-panel-toggle {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  flex-direction: column;
  height: 100%;
  padding: 8px 6px;
}

.plugin-panel-toggle:hover {
  background: #e9ecef;
  color: #495057;
}

.plugin-panel-toggle-icon {
  font-weight: bold;
  font-size: 14px;
}

.plugin-panel.collapsed .plugin-panel-toggle-icon {
  transform: rotate(90deg);
}

.plugin-panel-toggle-label {
  font-weight: 500;
}

.plugin-panel-content {
  flex: 1;
  overflow: auto;
}

/* Right panel rendered inside viewport - scrolls with content */
.plugin-panel-in-viewport {
  position: absolute;
  top: 0;
  /* Position is set dynamically via inline styles based on page edge */
  width: 220px;
  pointer-events: auto;
  z-index: 10;
  overflow: visible;
}

.plugin-panel-in-viewport.collapsed {
  width: 32px;
}

.plugin-panel-in-viewport .plugin-panel-toggle {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.plugin-panel-in-viewport-content {
  overflow: visible;
  position: relative;
}

/* Plugin overlay container for rendering highlights/decorations */
.plugin-overlays-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 5;
}

.plugin-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

/* Individual overlay children manage their own pointer-events.
   Do NOT set pointer-events: auto here \u2014 it overrides overlay containers
   that need pointer-events: none to let clicks pass through to the editor. */
`,Re=forwardRef(function({plugins:i,children:r,className:s$1=""},c){let[n,f]=useState(null),m=useRef(r.props);m.current=r.props;let[a,u]=useState(null),l=useMemo(()=>new s,[]),b=useSyncExternalStore(l.subscribe,l.getSnapshot),[x,h]=useState(()=>{let o=new Set;for(let e of i)({...O,...e.panelConfig}).defaultCollapsed&&o.add(e.id);return o}),[S]=useState(()=>{let o=new Map;for(let e of i){let d={...O,...e.panelConfig};o.set(e.id,d.defaultSize);}return o});useEffect(()=>{if(!n)return;let o=i.map(e=>({id:e.id,styles:e.styles,initialize:e.initialize,onStateChange:e.onStateChange,destroy:e.destroy}));return l.initialize(o,n),()=>{l.destroy();}},[l,n,i]),useEffect(()=>{let o=i.filter(e=>e.styles).map(e=>te(e.id,e.styles));return ()=>o.forEach(e=>e())},[i]),useEffect(()=>{if(!n?.dom)return;let o=()=>{l.updateStates(n);},e=null,d=()=>{e&&cancelAnimationFrame(e),e=requestAnimationFrame(o);};o();let p=n.dom;p.addEventListener("input",d),p.addEventListener("focus",o),p.addEventListener("click",o);let g=n.dispatch.bind(n);return n.dispatch=P=>{g(P),d();},()=>{p.removeEventListener("input",d),p.removeEventListener("focus",o),p.removeEventListener("click",o),e&&cancelAnimationFrame(e),n.dispatch=g;}},[n,l]),useEffect(()=>te("plugin-host-base",ne),[]);let R=useCallback(o=>{if(!n)return;if(n.coordsAtPos(o)){n.dom.scrollIntoView({block:"center",inline:"nearest"});let{state:d}=n,p=d.doc.resolve(Math.min(o,d.doc.content.size)),g=d.tr.setSelection(TextSelection.near(p));n.dispatch(g),n.focus();}},[n]),T=useCallback((o,e)=>{if(!n)return;let{state:d}=n,p=d.doc.content.size,g=Math.max(0,Math.min(o,p)),P=Math.max(0,Math.min(e,p)),L=d.tr.setSelection(TextSelection.create(d.doc,g,P));n.dispatch(L),n.focus();},[n]),w=useCallback(o=>l.getPluginState(o),[l]),K=useCallback((o,e)=>{l.setPluginState(o,e);},[l]),U=useCallback(()=>{n&&l.updateStates(n);},[n,l]);useImperativeHandle(c,()=>({getPluginState:w,setPluginState:K,getEditorView:()=>n,refreshPluginStates:U}),[w,K,n,U]);let W=useMemo(()=>{let o=[];for(let e of i)e.proseMirrorPlugins&&o.push(...e.proseMirrorPlugins);return o},[i]),_=useCallback(o=>{h(e=>{let d=new Set(e);return d.has(o)?d.delete(o):d.add(o),d});},[]),[V,F]=useState(null);useEffect(()=>{if(!a){F(null);return}let o=()=>{let p=a.pagesContainer,g=p.querySelector(".layout-page");if(!g){F(null);return}let P=a.getContainerOffset(),L=g.getBoundingClientRect(),Y=p.getBoundingClientRect(),G=(L.right-Y.left)/a.zoom,be=P.x+G+5;F(be);};o();let e=()=>{requestAnimationFrame(o);};window.addEventListener("resize",e);let d=new ResizeObserver(()=>{requestAnimationFrame(o);});return d.observe(a.pagesContainer),()=>{window.removeEventListener("resize",e),d.disconnect();}},[a]);let Z=useMemo(()=>{let o=[];if(a){for(let e of i)if(e.renderOverlay){let d=b.states.get(e.id);o.push(jsx("div",{className:"plugin-overlay","data-plugin-id":e.id,children:e.renderOverlay(a,d,n)},`overlay-${e.id}`));}}for(let e of i){if(!e.Panel||(e.panelConfig?.position??"right")!=="right")continue;let p={...O,...e.panelConfig},g=x.has(e.id),P=S.get(e.id)??p.defaultSize,L=e.Panel,Y=b.states.get(e.id),G=V!==null?`${V}px`:"calc(50% + 428px)";o.push(jsxs("div",{className:`plugin-panel-in-viewport ${g?"collapsed":""}`,style:{width:g?"32px":`${P}px`,left:G},"data-plugin-id":e.id,children:[p.collapsible&&jsx("button",{className:"plugin-panel-toggle",onClick:()=>_(e.id),title:g?`Show ${e.name}`:`Hide ${e.name}`,"aria-label":g?`Show ${e.name}`:`Hide ${e.name}`,children:jsx("span",{className:"plugin-panel-toggle-icon",children:g?"\u2039":"\u203A"})}),!g&&a&&jsx("div",{className:"plugin-panel-in-viewport-content",children:jsx(L,{editorView:n,doc:n?.state.doc??null,scrollToPosition:R,selectRange:T,pluginState:Y,panelWidth:P,renderedDomContext:a})})]},`panel-overlay-${e.id}`));}return o.length>0?o:null},[a,i,b.version,n,x,S,R,T,_,V]),j=useMemo(()=>{let o=[];for(let e of i){if(!e.getSidebarItems)continue;let d=b.states.get(e.id),p={editorView:n,renderedDomContext:a,anchorPositions:new Map,zoom:a?.zoom??1},g=e.getSidebarItems(d,p);o.push(...g);}return o},[i,b.version,n,a]),B=useCallback(o=>{u(o);let e=m.current?.onRenderedDomContextReady;typeof e=="function"&&e(o);},[]),ve=useMemo(()=>cloneElement(r,{externalPlugins:W,pluginOverlays:Z,pluginSidebarItems:j,pluginRenderedDomContext:a,onRenderedDomContextReady:B,onEditorViewReady:o=>{f(o);let e=m.current?.onEditorViewReady;typeof e=="function"&&e(o);}}),[r,W,Z,j,a,B]),k=useMemo(()=>{let o=[],e=[],d=[];for(let p of i){if(!p.Panel)continue;let g=p.panelConfig?.position??"right";g==="left"?o.push(p):g==="bottom"?d.push(p):e.push(p);}return {left:o,right:e,bottom:d}},[i]),J=o=>{if(!o.Panel)return null;let e={...O,...o.panelConfig},d=x.has(o.id),p=S.get(o.id)??e.defaultSize,g=o.Panel,P=b.states.get(o.id);return jsxs("div",{className:`plugin-panel plugin-panel-${e.position} ${d?"collapsed":""}`,style:{[e.position==="bottom"?"height":"width"]:d?"32px":`${p}px`,minWidth:e.position!=="bottom"?d?"32px":`${e.minSize}px`:void 0,maxWidth:e.position!=="bottom"?`${e.maxSize}px`:void 0,minHeight:e.position==="bottom"?d?"32px":`${e.minSize}px`:void 0,maxHeight:e.position==="bottom"?`${e.maxSize}px`:void 0},"data-plugin-id":o.id,children:[e.collapsible&&jsxs("button",{className:"plugin-panel-toggle",onClick:()=>_(o.id),title:d?`Show ${o.name}`:`Hide ${o.name}`,"aria-label":d?`Show ${o.name}`:`Hide ${o.name}`,children:[jsx("span",{className:"plugin-panel-toggle-icon",children:d?"\u203A":"\u2039"}),d&&jsx("span",{className:"plugin-panel-toggle-label",children:o.name})]}),!d&&jsx("div",{className:"plugin-panel-content",children:jsx(g,{editorView:n,doc:n?.state.doc??null,scrollToPosition:R,selectRange:T,pluginState:P,panelWidth:p,renderedDomContext:a??null})})]},o.id)};return jsxs("div",{className:`plugin-host ${s$1}`,children:[k.left.length>0&&jsx("div",{className:"plugin-panels-left",children:k.left.map(J)}),jsxs("div",{className:"plugin-host-editor",children:[ve,k.bottom.length>0&&jsx("div",{className:"plugin-panels-bottom",children:k.bottom.map(J)})]})]})});var oe=/\{([#/^@]?)([a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*)\}/g,v=new PluginKey("template");function He(t,i,r){return `${t}:${i}:${r}`}function ie(t){let i=[];t.descendants((a,u)=>(a.isText&&a.text&&i.push({text:a.text,pos:u}),true));let r="",s=[];for(let a of i){for(let u=0;u<a.text.length;u++)s.push(a.pos+u);r+=a.text;}let c=[],n=[],f=new Map,m;for(oe.lastIndex=0;(m=oe.exec(r))!==null;){let[a,u,l]=m,b=s[m.index],x=s[m.index+a.length-1]+1,h;u==="#"?h="sectionStart":u==="/"?h="sectionEnd":u==="^"?h="invertedStart":u==="@"?h="raw":h="variable";let S=`${h}:${l}`,R=f.get(S)??0;f.set(S,R+1);let T={id:He(h,l,R),type:h,name:l,rawTag:a,from:b,to:x};if(h==="sectionStart"||h==="invertedStart")T.nestedVars=[],n.push(T);else if(h==="sectionEnd"){for(let w=n.length-1;w>=0;w--)if(n[w].name===l){n.splice(w,1);break}}else h==="variable"&&n.length>0&&(n[n.length-1].nestedVars?.push(l),T.insideSection=true);c.push(T);}return c}function Me(t){switch(t){case "sectionStart":case "sectionEnd":return "#3b82f6";case "invertedStart":return "#8b5cf6";case "raw":return "#ef4444";default:return "#f59e0b"}}function q(t,i,r,s){let c=[];for(let n of i){let f=n.id===r,m=n.id===s,a=Me(n.type),u=["docx-template-tag"];f&&u.push("hovered"),m&&u.push("selected"),c.push(Decoration.inline(n.from,n.to,{class:u.join(" "),"data-tag-id":n.id,style:`background-color: ${a}22; border-radius: 2px;`},{noOverlay:true}));}return DecorationSet.create(t,c)}function ze(t,i){if(t.length!==i.length)return  false;for(let r=0;r<t.length;r++)if(t[r].id!==i[r].id)return  false;return  true}function N(){return new Plugin({key:v,state:{init(t,i){let r=ie(i.doc);return {tags:r,decorations:q(i.doc,r)}},apply(t,i,r,s){if(t.docChanged){let n=ie(s.doc),f=ze(i.tags,n);return {tags:n,decorations:f?i.decorations.map(t.mapping,t.doc):q(s.doc,n,i.hoveredId,i.selectedId),hoveredId:i.hoveredId,selectedId:i.selectedId}}let c=t.getMeta(v);if(c){let n=c.hoveredId??i.hoveredId,f=c.selectedId??i.selectedId;return {...i,hoveredId:n,selectedId:f,decorations:q(s.doc,i.tags,n,f)}}return {...i,decorations:i.decorations.map(t.mapping,t.doc)}}},props:{decorations(t){return v.getState(t)?.decorations??DecorationSet.empty},handleClick(t,i){let r=(v.getState(t.state)?.tags??[]).find(s=>i>=s.from&&i<=s.to);return r?(t.dispatch(t.state.tr.setMeta(v,{selectedId:r.id})),true):(v.getState(t.state)?.selectedId&&t.dispatch(t.state.tr.setMeta(v,{selectedId:void 0})),false)},handleDOMEvents:{mouseover(t,i){let r=i.target.closest?.("[data-tag-id]")?.getAttribute("data-tag-id")||void 0,s=v.getState(t.state)?.hoveredId;return r!==s&&t.dispatch(t.state.tr.setMeta(v,{hoveredId:r})),false},mouseout(t,i){return i.relatedTarget?.closest?.("[data-tag-id]")||v.getState(t.state)?.hoveredId&&t.dispatch(t.state.tr.setMeta(v,{hoveredId:void 0})),false}}}})}function ae(t){return v.getState(t)?.tags??[]}function $(t,i){t.dispatch(t.state.tr.setMeta(v,{hoveredId:i}));}function D(t,i){t.dispatch(t.state.tr.setMeta(v,{selectedId:i}));}var A=`
.docx-template-tag {
  cursor: pointer;
  transition: background-color 0.1s;
}

.docx-template-tag:hover,
.docx-template-tag.hovered {
  filter: brightness(0.95);
}

.docx-template-tag.selected {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
`;var Ne={variable:"rgba(245, 158, 11, 0.3)",sectionStart:"rgba(59, 130, 246, 0.3)",sectionEnd:"rgba(59, 130, 246, 0.3)",invertedStart:"rgba(139, 92, 246, 0.3)",raw:"rgba(239, 68, 68, 0.3)"},De={variable:"rgba(245, 158, 11, 0.5)",sectionStart:"rgba(59, 130, 246, 0.5)",sectionEnd:"rgba(59, 130, 246, 0.5)",invertedStart:"rgba(139, 92, 246, 0.5)",raw:"rgba(239, 68, 68, 0.5)"};function de({context:t,tags:i,hoveredId:r,selectedId:s,onHover:c,onSelect:n}){let[f,m]=useState(0),a=useCallback(()=>{let l=t.getContainerOffset(),b=[];for(let x of i){let h=t.getRectsForRange(x.from,x.to);for(let S of h)b.push({tagId:x.id,tagType:x.type,x:S.x+l.x,y:S.y+l.y,width:S.width,height:S.height});}return b},[t,i]),u=useMemo(()=>a(),[a,f]);return useEffect(()=>{let l=()=>{requestAnimationFrame(()=>m(b=>b+1));};return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[]),useEffect(()=>{let l=new ResizeObserver(()=>{requestAnimationFrame(()=>m(b=>b+1));});return l.observe(t.pagesContainer),()=>l.disconnect()},[t.pagesContainer]),u.length===0?null:jsx("div",{className:"template-highlight-overlay",children:u.map((l,b)=>{let x=l.tagId===r,h=l.tagId===s,S=x||h?De[l.tagType]:Ne[l.tagType];return jsx("div",{className:`template-highlight ${x?"hovered":""} ${h?"selected":""}`,style:{position:"absolute",left:l.x,top:l.y,width:l.width,height:l.height,backgroundColor:S,borderRadius:2,cursor:"pointer"},onMouseEnter:()=>c?.(l.tagId),onMouseLeave:()=>c?.(void 0),onClick:()=>n?.(l.tagId)},`${l.tagId}-${b}`)})})}var pe=`
.template-highlight-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: visible;
}

.template-highlight {
  pointer-events: auto;
  transition: background-color 0.1s ease;
}

.template-highlight:hover,
.template-highlight.hovered {
  filter: brightness(0.9);
}

.template-highlight.selected {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.6);
}
`;var Ae={variable:"#f59e0b",sectionStart:"#3b82f6",sectionEnd:"#3b82f6",invertedStart:"#8b5cf6",raw:"#ef4444"};function _e(t){switch(t){case "sectionStart":return "LOOP / IF";case "invertedStart":return "IF NOT";case "raw":return "HTML";default:return ""}}var ge=`
.template-annotation-chip {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  background: white;
  border: 1px solid #e2e8f0;
  border-left: 3px solid #6c757d;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  max-width: 200px;
}

.template-annotation-chip:hover,
.template-annotation-chip.hovered {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.template-annotation-chip.selected {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.template-chip-badge {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.template-chip-dot {
  font-size: 8px;
}

.template-chip-name {
  color: #334155;
  font-weight: 500;
}

.template-chip-nested {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.template-nested-var {
  font-size: 10px;
  color: #64748b;
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 6px;
  border-radius: 3px;
}

.template-nested-var:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #1e40af;
}
`;function ue({tag:t,isHovered:i,measureRef:r,onHover:s,onSelect:c}){let n=_e(t.type),f=Ae[t.type],m=t.type==="sectionStart"||t.type==="invertedStart";return jsxs("div",{ref:r,style:{display:"flex",alignItems:"flex-start"},children:[jsx("div",{style:{width:20,height:1,background:i?"#3b82f6":"#d0d0d0",marginTop:12,marginRight:4,flexShrink:0}}),jsxs("div",{className:`template-annotation-chip ${i?"hovered":""}`,style:{borderLeftColor:f},onMouseEnter:()=>s(t.id),onMouseLeave:()=>s(void 0),onClick:a=>{a.stopPropagation(),c(t.id);},onMouseDown:a=>a.stopPropagation(),title:m?`${t.rawTag}
Iterates over ${t.name}[]. Access nested properties via ${t.name}.property`:t.rawTag,children:[n&&jsx("span",{className:"template-chip-badge",style:{background:f},children:n}),!n&&jsx("span",{className:"template-chip-dot",style:{color:f},children:"\u25CF"}),jsx("span",{className:"template-chip-name",children:t.name}),m&&t.nestedVars&&t.nestedVars.length>0&&jsx("div",{className:"template-chip-nested",children:t.nestedVars.map((a,u)=>jsx("span",{className:"template-nested-var",title:`Access: ${t.name}.${a}`,children:a.includes(".")?a.split(".").pop():a},u))})]})]})}function fe(t,i,r){if(!t)return;D(t,r);let s=i.find(c=>c.id===r);if(s){let c=t.state.tr.setSelection(TextSelection.near(t.state.doc.resolve(s.from)));t.dispatch(c),t.focus();}}function he(t={}){return {id:"template",name:"Template",proseMirrorPlugins:[N()],onStateChange:r=>{let s=v.getState(r.state);if(s)return {tags:s.tags,hoveredId:s.hoveredId,selectedId:s.selectedId}},initialize:r=>({tags:[]}),getSidebarItems:(r,s)=>!r||r.tags.length===0?[]:r.tags.filter(n=>n.type!=="sectionEnd"&&!n.insideSection).map(n=>({id:`template-${n.id}`,anchorPos:n.from,priority:10,estimatedHeight:32,render:f=>me.createElement(ue,{...f,tag:n,isHovered:n.id===r.hoveredId,onHover:m=>{s.editorView&&$(s.editorView,m);},onSelect:m=>fe(s.editorView,r.tags,m)})})),renderOverlay:(r,s,c)=>!s||s.tags.length===0?null:me.createElement(de,{context:r,tags:s.tags,hoveredId:s.hoveredId,selectedId:s.selectedId,onHover:n=>{c&&$(c,n);},onSelect:n=>fe(c,s.tags,n)}),styles:`
${A}
${ge}
${pe}
`}}var Fe=he();export{ne as PLUGIN_HOST_STYLES,Re as PluginHost,A as TEMPLATE_DECORATION_STYLES,he as createTemplatePlugin,N as createTemplateProseMirrorPlugin,ae as getTemplatePluginTags,$ as setHoveredElement,D as setSelectedElement,Fe as templatePlugin,v as templatePluginKey};