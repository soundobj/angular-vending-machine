var RootCtrl = (function () {
    function RootCtrl() {
        this.brand = "Angular";
        this.navStates = [
            { state: "root.vending", title: "Vending Machine" },
            { state: "root.service", title: "Service Vending Machine" },
        ];
    }
    return RootCtrl;
})();

angular.module("Vending", ["ui.router"]).controller("RootCtrl", RootCtrl)
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "root",
        url: "/",
        controller: "RootCtrl",
        controllerAs: "rootCtrl",
        templateUrl: "root.html"
    });
    $urlRouterProvider.otherwise("/");

}).run(function ($state, $rootScope) {
    $rootScope.$state = $state;
});