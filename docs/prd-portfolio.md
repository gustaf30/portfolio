# PRD — Portfolio Pessoal

**Autor:** Gustavo Ferraz
**Data:** Fevereiro 2026 | v1.0
**Stack principal:** TypeScript & Python

---

## 1. Visão Geral do Produto

### 1.1 Objetivo

Desenvolver um portfolio pessoal moderno, performático e responsivo que funcione como vitrine profissional do desenvolvedor Gustavo Ferraz. O site deve apresentar projetos, habilidades técnicas, experiência acadêmica e formas de contato de maneira visualmente atraente e intuitiva.

### 1.2 Problema

Atualmente, a presença online se resume ao perfil do GitHub (gustaf30), que embora contenha projetos relevantes como o CheerConnect e experimentos em machine learning, não comunica de forma eficaz o escopo completo das habilidades e da trajetória profissional. Um portfolio dedicado é essencial para se posicionar no mercado e complementar o currículo acadêmico da UTFPR.

### 1.3 Público-Alvo

- Recrutadores e empresas de tecnologia buscando desenvolvedores full stack
- Potenciais clientes para projetos freelance
- Comunidade tech e colegas da área que desejam conhecer o trabalho
- Professores e avaliadores acadêmicos (contextualização dos projetos)

### 1.4 Métricas de Sucesso

| Métrica | Meta (3 meses) | Meta (6 meses) |
|---------|-----------------|-----------------|
| Visitantes únicos/mês | 200+ | 500+ |
| Tempo médio na página | > 1 min 30s | > 2 min |
| Taxa de contato (CTA) | 3% | 5% |
| Score Lighthouse (Perf) | > 90 | > 95 |
| Posição Google (nome) | Top 10 | Top 3 |

---

## 2. Requisitos Funcionais

### 2.1 Estrutura de Páginas / Seções

#### 2.1.1 Hero / Landing

- Nome, título profissional e tagline impactante
- Foto profissional ou avatar estilizado
- Links rápidos: [GitHub](https://github.com/gustaf30) · [LinkedIn](https://www.linkedin.com/in/gustavo-p-ferraz/) · [E-mail](mailto:gustavoferraz405@gmail.com)
- CTA principal: "Ver Projetos" ou "Entrar em Contato"
- Animação sutil de entrada (fade-in ou typing effect)

#### 2.1.2 Sobre Mim

- Resumo profissional e pessoal (2–3 parágrafos)
- Formação acadêmica (Ciência da Computação — UTFPR)
- Stack principal com ícones visuais
- Interesses pessoais (xadrez, games, viagens) para humanizar o perfil

#### 2.1.3 Projetos

Seção principal do portfólio. Cada card de projeto deve conter:

- Thumbnail ou screenshot do projeto
- Título e descrição curta (2 linhas)
- Tags de tecnologia utilizadas
- Links para demo (se disponível) e repositório GitHub
- Modal ou página de detalhe com: descrição completa, desafios técnicos, arquitetura, aprendizados

**Projetos prioritários para destaque (fixados no GitHub):**

| Projeto | Descrição | Stack |
|---------|-----------|-------|
| **CheerConnect** | Rede social vertical para a comunidade brasileira de cheerleading — plataforma de conexão e interação (TCC) | TypeScript, React, Node.js |
| **Accodal Gustavo** | Projeto de desafio técnico — Accodal. Demonstração de habilidades em processo seletivo | TypeScript |
| **Valor Disparador Boletos** | Sistema de disparo e gestão de boletos bancários | TypeScript |
| **Nexus** | Projeto Nexus — (confirmar descrição) | A definir |

#### 2.1.4 Habilidades / Tech Stack

- Grid visual com ícones das tecnologias (Devicons ou Simple Icons)
- Categorização: Frontend, Backend, Banco de Dados, DevOps, Ferramentas
- Indicador de proficiência ou tempo de experiência (opcional)

#### 2.1.5 Experiência / Timeline

Timeline vertical com marcos relevantes: projetos acadêmicos, trabalhos, certificações e conquistas relevantes.

#### 2.1.6 Contato

- Formulário de contato funcional (nome, e-mail, mensagem)
- Links diretos:
  - **GitHub:** [github.com/gustaf30](https://github.com/gustaf30)
  - **LinkedIn:** [linkedin.com/in/gustavo-p-ferraz](https://www.linkedin.com/in/gustavo-p-ferraz/)
  - **E-mail:** [gustavoferraz405@gmail.com](mailto:gustavoferraz405@gmail.com)
- Localização: Ponta Grossa, PR — Brasil
- Disponibilidade para trabalho remoto/híbrido

---

## 3. Requisitos Não Funcionais

### 3.1 Performance

- Lighthouse Performance Score > 90
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Imagens otimizadas com lazy loading e formatos modernos (WebP/AVIF)

### 3.2 Responsividade

Design mobile-first com breakpoints para: mobile (< 768px), tablet (768px – 1024px) e desktop (> 1024px). Todas as seções devem ser plenamente utilizáveis em qualquer dispositivo.

### 3.3 Acessibilidade

- Conformidade WCAG 2.1 nível AA
- Navegação completa via teclado
- Contraste adequado (ratio mínimo 4.5:1 para texto)
- Alt text em todas as imagens
- Suporte a leitores de tela (aria-labels)

### 3.4 SEO

- Meta tags otimizadas (title, description, Open Graph, Twitter Cards)
- Sitemap.xml e robots.txt configurados
- Structured Data (JSON-LD) para Person e WebSite
- URL canônica e domínio personalizado

### 3.5 Segurança

- HTTPS obrigatório
- Headers de segurança (CSP, X-Frame-Options, etc.)
- Proteção contra spam no formulário (honeypot + rate limiting)

---

## 4. Stack Técnica Recomendada

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Next.js 14+ (App Router) | SSR/SSG, performance, SEO nativo, experiência com React |
| Linguagem | TypeScript | Type safety, stack principal do dev |
| Estilização | Tailwind CSS + Framer Motion | Produtividade, design system, animações fluidas |
| CMS / Conteúdo | MDX ou Contentlayer | Projetos como Markdown, fácil manutenção |
| Deploy | Vercel | CI/CD integrado, preview deploys, analytics |
| Formulário | Resend ou EmailJS | Envio de e-mails sem backend dedicado |
| Analytics | Vercel Analytics / Plausible | Privacy-friendly, leve, sem cookies |
| Domínio | gustavoferraz.dev (sugestão) | Domínio .dev transmite profissionalismo |

---

## 5. Design e UX

### 5.1 Diretrizes Visuais

- Tema escuro como padrão (com toggle para tema claro)
- Paleta minimalista: fundo escuro (#0A0A0F), accent azul vibrante (#4361EE), texto claro (#E0E0E0)
- Tipografia: Inter ou Geist para corpo, JetBrains Mono para código
- Espaçamento generoso e hierarquia visual clara
- Micro-interações e hover effects sutis

### 5.2 Navegação

- Navbar fixa no topo com scroll suave entre seções (SPA feel)
- Menu hamburger no mobile com animação
- Indicador de seção ativa durante scroll
- Botão "Voltar ao topo" após scroll

### 5.3 Animações

Utilizar Framer Motion para: entrada de elementos ao entrar no viewport (scroll-triggered), transições entre páginas/seções, hover effects nos cards de projetos e animação do cursor ou elementos decorativos. Todas as animações devem respeitar `prefers-reduced-motion`.

---

## 6. Internacionalização (i18n)

O portfolio deve suportar dois idiomas: Português (BR) como padrão e Inglês como alternativa. Implementar com `next-intl` ou similar, com toggle de idioma visível no header. O conteúdo dos projetos e textos descritivos devem ser traduzidos manualmente para garantir qualidade.

---

## 7. Roadmap de Desenvolvimento

| Fase | Prazo | Entregas | Prioridade |
|------|-------|----------|------------|
| 1 — Setup | Semana 1 | Repo, Next.js, Tailwind, CI/CD Vercel, estrutura base | P0 — Crítica |
| 2 — Core | Semanas 2–3 | Hero, Sobre, Projetos (cards + detalhe), Tech Stack | P0 — Crítica |
| 3 — Polish | Semana 4 | Animações, dark/light mode, responsividade, formulário de contato | P1 — Alta |
| 4 — SEO | Semana 5 | Meta tags, OG images, sitemap, structured data, analytics | P1 — Alta |
| 5 — i18n | Semana 6 | Tradução EN, toggle de idioma, testes cross-browser | P2 — Média |
| 6 — Extras | Semana 7+ | Modo terminal easter egg, integração GitHub API | P3 — Baixa |

---

## 8. Features Bônus (Nice-to-Have)

- Modo terminal: easter egg interativo simulando um terminal com comandos sobre o dev
- Integração com GitHub API para mostrar stats (contribuições, repos, linguagens) em tempo real
- Página de "Uses" (setup, ferramentas, hardware que utiliza)
- Seção de certificações e cursos relevantes
- Guestbook interativo (visitantes deixam mensagens)

---

## 9. Critérios de Aceite

1. Todas as seções core (Hero, Sobre, Projetos, Skills, Contato) implementadas e funcionais
2. Score Lighthouse > 90 em Performance, Accessibility, Best Practices e SEO
3. Layout 100% responsivo testado em Chrome, Firefox e Safari (mobile e desktop)
4. Formulário de contato enviando e-mails corretamente
5. Deploy automatizado via Vercel com domínio personalizado
6. Código limpo, tipado (TypeScript strict) e documentado
7. README.md completo no repositório com instruções de setup

---

## 10. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Escopo excessivo (feature creep) | Alto | Priorização rigorosa (P0 primeiro), features bônus só após MVP |
| Conflito com prazo do TCC | Alto | MVP enxuto em 4 semanas, iterações incrementais após |
| Design amador | Médio | Usar referências de portfolios premiados (Awwwards), templates Tailwind |
| Conteúdo insuficiente | Médio | Documentar projetos existentes com detalhes; CheerConnect como case principal |

---

*Documento preparado para Gustavo Ferraz — Fevereiro 2026 | gustaf30*
