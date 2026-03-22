# GitHub Pages Bundle

Tudo o que faz parte do site institucional fica centralizado nesta pasta.

## Conteudo

1. `index.html`, `404.html`, `robots.txt`, `.nojekyll`: arquivos publicados.
2. `assets/`: CSS, JS e imagens.
3. `preview-pages.ps1`: preview local rapido.
4. `deploy-pages.yml`: workflow canonico do GitHub Pages.
5. `sync-githubpages.ps1`: copia o bundle para outro local/repositorio e instala o workflow em `.github/workflows/`.
6. `preview-pages.cmd` e `sync-githubpages.cmd`: wrappers Windows para contornar bloqueio de `ExecutionPolicy`.

## Preview local

```powershell
.\githubpages\preview-pages.ps1 -Port 8080
```

Ou no Windows:

```bat
githubpages\preview-pages.cmd -Port 8080
```

## Sincronizar para outro repositorio/local

```powershell
.\githubpages\sync-githubpages.ps1 -TargetRoot C:\caminho\do\destino
```

Ou no Windows:

```bat
githubpages\sync-githubpages.cmd -TargetRoot C:\caminho\do\destino
```

Isso copia:

1. Todo o conteudo de `githubpages/` para `destino/githubpages/`.
2. O workflow de deploy para `destino/.github/workflows/deploy-pages.yml`.

Observacao: o GitHub exige que workflows reais fiquem em `.github/workflows/`. Por isso o repositório principal ainda mantem uma copia operacional nesse caminho.
