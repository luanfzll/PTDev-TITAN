function venda(fruta) {
    switch (fruta) {
        case "maçã":
            return "Não vendemos essa fruta aqui"
            break;
        case "kiwi":
            return "Estamos com escassez de kiwis"
            break
        case "melancia":
            return "Aqui está, são 3 reais o quilo"
            break;  
        default:
            return "Erro"
            break;
    }
}

console.log(venda("kiwi"));
