/*
 *                      myCalendar Object
 *                      January 15, 2014
 *                          Howard Xu
 *
 *  The myClock object provides a simple API to draw a live clock in canvas
 *  and/or display updated time on label
 *
 */

function myClock(id) {    
    this.config = function(r) {
        this.r = r
        this.rh = Math.floor((this.r+3)/8*5);
        this.rm = Math.floor((this.r+3)/8*6);
        this.rs = Math.floor((this.r+3)/8*7);     
    }
    this.setClock = function(x, y, r) {
        if (x != undefined) this.cx = x
        if (y != undefined) this.cy = y
        if (r != undefined) this.config(r)
        this.getConvas(this.cvs)
        this.drawFace(this.tctx, this.cx,this.cy,this.r) 
    }
    this.setTime = function(h,m,s) {
        if (h == undefined || m == undefined || s == undefined) {
            var today=new Date();
            this.h=today.getHours();
            this.m=today.getMinutes();
            this.s=today.getSeconds(); 
        }
        else {
            this.h = h;
            this.m = m;
            this.s = s;
        }
    }    
    this.getPoint = function(r, d) {
        var a = (d + 90) * (Math.PI / 180);
        var py = Math.floor(r* Math.sin(a))
        var px = Math.floor(r* Math.cos(a))
        return {x:px, y:py}
    }    
    this.getConvas = function(cvs) {
        this.tcvs = document.createElement('canvas');
        this.tcvs.width = cvs.width
        this.tcvs.height = cvs.height
        this.tcvs.style.display = 'none'
        document.body.appendChild(this.tcvs);
        this.tctx = this.tcvs.getContext("2d")
    }
    this.drawFace = function(tctx, x,y,r) {
        tctx.beginPath();
        tctx.lineWidth=1
        tctx.arc(x,y,r+3,0,2*Math.PI);
        var my_gradient=tctx.createRadialGradient(15,220,195,175,270,200)
        my_gradient.addColorStop(0,'white');
        my_gradient.addColorStop(0.6,"#dfefff")
        my_gradient.addColorStop(1,"#fcfcfc");
        tctx.fillStyle=my_gradient;
        tctx.fill()
        tctx.strokeStyle="#345678";
        tctx.arc(x,y,r,0,2*Math.PI);

        var pos
        for (var i = 0; i < 60; i++) {
            if (i % 5) 
                pos = this.getPoint(r-3, i*6)
            else
                pos = this.getPoint(r-2, i*6)
            tctx.moveTo(x-pos.x, y-pos.y)
            if (i % 5)
                pos = this.getPoint(r-6, i*6)
            else
                pos = this.getPoint(r-9, i*6)
                tctx.lineTo(x-pos.x, y-pos.y)
        }
        tctx.stroke(); 
    }  
    this.drawSec = function (ctx, x,y,r,s) {
        ctx.beginPath();
        ctx.lineWidth=1
        ctx.strokeStyle="#FF0000";
        var pos = this.getPoint(Math.floor(r/5), s*6+180)
        ctx.moveTo(x-pos.x,y-pos.y);
        pos = this.getPoint(r, s*6)      
        ctx.lineTo(x-pos.x,y-pos.y);
        ctx.stroke();    
    }    
    this.drawMin = function (ctx, x,y,r,m) {
        ctx.beginPath();
        ctx.lineWidth=2
        ctx.strokeStyle="#0000FF";
        ctx.moveTo(x,y)
        var pos = this.getPoint(r, m*6)
        ctx.lineTo(x-pos.x, y-pos.y);
        ctx.stroke()
    }
    this.drawHour = function (ctx, x,y,r,h,m) {
        ctx.beginPath();
        ctx.lineWidth=3
        ctx.strokeStyle="#00FF00";
        var pos = this.getPoint(r, h*30 + m/2)
        ctx.moveTo(x,y);
        ctx.lineTo(x-pos.x, y-pos.y);
        ctx.stroke()
    }
    this.drawTime = function(ctx, x,y,h,m,s) {
        ctx.font="12px Arial";
        var str= ((h>12)?h%12:h) + ':' + ((m>9)?m:('0' + m)) + ':' + ((s>9)?s:('0' + s)) + ' ' + ((h>11)?'PM':'AM') 
        var px = x - Math.floor(ctx.measureText(str).width/2)
        ctx.fillText(str,px,y*2+20);
    }
    this.drawAll = function () 
    {  
        this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height)  
        this.ctx.drawImage(this.tcvs, 0, 0)
        this.drawHour(this.ctx,this.cx,this.cy,this.rh,this.h, this.m) 
        this.drawMin(this.ctx,this.cx,this.cy,this.rm, this.m)
        this.drawSec(this.ctx,this.cx,this.cy,this.rs, this.s)
        this.drawTime(this.ctx,this.cx,this.cy,this.h,this.m,this.s)
    }
    try {
        this.cvs = document.getElementById(id);
        this.ctx=this.cvs.getContext("2d");
        this.cx = Math.floor(this.cvs.width / 2)
        this.cy = Math.floor(this.cvs.height / 2)
        this.config(Math.min(this.cx, this.cy) - 3)
        if (this.cy > this.cx) this.cy = this.cx
        this.setClock()
        this.setTime()
    }
    catch(err) {
        alert(err.message)
    }    
}
