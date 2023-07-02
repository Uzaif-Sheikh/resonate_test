/**
 * Created a mapping array which helps to map 
 * the Id's and date to a readable unique code.
 */
const mapping = [
    'R', 'S', 'T', 'U', 'V', 'W', '#', 'X', 'Y', 'A', 'B', 'C', 'D',
    'E', 'N', 'O', '@', 'P', 'Q', 'Z', 'M', 'a', '$', 'b', 'c', 'd',
    'e', 'f', 'g', 'n', 'o', 'p', 'q', 'r', 'h', 'i', 'j', 'k', 'l',
    'm', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '/', '!', '%', '&', '*'
];


// for JSDoc use only.
/**
 * @typedef {Object} decodeResult
 * @property {number} storeId
 * @property {number} transactionId
 * @property {date} issueDate
 */

    //                     How is the generateShortCode function works?
    //        
    //     For this function we have to make sure we are able to generate a unique code
    //     that contains all three information store Id, transaction Id and shop date.
    //     To achieve this task we have to encode the information such that all the information
    //     takes as little space in the encoding as possible, to detail with this I decided to 
    //     allocate the first 2 characters in the short code to represent store Id, the next
    //     4 characters to represent the transaction Id and the remaining 3 characters are
    //     for the shop date (day/month/year).
    //
    //                        store Id    transac Id    shop date
    //                          _ _  |     _ _ _ _    |   _ _ _
    //                          
    //    
    //             How easy it is for the end users to read/copy the code into the website?
    //    
    //     To generate a unique code we are making using of a custom mapping array which contains 
    //     uppercase english characters [A..Z], lowercase english characters [a..z], numbers [0..9]
    //     and special characters [!,@..*]. This characters makes the unique code extremely readiable. 
    //
    //
    //                                    How we can prevent cheaters?
    //
    //     In order to cheat, the cheater has to generate a code which contains a particular transactionId for 
    //     a particular store to get the give-away. This task is quite difficult to achieve without having the 
    //     knowledge on how is the short code is generate and on top of that we are using a secret mapping array
    //     to encode. This makings it difficult to cheat.




/**
 * returns a unique code for given storeId and transactionId.
 * @example
 * // returns PWA#XWnWb
 * generateShortCode(175, 9675);
 * 
 * @param {number} storeId        - Id of a store.
 * @param {number} transactionId  - Id of a customer (transaction).
 * 
 * @returns {string}              - shortCode a unique code.
 */

function generateShortCode(storeId, transactionId) {
    // Logic goes here

    // creating today's date for the unique code
    const date = new Date();

    // converting storeId and transactionId to string to check the length.
    let storeIdString = storeId.toString();
    let transactionIdString = transactionId.toString();

    let storeCode = "00";
    let transactionCode = "0000";
    let dateCode = "000";

    if (storeIdString.length === 3) {

        // if the storeId is of length 3 then we map the first two number to 
        // a single char from the mapping array and the last number to one 
        // char, giving use storeCode of length 2.
        const firstCodeIndex = parseInt(storeIdString.slice(0, 2));
        const secondCodeIndex = parseInt(storeIdString.slice(2));

        storeCode = mapping[firstCodeIndex] + mapping[secondCodeIndex];

    } else if (storeIdString.length === 2) {

        // if the storeId is of length 2 then we map the each of those number to 
        // it's own mapping, giving use storeCode of length 2.
        const firstCodeIndex = parseInt(storeIdString[0]);
        const secondCodeIndex = parseInt(storeIdString[1]);

        storeCode = mapping[firstCodeIndex] + mapping[secondCodeIndex];

    } else {

        // lastly, if the storeId is of length 1 then we just map that one number
        // to a char from the mapping array and fill the left out space for storeId
        // using the 0 index of the mapping array as padding. 
        const firstCodeIndex = parseInt(storeIdString);

        storeCode = "R" + mapping[firstCodeIndex];

    }


    if (transactionIdString.length === 5) {

        // if the transactionId is of length 5 which is (10,000) then we are
        // mapping the first two digit 10 using the mapping array and 
        // the left out position will be filled using the 0th index of mapping array.
        const firstCodeIndex = parseInt(transactionIdString.slice(0,2));

        transactionCode = 
        mapping[firstCodeIndex] + "RRR";

    } else if (transactionIdString.length === 4) {

        // if the length is 4, then we map all the 4 digit to a char, using
        // our mapping array.
        const firstCodeIndex = parseInt(transactionIdString[0]);
        const secondCodeIndex = parseInt(transactionIdString[1]);
        const thirdCodeIndex = parseInt(transactionIdString[2]);
        const fourthCodeIndex = parseInt(transactionIdString[3]);

        transactionCode =
        mapping[firstCodeIndex] +
        mapping[secondCodeIndex] +
        mapping[thirdCodeIndex] +
        mapping[fourthCodeIndex];

    } else if (transactionIdString.length === 3) {

        // for the length 3 we are using the 0th index in 
        // the mapping array as padding. giving us the length 
        // of the code to be 4. 
        const firstCodeIndex = parseInt(transactionIdString[0]);
        const secondCodeIndex = parseInt(transactionIdString[1]);
        const thirdCodeIndex = parseInt(transactionIdString[2]);

        transactionCode =
        "R" + mapping[firstCodeIndex] + mapping[secondCodeIndex] + mapping[thirdCodeIndex];

    } else if (transactionIdString.length === 2) {

        // Similarly, for the length 2 we are using the first element of
        // the mapping array as padding. To fill our left out mapping.
        const firstCodeIndex = parseInt(transactionIdString[0]);
        const secondCodeIndex = parseInt(transactionIdString[1]);

        transactionCode = "RR" + mapping[firstCodeIndex] + mapping[secondCodeIndex];

    } else {

        // For the last case the length will be 1, here we are filling 
        // all the left out place with our padding.
        const firstCodeIndex = parseInt(transactionIdString);

        transactionCode = "RRR" + mapping[firstCodeIndex];
    }

    // The last 3 characters are for encoding the date of issue, here we 
    // are only taking the last two number from the year. 
    const yearInd = parseInt(date.getFullYear().toString().slice(2));

    // Mapping the date, month and year using our mapping array.
    dateCode = mapping[date.getDate()] + mapping[date.getMonth()] + mapping[yearInd];

    // Putting together all the encoding.

    return storeCode + transactionCode + dateCode;
}

/**
 * returns a object containing storeId, transactionId and issueDate for a given shortCode.
 * 
 * @example
 * // returns {storeId: 175, transactionId: 9675, shopDate: date()}
 * decodeShortCode("PWA#XWnWb");
 * 
 * @param {string} shortCode     - a unique code.
 *  
 * @returns {decodeResult} 
 */

function decodeShortCode(shortCode) {
    // Logic goes here

    // slicing up the shortCode to get the 
    // storeCode, transactionCode and dateCode.

    // first 2 chars are for the storeCode.
    let storeCode = shortCode.slice(0, 2);

    // next 4 chars are for the transactionCode.
    let transactionCode = shortCode.slice(2, 6);

    // last 3 chars are for the dateCode.
    let dateCode = shortCode.slice(6);

    let storeId = 0;
    let transactionId = 0;

    // getting the index from the mapping array to get the storeId. 
    storeId = parseInt(mapping.indexOf(storeCode[0]).toString() + mapping.indexOf(storeCode[1]).toString());
   

    // getting the index from the mapping array to construct the
    // transactionId.
    const first = mapping.indexOf(transactionCode[0]).toString();
    const second = mapping.indexOf(transactionCode[1]).toString();
    const third = mapping.indexOf(transactionCode[2]).toString();
    const fourth = mapping.indexOf(transactionCode[3]).toString();

    transactionId = parseInt(`${first}${second}${third}${fourth}`);


    // Doing the same for Date getting the index from the mapping array.
    const day = mapping.indexOf(dateCode[0]);
    const month = mapping.indexOf(dateCode[1]);
    const year = mapping.indexOf(dateCode[2]);

    // Constructing the Date using the year (here year is added to 2000 as we took the last two digit for year), month, day from shortCode.
    const shopDate = new Date((2000 + year), month, day);

    return {
        storeId: storeId, // store id goes here,
        shopDate: shopDate, // the date the customer shopped,
        transactionId: transactionId, // transaction id goes here
    };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}