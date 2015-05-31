var Vending;
    (function (Vending) {
        var VendingCtrl = (function () {
            function VendingCtrl(Stock,Funds,Change) {
                var _this = this;

                _this.stock = Stock.getStock();
                _this.funds = Funds;
                _this.denominations = Funds.getDenominations();

                _this.purchase = function(item) {
                    _this.itemToPurchase = item;
                    _this.outstandingBalance = this.getOutstandingBalance();
                    _this.testPurchase();
                };

                _this.addFunds = function (amount) {
                    _this.manageCustomerMoney(amount);
                    _this.testPurchase();
                };

                _this.getOutstandingBalance = function() {
                    return _this.itemToPurchase.price - _this.customerEnteredMoney;
                };

                _this.testPurchase = function () {
                    if(_this.customerEnteredMoney >= _this.itemToPurchase.price){

                        _this.gatheredChange = Change.calculateChange(
                            _this.customerEnteredMoney,
                            _this.itemToPurchase.price
                        );
                        _this.allowPayments = false;
                        if(_this.gatheredChange.success) {

                            _this.dispatchItem = true;
                            _this.outstandingBalance = 0;
                            Funds.addFunds(_this.customerEnteredCoins);
                            Stock.dispatchItem(_this.itemToPurchase.id);

                            // give change to customer if required
                            if (Object.keys(_this.gatheredChange.change).length) {
                                this.dispatchChange = true;
                            }
                        } else if (_this.gatheredChange.failure) {

                            _this.outstandingBalance = 0;
                        }
                        // update the remaining balance to purchase item
                    } else {
                        _this.outstandingBalance = this.getOutstandingBalance();
                    }
                };

                _this.resetVendingMachine = function() {
                    _this.itemToPurchase = undefined;
                    _this.outstandingBalance = undefined;
                    _this.gatheredChange = undefined;

                    _this.dispatchItem = false;
                    _this.allowPayments = true;
                    _this.dispatchChange = false;

                    _this.customerEnteredMoney = 0;
                    _this.customerEnteredCoins = {};
                };

                _this.manageCustomerMoney = function(id) {
                    if(_this.customerEnteredCoins.hasOwnProperty(id)){
                        _this.customerEnteredCoins[id] ++;
                    } else {
                        _this.customerEnteredCoins[id] = 1;
                    }
                    _this.customerEnteredMoney += id;
                };

                _this.cancelPurchase = function() {
                    _this.gatheredChange = {};
                    _this.allowPayments = false;
                    _this.gatheredChange.failure = "Purchase Cancelled";
                }

                _this.resetVendingMachine();
            }
            return VendingCtrl;
        })();

        Vending.VendingCtrl = VendingCtrl;
        angular.module("Vending").controller("VendingCtrl", VendingCtrl).config(function ($stateProvider) {
            $stateProvider.state({
                name: "root.vending",
                url: "vending",
                controller: "VendingCtrl",
                controllerAs: "vendingCtrl",
                templateUrl: "vending/vending.html"
            });
        });
})(Vending || (Vending = {}));