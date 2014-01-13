/*
 *                      myCalendar Object
 *                      December 27, 2013
 *                          Howard Xu
 *
 *  The myCalendar object provides a simple API to the date picker
 *  1. create the object with option parameter full-year, month (0-11), day
 *      default value is the current date
 *      e.g.  v = new myCalendar()
 *  2. create a callback function with argument year, month, day API (default callback works for tag input type=text) 
 *      e.g. function callback(y,m,d) { v.toggle(); alert( "selected date: " + (m + 1) + '/' + d + '/' + y) }
 *  3. call the myCalendar object init method with tnree parameter:
 *      name of variable that hold the myCalendar object
 *      the reference of element tag in document for show calendar
 *      the reference of callback function get selecting date (optional on tag input text)
 *      this will show up th month of calendar under your tag and ready for selecting (toggle inside)
 *      e.g. v.init('v', document.getElementById('date'), callback )
 *  4. call myCalendar object toggle method to show/hide the calendar, without parameter do auto toggle 
 *  5. call myCalendar object setPos method to change relative position of calendar (default: 10, 10)
 *
 *  To adjust look and feel you can modify the style classes defined in CSS stylesheet
 */

function myCalendar(y, m, d) {
    var Months = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var Mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var Week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

    this.getMonthData = function(year, month, date) {
        var o = new Date();
        if (year == undefined) year = o.getFullYear()
        if (month == undefined) month = o.getMonth()
        if (date == undefined) date = o.getDate()
        o = new Date(year, month%12, date%32);
        var y = o.getFullYear()
        var m = o.getMonth()
        var d = o.getDate()
        o.setDate(0)
        var dy = o.getDay()
        var lm = o.getDate()
        var ml = new Date( y, m+1, 0).getDate() 
        return { Y:y, M:m , D:d, Dy:dy, Lm:lm, Ml:ml }
    }
    this.getCdata = function(n, c, cd) {
        var cls = ['pprev', 'ptitle', 'pnext', 'plmday', 'pday', 'psday', 'pnmday', 'pmonth',  'pyear' ]
        return 'class="' + cls[n] +'" onclick="'+ this.myObj + '.getCall(' + c + ',' + cd + ')" '     
    }
    this.getFuncStr = function(x, y) {
        s = "document.onclick=function(e) { "
        s += "try{ if ( e.pageX < " +  x + " || e.pageY < " + y + " || e.pageX > (" + x + " + "
        s += this.myObj + ".myElm.clientWidth ) || e.pageY > (" + y + " + "
        s += this.myObj + ".myElm.clientHeight )) { "
        s += "if (" + this.myObj + ".count > 0) " + this.myObj + ".toggle('none');"
        s += "else " + this.myObj + ".count = 1; } } "
        s += "catch(err){" + this.myObj + ".toggle('none');} }"
        return s
    }
    this.adjust = function() {
        var el = this.myTarget;for (var lx=0, ly=0, h=el.offsetHeight; el != null;
            lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        this.myElm.style.left = '' + (lx+this.deltax) + 'px'
        this.myElm.style.top = '' + (ly+this.deltay+h) + 'px' 
        if (document.onclick != null) document.onclick();
        eval(this.getFuncStr((lx+this.deltax), (ly+this.deltay+h)))
    }
    this.setPos = function(x, y) {
        this.deltax = x;
        this.deltay = y
    }
    this.toggle = function(stat) {
        if (stat == undefined) stat = (this.myElm.style.display == 'block')? 'none' : 'block'
        else if (stat != 'block') stat = 'none'
        if (stat == 'block') this.adjust()
        else { document.onclick=null; this.count = 0 }
        this.myElm.style.display = stat
    }
    this.updateUI = function(s) {
        this.myElm.innerHTML = s
    }        
    this.getYearCal = function(y) {
        y -= (y%10)
        var ss = '<table class="pout"><tr><td><table class="phead"><tr><th ' + this.getCdata(0, 8, y-10)
        ss +=' >&laquo;&nbsp;</th><th class="dtitle"> ' + y +'--' + (y+9) +' </th><th ' + this.getCdata(2, 8, y+10)
        ss +=' >&nbsp;&raquo;</th></tr></table class="pbody"></td></tr>'
        var tt = '<tr>'
        for (--y, i=0; i<12; i++, y++) {
            tt += '<td ' + this.getCdata(8, 9, y) + '>' + y + '</td>'
            if ((i+1) %4 == 0) tt += '</tr>'
        }
        return ss + '<tr><td> <center><table>' + tt + '</tr></table></td></tr></table>'
    }
    this.getMonCal = function(y) {
        var ss = '<table class="pout"><tr><td><table class="phead"><tr><th ' + this.getCdata(0, 5, y-1)
        ss +=' >&laquo;&nbsp;</th><th ' + this.getCdata(1, 7, y) + ' > ' + y +' </th><th ' + this.getCdata(2, 5, y+1)
        ss +=' >&nbsp;&raquo;</th></tr></table class="pbody"></td></tr>'
        var tt = '<tr>'
        for (var i=0; i<12; i++) {
            tt += '<td ' + this.getCdata(7, 6, i) + '>' + Mons[i] + '</td>'
            if ((i+1) %4 == 0) tt += '</tr>'
        }
        return ss + '<tr><td> <center><table>' + tt + '</tr></table></td></tr></table>'
    }
    this.getMonthCal = function(data) {
        var c = 0
        var ss = '<table class="pout"><tr><td><table class="phead"><tr><th ' +  this.getCdata(0, 0, data.D) 
        ss +=' >&laquo;&nbsp;</th><th ' + this.getCdata(1, 4, data.Y) + ' > '+Months[data.M] +', '+data.Y+' </th><th '
        ss +=this.getCdata(2, 2, data.D) +' >&nbsp;&raquo;</th></tr></table></td></tr>'
        var tt = '<tr>'
        for (var i=0; i<7; i++)
            tt += '<th>' + Week[i] + '</th>'
        ss += '<tr><td> <center><table class="pbody">' + tt + '</tr>'
        tt = '<tr>'
        var k = -(data.Dy + 7) % 7
        for (var i=0; i<42; i++, k++) {
            cd = (k<1)? (data.Lm+k):k 
            if (k == data.D && c == 1) 
                tt += '<td ' + this.getCdata(5, 3, cd) + ' >' +cd + '</td>'
            else {
                var n = (c == 1)? 4: (c == 0)? 3: 6
                tt += '<td ' + this.getCdata(n, c, cd) + ' >' +cd + '</td>'
            }
            if ((i+1) %7 == 0) tt += '</tr><tr>'
            if (k == 0) c = 1
            if (k ==  data.Ml) { k = 0; c = 2 }
        }
        return ss + tt + '</tr></table></td></tr></table>'
    }        
    this.getCall = function(c, cd) {
	   switch(c) {
            case 0: case 2:
                var m = this.myData.M 
                var y = this.myData.Y
                if (c == 0) m--; 
                else m++
                if (m < 0) { y--; m = 11 }
                else if(m > 11) { y++; m = 0 }
                this.myData = this.getMonthData(y, m, cd)
                this.updateUI(this.getMonthCal( this.myData ))
            break;
            case 1: case 3:
                this.myData.D = cd;
                this.updateUI(this.getMonthCal(this.myData ))
                this.myCallback(this.myData.Y, this.myData.M, cd)
            break
            case 4: case 5: case 9:
                this.myYear = cd
                this.updateUI(this.getMonCal(cd))
            break;
            case 6:
                this.myData = this.getMonthData(this.myYear, cd)
                this.updateUI(this.getMonthCal( this.myData ))
            break;
            case 7: case 8:
                this.myYear = cd
                this.updateUI(this.getYearCal(cd))
            break;
            default:
        }
    }
    this.createDiv = function(target) {
        this.myTarget = target 
        var div = document.createElement('div');
        div.style.position = 'absolute'
        div.style.zIndex = '5'
        div.style.display = 'block'
        document.body.appendChild(div);
        this.myElm = div
        this.adjust()
    }
    this.myCallback = function(y, m, d) {
        this.toggle('none')
        this.myTarget.value = '' + (m+1) + '/' + d + '/' + y
    }
    this.init = function(name, elm, clbk) {
        if (this.myObj == '') {
            this.myObj = name
            this.createDiv(elm)
            if (clbk != undefined) this.myCallback = clbk 
            this.myElm.innerHTML = this.getMonthCal(this.myData)
        }
        else 
            this.toggle()
    }
    this.myObj = ''
    this.myData = this.getMonthData(y,m,d)
    this.myYear = this.myData.Y
    this.deltax = 10
    this.deltay = 10
    this.count = 0
}