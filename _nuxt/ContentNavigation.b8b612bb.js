import{u as d}from"./asyncData.e8eee91c.js";import{f as l,y as f,z as p,Z as v,_ as m,A as g,s as _,$ as h,x as s}from"./entry.ef884d31.js";import{_ as y}from"./nuxt-link.a77b71d8.js";const N=l({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(u){const{query:t}=f(u),n=p(()=>{var a;return typeof((a=t.value)==null?void 0:a.params)=="function"?t.value.params():t.value});if(!n.value&&v("dd-navigation").value){const{navigation:a}=m();return{navigation:a}}const{data:o}=await d(`content-navigation-${g(n.value)}`,()=>h(n.value));return{navigation:o}},render(u){const t=_(),{navigation:n}=u,o=e=>s(y,{to:e._path},()=>e.title),a=(e,i)=>s("ul",i?{"data-level":i}:null,e.map(r=>r.children?s("li",null,[o(r),a(r.children,i+1)]):s("li",null,o(r)))),c=e=>a(e,0);return t!=null&&t.default?t.default({navigation:n,...this.$attrs}):c(n)}});export{N as default};
