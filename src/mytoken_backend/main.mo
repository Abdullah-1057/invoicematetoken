import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token{
    let owner:Principal=Principal.fromText("cldba-ylt76-hogaw-sluvf-btjuq-6ohr2-enuq3-fpoxt-uxz75-vbzw2-iae");
    let totalSupply:Nat=1000000000;
    let symbol:Text="DANG";
    
    private stable var balanceEntries:[(Principal,Nat)] = [];
    private var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);

    public query func BalanceOf(who:Principal): async Nat{
        let balance:Nat = switch(balances.get(who)){
        case null 0;
        case (?result) result;
        };
        return balance;
    };
    public query func GetSymbol(): async Text{
       return symbol;
    };

    public shared(msg) func payOut(): async Text{
        Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller)==null)
        {   
            var amount = 10000;
            // balances.put(msg.caller,amount);
            let message = await transfer(msg.caller,amount);
            return message;  
        }
        else
        {
            return "Funds already taken";
        }
     
    };

    public shared(msg) func transfer(to: Principal,amount:Nat):async Text
    {
        let balance = await BalanceOf(msg.caller);
        if(balance>=amount)
        {
            let newBalance:Nat = balance-amount;
            balances.put(msg.caller,newBalance);
            let prevBalance = await BalanceOf(to);
            let totalBalance:Nat = prevBalance+amount;
            balances.put(to,totalBalance);
            return "success";
        }
        else{
            return "insufficient funds";
        };
    };

    system func preupgrade()
    {
        balanceEntries := Iter.toArray(balances.entries());
    };
    system func postupgrade()
    {
         balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
         if(balances.size() < 1)
         {
            balances.put(owner,totalSupply);
         }
    };

    
}