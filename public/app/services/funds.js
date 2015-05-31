angular.module("Vending").factory("Funds", [ function() {

    var _denonminations = [
        {
            "id" : "0",
            "name": "£2",
            "value" : 200,
            "amount" : 50,
        },
        {
            "id" : "1",
            "name": "£1",
            "value" : 100,
            "amount" : 50,
        },
        {
            "id" : "2",
            "name": "50p",
            "value" : 50,
            "amount" : 150,
        },
        {
            "id" : "3",
            "name": "20p",
            "value" : 20,
            "amount" : 150,
        },
        {
            "id" : "4",
            "name": "10p",
            "value" : 10,
            "amount" : 150,
        },
        {
            "id" : "5",
            "name": "5p",
            "value" : 5,
            "amount" : 150,
        },
        {
            "id" : "6",
            "name": "2p",
            "value" : 2,
            "amount" : 550,
        },
        {
            "id" : "7",
            "name": "1p",
            "value" : 1,
            "amount" : 550,
        },
    ];

    var _denominationLookup = new Array(200,100,50,20,10,5,2,1);

    return {

        getDenominations : function() {
            return _denonminations;
        },

        getDenominationlookup : function() {
            return _denominationLookup;
        },

        lookupDenomination : function(value) {
            return _denonminations[_denominationLookup.indexOf(parseInt(value))].name;
        },

        addFunds : function(funds) {
           this.manageFunds(funds,"add");
        },

        withdrawFunds : function (funds) {
            this.manageFunds(funds,"subtract");
        },

        manageFunds : function(funds,operation) {
            for (var denomination in funds) {
                if (funds.hasOwnProperty(denomination)) {

                    var denominationIndex = _denominationLookup.indexOf(parseInt(denomination));
                    if(operation === "subtract") {

                        _denonminations[denominationIndex].amount -= funds[denomination];
                    } else if (operation === "add") {

                        _denonminations[denominationIndex].amount += funds[denomination];
                    }
                }
            }
        }
    }
}]);