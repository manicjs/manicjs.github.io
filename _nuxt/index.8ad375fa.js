import u from"./ContentRenderer.5f58ae4d.js";import p from"./ContentDoc.653d5865.js";import{a as _,V as c,D as f,s as h,o as A,j as N,W as i,w as g,X as t,Y as a,Z as l,u as n,$ as s}from"./entry.7658ede4.js";import"./ContentRendererMarkdown.137ef0d9.js";import"./index.a6ef77ff.js";import"./ContentQuery.e42af607.js";import"./asyncData.d5efcc98.js";const b={id:"article-timestamp"},w=["datetime","title"],$=t("br",{class:"bigScreen"},null,-1),x=t("span",{class:"mobileScreen"},", ",-1),C=["datetime","title"],H=_({__name:"index",setup(V){const{t:r}=c();return f(),h({title:r("get-started")}),(o,k)=>{const m=u,d=p;return A(),N("main",null,[i(d,{path:"/get-started"},{default:g(({doc:e})=>[t("article",null,[t("header",null,[t("h1",null,a(e.title),1),t("section",b,[t("i",null,[t("b",null,a(o.$t("created")),1)]),l(),t("time",{datetime:e.createdAt,title:e.createdAt},a(n(s)(e.createdAt).fromNow()),9,w),$,x,t("i",null,[t("b",null,a(o.$t("updated")),1)]),l(),t("time",{datetime:e.updatedAt,title:e.updatedAt},a(typeof e.updatedAt=="string"?n(s)(e.updatedAt).fromNow():n(s)(e.updatedAt[e.updatedAt.length-1]).fromNow()),9,C)])]),i(m,{value:e},null,8,["value"])])]),_:1})])}}});export{H as default};
