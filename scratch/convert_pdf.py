import base64
import os

pdf_path = r'assets/Naved Siddiqui - Product Lead_Business Analyst.pdf'
js_path = r'assets/resume_base64.js'

if os.path.exists(pdf_path):
    with open(pdf_path, 'rb') as f:
        pdf_data = f.read()
    encoded = base64.b64encode(pdf_data).decode('utf-8')
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(f'window.resumeBase64 = "{encoded}";\n')
    print("Success: Base64 JS file generated!")
else:
    print("Error: PDF file not found at " + pdf_path)
