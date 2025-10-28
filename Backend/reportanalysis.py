
import io
import re
import os
import docx
from PyPDF2 import PdfReader
import numpy as np
from PIL import Image
from doctr.models import ocr_predictor
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from dotenv import load_dotenv  
from pydantic import BaseModel, Field
from typing import List, Literal
from agents import (
        Agent,
        AsyncOpenAI, 
	      OpenAIChatCompletionsModel, 
        AgentOutputSchemaBase,
        enable_verbose_stdout_logging,
        set_tracing_disabled
        )
enable_verbose_stdout_logging()
set_tracing_disabled(True)

load_dotenv()
model = ocr_predictor(pretrained=True)
analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

API = os.getenv("GEM_API_KEY")

class TestItem(BaseModel):
    name: str
    user_value: str
    normal_range: str
    analysis: str | None = None
    flag: Literal["Red", "Yellow", "Green"]

class ReportSection(BaseModel):
    title: str
    tests: List[TestItem]
    section_summary: str

class AiTipSection(BaseModel):
    title: str
    risk: str
    tips: str
    action: str
    diet_suggestion: List[str] = Field(default_factory=list)
    life_style: List[str] = Field(default_factory=list)

class ReportSchema(BaseModel):
    report_summary_title: str
    ai_tip_title: str
    report_sections: List[ReportSection]
    ai_tip_sections: List[AiTipSection]

client = AsyncOpenAI(
       api_key = API,
       base_url = "https://generativelanguage.googleapis.com/v1beta/openai/",
)

agent_model = OpenAIChatCompletionsModel(
        model = "gemini-2.0-flash",
        openai_client = client,
        
)

def format_json(result):   
        analyzer_results = analyzer.analyze(text=result, language='en')
        anonymized_text = anonymizer.anonymize(text=result, analyzer_results=analyzer_results)
        result_text = anonymized_text.text
        pattern = r'(<PERSON>\s+[\w\s\-]+)'
        hospital_pattern = r'(?i)\b(?:[A-Z][a-zA-Z]+(?:\s+|,|&)?){1,6}(hospital|lab|clinic|diagnostic|medical|centre|pathology)\b'
        result_text = re.sub(r'[,.()\'"-]', ' ', result_text).strip()
        result_text = re.sub(pattern, r'<NAME>', result_text)
        result_text = re.sub(hospital_pattern, r'<HOSPITAL>', result_text,)
        print(result_text)
        return result_text

def extract_text(content ,pdf ,doc) -> str:
        if pdf:
            reader = PdfReader(io.BytesIO(content))
            text = ''
            for page in reader.pages:
                text += page.extract_text() + '\n'
            print(text)
            return text.strip()
        elif doc:
            doc = docx.Document(io.BytesIO(content))
            text = ''
            for para in doc.paragraphs:
                text += para.text + '\n'
            print(text)
            return text.strip()
        
        else:
          image = Image.open(io.BytesIO(content)).convert("RGB")
          npImg = np.ascontiguousarray(np.array(image, dtype='uint8'))
          ORCresult = model([npImg])
          clean_jason = format_json(ORCresult.render())
          print(clean_jason)
          return clean_jason


Report_Agent = Agent(
        name = "Report_Analysis_Agent",
        instructions = """You are a Medical Report Analysis Agent.

Your role is to analyze uploaded medical test reports and generate clear, accurate health advice in structured JSON format.

Your Main Task:
1. Analyze the extracted medical text carefully.
2. Identify each test name, its result (user value), and the normal reference range.
3. Assign a flag to each test based on the result:
   - Red: Critical or abnormal
   - Yellow: Slightly out of range or borderline
   - Green: Normal or safe
4. Provide a clear summary of the findings.
5. Offer relevant AI-driven health tips, highlight potential risks, and suggest dietary and lifestyle improvements.
6. Structure the output in the specified JSON format.
Response format: {'type': 'json_schema', 'json_schema': {'name': 'final_output', 'strict': True, 'schema': {'$defs': {'AiTipSection': {'properties': {'title': {'title': 'Title', 'type': 'string'}, 'risk': {'title': 'Risk', 'type': 'string'}, 'tips': {'title': 'Tips', 'type': 'string'}, 'action': {'title': 'Action', 'type': 'string'}, 'diet_suggestion': {'items': {'type': 'string'}, 'title': 'Diet Suggestion', 'type': 'array'}, 'life_style': {'items': {'type': 'string'}, 'title': 'Life Style', 'type': 'array'}}, 'required': ['title', 'risk', 'tips', 'action', 'diet_suggestion', 'life_style'], 'title': 
'AiTipSection', 'type': 'object', 'additionalProperties': False}, 'ReportSection': {'properties': {'title': {'title': 'Title', 'type': 'string'}, 'tests': {'items': {'$ref': '#/$defs/TestItem'}, 'title': 'Tests', 'type': 'array'}, 'section_summary': {'title': 'Section Summary', 'type': 'string'}}, 'required': ['title', 'tests', 'section_summary'], 'title': 'ReportSection', 'type': 'object', 'additionalProperties': False}, 'TestItem': {'properties': {'name': {'title': 'Name', 'type': 'string'}, 'user_value': {'title': 'User Value', 'type': 'string'}, 'normal_range': {'title': 'Normal Range', 'type': 'string'}, 'analysis': {'anyOf': [{'type': 'string'}, {'type': 'null'}], 'title': 'Analysis'}, 'flag': {'enum': ['Red', 'Yellow', 'Green'], 'title': 'Flag', 'type': 'string'}}, 'required': ['name', 'user_value', 'normal_range', 'analysis', 'flag'], 'title': 'TestItem', 'type': 'object', 'additionalProperties': False}}, 'properties': {'report_summary_title': {'title': 'Report Summary Title', 'type': 'string'}, 'ai_tip_title': {'title': 'Ai Tip Title', 'type': 'string'}, 'report_sections': {'items': {'$ref': '#/$defs/ReportSection'}, 'title': 'Report Sections', 'type': 'array'}, 'ai_tip_sections': {'items': {'$ref': '#/$defs/AiTipSection'}, 'title': 'Ai Tip Sections', 'type': 'array'}}, 'required': ['report_summary_title', 'ai_tip_title', 'report_sections', 'ai_tip_sections'], 'title': 'ReportSchema', 'type': 'object', 'additionalProperties': False}}}

""",
        model = agent_model,
        output_type=  ReportSchema,
)




