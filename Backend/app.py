from fastapi import FastAPI, UploadFile , File , Request
from fastapi.middleware.cors import CORSMiddleware
from agents import Runner
from logging import getLogger
from reportanalysis import Report_Agent, extract_text
from chatbot import get_health_response 
app = FastAPI()
log = getLogger()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Medical Report Analysis API"}

@app.post("/chatbot")
async def health_info(request: Request):
    data = await request.json()
    msg = data.get("message")
    result = await get_health_response(msg)  # <- await here
    return {"response": result}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        pdf = file.filename.lower().endswith('.pdf')
        doc = file.filename.lower().endswith('.docx')
        content = await file.read()
        text = extract_text(content, pdf, doc)
        result = await Runner.run(
            Report_Agent, 
           f"""Please analyze the uploaded medical report image extrected text :

{text}

Do not provide any analysis before calling the tool.

Once the text is extracted, continue with step-by-step medical analysis and return the final output strictly in JSON format.

    """,
    context=content,
    
        )
        print(result.final_output)
        return {"result": result.final_output.model_dump()}
    except Exception as e:
        return {"error": str(e)}


