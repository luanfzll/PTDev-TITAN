//let string = "pont1 pont2 pont3"

//console.log(string.split(' ')[1]);

const basket = (stringPontos) => {
    let pontuacoes = stringPontos.split(' ')
    let bateRecorde = 0
    let piorJogo = 1
    let maior = pontuacoes[0]
    let menor = pontuacoes[0]

    for(let i = 1; i < pontuacoes.length; i++){
        if (parseInt(pontuacoes[i]) > parseInt(maior)){
            maior = pontuacoes[i]
            bateRecorde++
        } else if (parseInt(pontuacoes[i]) < parseInt(menor)){
            menor = pontuacoes[i]
            piorJogo = i+1
        } 
    }
    return [bateRecorde, piorJogo]
}

console.log(basket("10 20 20 8 25 3 0 30 1"));

 