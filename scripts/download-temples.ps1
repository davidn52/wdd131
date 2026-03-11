<#
Download temple images by scraping the page's og:image meta tag.
Run from the repository root in PowerShell:
  .\scripts\download-temples.ps1

This will create an `images` folder (if missing) and save the images there.
#>

# Ensure TLS1.2 for secure connections
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$items = @(
  @{ url = 'https://www.churchofjesuschrist.org/temples/salt-lake-temple?lang=eng'; filename = 'salt-lake-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/laie-hawaii-temple?lang=eng'; filename = 'laie-hawaii-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/bern-switzerland-temple?lang=eng'; filename = 'bern-switzerland-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/london-england-temple?lang=eng'; filename = 'london-england-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/seoul-korea-temple?lang=eng'; filename = 'seoul-korea-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/accra-ghana-temple?lang=eng'; filename = 'accra-ghana-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/johannesburg-south-africa-temple?lang=eng'; filename = 'johannesburg-south-africa-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/mexico-city-mexico-temple?lang=eng'; filename = 'mexico-city-temple.jpg' },
  @{ url = 'https://www.churchofjesuschrist.org/temples/sao-paulo-brazil-temple?lang=eng'; filename = 'sao-paulo-brazil-temple.jpg' }
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Resolve-Path (Join-Path $scriptDir '..')
$imagesDir = Join-Path $repoRoot 'images'
if (-not (Test-Path $imagesDir)) { New-Item -Path $imagesDir -ItemType Directory | Out-Null }

foreach ($item in $items) {
  Write-Host "Processing $($item.url) ..."
  try {
    $resp = Invoke-WebRequest -Uri $item.url -Headers @{ 'User-Agent' = 'Mozilla/5.0' } -UseBasicParsing -ErrorAction Stop -Verbose:$false
    $html = $resp.Content
    $m = [regex]::Match($html, '<meta[^>]+property=["'']og:image["''][^>]*content=["'']([^"']+)["'']', [Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if (-not $m.Success) {
      $m = [regex]::Match($html, '<meta[^>]+name=["'']twitter:image["''][^>]*content=["'']([^"']+)["'']', [Text.RegularExpressions.RegexOptions]::IgnoreCase)
    }
    if ($m.Success) {
      $imgUrl = $m.Groups[1].Value
      Write-Host "Found image URL: $imgUrl"
      $outPath = Join-Path $imagesDir $item.filename
      Invoke-WebRequest -Uri $imgUrl -OutFile $outPath -Headers @{ 'User-Agent' = 'Mozilla/5.0' } -ErrorAction Stop -Verbose:$false
      Write-Host "Saved $outPath"
    } else {
      Write-Host "No image meta tag found for $($item.url) -- skipping" -ForegroundColor Yellow
    }
  } catch {
    Write-Host "Error downloading from $($item.url): $($_.Exception.Message)" -ForegroundColor Red
  }
}

Write-Host "Done. Check the images folder: $imagesDir"
