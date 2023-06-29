const mapping = [
    'R', 'S', 'T', 'U', 'V', 'W', '#', 'X', 'Y', 'A', 'B', 'C', 'D',
    'E', 'N', 'O', '@', 'P', 'Q', 'Z', 'M', 'a', '$', 'b', 'c', 'd',
    'e', 'f', 'g', 'n', 'o', 'p', 'q', 'r', 'h', 'i', 'j', 'k', 'l',
    'm', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '/', '!', '%', '&', '*'
];

// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
    // Logic goes here
    const date = new Date();
    let storeIdString = storeId.toString();
    let transactionIdString = transactionId.toString();

    let storeCode = "00";
    let transactionCode = "0000";
    let dateCode = "000";

    if (storeIdString.length == 3) {
        const firstCodeIndex = parseInt(storeIdString.slice(0, 2));
        const secondCodeIndex = parseInt(storeIdString.slice(2));

        storeCode = mapping[firstCodeIndex] + mapping[secondCodeIndex];
    } else if (storeIdString.length == 2) {
        const firstCodeIndex = parseInt(storeIdString.slice(0, 1));
        const secondCodeIndex = parseInt(storeIdString.slice(1));

        storeCode = mapping[firstCodeIndex] + mapping[secondCodeIndex];
    } else {
        const firstCodeIndex = parseInt(storeIdString);

        storeCode = "R" + mapping[firstCodeIndex]
    }


    if (transactionIdString.length == 5) {
        transactionCode = "2710";
    } else if (transactionIdString.length == 4) {
        const firstCodeIndex = parseInt(transactionIdString[0]);
        const secondCodeIndex = parseInt(transactionIdString[1]);
        const thirdCodeIndex = parseInt(transactionIdString[2]);
        const fourthCodeIndex = parseInt(transactionIdString[3]);

        transactionCode = mapping[firstCodeIndex] + mapping[secondCodeIndex] + mapping[thirdCodeIndex] + mapping[fourthCodeIndex];

    } else if (transactionIdString.length == 3) {
        const firstCodeIndex = parseInt(transactionIdString[0]);
        const secondCodeIndex = parseInt(transactionIdString[1]);
        const thirdCodeIndex = parseInt(transactionIdString[2]);

        transactionCode = 'R' + mapping[firstCodeIndex] + mapping[secondCodeIndex] + mapping[thirdCodeIndex];

    } else if (transactionIdString.length == 2) {
        const firstCodeIndex = parseInt(transactionIdString[0]);
        const secondCodeIndex = parseInt(transactionIdString[1]);

        transactionCode = 'RR' + mapping[firstCodeIndex] + mapping[secondCodeIndex];

    } else {
        const firstCodeIndex = parseInt(transactionIdString);

        transactionCode = 'RRR' + mapping[firstCodeIndex];
    }

    const yearInd = parseInt(date.getFullYear().toString().slice(2));

    dateCode = mapping[date.getDate()] + mapping[date.getMonth()] + mapping[yearInd];

    return storeCode + transactionCode + dateCode;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Logic goes here

    let storeCode = shortCode.slice(0, 2);
    let transactionCode = shortCode.slice(2, 6);
    let dateCode = shortCode.slice(6);

    let storeId = 0;
    let transactionId = 0;

    if (storeCode.length == 1) {
        storeId = mapping.indexOf(storeCode[0]);
    } else {
        storeId = parseInt(mapping.indexOf(storeCode.slice(0, 1)).toString() + mapping.indexOf(storeCode.slice(1)).toString());
    }


    if (transactionCode == "2710") {
        transactionId = 10000
    } else {
        const first = mapping.indexOf(transactionCode[0]).toString();
        const second = mapping.indexOf(transactionCode[1]).toString();
        const third = mapping.indexOf(transactionCode[2]).toString();
        const fourth = mapping.indexOf(transactionCode[3]).toString();

        transactionId = parseInt(first + second + third + fourth);

    }

    const day = mapping.indexOf(dateCode[0]);
    const month = mapping.indexOf(dateCode[1]);
    const year = mapping.indexOf(dateCode[2]);

    return {
        storeId: storeId, // store id goes here,
        shopDate: new Date((2000 + year), month, day), // the date the customer shopped,
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