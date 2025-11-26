const formata = valor => {
    return `R$ ${valor.toFixed(2).replace('.',',')}`
}

console.log(formata(0.30000000000000004));
