const gettimestamp=(date)=>{
    const dateObject = new Date(date);

// Create a new Date object with just the year, month, and day
const dateOnly = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());

// Get the Unix timestamp (milliseconds since epoch)
const timestamp = dateOnly.getTime();

// console.log(timestamp);
return timestamp
}
const getdate=(date)=>{
    var format = new Date(date);
    var dateformat = format.getDate();
    var monthformat = format.getMonth() + 1;
    var yearformat = format.getFullYear();
    var selectDate = dateformat + '/' + monthformat + '/' + yearformat;
    return selectDate;
}

module.exports={
    gettimestamp,
    getdate
}