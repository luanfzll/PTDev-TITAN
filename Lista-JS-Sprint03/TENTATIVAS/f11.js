const calcularAnoBissexto = ano => {
    if (ano <= 0){ //esqueci de botar essa validação
        return false
    } else if (ano % 400 === 0){
        return true
    } else if (ano % 100 === 0){
        return false
    } else if (ano % 4 === 0){
        return true
    } else{ // e essa pra caso n caisse em nenhum caso
        return false
    }
}

console.log(calcularAnoBissexto(0))
console.log(calcularAnoBissexto(4))
console.log(calcularAnoBissexto(100))
console.log(calcularAnoBissexto(400))
console.log(calcularAnoBissexto(800))
console.log(calcularAnoBissexto(2020))
console.log(calcularAnoBissexto(2021))