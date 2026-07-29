param(
    [Parameter(Mandatory = $true)]
    [string[]]$InputDocx,

    [Parameter(Mandatory = $true)]
    [string[]]$OutputPdf
)

if ($InputDocx.Count -ne $OutputPdf.Count) {
    throw "InputDocx and OutputPdf must contain the same number of paths."
}

$word = New-Object -ComObject Word.Application

try {
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $word.AutomationSecurity = 3

    for ($index = 0; $index -lt $InputDocx.Count; $index++) {
        $inputPath = [System.IO.Path]::GetFullPath($InputDocx[$index])
        $outputPath = [System.IO.Path]::GetFullPath($OutputPdf[$index])
        $document = $word.Documents.Open($inputPath, $false, $true, $false)

        try {
            $document.ExportAsFixedFormat($outputPath, 17)
        }
        finally {
            $document.Close(0)
        }

        Write-Output $outputPath
    }
}
finally {
    $word.Quit()
}
