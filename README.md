# Sobre o Projeto
É um teste técnico que estou fazendo.
** **
Criei uma plataforma que mostra os dados das escolas públicas de Chicago através da API oficial da cidade: [https://data.cityofchicago.org/resource/9xs2-f89t.json](https://data.cityofchicago.org/resource/9xs2-f89t.json)

O foco principal foi consumir e explorar os dados da API - implementei 6 visualizações diferentes explorando todos os campos importantes do JSON.
** **

## Funcionalidades Implementadas

### Dashboard Principal (5 visualizações)
6 Cards principais: Total de escolas, ES/HS, médias de Safety/Instruction/Teachers

Top 5 Safest Schools (tabela)

Top 5 Instruction (tabela)

Performance colorida por score (verde≥80, amarelo≥60, vermelho)

### Lista de Escolas (Home.jsx)
Filtros avançados: Tipo (ES/HS), Safety Rating (Very Weak → Very Strong)

Cards com estrelas de safety no topo

Loading states + empty states

### Detalhes da Escola (SchoolDetails.jsx)
Google Maps interativo com pin da escola

6 Performance Cards (Safety, Instruction, Teachers, Environment, Leaders, Family)

Botão PDF oficial (link da API)

6 Info Cards (endereço, telefone, comunidade, network, etc)
** **

## Tech Stack
Frontend: React 18 + React Router
Estilização: TailwindCSS + Gradientes + Glassmorphism
API: Chicago Public Schools (SODA API)
Maps: Google Maps Embed
Dados: 500+ escolas com 50+ campos cada



## Como Rodar
```bash 
git clone [seu-repo]
npm install  
npm run dev
``` 
Por conta do tempo curto, foquei 100% em explorar e visualizar os dados da API. Não fiz mobile/responsivo completo porque priorizei:

Consumir todos os campos JSON para melhor analise

6 visualizações diferentes

Filtros avançados com estrelas

Performance cards coloridos

O layout funciona perfeitamente em desktop e tem responsividade básica em mobile.

Problemas Conhecidos
PDF Reports não abrem - Os links existem no JSON (link_.url), mas alguns PDFs estão quebrados na API oficial da cidade.

Alguns pontos que eu faria caso Houvesse mais tempo
** **
Criar algo para comparar uma escola com a outra

Melhorar a usabilidade do mapa

Adicionar Loading Skeletons
