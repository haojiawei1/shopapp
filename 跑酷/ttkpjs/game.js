/**
 * Created by 郝 on 2016/11/22.
 */
window.onload= function(){
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    var start=document.getElementsByClassName("start")[0];
    var mask=document.getElementsByClassName("mask")[0];
    var btn=document.getElementsByClassName("btn")[0];
    var fenshu=document.querySelector(".score");
    var xueliang=document.querySelector(".xueliang");
    var yin1=document.getElementsByClassName("yin1")[0];
    var yin2=document.getElementsByClassName("yin2")[0];
    var yin3=document.getElementsByClassName("yin3")[0];
    var yin4=document.getElementsByClassName("yin4")[0];
    canvas.width=cw;
    canvas.height=ch;
    var runs=document.querySelectorAll(".run");
    var jumps=document.querySelectorAll(".jump");
    var hinder=document.querySelectorAll(".hinder");
    var gameobj=new game(canvas,cobj,runs,jumps,hinder,yin1,yin2,yin3,yin4);

    btn.onclick=function(){
        gameobj.play(start,mask,fenshu,xueliang);
    }

}