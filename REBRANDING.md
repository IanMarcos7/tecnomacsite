# Rebranding do site Tecnomac

## 1. Diagnóstico do site anterior (salvo em `_legado/`)

**Visual**
- Hierarquia fraca: o logo aparecia duas vezes no topo (faixa vermelha + header fixo) e o hero tinha só um `h2`.
- Vermelho usado como fundo de bloco inteiro; o amarelo só aparecia em hovers. Não havia sistema de cores nem de espaçamento.
- Cards de peças com fotos de catálogo de proporções e fundos diferentes, o que deixava a página com aparência de loja genérica.
- Fonte única (Montserrat), sem contraste entre títulos e texto.

**UX**
- Três menus diferentes (header fixo escondido, menu estático e hambúrguer) e menu mobile só dentro do header escondido.
- Nenhum horário de funcionamento, nem link "Como chegar". Telefones sem `tel:` clicável.
- O guincho, um diferencial forte, aparecia só como um card.
- Seção de peças com 18 cards e botões "Ver mais/Ver menos", difícil de escanear.
- Não havia formulário de orçamento.

**Responsividade**
- O menu desaparecia no mobile até o usuário rolar a página.
- `.container img { height: 80px }` afetava qualquer imagem dentro de container.
- Iframe do mapa com `width="600"` fixo e textos justificados no mobile.

**Performance**
- `fototec.png` (hero) com **4,8 MB**; fotos de serviços com até **11,7 MB**.
- Pastas duplicadas (`pecas`/`peças`, `servicos`/`serviços`), cerca de 39 MB de imagens.
- Font Awesome completo (cerca de 100 KB) carregado para usar só 5 ícones.
- Imagens sem `width`/`height` (layout shift) e sem `loading="lazy"`.

**SEO e acessibilidade**
- `<title>` era só "Tecnomac". Não havia meta description, Open Graph nem dados estruturados.
- Nenhum `h1`. Logo do topo com `alt=""`.
- Link `<a>` do WhatsApp dentro do `<head>` (HTML inválido).
- Botão hambúrguer sem `aria-expanded`, sem foco visível e sem "pular para o conteúdo".
- Iframe sem `title`.

## 2. Identidade extraída

| Item | Valor |
|---|---|
| Vermelho da marca (logo) | `#DF2924` |
| Amarelo da marca (logo) | `#FFE03F` |
| Razão social | Tecnomac Comércio de Peças e Assistência Técnica LTDA |
| Matriz | Rodovia SC-410, km 16, nº 3558 – Centro – Canelinha/SC – 88230-000 |
| Loja | Avenida Coleira, nº 794 – Praça – Tijucas/SC |
| WhatsApp | (48) 3264-0808 |
| Telefone | (48) 3264-0806 |
| Guincho | (48) 98809-1456 (pintado no guincho e listado na página Alboom) |
| E-mail | tecnomac01@hotmail.com |
| Horário (Google) | Seg–sex 07:00–11:50 e 13:00–17:50 · Sáb 07:00–11:50 · Dom fechado |
| Google | Nota 4,1, com 15 avaliações (em 17/11/2026) |
| Instagram | @tecnomac.sc |

## 3. Direção visual

- **Paleta:** grafite `#121417` como base escura, "concreto" `#F5F3EF` como fundo claro. O vermelho da marca fica reservado para CTAs, barras de destaque e detalhes, e o amarelo para acentos sobre fundo escuro (rótulos, ícones, palavra-chave do título).
  - O vermelho `#DF2924` com texto branco tem contraste de 4,7:1 (AA). Para texto vermelho sobre fundo claro usamos `#C21F1B` (5,4:1).
  - O amarelo aparece **só sobre o grafite**, porque amarelo sobre o vermelho não passa no AA para texto pequeno.
- **Tipografia:** **Barlow Condensed** (600/700/800) nos títulos e **Barlow** (400–700) no texto. A família Barlow foi desenhada a partir das placas de rodovia, o que combina com o universo de estrada e transporte.
- **Estilo:** blocos sólidos, cantos pouco arredondados, faixas zebradas sutis (sinalização de segurança) e microinterações leves (hover em cards, entrada suave ao rolar). Tudo respeita `prefers-reduced-motion`.

## 4. Estrutura nova

Header fixo → Hero → Números → Sobre + Unidades → Serviços (6) → Destaque Guincho → Peças → Diferenciais → Galeria → Avaliações → Contato (dados, horário com status "aberto agora", formulário → WhatsApp) → Mapa → Footer, mais o botão flutuante de WhatsApp.

## 5. Arquivos

```
index.html            página única, semântica, com JSON-LD AutoRepair
css/styles.css        mobile-first, tokens em :root
js/main.js            menu, link ativo, animações, status de horário, formulário → WhatsApp
assets/img/           imagens otimizadas (WebP + JPG de fallback)
assets/icons/         favicons e ícones do manifest
favicon.ico, site.webmanifest, robots.txt, sitemap.xml
_legado/              (não versionado) HTML/CSS do site anterior — o original está no histórico do Git
img/                  imagens antigas, que o novo site não usa mais
```

## 6. Pendências

1. **Galeria:** usa fotos do Instagram @tecnomac.sc (equipe e guincho) e do perfil do Google enviadas pela própria Tecnomac (pátio e prédio). Fotos de clientes no Google não foram usadas (direitos do autor). Fotos novas da área interna, da equipe trabalhando e da loja de peças deixam a galeria ainda melhor.
2. **Ano de fundação:** o site antigo dizia "desde 1980 / +40 anos", mas o CNPJ registra abertura em 14/11/1991. Confirme qual informação usar (o site mantém "+40 anos").
3. **Endereço:** o site antigo dizia "SC-410, **km 16**", mas a página Alboom diz "**km 12**". Confirme também o nome da via em Tijucas ("Avenida Coleira").
4. **Telefone e WhatsApp da loja de Tijucas**, se forem diferentes da matriz.
5. **Guincho:** confirme o número (48) 98809-1456 e se o atendimento é 24h (se for, vale destacar).
6. **Avaliações:** o site mostra 3 trechos públicos do Google. Para exibir avaliações completas com nome e nota, envie as que quiser destacar.
7. **CNPJ** para o rodapé (opcional, mas passa confiança).
8. **Domínio:** canonical, Open Graph e sitemap usam `https://mecanicatecnomac.com.br/`. Ajuste se o domínio for outro.
9. **Marcas atendidas** (Volvo, Scania, Mercedes etc.) e **serviços extras** (freios, câmbio, elétrica, ar-condicionado?) para enriquecer a seção de serviços.
10. **Fotos de banco de imagens (teste):** nos cards de serviços, só a foto do guincho é da Tecnomac. As outras 5 (mecânica, injeção, bomba injetora, borracharia e peças) e as fotos de produto das peças vieram do site antigo e parecem ser de banco de imagens ou de fornecedores. O ideal é trocar por fotos reais e confirmar os direitos de uso. Ficam em `assets/img/servicos/` e `assets/img/pecas/`.
11. A pasta `img/` antiga (cerca de 39 MB) pode ser apagada depois de validar o novo site.
