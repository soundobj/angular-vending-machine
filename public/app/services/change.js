angular.module("Vending").factory("Change", ['Funds','Stock', function(Funds,Stock) {

    var _denominatonLookup = Funds.getDenominationlookup();
    var _funds = Funds.getDenominations();
    var _change = {};
    var _amountDue = undefined;

    /**
     * Gather the coins required to provide the customer
     * with change recursively
     * @param {Number} amountDue - what is left to give out as change
     * @returns {*} json object with success of failure flags.
     */
    function clearAmountDue(amountDue) {
        if( amountDue === 0) {

            return {"success": true};
        } else {

            //var denomination = findDenomination(amountDue);
            var denomination = findDenomination(amountDue);
            if(hasSufficientDenominationInFunds(denomination)) {

                updateChangeDue(denomination);
                return clearAmountDue(amountDue - denomination);
            } else {

                return {"failure": "Sorry machine can not produce required change, please enter exact amount"};
            }
        }
    };
    /**
     * Store the change to be produced to the customer
     * to ensure we can deliver the correct change
     * @param denomination
     */
    function updateChangeDue(denomination) {
        if(_change[denomination]) {

            _change[denomination] ++;
        } else {

            _change[denomination] = 1;
        }
    };
    /**
     * Checks if we have enough coins of a denomination type to produce the customer's change
     * @param {Number} denomination - the type of coin
     * @returns {boolean}
     */
    function hasSufficientDenominationInFunds(denomination) {

        var denominationIndex = _denominatonLookup.indexOf(denomination);
        var denominationRequiredCount = 0;

        //check if we already require denominations of this type, if so factor them in
        if(_change[denominationIndex] > 0 ) {

            denominationRequiredCount = _change[denominationIndex];
        }

        // check if we have enough denominations of this type to satisfy the amountDue
        if(_funds[denominationIndex].amount > denominationRequiredCount ) {

            return true;
        } else {

            return false;
        }
    };
    /**
     * Selects the closest denomination in value to satisfy the remaining change
     * @param {Number} amountDue
     * @returns {Number} denomination
     */
    function findDenomination(amountDue) {
        var denominations = _denominatonLookup.filter(function(value) {
            if(this.amountDue/value >= 1) {

                return true;
            }
        },{"amountDue":amountDue});
        // return the first possible denomination to continue clearing the amount due
        return denominations[0];
    };

    return {

        calculateChange : function(amountPaid,itemPrice) {

            _amountDue = amountPaid - itemPrice;
            var gatheredChange = clearAmountDue(_amountDue);

            if(gatheredChange.success) {

                Funds.withdrawFunds(_change);
                gatheredChange.change = _change;
                gatheredChange.totalAmountDue = _amountDue;
            } else {

                gatheredChange.change = {};
            }
            // reset the service
            _change = {};
            _amountDue = undefined;
            return gatheredChange;
        }
    }
}]);