import{a as f,k as p,o as a,j as i,u as h,r as c}from"./entry.7658ede4.js";function d(t){let o,n=t[0],e=1;for(;e<t.length;){const s=t[e],l=t[e+1];if(e+=2,(s==="optionalAccess"||s==="optionalCall")&&n==null)return;s==="access"||s==="optionalAccess"?(o=n,n=l(n)):(s==="call"||s==="optionalCall")&&(n=l((...u)=>n.call(o,...u)),o=void 0)}return n}const _=["id"],m=["href"],r=3,A=f({__name:"ProseH3",props:{id:{}},setup(t){const{anchorLinks:o}=p().public.content,n=d([o,"optionalAccess",e=>e.depth])>=r&&!d([o,"optionalAccess",e=>e.exclude,"access",e=>e.includes,"call",e=>e(r)]);return(e,s)=>(a(),i("h3",{id:e.id},[e.id&&h(n)?(a(),i("a",{key:0,href:`#${e.id}`},[c(e.$slots,"default")],8,m)):c(e.$slots,"default",{key:1})],8,_))}});export{A as default};
