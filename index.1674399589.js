import{j as v,R as b,a as j,b as z,c as h,r as _,d as g,e as I,f as P,g as R}from"./vendor.1674399589.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function c(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=c(e);fetch(e.href,n)}})();const $=v.Fragment,t=v.jsx,o=v.jsxs,C=b({key:"productList",default:{error:null,result:[]}}),F=j({key:"productListValue",get:({get:a})=>a(C)}),N=b({key:"cartItems",default:{}}),E=b({key:"customerName",default:""}),A=b({key:"customerAmount",default:0});j({key:"cartValue",get:({get:a})=>a(N)});const V=({value:a,onChange:s})=>o("div",{className:"flex space-x-2 items-center ml-auto",children:[t("div",{className:"border py-1 px-2 leading-3 cursor-pointer border-gray-500",onClick:()=>s(a-1),style:{},children:"-"}),t("div",{children:a}),t("div",{className:"border py-1 px-2 leading-3 cursor-pointer border-gray-500",onClick:()=>s(a+1),children:"+"})]}),T=()=>{var r;const a=z(F),[s,c]=h(N);return o($,{children:[o("h2",{className:"mb-5 flex",children:[t("span",{className:"text-2xl",children:"Cart"}),o("span",{className:"ml-auto",children:[Object.keys(s).length," items"]})]}),t("ul",{className:"flex flex-col space-y-2",children:(r=a.result)==null?void 0:r.map(e=>s[`${e.type+"__"+e.size+"__"+e.id}`]?o("li",{className:"flex justify-between border items-center border-gray-100 py-2 px-3",children:[t("div",{className:"mr-4",children:e.type}),o("div",{className:"mr-auto tracking-[2px]",children:["[",e.size,"]"]}),t(V,{value:s[`${e.type+"__"+e.size+"__"+e.id}`]||0,onChange:n=>{c({...s,[e.type+"__"+e.size+"__"+e.id]:n})}}),o("div",{className:"ml-10",children:["$ ",e.price*(s[`${e.type+"__"+e.size+"__"+e.id}`]||0)]})]},`cart-item-${e.type}`):t(_.Fragment,{},`cart-item-${e.type}`))})]})},M=()=>{const[a,s]=h(C),{result:c}=a,[r,e]=h(N),[n,u]=h(E),[p,x]=h(A),m=(c||[]).reduce((d,i)=>r[`${i.type+"__"+i.size+"__"+i.id}`]?d+r[`${i.type+"__"+i.size+"__"+i.id}`]*i.price:d,0),k=async d=>{var i;if(d.preventDefault(),p<m)alert("Insufficient amount!");else{const y={};for(const l in r){const f=(await g.get(`http://localhost:4000/stock/${l.split("__")[2]}`)).data;f.count===0?y[l]="Out of stock":f.count<r[l]&&(y[l]="Stock not sufficient!")}if(Object.values(y).filter(l=>!!l).length>0)alert(Object.keys(y).reduce((l,f)=>l+`
Item ${f.split("__")[0]}: ${y[f]}`,""));else{const l=p-m;if(await g.post("http://localhost:4000/orders",{name:n,products:r,amount:p,total:m,change:l}))for(const w in r){const S=w.split("__")[2];await g.patch(`http://localhost:4000/stock/${S}`,{count:(((i=c==null?void 0:c.find(O=>O.id===parseInt(S)))==null?void 0:i.count)||0)-r[w]})}const L=await g.get("http://localhost:4000/stock");s({error:null,result:L.data}),e({}),alert(`Checkout done. ${l>0?`please provide customer change amount ${l}`:""}`)}}};return Object.keys(r).length>0?o($,{children:[o("h2",{className:"flex justify-between mt-3 mb-4",children:[t("span",{className:"text-xl",children:"Total"}),o("span",{children:["$",m]})]}),o("form",{onSubmit:k,className:"flex flex-col space-y-4",children:[t("input",{type:"text",onChange:d=>u(d.target.value),defaultValue:n,className:"border border-grey-400 py-2 px-4",placeholder:"Your name"}),t("input",{type:"number",min:0,defaultValue:0,onChange:d=>{d.target.value&&x(parseFloat(d.target.value))},className:"border border-grey-400 py-2 px-4",placeholder:"Your payment"}),t("button",{...(n.length===0||p===0)&&{disabled:!0},type:"submit",className:"py-3 px-4 text-center bg-indigo-500 hover:bg-indigo-800 text-white transition-all ease-linear rounded",children:"Checkout"})]})]}):t(_.Fragment,{})},Y=({item:a})=>{const{id:s,type:c,price:r,count:e,size:n}=a,[u,p]=_.useState(1),[x,m]=h(N);return o("li",{className:"p-3 m-2 border-indigo-400 border basis-1/2",children:["Type: ",c," ",t("br",{}),"Price: ",r," ",t("br",{}),"Size: ",n," ",t("br",{}),e<=0&&t("span",{children:"Out of stock"})," ",t("br",{}),o("div",{className:"flex",children:[t("input",{type:"number",min:0,max:a.count,defaultValue:u,onChange:k=>p(parseInt(k.target.value)),className:"border border-grey-500 py-2 px-3 w-1/2"}),t("button",{onClick:()=>{e===0?alert("Product out of stock"):(m({...x,[c+"__"+n+"__"+s]:u+(x[`${c}`]||0)}),p(1))},className:"py-2 px-3 w-1/2 text-center bg-indigo-600 text-white hover:bg-indigo-900 rounded-tr rounded-br transition-all ease-linear",children:"Add to cart"})]})]})};function q(){var c;const[a,s]=h(C);return _.useEffect(()=>{(async()=>{try{const r=await g.get("http://localhost:4000/stock");s({error:null,result:r.data})}catch(r){s({error:(r==null?void 0:r.message)||"Something went wrong!",result:null})}})()},[]),a.error?o("div",{className:"p-5 w-full h-screen",children:[t("h1",{className:"text-2xl mb-3",children:"Error!"}),t("p",{children:a.error||"List error"})]}):o($,{children:[t("h1",{className:"text-center p-4 bg-gray-200",children:"Fish Stock"}),o("div",{className:"flex space-x-4 p-4",children:[o("div",{className:"basis-1/2",children:[t("h2",{className:"text-2xl mb-5",children:"Products"}),t("ul",{className:"flex -m-2",children:(c=a.result)==null?void 0:c.map((r,e)=>t(Y,{item:r},`stock-item-${e}-id-${r.id}`))})]}),o("div",{className:"flex flex-col basis-1/2",children:[t(T,{}),t(M,{})]})]})]})}I.createRoot(document.getElementById("root")).render(t(P.StrictMode,{children:t(R,{children:t(q,{})})}));
