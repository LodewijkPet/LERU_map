from pathlib import Path
import sys

import pypdfium2 as pdfium

pdf_path = Path(sys.argv[1]).resolve()
output_dir = Path(sys.argv[2]).resolve()
output_dir.mkdir(parents=True, exist_ok=True)

pdf = pdfium.PdfDocument(str(pdf_path))
for index in range(len(pdf)):
    page = pdf[index]
    bitmap = page.render(scale=2.0, rotation=0)
    image = bitmap.to_pil()
    image.save(output_dir / f"page-{index + 1:03d}.png", format="PNG", optimize=True)
    page.close()
pdf.close()
print(f"Rendered {index + 1 if 'index' in locals() else 0} pages to {output_dir}")

