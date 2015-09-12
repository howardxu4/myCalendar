/*
 *                      myUtils Object
 *                      January 17, 2014
 *                          Howard Xu
 *
 *  The myUtils singleton object provides common methods of calculation
 *  
 */ 
 
 myUtils = function () {
    return { 
    // 
    //  Calculate the position of element on window document
    //
    findOffset : function(el) {
        for (var lx=0, ly=0, h=el.offsetHeight; el != null;
            lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {x:lx,y:ly};
    },
    
    //          
    //          |   .(px,py)
    //          |           .(x1,y1)
    //          |
    //          | (0,0)
    //  --------o--------------->
    //          |
    //          |  
    //          v
    //
    ptInRect : function(px,py,x1,y1) {
        px= Number(px)
        py= Number(py)
        x1= Number(x1)
        y1= Number(y1)
        if (x1 > 0) { if (px > x1 || px < 0) return 1 }
        else { if (px < x1 || px > 0) return 2 }
        if (y1 > 0) { if (py > y1 || py < 0) return 3 }
        else { if (py < y1 || py > 0) return 4 }
        return 0
    },
    ptOnLine : function(px,py,x1,y1) { 
        if ( this.ptInRect(px,py,x1,y1) == 0 ) {
            var dd =Math.sqrt(x1*x1 + y1*y1) 
            var d = Math.abs(x1*px/dd + y1*py/dd)
            if (d/dd < 1) return true
        }
        return false
    },
    ptInCircle : function(px,py,r) {
        return ((px*px + py*py) < r*r)? true: false
    },
    getDegree : function(x,y,r) {
        if ( this.ptInCircle(x,y,r) && !this.ptInCircle(x,y,3) ) {
             return ((x>=0?90:270) + Math.floor(Math.atan(y/x)*180/Math.PI))
        }
        return false
    },
    
    //
    //  Tooltip popup utiltity
    //  popPos: set up the popup position related to element and showing time  
    //  popHide: hide popup
    //  popShow: show message in popup
    //
    createPop : function() { 
        var div = document.createElement('div');
        div.style.position = 'absolute'
        div.style.zIndex = '6'
        div.style.display = 'none'
        div.style.border = 'solid 1px #9a9a9a'
        div.style.borderRadius = '15px'
        div.style.backgroundColor = '#ffffcc'
        div.style.padding = '10px';
        document.body.appendChild(div);
        this.myPop = div
    },
    popPos: function(id, x, y, t) {
        if (this.myPop == null) this.createPop();
        if (id != undefined) {
            var pos = this.findOffset(id);
            if (x != undefined && y != undefined) {
                pos.x += x; pos.y += y;
                if (t != undefined) this.timeout = t
            }
            this.myPop.style.left = pos.x + 'px';
            this.myPop.style.top = pos.y + 'px';
        }
    },
    popHide : function() {
        if (this.myPop) this.myPop.style.display = 'none'
    },
    popShow : function(msg, id, x, y, t) {
        if (this.timer != null) clearTimeout(this.timer)
        this.popPos(id, x, y, t);
        this.myPop.innerHTML = msg;
        this.myPop.style.display = 'block'
        this.timer = setTimeout("myUtils.popHide()", this.timeout);
    },
    timer : null,
    timeout : 3000,
    myPop : null
    }
}()

