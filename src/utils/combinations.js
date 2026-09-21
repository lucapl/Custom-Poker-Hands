import {combinations, factorial} from "./utils/math.js";

export function totalCards(deck){
    return deck["ranks"].length*deck["suits"].length*deck["decks"];
}

export function handCombinations(handName, handSize, deck){
    if (new RegExp(/[0-9]+-[A-Za-z]+/).test(handName)){
        let n = Number(handName.split("-")[0]);
        return nCardsCombinations(n,handSize,deck);
    }
    else if (handName == "straight"){
        return straightCombinations(handSize,false,-1,deck);
    }
    else if (handName == "flush"){
        return flushCombinations(handSize,deck);
    }else if (new RegExp(/^\d+(\+\d+)+$/).test(handName)){
        const combos = handName.split("+").map(Number);
        return combosCombinations(combos,handSize,deck);
    }else if (handName == "poker"){
        return straightCombinations(handSize,true,-1,deck);
    }
    throw new Error("The name '"+handName+"' is not a valid poker hand");
}

export function nCardsCombinations(n, handSize, deck){
    // number of with exactly one n combination
    if(handSize < n){
        return 0;
    }
    let ranks = deck["ranks"].length;//combinations(deck["ranks"].length,1);
    let suits = deck["suits"].length*deck["decks"];
    let r = handSize-n;

    return ranks*combinations(suits,n)*combinations(ranks-1,r)*(suits**r);
}

export function straightCombinations(straightSize, isSuited, handSize, deck){
    const totalRanks = deck["ranks"].length;
    let ranks = deck["ranks"].length;
    const allowLoops = deck["allowLoops"];
    if(!allowLoops){
        ranks -= (straightSize - 1);
        ranks += deck["ranks"].includes("A")?1:0;
        if (ranks==0){
            return 0;
        }
        //ranks = ranks.filter((rank)=> ["J","Q","K"].contains(rank));
    }
    let suits = deck["suits"].length*deck["decks"];

    let r = 1;
    let loops = -1;
    for (let i = 0; i < straightSize; i++){
        if (i%totalRanks == 0){
            loops ++;
        }
        r *= suits-loops;
    }

    return (ranks * r);
}

export function flushCombinations(handSize,deck){
    let ranks = deck["ranks"].length;
    let suits = deck["suits"].length;
    let decks = deck["decks"];

    return suits * combinations(ranks*decks,handSize);
}

export function combosCombinations(combos,handSize,deck){
    // here full house and two pair are calculated
    let ranks = deck["ranks"].length;
    let suits = deck["suits"].length;
    let decks = deck["decks"];

    let r = 1;
    let _sum = 0;
    for (let i = 0; i<combos.length;i++){
        r *= combinations(suits*decks,combos[i]);
        _sum += combos[i];
    }

    return combinations(ranks,combos.length) * r * combinations(ranks-combos.length,handSize-_sum) * (combinations(suits*decks,1)**(handSize-_sum));
}
