# 🚀 PTDev TITAN - Trilha de Front-end

Olá! Bem-vindo(a)! 👋

Este espaço serve para guardar os desafios e projetos que estou desenvolvendo durante o **Programa Trainee da TITAN** (Empresa Júnior de Engenharia de Computação da UFBA).

**Abaixo você pode conferir os detalhes do projeto final que desenvolvi!**

---

# 🔴 PokéDex — Explore o Mundo Pokémon

**🌍 Acesse a aplicação ao vivo:** [pokedex-luanfzll.vercel.app](https://pokedex-luanfzll.vercel.app/)

**🎨 Design do Projeto:** [Figma — PokéDex PT-Front](https://www.figma.com/design/QddyMOmXcCtQ5sqPtnCm5G/Poked%C3%A9x---PT-Front?node-id=0-1&p=f)

A PokéDex é uma aplicação front-end robusta desenvolvida para explorar o vasto universo Pokémon. O projeto foi construído com foco em **performance de renderização**, **gerenciamento de estado complexo** e **experiência do usuário (UX)**, utilizando a PokéAPI como fonte primária de dados.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido para consolidar conhecimentos avançados em React, focando em desafios reais de desenvolvimento:

- **Otimização de Performance** — Gerenciamento de uma API com mais de 1000 registros, garantindo que a interface permaneça fluida durante a rolagem.
- **Persistência de Dados** — Uso de armazenamento local para garantir que as escolhas do usuário sejam mantidas.
- **Arquitetura de Busca** — Implementação de uma lógica de busca que resolve limitações da API externa através de indexação local.

---

## 🚀 Tecnologias e Bibliotecas

| Tecnologia | Descrição |
|---|---|
| [React](https://react.dev/) | Biblioteca principal para construção da interface declarativa |
| [Vite](https://vitejs.dev/) | Tooling de build de próxima geração para um desenvolvimento rápido |
| [Tailwind CSS](https://tailwindcss.com/) | Framework CSS utilitário para design responsivo e customizável |
| [Lucide React](https://lucide.dev/) | Biblioteca de ícones vetoriais leves |
| [PokéAPI](https://pokeapi.co/) | RESTful API para consumo de dados do ecossistema Pokémon |

---

## ✨ Funcionalidades

### 🔄 Infinite Scroll (Paginação sob Demanda)
Implementação de carregamento contínuo conforme o usuário rola a página. A aplicação gerencia requisições em lotes (limit/offset), evitando o carregamento desnecessário de dados e proporcionando uma navegação sem interrupções por botões de "próximo".

### 🔍 Busca Inteligente com Indexação Local
Um dos maiores diferenciais técnicos. Para resolver a limitação da PokeAPI (que só permite busca por nome exato), a aplicação carrega um "dicionário" leve de todos os 1025 Pokémon no primeiro acesso. Isso permite buscas parciais instantâneas (ex: digitar "meta" e encontrar "Metagross") mesmo para Pokémon que ainda não foram carregados na tela.

### ❤️ Sistema de Favoritos
Funcionalidade que permite ao usuário colecionar seus Pokémon preferidos. Utiliza um sistema de filtragem dinâmica para alternar entre a visão global e a visão de favoritos sem perder o estado da aplicação.

### 💾 Persistência com LocalStorage
Garante que a lista de favoritos e a preferência de tema (Dark/Light Mode) persistam mesmo se o usuário fechar o navegador ou atualizar a página, utilizando hooks para sincronização com o armazenamento local.

### 🌓 Dark Mode Nativo
Suporte total a temas claro e escuro, integrado às variáveis de cores do Tailwind CSS, garantindo conforto visual e seguindo as tendências modernas de UI.

### 📱 Responsividade Mobile-First
Interface totalmente adaptável. O grid de cards utiliza breakpoints estratégicos para garantir uma visualização confortável desde smartphones compactos até monitores ultrawide.

---

## 🧠 Hooks Utilizados

| Hook | Aplicação no projeto |
|---|---|
| `useState` | Controle de listas de Pokémon, estados de loading, erros e alternância de temas. |
| `useEffect` | Sincronização com a API, listeners de evento de scroll e carregamento do dicionário de busca. |

### Hook Customizado — `useFavorites`
Abstração da lógica de persistência e manipulação de arrays de favoritos, permitindo que qualquer componente da aplicação acesse ou modifique os favoritos de forma limpa.

---

## 🏗️ Boas Práticas Aplicadas

- **Prevenção de Chaves Duplicadas:** Lógica de tratamento de estado que valida IDs antes da inserção, evitando bugs de renderização comuns em scrolls infinitos.
- **Debounce Pattern:** Otimização da barra de pesquisa com atraso planejado para reduzir o tráfego de rede.
- **Componentização:** Divisão da UI em componentes menores (`PokemonCard`, `Header`, `Loader`), facilitando a manutenção e testes.
- **Assets Profissionais:** Substituição de ícones de boilerplate por um favicon de Pokébola personalizado em SVG.

---

## 🔧 Como Rodar o Projeto

Este projeto faz parte de um monorepo com outros projetos de front-end. Para rodar a Pokédex localmente, siga os passos abaixo:

```bash
# 1. Clone o repositório principal
git clone https://github.com/luanfzll/PTDev-TITAN.git

# 2. Entre na pasta específica da PokéDex
cd PTDev-TITAN/projeto-pokedex

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
