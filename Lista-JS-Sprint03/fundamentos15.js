function vendaCarros (modelo) {
    switch (modelo) {
        case 'hatch':
            return 'Compra efetuada com sucesso.'
        case 'sedan':
        case 'motocicleta':
        case 'caminhonete':
            return 'Tem certeza que não prefere este modelo?'
        default:
            return 'Não trabalhamos com este tipo de automóvel aqui.'
    }
}

console.log(vendaCarros('hatch'));
console.log(vendaCarros('motocicleta'));
console.log(vendaCarros('sedan'));
console.log(vendaCarros('caminhonete'));
console.log(vendaCarros('jetski'));

