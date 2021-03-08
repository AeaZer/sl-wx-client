const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    formatTime: formatTime
}

function formatTime(number, format) {
    let flag = 0;
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number);
    if(formatNumber(date.getDate()-1)=="00"){
        date = new Date(date.getFullYear(),date.getMonth(),0)
        flag = 1;
    }
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    if(flag===1){
        returnArr.push(formatNumber(date.getDate()));
    }
    else{
        returnArr.push(formatNumber(date.getDate()-1));
    }
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);

    }
    return format;
}