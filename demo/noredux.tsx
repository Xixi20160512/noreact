import { MVVM, React } from "../src";

class Person {
    constructor(public name: string, public age: number) {

    }
    changeName() {
        this.name = "(" + this.name + ")";
    }
    changeAge() {
        this.age++;
    }
}
let person = new Person("foo", 0);
class PersonCard extends MVVM<{}>{
    person: Person = null;
    $onInit() {
        this.person = person;
    }
    $Render() {
        return <fragment>
            <h1>Person Card</h1>
            <div>{this.person.name}</div>
        </fragment>

    }
}
class UserCenter extends MVVM<{}>{
    person: Person = null;
    $onInit() {
        this.person = person;
    }
    $onDestroyed() {
        console.log("user destroyed")
    }
    $Render() {
        return <fragment>
            <h1>User Center</h1>
            <div>Name:{this.person.name}</div>
            <div>Age:{this.person.age}</div>
        </fragment>
    }
}
class Operation extends MVVM<{}>{
    person: Person = null;
    $onInit() {
        this.person = person;
    }
    $Render() {
        return <fragment>
            <button onClick={this.person.changeName.bind(person)}>change name</button>
            <button onClick={this.person.changeAge.bind(person)}>change age</button>
        </fragment>
    }
}
class Tabs extends MVVM<void>{
    curTab = 'oper';
    $Render() {
        return <div className="tabs-container">
            <div className="tabs">
                <button onClick={this.tab.bind(this, 'oper')} className="tab">oper</button>
                <button onClick={this.tab.bind(this, 'PersonCard')} className="personcard">PersonCard</button>
                <button onClick={this.tab.bind(this, 'UserCenter')} className="usercenter">UserCenter</button>
            </div>
            {this.curTab == 'oper' ? <Operation></Operation> : null}
            {this.curTab == 'PersonCard' ? <PersonCard></PersonCard> : null}
            {this.curTab == 'UserCenter' ? <UserCenter></UserCenter> : null}
        </div>
    }
    tab(name: string) {
        this.curTab = name;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    let tabs = new Tabs();
    (window as any).noreact = tabs;
    tabs.$AppendTo(document.body);
});