param(
    [int]$Port = 8080
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$docsPath = Join-Path $projectRoot "docs"

if (-not (Test-Path $docsPath)) {
    throw "Pasta docs nao encontrada em $docsPath"
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
