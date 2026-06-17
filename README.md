# 💰 Finança Fácil

Aplicativo PWA (Progressive Web App) de organização financeira pessoal, simples, intuitivo e responsivo. Pensado para iniciantes que usam o celular no dia a dia, mas funciona muito bem também no desktop.

O foco do app é **clareza financeira mensal** — não é uma ferramenta de investimentos. A ideia é ajudar você a entender para onde vai o seu dinheiro, controlar o cartão de crédito, construir uma reserva de emergência e manter uma rotina financeira saudável.

---

## ✨ Funcionalidades

- **Dashboard principal**: renda, gastos, valor restante, percentual comprometido da renda e progresso da reserva de emergência.
- **Controle mensal**: cada um dos 12 meses do ano guarda seus próprios dados de forma independente. Trocar de mês carrega automaticamente os dados daquele mês.
- **Raio-X Financeiro**: renda mensal, gastos fixos, dívidas e cálculo automático do total restante.
- **Gastos Variáveis**: lançamentos diários com data, descrição, categoria (Alimentação, Transporte, Lazer, Saúde, Compras, Outros), valor e forma de pagamento. Múltiplos gastos por dia.
- **Controle de Cartão**: limite, valor da fatura, parcelas em aberto e barra de uso do limite.
- **Ajustes e Cortes**: defina metas de economia, registre cortes realizados e compare valores antes/depois.
- **Reserva de Emergência**: meta financeira, valor guardado e barra de progresso visual.
- **Rotina Mensal**: checklist com itens marcáveis (revisar gastos, atualizar orçamento, pagar cartão, guardar reserva).
- **Reinício Anual**: ao fim do ano, inicie um novo ciclo mantendo o histórico do ano anterior salvo.
- **Comparativo**: gráficos de renda vs. gastos mês a mês e distribuição de gastos por categoria (pizza).
- **Modo escuro** com alternância manual.
- **Mensagens motivacionais** simples baseadas no seu desempenho do mês.
- **100% offline**: os dados ficam salvos no `localStorage` do navegador — sem backend, sem login, sem envio de dados para servidores.
- **Instalável (PWA)**: pode ser adicionado à tela inicial do celular e funciona como app nativo.

---

## 🛠️ Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [React Router (HashRouter)](https://reactrouter.com/) — compatível com GitHub Pages sem configuração extra
- [Recharts](https://recharts.org/) — gráficos
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — manifest + service worker
- Armazenamento local via `localStorage`

---

## 📁 Estrutura de pastas

```
finance-pwa/
├── public/
│   └── icons/              # Ícones do PWA (192x192 e 512x512)
├── src/
│   ├── components/         # Componentes reutilizáveis de UI
│   │   ├── Layout.jsx       # Layout geral (sidebar desktop + bottom nav mobile)
│   │   ├── Sidebar.jsx       # Menu lateral (desktop)
│   │   ├── BottomNav.jsx     # Menu inferior (mobile)
│   │   ├── MonthSelector.jsx # Seletor de mês (Jan-Dez)
│   │   ├── Card.jsx          # Card padrão
│   │   ├── ProgressBar.jsx   # Barra de progresso reutilizável
│   │   └── InputField.jsx    # Input padronizado (texto, número, select, data)
│   ├── pages/               # Páginas/telas do app
│   │   ├── Dashboard.jsx     # Resumo do mês
│   │   ├── RaioX.jsx         # Raio-X Financeiro
│   │   ├── Gastos.jsx        # Gastos variáveis
│   │   ├── Cartao.jsx        # Controle de cartão
│   │   ├── Ajustes.jsx       # Ajustes e cortes
│   │   ├── Reserva.jsx       # Reserva de emergência
│   │   ├── Rotina.jsx        # Checklist mensal
│   │   ├── Comparativo.jsx   # Gráficos e comparação entre meses
│   │   ├── Ciclo.jsx         # Reinício anual
│   │   └── Mais.jsx          # Menu "mais" (mobile)
│   ├── context/
│   │   ├── FinanceContext.jsx # Estado global financeiro (mês/ano selecionado, dados)
│   │   └── ThemeContext.jsx   # Estado global do tema (claro/escuro)
│   ├── storage/
│   │   └── storage.js        # Camada de persistência (localStorage) e schema dos dados
│   ├── utils/
│   │   └── calculations.js   # Funções de cálculo (resumos, percentuais, formatação)
│   ├── App.jsx               # Rotas (HashRouter)
│   ├── main.jsx               # Ponto de entrada
│   └── index.css              # Estilos globais + Tailwind
├── vite.config.js            # Configuração do Vite + PWA + Tailwind
├── index.html
└── package.json
```

### Como os dados são organizados

Tudo é salvo em uma única chave do `localStorage` (`financa-facil:data`), com esta estrutura:

```js
{
  currentYear: 2026,
  years: {
    "2026": {
      months: {
        "0": { /* dados de Janeiro */ },
        "1": { /* dados de Fevereiro */ },
        // ...
      }
    },
    "2025": { /* histórico do ano anterior, após reinício anual */ }
  }
}
```

Cada mês guarda: `raioX`, `gastosVariaveis`, `cartao`, `ajustes`, `reserva` e `rotina` — totalmente independentes entre os meses.

---

## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18 ou superior
- npm (vem junto com o Node.js)

### Passos

```bash
# 1. Instale as dependências
npm install

# 2. Rode o servidor de desenvolvimento
npm run dev
```

O app abrirá em `http://localhost:5173`. Qualquer alteração no código atualiza a página automaticamente.

### Build de produção (local)

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy

### ⚠️ Antes de tudo: ajuste o `base` no `vite.config.js`

No topo do arquivo `vite.config.js`, existe a opção:

```js
export default defineConfig({
  base: '/financa-facil/',
  // ...
})
```

- **GitHub Pages** (projeto hospedado em `https://SEU_USUARIO.github.io/NOME_DO_REPO/`): troque `financa-facil` pelo nome exato do seu repositório. Ajuste também `start_url` e `scope` dentro do bloco `manifest` para o mesmo caminho.
- **Vercel** (ou domínio próprio, ex: `https://meuapp.vercel.app/`): troque para `base: '/'` e ajuste `start_url`/`scope` no manifest para `'/'`.

---

### Opção 1 — Deploy no GitHub Pages (automático com GitHub Actions)

1. Crie um repositório no GitHub (ex: `financa-facil`) e envie o projeto:

   ```bash
   git init
   git add .
   git commit -m "Primeira versão do Finança Fácil"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/financa-facil.git
   git push -u origin main
   ```

2. Ajuste o `base` no `vite.config.js` para `'/financa-facil/'` (ou o nome do seu repositório), assim como `start_url` e `scope` no `manifest`.

3. No GitHub, vá em **Settings → Pages** e em **Build and deployment → Source**, selecione **GitHub Actions**.

4. O workflow já incluso em `.github/workflows/deploy.yml` vai automaticamente buildar e publicar o app a cada push na branch `main`.

5. Após alguns minutos, o app estará disponível em:
   ```
   https://SEU_USUARIO.github.io/financa-facil/
   ```

#### Deploy manual (alternativa sem Actions)

```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```
E em **Settings → Pages**, configure a branch `gh-pages` como fonte.

---

### Opção 2 — Deploy na Vercel

1. Ajuste `vite.config.js`:
   ```js
   base: '/',
   ```
   E no `manifest`, ajuste `start_url: '/'` e `scope: '/'`.

2. Envie o projeto para um repositório no GitHub/GitLab/Bitbucket.

3. Acesse [vercel.com](https://vercel.com), clique em **Add New → Project** e importe o repositório.

4. A Vercel detecta automaticamente que é um projeto Vite. Configurações padrão:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Clique em **Deploy**. Em poucos minutos seu app estará em uma URL como `https://financa-facil.vercel.app`.

---

## 📱 Instalando como app (PWA)

Depois de publicado (HTTPS é obrigatório para PWA funcionar):

- **Android (Chrome)**: abra o site → menu (⋮) → "Adicionar à tela inicial" ou "Instalar app".
- **iPhone (Safari)**: abra o site → botão de compartilhamento → "Adicionar à Tela de Início".
- **Desktop (Chrome/Edge)**: ícone de instalação na barra de endereço, ou menu → "Instalar Finança Fácil".

O app funciona offline após a primeira visita, graças ao Service Worker gerado automaticamente pelo `vite-plugin-pwa`.

---

## 🎨 Personalização

- **Cores**: o app usa a paleta padrão do Tailwind (`emerald`, `slate`, `rose`, `amber`, `blue`). Para mudar a identidade visual, troque essas classes nos componentes em `src/components/`.
- **Categorias de gastos**: edite o array `CATEGORIAS` em `src/storage/storage.js`.
- **Formas de pagamento**: edite o array `FORMAS_PAGAMENTO` em `src/storage/storage.js`.
- **Itens da rotina mensal**: edite o array `ROTINA_PADRAO` em `src/storage/storage.js`.
- **Ícone do app**: substitua os arquivos em `public/icons/icon-192.png` e `public/icons/icon-512.png` (mantenha os mesmos nomes e tamanhos).

---

## 🔒 Privacidade

Todos os dados ficam armazenados **apenas no navegador do usuário** (`localStorage`). Não há backend, autenticação ou envio de informações para qualquer servidor. Limpar os dados do site no navegador apaga permanentemente as informações — não há sincronização em nuvem nesta versão.

---

## 🗺️ Próximos passos sugeridos

- Exportar/importar backup dos dados em `.json`.
- Sincronização opcional via conta (Google Drive, Supabase, etc.).
- Notificações push para lembrar da rotina mensal.
- Suporte a múltiplas reservas/metas (ex: viagem, emergência, etc.).
