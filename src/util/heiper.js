let printDate = function() {
    console.log('6th of april 2022')
}
 const printMonth = function()
{
    console.log('this month is april, 4th month of the year 2022')
};
const getBatchInfo = function(){
    console.log('uranium, w2 D03, the topic is nodejs module system')
};
module.exports.date = printDate

module.exports.month = printMonth

module.exports.Batch = getBatchInfo