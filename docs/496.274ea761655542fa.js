"use strict";(self.webpackChunkAngularProject=self.webpackChunkAngularProject||[]).push([[496],{2496:(P,d,c)=>{c.r(d),c.d(d,{AuthModule:()=>y});var u=c(4466),l=c(433),r=c(1196),t=c(8256),m=c(9622),p=c(6895);function g(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"main"),t._UZ(1,"div",1),t.TgZ(2,"div",2)(3,"p"),t._uU(4),t.qZA(),t.TgZ(5,"div",3)(6,"button",4),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.onClose())}),t._uU(7,"Close"),t.qZA()()()()}if(2&n){const e=t.oxw();t.xp6(4),t.Oqu(e.message)}}let f=(()=>{class n{onClose(){this.message=null}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-alert"]],inputs:{message:"message"},decls:1,vars:1,consts:[[4,"ngIf"],[1,"backdrop"],[1,"alert-box"],[1,"alert-box-actions"],[1,"btn","btn-primary",3,"click"]],template:function(e,i){1&e&&t.YNc(0,g,8,1,"main",0),2&e&&t.Q6J("ngIf",i.message)},dependencies:[p.O5],styles:[".backdrop[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#dcdcdc;opacity:.75;z-index:1}.alert-box[_ngcontent-%COMP%]{position:fixed;top:50%;left:50%;width:60vw;height:20vh;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center;flex-direction:column;background-color:#d9534f;border-radius:5px;z-index:2}p[_ngcontent-%COMP%]{text-align:center;color:#fff;padding:1rem 0}button[_ngcontent-%COMP%]{padding:.5rem 2rem}"]}),n})(),h=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-loading-spinner"]],decls:6,vars:0,consts:[[1,"overlay"],[1,"lds-ellipsis"]],template:function(e,i){1&e&&(t._UZ(0,"div",0),t.TgZ(1,"div",1),t._UZ(2,"div")(3,"div")(4,"div")(5,"div"),t.qZA())},styles:[".overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#dcdcdc;z-index:4;opacity:.75}.lds-ellipsis[_ngcontent-%COMP%]{display:inline-block;position:fixed;width:80px;height:80px;top:50%;left:50%;transform:translate(-50%,-50%);z-index:5}.lds-ellipsis[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{position:absolute;top:33px;width:18px;height:18px;border-radius:50%;background:#3379b7;animation-timing-function:cubic-bezier(0,1,1,0)}.lds-ellipsis[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1){left:8px;animation:_ngcontent-%COMP%_lds-ellipsis1 .6s infinite}.lds-ellipsis[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){left:8px;animation:_ngcontent-%COMP%_lds-ellipsis2 .6s infinite}.lds-ellipsis[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){left:32px;animation:_ngcontent-%COMP%_lds-ellipsis2 .6s infinite}.lds-ellipsis[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(4){left:56px;animation:_ngcontent-%COMP%_lds-ellipsis3 .6s infinite}@keyframes _ngcontent-%COMP%_lds-ellipsis1{0%{transform:scale(0)}to{transform:scale(1)}}@keyframes _ngcontent-%COMP%_lds-ellipsis3{0%{transform:scale(1)}to{transform:scale(0)}}@keyframes _ngcontent-%COMP%_lds-ellipsis2{0%{transform:translate(0)}to{transform:translate(24px)}}"]}),n})();const _=["authForm"];function C(n,o){if(1&n&&t._UZ(0,"app-alert",6),2&n){const e=t.oxw();t.Q6J("message",e.error)}}function x(n,o){1&n&&(t.TgZ(0,"div",7),t._UZ(1,"app-loading-spinner"),t.qZA())}function M(n,o){1&n&&(t.TgZ(0,"span"),t._uU(1," Please insert a valid email! "),t.qZA())}function v(n,o){1&n&&(t.TgZ(0,"span"),t._uU(1," Insert at least 8 character! "),t.qZA())}function b(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"form",8,9),t.NdJ("ngSubmit",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.onSubmit())}),t.TgZ(2,"div",10)(3,"label",11),t._uU(4,"EMail"),t.qZA(),t._UZ(5,"input",12,13),t.YNc(7,M,2,0,"span",14),t.qZA(),t.TgZ(8,"div",10)(9,"label",15),t._uU(10,"Password"),t.qZA(),t._UZ(11,"input",16,17),t.YNc(13,v,2,0,"span",14),t.qZA(),t.TgZ(14,"div",18)(15,"button",19),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.switchMode())}),t._uU(16),t.qZA(),t.TgZ(17,"button",20),t._uU(18),t.qZA()()()}if(2&n){const e=t.MAs(1),i=t.MAs(6),s=t.MAs(12),a=t.oxw();t.xp6(7),t.Q6J("ngIf",i.invalid&&i.touched),t.xp6(6),t.Q6J("ngIf",s.invalid&&s.touched),t.xp6(3),t.hij(" ",a.isLoginMode?"Switch to signUp":"Switch to login"," "),t.xp6(1),t.Q6J("disabled",e.invalid),t.xp6(1),t.hij(" ",a.isLoginMode?"Login =>":"Sign up =>"," ")}}const A=[{path:"",component:(()=>{class n{constructor(e,i){this.authService=e,this.router=i,this.isLoading=!1,this.error=null,this.isLoginMode=!0}switchMode(){this.isLoginMode=!this.isLoginMode}onSubmit(){const e=this.authForm.value.email,i=this.authForm.value.password;if(this.authForm.invalid)return;let s;this.isLoading=!0,s=this.isLoginMode?this.authService.login(e,i):this.authService.signUp(e,i),s.subscribe(a=>{this.router.navigate(["/recipes"]),scrollTo({top:0,behavior:"smooth"}),this.isLoading=!1},a=>{this.error=a,this.isLoading=!1})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m.e),t.Y36(r.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-auth"]],viewQuery:function(e,i){if(1&e&&t.Gf(_,5),2&e){let s;t.iGM(s=t.CRH())&&(i.authForm=s.first)}},decls:11,vars:3,consts:[[1,"background"],[3,"message",4,"ngIf"],[1,"row"],[1,"welcome"],["class","spinner",4,"ngIf"],["class","col-xs-12 col-sm-8 col-md-6",3,"ngSubmit",4,"ngIf"],[3,"message"],[1,"spinner"],[1,"col-xs-12","col-sm-8","col-md-6",3,"ngSubmit"],["authForm","ngForm"],[1,"form-group"],["for","email"],["type","email","ngModel","","name","email","required","","email","","autofocus","","id","email",1,"form-control"],["email","ngModel"],[4,"ngIf"],["for","password"],["type","password","ngModel","","name","password","required","","minlength","8","id","password",1,"form-control"],["password","ngModel"],[1,"buttons"],["type","button",1,"btn","btn-primary",3,"click"],["type","submit",1,"btn","btn-primary",3,"disabled"]],template:function(e,i){1&e&&(t._UZ(0,"div",0),t.TgZ(1,"section"),t.YNc(2,C,1,1,"app-alert",1),t.TgZ(3,"div",2)(4,"div",3)(5,"h3"),t._uU(6,"Welcome In Recipe Book"),t.qZA(),t.TgZ(7,"h3"),t._uU(8,"Please login or signUp!"),t.qZA()(),t.YNc(9,x,2,0,"div",4),t.YNc(10,b,19,5,"form",5),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("ngIf",i.error),t.xp6(7),t.Q6J("ngIf",i.isLoading),t.xp6(1),t.Q6J("ngIf",!i.isLoading))},dependencies:[l._Y,l.Fj,l.JJ,l.JL,l.Q7,l.wO,l.on,l.On,l.F,f,h,p.O5],styles:[".background[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;width:100vw;height:calc(100vh - 50px);background-image:url(backGround.9d223650d2649c33.jpg);background-repeat:no-repeat;background-size:100% 100%;background-position:center;opacity:.4}section[_ngcontent-%COMP%]{height:calc(100vh - 150px);display:flex;justify-content:center;flex-direction:column;position:relative;z-index:5}.welcome[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}h3[_ngcontent-%COMP%]{color:#337ab7;width:-moz-fit-content;width:fit-content}.row[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;margin:0 16px}.buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:45%}@media (max-width: 350px){.buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:49.5%}}input.ng-touched.ng-invalid[_ngcontent-%COMP%]{border:1px solid red}label[_ngcontent-%COMP%]{color:#337ab7}span[_ngcontent-%COMP%]{color:red}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}"]}),n})()}];let O=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[r.Bz.forChild(A),r.Bz]}),n})(),y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.u5,u.m,O]}),n})()}}]);