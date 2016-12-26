function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=0;
    this.y=455;
    this.speedx=5;
    this.speedy=5;
    //this.g=3;
    this.status="runs";
    this.state=0;
    this.width=82;
    this.height=118;
    this.num=0;
     this.life1=document.getElementsByClassName("xue")[0];
    this.life=10

}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,800,1180,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
function hinder(canvas,cobj,hinder){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinder=hinder;
    this.state=0;
    this.x=canvas.width;
    this.y=480;
    this.width=500;
    this.height=500;

}
function lizi(cobj){
    this.cobj=cobj;
    this.x=200;
    this.y=200;
    this.r=1+2*Math.random();
    this.color="red";
    this.speedy=6*Math.random()-3;
    this.speedx=6*Math.random()-3;
    this.zhongli=0.3;
    this.speedr=0.1;
}

lizi.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle=this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
}



function xue(cobj,x,y){
    var arr=[];
    for(var i=0;i<30;i++){
        var obj=new lizi(cobj);
        obj.x=x;
        obj.y=y;
        arr.push(obj);
    }

    var t=setInterval(function(){
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
        if(arr.length==0){
            clearInterval(t);
        }
    },50)
}

hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinder[this.state],0,0,564,564,0,0,this.width,this.height);
        this.cobj.restore();
    }
};
//lizi
// function lizi(cobj){
//     this.cobj=cobj;
//     this.x=200;
//     this.y=200;
//     this.r=1+2*Math.random();
//     this.color="red";
//     this.speedy=6*Math.random()-3;
//     this.speedx=6*Math.random()-3;
//     this.zhongli=0.3;
//     this.speedr=0.1;
// }


//子弹设置
    function zidan(canvas, cobj) {
        this.canvas = canvas;
        this.cobj = cobj;
        this.x = 0;
        this.y = 0;
        this.width = 35;
        this.height = 10;
        this.color = "lightgreen";
        this.speedx = 5;
        this.jia = 1;
    }

    zidan.prototype = {
        draw: function () {
            this.cobj.save();
            this.cobj.translate(this.x, this.y);
            this.cobj.fillStyle = this.color;
            this.cobj.fillRect(0, 0, this.width, this.height);
            this.cobj.restore();
        }
    }


    function game(canvas, cobj, runs, jumps, hinder, yin1, yin2, yin3, yin4) {
        this.canvas = canvas;
        this.cobj = cobj;
        this.person = new person(canvas, cobj, runs, jumps);
        this.width = canvas.width;
        this.height = canvas.height;
        this.hinder = hinder;
        this.hinderArr = [];
        this.grade = document.getElementsByClassName("grade")[0];
        this.score = 0;
        this.backx = 0;
        this.speedx = 12;
        this.backspeed = 8;
        this.isfire = false;
        this.zidan = new zidan(canvas, cobj);
        this.yin1 = yin1;
        this.yin2 = yin2;
        this.yin3 = yin3;
        this.yin4 = yin4;
    }

    game.prototype={
        play: function (start, mask, fenshu, xueliang) {
            mask.style.animation = "mask2 2s";
            start.style.animation = "start2 2s";
            start.style.top = "-1000px";
            mask.style.background = "rgba(0,0,0,0)";
            fenshu.style.display = "block";
            xueliang.style.display = "block";
            this.key();
            this.run();
            this.mouse();
        },
        run: function () {

            var that = this;
            that.yin1.play();
            //var top=0;
            var num = 0;
            var rand = (2 + Math.ceil(1 + 3 * Math.random())) * 1000;
            setInterval(function () {
                num += 50;
                that.cobj.clearRect(0, 0, that.width, that.height);
                that.person.num++;   //用来计算显示的图片
                that.person.speedx = 3;
                that.person.backspeed = 3;
                if (that.person.status == "runs") {
                    that.person.state = that.person.num % 8;
                } else {
                    that.person.state = 0;
                }
//让人物的x发生变化 *******************************
                that.person.x += that.person.speedx;
                if (that.person.x > that.width / 3) {
                    that.person.x = that.width / 3;
                }
                //障碍物
                if (num % rand == 0) {
                    rand = (2 + Math.ceil(1 + 3 * Math.random())) * 1000;
                    num = 0;
                    var obj = new hinder(that.canvas, that.cobj, that.hinder);
                    that.hinderArr.push(obj);
                    obj.state = Math.floor(Math.random() * that.hinder.length);
                }
                for (var i = 0; i < that.hinderArr.length; i++) {
                    that.hinderArr[i].x -= that.speedx;
                    that.hinderArr[i].draw();
                    if (hitPix(that.canvas, that.cobj, that.person, that.hinderArr[i])) {

                        //that.yin1.pause()
                        if (!that.hinderArr[i].flag) {
                            that.person.life--;
                            that.yin2.play();
                            xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);

                            that.person.life1.innerHTML = that.person.life

                        }


                        that.hinderArr[i].flag = true;
                        if (that.person.life < 0) {
                            alert("game over");
                            that.yin4.play();
                            //that.yin1.pause();
                            //console.log(1)
//var messare=localStorage.messagrs?JSON.parse(localStorage.messages):[];
//                        var temp={name:that.name,score:that.score};

                            location.reload();
                        }
                        that.yin1.play();
                    }


                    if (that.hinderArr[i].x + that.hinderArr[i].width / 2 < that.person.x) {
                        if (!that.hinderArr[i].flag && !that.hinderArr[i].flag1) {
                            that.score++;
                            that.grade.innerHTML = that.score;
                        }
                        that.hinderArr[i].flag = true;
                    }

                }

                //操作子弹
                if (that.isfire) {
                    if(that.zidan.x>that.width){
                        that.isfire=false;
                    }
                    that.zidan.y = that.person.y + that.person.height / 2;
                    that.zidan.speedx += that.zidan.jia;
                    that.zidan.x += that.zidan.speedx;
                    that.zidan.draw();
                }

                that.backx -= that.backspeed;
                that.canvas.style.backgroundPositionX = that.backx + "px";
                that.person.draw();
            }, 50)
        },
        key: function () {
            var that = this;
            var flag = true;
            document.onkeydown = function (e) {
                if (!flag) {
                    return;
                }
                flag = false;
                if (e.keyCode == 32) {
                    that.yin3.play();
                    //that.yin1.pause();
                    that.person.status = "jumps";
                    var inita = 0;
                    var speeda = 8;
                    var r = 300;
                    var y = that.person.y;
                    var t = setInterval(function () {
                        inita += speeda;
                        if (inita > 190) {
                            clearInterval(t);
                            that.person.y = y;
                            flag = true;
                            that.person.status = "runs";
                            //that.yin1.play()
                        } else {
                            var top = Math.sin(inita * Math.PI / 180) * r;
                            that.person.y = y - top;
                        }
                    }, 50)

                }
            }
        },
        mouse: function () {
            var that = this;
            document.querySelector(".mask").onclick = function () {

                //alert(1);
                if(that.isfire){
                    return false;
                }
                that.isfire = true;
                that.zidan.x = that.person.x + that.person.width / 2;
                that.zidan.y = that.person.y + that.person.height / 2;
                that.zidan.speedx = 5;
            }
        }
}