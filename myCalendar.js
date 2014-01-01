/*
 *                      myCalendar Object
 *                      December 27, 2013
 *                          Howard Xu
 *
 *  The myCalendar object provides a simple API to get selecting date
 *  1. create the object with option parameter full-year, month (0-11), day
 *     default value is the current date
 *  2. create a callback function with argument year, month, day API
 *      e.g. function callback(y,m,d) { alert( "selected date: " + Date(y,m,d)) }
 *  3. call the myCalendar object init method with three parameter:
 *      name of variable that hold the myCalendar object
 *      the reference of element of div tag in document for show calendar
 *      the reference of callback function for get selecting date
 *     this will show up th month of calendar inside div tag and ready to select (toggle inside)
 *  4. call myCalendar object toggle method to show/hide the calendar, without parameter do auto toggle 
 *  To adjust look and feel please modify the style classes defined in CSS stylesheet
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
    this.getCdata = function(c, cd) {
        var cls = ['prev', 'curr', 'post', 'tday', 'look', 'shift', 'smon', 'find', 'range', 'syear']
        return 'class="' + cls[c] +'" onclick="'+ this.myObj + '.getCall(' + c + ',' + cd + ')" '     
    }        
    this.toggle = function(stat) {
        if (stat == undefined) 
            stat = (this.myElm.style.display == 'block')? 'none' : 'block'
        else if (stat != 'block') stat = 'none'
        this.myElm.style.display = stat
    }
    this.updateUI = function(s) {
        this.myElm.innerHTML = s
    }        
    this.getYearCal = function(y) {
        y -= (y%10)
        var ss = '<table class="out"><tr><td><table class="shead"><tr><th ' + this.getCdata(8, y-10)
        ss +=' ><<</th><th width="140"> ' + y +'--' + (y+9) +' </th><th ' + this.getCdata(8, y+10)
        ss +=' >>></th></tr></table class="sbody"></td></tr>'
        var tt = '<tr>'
        y--
        for (i=0; i<12; i++) {
            tt += '<td ' + this.getCdata(9, y) + '>' + y + '</td>'
            if ((i+1) %4 == 0) tt += '</tr>'
            y++
        }
        tt += '</tr>'
        ss += '<tr><td> <center><table>' + tt + '</table></td></tr></table>'
        return ss
    }
    this.getMonCal = function(y) {
        var ss = '<table class="out"><tr><td><table class="shead"><tr><th ' + this.getCdata(5, y-1)
        ss +=' ><<</th><th width="140" ' + this.getCdata(7, y) + ' > ' + y +' </th><th ' + this.getCdata(5, y+1)
        ss +=' >>></th></tr></table class="sbody"></td></tr>'
        var tt = '<tr>'
        for (var i=0; i<12; i++) {
            tt += '<td ' + this.getCdata(6, i) + '>' + Mons[i] + '</td>'
            if ((i+1) %4 == 0) tt += '</tr>'
        }
        tt += '</tr>'
        ss += '<tr><td> <center><table>' + tt + '</table></td></tr></table>'
        return ss
    }
    this.getMonthCal = function(data) {
        var c = 0
        var ss = '<table class="out"><tr><td><table class="shead"><tr><th ' +  this.getCdata(0, data.D) 
        ss +=' ><<</th><th width="140" ' + this.getCdata(4, data.Y) + ' > '+Months[data.M] +', '+data.Y+' </th><th '
        ss +=this.getCdata(2, data.D) +' >>></th></tr></table></td></tr>'
        var tt = '<tr>'
        for (var i=0; i<7; i++)
            tt += '<th>' + Week[i] + '</th>'
        tt += '</tr>'
        ss += '<tr><td> <center><table class="sbody">' + tt
        tt = '<tr>'
        var k = -(data.Dy + 7) % 7
        for (var i=0; i<42; i++, k++) {
            cd = (k<1)? (data.Lm+k):k 
            if (k == data.D && c == 1) 
                tt += '<td ' + this.getCdata(3, cd) + ' >' +cd + '</td>'
            else
                tt += '<td ' + this.getCdata(c, cd) + ' >' +cd + '</td>'
            if ((i+1) %7 == 0) tt += '</tr><tr>'
            if (k == 0) c = 1
            if (k ==  data.Ml) { k = 0; c = 2 }
        }
        ss += tt + '</tr></table></td></tr></table>'
        return ss
    }        
	this.getCall = function(c, cd) {
		switch(c) {
            case 0:
            case 2:
		        var m = this.myData.M 
			    var y = this.myData.Y
			    if (c == 0) m--; 
			    else m++
			    if (m < 0) { y--; m = 11 }
			    else if(m > 11) { y++; m = 0 }
			    this.myData = this.getMonthData(y, m, cd)
			    this.updateUI(this.getMonthCal( this.myData ))
		    break;
		    case 1:
            case 3:
                this.myCallback(this.myData.Y, this.myData.M, cd)
            break
            case 4:
            case 5:
                this.myYear = cd
                this.updateUI(this.getMonCal(cd))
            break;
            case 6:
                this.myData = this.getMonthData(this.myYear, cd)
                this.updateUI(this.getMonthCal( this.myData ))
            break;
            case 7:
            case 8:
                this.myYear = cd
                this.updateUI(this.getYearCal(cd))
            break;
            case 9:
                this.myYear = cd
                this.updateUI(this.getMonCal(cd))
            break;
        }
	}
    this.init = function(name, elm, clbk) {
        if (this.myObj == '') {
            this.myObj = name
            this.myElm = elm
            this.myCallback = clbk
            this.myElm.style.display = 'block'
            this.myElm.innerHTML = this.getMonthCal(this.myData)
        }
        else
            this.toggle()
    }
    this.myObj = ''
    this.myElm = null
    this.myCallback = null
    this.myData = this.getMonthData(y,m,d)
    this.myYear = this.myData.Y
}