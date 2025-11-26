const jurosSimples = (capital, juros, tempo) => {
    return capital + (capital * juros * tempo)
}

const jurosCompostos = (capital, juros, tempo) =>{
    let montante = capital

    for(let i = 0; i < tempo; i++){
        juroAtual = montante * juros

        montante += juroAtual
    }
    return montante
}

console.log(jurosSimples(100, 10/100, 2));
console.log(jurosCompostos(100, 10/100, 2));
