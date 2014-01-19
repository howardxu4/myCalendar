myCalendar
==========

This is a javascript object which provides a simple API of date picker 

Contains
--------

* myCalendar.js 'javascript object'
* myCalendar.css 'stylesheet to control look and feel'
* myCalendar.htm 'sample html'
* myClock.js     'javascript object'
* myUtils.js     'javascript object'
* myDemo.css     'stylesheet example'
* myDemo.js      'demo of using myCalendar, myClock, and myUtils objects

Usage
-----
* myCalendar Object
* create the object with option parameter full-year, month (0-11), day
* create a callback function with argument year, month, day API
* call the myCalendar object init method with three parameter:
<br/> 1.   name of variable that hold the myCalendar object
<br/> 2.   the reference of element of tag in document for show calendar
<br/> 3.   the reference of callback function for get selecting date
* call myCalendar object setBegin method to change the begin week day
* call myCalendar object setPos method to change relative position
* adjusting look and feel modify the style classes defined in myCalendar.css
* detail usage refer the sample myCalendar.htm
*
* myClock Object
* create the object with parameter of canvas element ID
* call myClock setTime function with parameter: Hour, Min, Sec
* call myClock showAll function to display clock in canvas
* following myClock properties and method are helpers for adjust time:
<br/> 1.   cx, cy - center position of clock
<br/> 2.   rh - hour hand length
<br/> 3.   rm - minute hand lengtn
<br/> 4.   h - hour
<br/> 5.   m - minuts
<br/> 6.   getPoint - method of get relative position of end hand on clock
* 
* myUtils Object
* the global object with common usage of calculation utilities
<br/> 1.   findOffset - method of get position of element
<br/> 2.   ptInRect - method to check point in rectangle
<br/> 3.   PtOnLine - method to check point on line
<br/> 4.   PtInCircle - method to check point in circle
<br/> 5.   getDergree - method to get degree of position in circle
<br/> 6.   popPos - method of setup popup position 
<br/> 7.   popShow - method of show message in popup
<br/> 8.   popHide - method of hide popup
*
* detail usage refer the sample myDemo.htm 
