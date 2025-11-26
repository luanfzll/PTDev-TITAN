function vendaCarros(carro) {
    switch (carro) {
        case "hatch":
            return "Compra efetuada com sucesso"

        case "sedan":
        case "motocicleta":
        case "caminhonete":
            return "Tem certeza que não prefere esse modelo?"

        default:
            return "não trabalhamos com esse tipo de modelo aqui"

    }
}

console.log(vendaCarros('hatch'));
console.log(vendaCarros('motocicleta'));
console.log(vendaCarros('sedan'));
console.log(vendaCarros('caminhonete'));
console.log(vendaCarros('jetski'));
