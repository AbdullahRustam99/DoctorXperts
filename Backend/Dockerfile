
FROM python:3.10

# Pehle root user hai by default, to yahan packages install karo
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0

# Ab user add karo aur switch karo
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app


COPY --chown=user ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN python -m spacy download en_core_web_lg
RUN python -c "from doctr.models import ocr_predictor; ocr_predictor(pretrained=True)"

COPY --chown=user . /app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
