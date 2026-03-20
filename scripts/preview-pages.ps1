[CmdletBinding()]
param(
    [int]$Port = 8080,
    [switch]$OpenBrowser
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$docsPath = Join-Path $projectRoot "docs"
$previewUrl = "http://localhost:$Port"

if (-not (Test-Path $docsPath)) {
    throw "Pasta docs nao encontrada em $docsPath"
}

Write-Host ""
Write-Host "Preview comercial do Comanda Flex PDV" -ForegroundColor Cyan
Write-Host "Pasta publicada: $docsPath"
Write-Host "URL local: $previewUrl"
Write-Host ""
Write-Host "Checklist rapido de revisao:" -ForegroundColor Yellow
Write-Host " - Hero e chamada principal"
Write-Host " - Botoes de contato"
Write-Host " - Modulos e FAQ"
Write-Host " - Layout mobile e desktop"
Write-Host " - Links externos"
Write-Host ""

if ($OpenBrowser) {
    Start-Process $previewUrl | Out-Null
}

$pyLauncher = Get-Command py -ErrorAction SilentlyContinue
if ($pyLauncher) {
    & py -3 -m http.server $Port -d $docsPath
    exit $LASTEXITCODE
}

$python = Get-Command python -ErrorAction SilentlyContinue
if ($python) {
    & python -m http.server $Port -d $docsPath
    exit $LASTEXITCODE
}

throw "Python nao encontrado no PATH. Instale Python ou use outro servidor estatico."
