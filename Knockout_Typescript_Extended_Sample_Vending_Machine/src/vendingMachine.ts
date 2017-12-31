
import * as ko from "knockout";
abstract class Coin{
    constructor(public value: number, public name: string){
    }
}

class Quarter extends Coin{
    constructor(){
        super(.25, "Quarter");
    }
}

class Half extends Coin{
    constructor(){
        super(.5, "Half");
    }
}

class Dollar extends Coin{
    constructor(){
        super(1, "Dollar");
    }
}

abstract class thing {
    constructor(public price : number, public name : string, public timesBought : KnockoutObservable < number >) {}
}
class Drink extends thing {
    constructor() {
        super(1.6, "Drink", ko.observable(0));
    }
}
class Snacks extends thing {
    constructor() {
        super(0.8, "Snacks", ko.observable(0));
    }
}
class Burger extends thing {
    constructor() {
        super(2.8, "Burger", ko.observable(0));
    }
}

class vendingMachine {
    paid = ko.observable(0);
    acceptedCoins : Coin[] = [new Quarter(), new Half(), new Dollar()];
    acceptCoin = (coin : Coin) : void => {
        let oldval = this.paid();
        this.paid(oldval + coin.value);
    }
    
    things = [new Drink(), new Snacks(), new Burger()];

    payForIt = (_thing : thing) : void => {
        let oldval = this.paid();
        this.paid(Math.round((oldval - _thing.price) * 100) / 100);
        _thing.timesBought(_thing.timesBought() + 1);
        
        console.clear();
        console.log(this.paid());
        for(var i = 0; i < 3; i++){
            console.log(`${this.things[i].name} bought ${this.things[i].timesBought()} times.`);
        }
    }
    status = ko.observable("");
    statusOfItem = (_thing : thing) : void  => {
        this.status(`Buy ${_thing.name} in $${_thing.price}`);
    }

    statusOfCoin = (_coin : Coin) : void  => {
        this.status(`Add $${_coin.value} in Money`);
    }

    blankoutStatus = () : void => {
        this.status('');
    }
}

ko.applyBindings(new vendingMachine()); 