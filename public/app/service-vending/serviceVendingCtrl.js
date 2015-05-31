var Vending;
    (function (Vending) {
        var ServiceVendingCtrl = (function () {
            function ServiceVendingCtrl(Stock,Funds,Change) {
                var _this = this;

                _this.stock = Stock.getStock();
                _this.funds = Funds;
                _this.denominations = Funds.getDenominations();
                _this.productMeasurements = [5,10,20,30];
                _this.denominationMeasurements = [20,50,100,200];

                _this.replenishProduct = function(product,amount) {
                    Stock.addItems(product.id,amount);
                }

                _this.replenishDenominations = function(denomination,amount) {
                    var fundsToBeAdded = {};
                    fundsToBeAdded[denomination.value] = amount;
                    Funds.addFunds(fundsToBeAdded);
                }
            }
            return ServiceVendingCtrl;
        })();

        Vending.ServiceVendingCtrl = ServiceVendingCtrl;
        angular.module("Vending").controller("ServiceVendingCtrl", ServiceVendingCtrl).config(function ($stateProvider) {
            $stateProvider.state({
                name: "root.service",
                url: "service-machine",
                controller: "ServiceVendingCtrl",
                controllerAs: "svCtrl",
                templateUrl: "service-vending/service-vending.html"
            });
        });
})(Vending || (Vending = {}));