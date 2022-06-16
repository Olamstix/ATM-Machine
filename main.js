//Array of Users
var userArray = [];

var currentUser = {
    accountNumber: '',
    accountName: '',
    phoneNumber: '',
    accountBalance: 0,
    pin: ''
};


//Get items from local storage

var userArrayFromStorage = localStorage.getItem("allAccounts");

if (userArrayFromStorage != undefined && userArrayFromStorage != '') {
    userArray = JSON.parse(userArrayFromStorage);
} else {
    localStorage.setItem("allAccounts", JSON.stringify(userArray));
}




//Check if user exist
var checkAccount = function() {
    var accountNumber1 = document.getElementById('accNo').value;
    if (accountNumber1 !== '') {
        user = validateAccountNumber(accountNumber1);
        if (user) {
            document.getElementById('pin-portal').value
            document.getElementById('accNo-portal').style.display = "none";
            document.getElementById('pin-portal').style.display = "inline-block";
        }
    }
}
var checkPin = function() {
        var inputPin = document.getElementById('pin').value;
        if (inputPin !== Number.isNaN) {
            let user = validatePin(inputPin);
            if (user) {
                console.log(user);
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
var stepOneAccount = {};
var validateAccountNumber = function(accountNumber1) {
    var match = userArray.find(item => {
        return item.accountNumber == accountNumber1;
    });
    if (match == undefined) {
        alert('Wrong account number')
        return
    } else {
        stepOneAccount = match;
        return true;
    }
}


//Validate Pin
var validatePin = function(inputPin) {
    if (stepOneAccount.pin == inputPin) {
        return stepOneAccount;
    }
    return alert('Invalid PIN');
}

//Withdrawal
var withdrawMoney = function() {
    let amount = +document.getElementById('withdraw-amt').value;
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
    let amount = +document.getElementById('transfer-amt').value;
    if (amount < 1000) {
        alert('Minimum amount is 1000')
        return
    }
    alert("Transfer Successful");
    let newValue = currentUser.accountBalance - transAmount;
    userArray.forEach(user => {
        if (destinationAccount == user.accountNumber) {
            currentUser.accountBalance = newValue;
            let addedAmount = user.accountBalance + transAmount;
            user.accountBalance = addedAmount;
            updateDisplay(document.getElementById('totalBal'), newValue);
        } else {
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
    let amount = +document.getElementById('airtime-amt').value;
    if (amount < 100) {
        alert('Minimum amount is 100')
        return
    }
    let newValue = currentUser.accountBalance - airtimeAmount;
    alert("Airtime Purchase Successful");
    userArray.forEach(user => {
        if (destinationPhoneNo == user.phoneNumber) {
            currentUser.accountBalance = newValue;
            let addedAmount = user.accountBalance + airtimeAmount;
            user.accountBalance = addedAmount;
            updateDisplay(document.getElementById('totalBal'), newValue);
        } else {
            document.getElementById('options').style.display = 'inline-block'
            document.getElementById('airtime-portal').style.display = 'none'
        }
    })
}
var airtime = document.getElementById("airtime-submit");
airtime.addEventListener("click", airtimePurchase);


// Registration
var register = function() {
    userArray.push({
        accountNumber: document.getElementById("rAccNo").value,
        accountName: document.getElementById("rAccName").value,
        phoneNumber: document.getElementById("rPhoneNo").value,
        pin: document.getElementById("rAccPin").value,
        accountBalance: 0,

    });

    localStorage.setItem("allAccounts", JSON.stringify(userArray));
}

//Registration Validation
var registrationValidation = function() {
    var rAccName = document.getElementById('rAccName').value;
    var rAccNo = document.getElementById('rAccNo').value;
    var rAccPin = document.getElementById('rAccPin').value;
    var rPhoneNo = document.getElementById('rPhoneNo').value;
    var rConAccPin = document.getElementById('rConAccPin').value;
    register();
    alert("Registered");
    document.getElementById('login-portal').style.display = 'inline-block'
    document.getElementById('register-portal').style.display = 'none'
}


// Opening the different portals

//Opening Account Type Portal
var openAccTypePortal = function() {
    document.getElementById('login-portal').style.display = 'none'
    document.getElementById('account-type-portal').style.display = 'inline-block'
    document.getElementById('portal').style.display = 'none'
}
var accTypeBtn = document.getElementById('enter-btn2');
accTypeBtn.addEventListener('click', openAccTypePortal);


//Open Saving Account
var openSavingsAcc = function() {
    document.getElementById('account-type-portal').style.display = 'none'
    document.getElementById('portal').style.display = 'inline-block'
}
var SavingsAccBtn = document.getElementById('savingsAcc-btn');
SavingsAccBtn.addEventListener('click', openSavingsAcc);


//Open Current Account
var openCurrentAcc = function() {
    document.getElementById('account-type-portal').style.display = 'none'
    document.getElementById('portal').style.display = 'inline-block'
}
var CurrentAccBtn = document.getElementById('currentAcc-btn');
CurrentAccBtn.addEventListener('click', openCurrentAcc);


// Opening Registration Portal
var openRegistrationPortal = function() {
    document.getElementById('login-portal').style.display = 'none'
    document.getElementById('register-portal').style.display = 'inline-block'
}
var registrationBtn = document.getElementById('switchToReg');
registrationBtn.addEventListener('click', openRegistrationPortal);

var registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', registrationValidation);


//Opening Login Portal
var openLoginPortal = function() {
    document.getElementById('register-portal').style.display = 'none'
    document.getElementById('login-portal').style.display = 'inline-block'
}
var loginBtn = document.getElementById('switchToLogin');
loginBtn.addEventListener('click', openLoginPortal);


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


// Account, Pin and Phone number validation(Max-length)
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

pass = document.getElementById('rPhoneNo');
count = document.getElementById('rPhoneNo');
maxLength = 11;
pass.setAttribute('maxlength', 11);
pass.addEventListener('click', () => {
    count.innerText = `${pass.value.length}/${maxLength}`;
})

pass = document.getElementById('rAccNo');
count = document.getElementById('rAccNo');
maxLength = 10;
pass.setAttribute('maxlength', 10);
pass.addEventListener('click', () => {
    count.innerText = `${pass.value.length}/${maxLength}`;
})

pass = document.getElementById('rAccPin');
count = document.getElementById('rAccPin');
maxLength = 4;
pass.setAttribute('maxlength', 4);
pass.addEventListener('click', () => {
    count.innerText = `${pass.value.length}/${maxLength}`;
})

pass = document.getElementById('rConAccPin');
count = document.getElementById('rConAccPin');
maxLength = 4;
pass.setAttribute('maxlength', 4);
pass.addEventListener('click', () => {
    count.innerText = `${pass.value.length}/${maxLength}`;
})
