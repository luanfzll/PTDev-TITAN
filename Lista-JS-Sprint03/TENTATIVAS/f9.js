const classificaAluno = nota => {
    if (nota < 38){
        return `Reprovado com nota ${nota}`
    } else if ((nota + 1) % 5 === 0) {
        nota += 1
        return `Aprovado com nota ${nota}`
    } else if ((nota + 2) % 5 === 0) {
        nota += 2
        return `Aprovado com nota ${nota}`
    } else{
        return `Aprovado com nota ${nota}`
    }
}

console.log(classificaAluno(100));
console.log(classificaAluno(30));
console.log(classificaAluno(38));
console.log(classificaAluno(88));
console.log(classificaAluno(61));
