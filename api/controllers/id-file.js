/**
 * Created by arobles on 10/30/14.
 */
/* jshint freeze:false, bitwise: false */
'use strict';
String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0){
        return hash;
    }
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
module.exports = function () {
    var date = new Date();
    return (date + date.getMilliseconds()).hashCode();
};