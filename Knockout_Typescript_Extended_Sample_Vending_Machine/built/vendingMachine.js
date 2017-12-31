var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Coin = (function () {
        function Coin(value, name) {
            this.value = value;
            this.name = name;
        }
        return Coin;
    }());
    var Quarter = (function (_super) {
        __extends(Quarter, _super);
        function Quarter() {
            return _super.call(this, .25, "Quarter") || this;
        }
        return Quarter;
    }(Coin));
    var Half = (function (_super) {
        __extends(Half, _super);
        function Half() {
            return _super.call(this, .5, "Half") || this;
        }
        return Half;
    }(Coin));
    var Dollar = (function (_super) {
        __extends(Dollar, _super);
        function Dollar() {
            return _super.call(this, 1, "Dollar") || this;
        }
        return Dollar;
    }(Coin));
    var thing = (function () {
        function thing(price, name, timesBought) {
            this.price = price;
            this.name = name;
            this.timesBought = timesBought;
        }
        return thing;
    }());
    var Drink = (function (_super) {
        __extends(Drink, _super);
        function Drink() {
            return _super.call(this, 1.6, "Drink", ko.observable(0)) || this;
        }
        return Drink;
    }(thing));
    var Snacks = (function (_super) {
        __extends(Snacks, _super);
        function Snacks() {
            return _super.call(this, 0.8, "Snacks", ko.observable(0)) || this;
        }
        return Snacks;
    }(thing));
    var Burger = (function (_super) {
        __extends(Burger, _super);
        function Burger() {
            return _super.call(this, 2.8, "Burger", ko.observable(0)) || this;
        }
        return Burger;
    }(thing));
    var vendingMachine = (function () {
        function vendingMachine() {
            var _this = this;
            this.paid = ko.observable(0);
            this.acceptedCoins = [new Quarter(), new Half(), new Dollar()];
            this.acceptCoin = function (coin) {
                var oldval = _this.paid();
                _this.paid(oldval + coin.value);
            };
            this.things = [new Drink(), new Snacks(), new Burger()];
            this.payForIt = function (_thing) {
                var oldval = _this.paid();
                _this.paid(Math.round((oldval - _thing.price) * 100) / 100);
                _thing.timesBought(_thing.timesBought() + 1);
                console.clear();
                console.log(_this.paid());
                for (var i = 0; i < 3; i++) {
                    console.log(_this.things[i].name + " bought " + _this.things[i].timesBought() + " times.");
                }
            };
            this.status = ko.observable("");
            this.statusOfItem = function (_thing) {
                _this.status("Buy " + _thing.name + " in $" + _thing.price);
            };
            this.statusOfCoin = function (_coin) {
                _this.status("Add $" + _coin.value + " in Money");
            };
            this.blankoutStatus = function () {
                _this.status('');
            };
        }
        return vendingMachine;
    }());
    ko.applyBindings(new vendingMachine());
});
//# sourceMappingURL=vendingMachine.js.map