import{_ as r}from"./_plugin-vue_export-helper.c27b6911.js";import{B as a,j as c,X as e,Y as o,Z as n,W as l,o as m}from"./entry.7658ede4.js";const p={async asyncData({$content:t,params:i}){return{credit:await t("credits","index").fetch()}},head(){return{title:`${this.credit.title}`,meta:[{hid:"description",name:"description",content:this.credit.description}]}}},u={class:"main-article two-thirds column"},_={class:"article-layer"},h={id:"main-title"},f=["title"],$=e("strong",null,"update:",-1),y={id:"main-body"};function N(t,i,s,w,A,B){const d=a("nuxt-content");return m(),c("div",u,[e("div",_,[e("h1",h,[e("p",null,o(t.credit.title),1)]),e("p",{id:"main-date",title:[t.credit.createdAt,t.credit.updatedAt]},[n(o(t.$moment(t.credit.createdAt).fromNow())+", ",1),$,n(" "+o(t.$moment(t.credit.updatedAt).fromNow()),1)],8,f),e("p",y,[l(d,{document:t.credit},null,8,["document"])])])])}const g=r(p,[["render",N]]);export{g as default};
