[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$TargetRoot
)

$sourceRoot = Split-Path -Parent $PSScriptRoot
$sourcePagesDir = Join-Path $sourceRoot "githubpages"
$resolvedTargetRoot = [System.IO.Path]::GetFullPath($TargetRoot)
$targetPagesDir = Join-Path $resolvedTargetRoot "githubpages"
$targetWorkflowDir = Join-Path $resolvedTargetRoot ".github\\workflows"
$sourceWorkflow = Join-Path $sourcePagesDir "deploy-pages.yml"
$targetWorkflow = Join-Path $targetWorkflowDir "deploy-pages.yml"

if (-not (Test-Path $sourcePagesDir)) {
    throw "Pasta githubpages nao encontrada em $sourcePagesDir"
}

if (-not (Test-Path $sourceWorkflow)) {
    throw "Workflow de deploy nao encontrado em $sourceWorkflow"
}

New-Item -ItemType Directory -Path $resolvedTargetRoot -Force | Out-Null
New-Item -ItemType Directory -Path $targetPagesDir -Force | Out-Null
New-Item -ItemType Directory -Path $targetWorkflowDir -Force | Out-Null

Write-Host ""
Write-Host "Sincronizando bundle do GitHub Pages" -ForegroundColor Cyan
Write-Host "Origem:  $sourcePagesDir"
Write-Host "Destino: $targetPagesDir"
Write-Host ""

Get-ChildItem -Path $sourcePagesDir -Force |
    Where-Object { $_.Name -ne "deploy-pages.yml" } |
    ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $targetPagesDir -Recurse -Force
    }

Copy-Item -Path $sourceWorkflow -Destination $targetWorkflow -Force

Write-Host "Arquivos do site sincronizados em: $targetPagesDir" -ForegroundColor Green
Write-Host "Workflow copiado para:          $targetWorkflow" -ForegroundColor Green
Write-Host ""
Write-Host "Se o repositorio de destino ja usa GitHub Pages por /githubpages, basta commitar e sincronizar." -ForegroundColor Yellow
