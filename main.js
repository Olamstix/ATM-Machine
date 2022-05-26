//Array of Users
var userArray = [{
        accountNumber: '2006127790',
        accountName: 'Nmorka Prince',
        phoneNumber: '07065309576',
        accountBalance: 25000,
        pin: 1234
    },
    {
        accountNumber: '0261434557',
        accountName: 'Mobolaji Olamide',
        phoneNumber: '08085462442',
        accountBalance: 50000,
        pin: 4321
    },
    {
        accountNumber: '0010431966',
        accountName: 'Chuks Kasiaric',
        phoneNumber: '09076555206',
        accountBalance: 500000,
        pin: 2220
    }
];

var currentUser = {
    accountNumber: '',
    accountName: '',
    phoneNumber: '',
    accountBalance: 0,
    pin: ''
};


//Check if user exist
var checkAccount = function() {
    var accountNumber1 = document.getElementById('accNo').value;
    if (accountNumber1 !== '') {
        user = validateAccountNumber(accountNumber1);
        if (user) {
            document.getElementById('pin-portal').value
            document.getElementById('accNo-portal').style.display = "none";
            document.getElementById('pin-portal').style.display = "inline-block";
            checkPin();
        }

    }
}
var checkPin = function() {
        var inputPin = document.getElementById('pin').value;
        if (inputPin !== Number.isNaN) {
            let user = validatePin(inputPin);
            if (user) {
                currentUser.accountNumber = user.accountNumber;
                currentUser.accountName = user.accountName;
                currentUser.phoneNumber = user.phoneNumber;
                currentUser.accountBalance = user.accountBalance;
                currentUser.pin = user.pin;
                document.getElementById('pin-portal').style.display = "none";
                document.getElementById('transfer-portal').style.display = "none";
                document.getElementById('deposit-portal').style.display = "none";
                // display menu
                document.getElementById('options').style.display = "inline-block";
                document.getElementById('userName').style.display = "inline-block";
                document.getElementById('totalBal').style.display = "inline-block";
                document.getElementById('portal').style.display = "inline-block";
                updateDisplay(document.getElementById('userName'), currentUser.accountName);
                updateDisplay(document.getElementById('totalBal'), currentUser.accountBalance);
            }
        }
    }
    //Display/Update customer details
var updateDisplay = function(domElement, value) {
    domElement.innerHTML = "";
    domElement.innerHTML = value;
}

//Account No. button
var enterBtn = document.getElementById("enter-btn");
enterBtn.addEventListener("click", checkAccount);
//PIN button
var enterBtn2 = document.getElementById("enter-btn2");
enterBtn2.addEventListener("click", checkPin);

//Validate Account number
var validateAccountNumber = function(accountNumber1) {
    // var match = userArray.map(item => {
    //     return item.accountNumber == accountNumber1 && item.pin === "1234"
    // });

    // if (match != null) {
    //     /// found
    // } else {
    //     // not found
    // }
    if (accountNumber1 === userArray[0].accountNumber || accountNumber1 === userArray[1].accountNumber) {
        return true;
    } else {
        alert('Wrong account number')
        return
    }
}


//Validate Pin
var validatePin = function(inputPin) {
    let user = {};
    if (inputPin == userArray[0].pin) {
        user.accountName = userArray[0].accountName;
        user.accountNumber = userArray[0].accountNumber;
        user.phoneNumber = userArray[0].phoneNumber;
        user.accountBalance = userArray[0].accountBalance;
        user.pin = userArray[0].pin;
        return user;
    }
    if (inputPin == userArray[1].pin) {
        user.accountName = userArray[1].accountName;
        user.accountNumber = userArray[1].accountNumber;
        user.phoneNumber = userArray[1].phoneNumber;
        user.accountBalance = userArray[1].accountBalance;
        user.pin = userArray[1].pin;
        return user;
    } else {
        //alert('Invalid PIN')
        return
    }
}

//Withdrawal
var withdrawMoney = function() {
    // let currentUser = checkPin();
    // console.log(currentUser);
    let amount = +document.getElementById('withdraw-amt').value;
    console.log(amount)
    console.log(typeof amount)
    if (amount > currentUser.accountBalance) {
        alert('insufficient fund')
        return
    } else {
        let newValue = +currentUser.accountBalance - amount;
        updateDisplay(document.getElementById('totalBal'), newValue);
        currentUser.accountBalance = newValue;
        alert('Transaction successful')
        document.getElementById('options').style.display = 'inline-block'
        document.getElementById('withdraw-portal').style.display = 'none'
    }
}
var withdraw = document.getElementById("wit-submit");
withdraw.addEventListener("click", withdrawMoney);


//Deposit
var depositMoney = function() {
    let amount = +document.getElementById('deposit-amt').value;
    if (amount < 1000) {
        alert('Minimum amount is 1000')
        return
    } else {
        let newValue = currentUser.accountBalance + amount;
        updateDisplay(document.getElementById('totalBal'), newValue);
        currentUser.accountBalance = newValue;
        alert('Transaction Successful')
        document.getElementById('options').style.display = 'inline-block'
        document.getElementById('deposit-portal').style.display = 'none'
    }
}
var deposit = document.getElementById("dep-submit");
deposit.addEventListener("click", depositMoney);


//Transfer
var transferMoney = function() {
    let transAmount = +document.getElementById('transfer-amt').value;
    let destinationAccount = document.getElementById('transfer-acc-no').value;
    if (transAmount > currentUser.accountBalance) {
        alert("Insufficient Fund");
        document.getElementById('options').style.display = 'inline-block'
        document.getElementById('transfer-portal').style.display = 'none'
    }
    let newValue = currentUser.accountBalance - transAmount;
    console.log("new value", newValue);
    console.log(typeof destinationAccount);
    console.log(typeof userArray.accountNumber);
    userArray.forEach(user => {
        if (destinationAccount == user.accountNumber) {
            currentUser.accountBalance = newValue;
            let addedAmount = user.accountBalance + transAmount;
            user.accountBalance = addedAmount;
            updateDisplay(document.getElementById('totalBal'), newValue);
        } else {
            alert("Transfer Successful");
            document.getElementById('options').style.display = 'inline-block'
            document.getElementById('transfer-portal').style.display = 'none'
        }
    })
}
var transfer = document.getElementById("trans-submit");
transfer.addEventListener("click", transferMoney);


//Airtime
var airtimePurchase = function() {
    let airtimeAmount = +document.getElementById('airtime-amt').value;
    let destinationPhoneNo = document.getElementById('phone-no').value;
    if (airtimeAmount > currentUser.accountBalance) {
        alert("Insufficient Fund");
        document.getElementById('options').style.display = 'inline-block'
        document.getElementById('airtime-portal').style.display = 'none'
    }
    let newValue = currentUser.accountBalance - airtimeAmount;
    console.log("new value", newValue);
    console.log(typeof destinationPhoneNo);
    console.log(typeof userArray.phoneNumber);
    userArray.forEach(user => {
        if (destinationPhoneNo == user.phoneNumber) {
            currentUser.accountBalance = newValue;
            let addedAmount = user.accountBalance + airtimeAmount;
            user.accountBalance = addedAmount;
            updateDisplay(document.getElementById('totalBal'), newValue);
        } else {
            alert("Airtime Purchase Successful");
            document.getElementById('options').style.display = 'inline-block'
            document.getElementById('airtime-portal').style.display = 'none'
        }
    })
}
var airtime = document.getElementById("airtime-submit");
airtime.addEventListener("click", airtimePurchase);


//Registration
// var register = function() {
//         let rAccNo = document.getElementById("rAccNo").value;
//         userArray.push({
//             accountNumber: rAccNo,
//             accountName: document.getElementById("rAccName").value,
//             phoneNumber: document.getElementById("rConAccPin").value,
//             pin: document.getElementById("rAccPin") m
//         })

//     }
// var register = function() {
//     let UserAccount = document.getElementById("account").value;
//     people.push({
//         account: UserAccount,
//         pin: document.getElementById("pin").value,
//         other: document.getElementById("other").value
//     })
// }


// Opening the different portals
//Registration Portal
var openRegistrationPortal = function() {
    document.getElementById('login-portal').style.display = 'none'
    document.getElementById('register-portal').style.display = 'inline-block'
}
var registrationBtn = document.getElementById('register-btn');
registrationBtn.addEventListener('click', openDepositPortal);

// Airtime portal
var openAirtimePortal = function() {
    document.getElementById('options').style.display = 'none'
    document.getElementById('airtime-portal').style.display = 'inline-block'
}
var airtimeBtn = document.getElementById('airtime-btn');
airtimeBtn.addEventListener('click', openAirtimePortal);

// Deposit portal
var openDepositPortal = function() {
    document.getElementById('options').style.display = 'none'
    document.getElementById('deposit-portal').style.display = 'inline-block'
}
var depositBtn = document.getElementById('deposit-btn');
depositBtn.addEventListener('click', openDepositPortal);

// Withdraw portal
var openWithdrawPortal = function() {
    document.getElementById('options').style.display = 'none'
    document.getElementById('withdraw-portal').style.display = 'inline-block'
}
var withdrawBtn = document.getElementById('withdraw-btn');
withdrawBtn.addEventListener('click', openWithdrawPortal);

// Transfer portal
var openTransferPortal = function() {
    document.getElementById('options').style.display = 'none'
    document.getElementById('transfer-portal').style.display = 'inline-block'
}
var transferBtn = document.getElementById('transfer-btn');
transferBtn.addEventListener('click', openTransferPortal);


// Account, Pin and Phone number MaxLength
var pass = document.getElementById('accNo');
var count = document.getElementById('accNo');
var maxLength = 10;
pass.setAttribute('maxlength', 10);
pass.addEventListener('click', () => {
    count.innerText = `${pass.value.length}/${maxLength}`;
})
pass = document.getElementById('pin');
count = document.getElementById('pin');
maxLength = 4;
pass.setAttribute('maxlength', 4);
pass.addEventListener('click', () => {
    count.innerText = `${pass.value.length}/${maxLength}`;
})

pass = document.getElementById('phone-no');
count = document.getElementById('phone-no');
maxLength = 11;
pass.setAttribute('maxlength', 11);
pass.addEventListener('click', () => {
    count.innerText = `${pass.value.length}/${maxLength}`;
})