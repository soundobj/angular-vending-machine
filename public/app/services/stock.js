angular.module("Vending").factory("Stock", ['$http','$filter', function($http,$filter) {


    var _products = [
        {
            id: 0,
            name: "Candy",
            price: 50,
            amount: 100
        },
        {
            id: 1,
            name: "Chocolate",
            price: 65,
            amount: 100
        },
        {
            id: 2,
            name: "Crisps",
            price: 80,
            amount: 100
        },
    ];

    return {

        addItems: function(id,amount) {
            _products[id].amount += amount;
        },

        getStock: function() {
            return _products;
        },

        dispatchItem: function(id) {
            _products[id].amount --;
        }
    }
}]);