from flask import Flask, send_file
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

app = Flask(__name__)

@app.route("/generate-certificate", methods=["GET"])
def generate_certificate():
    name = "Harshiii"  # For now, we’ll hardcode your name
    
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(width / 2, height - 100, "Certificate of Completion")

    c.setFont("Helvetica", 18)
    c.drawCentredString(width / 2, height - 200, f"Presented to {name}")

    c.setFont("Helvetica-Oblique", 14)
    c.drawCentredString(width / 2, height - 250, "For successfully completing the course.")

    c.showPage()
    c.save()

    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name="certificate.pdf", mimetype="application/pdf")
