export function factorial(n){
    let _prod = 1;
    for(let i=1; i <= n; i++){
        _prod *= i;
    }
    return _prod
}

export function combinations(n,r){
    if (r>n){
        return 0;
    }
    let k = n-r;
    let m = (k>r)?r:k;

    let _prod = 1;
    for (let i=0; i < m; i++){
        _prod *= n-i;
    }
    _prod /= factorial(m);
    return _prod;
}
