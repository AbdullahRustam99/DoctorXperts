"use client";

import Footer from "@/components/Footer";
import { Brain, Upload, FileText, Loader2, Shield, Download, RefreshCw } from "lucide-react";
import jspdf from 'jspdf';
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useState, useCallback, } from "react";
import { useDropzone } from 'react-dropzone';
import { useToast } from "@/hooks/use-toast"
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Flag = 'Red' | 'Yellow' | 'Green';

interface Test {
  name: string;
  user_value: string;
  normal_range: string;
  analysis?: string; // optional (not required)
  flag: Flag;
}

interface ReportSection {
  title: string;
  tests: Test[];
  section_summary: string;
}

interface AiTipSection {
  title: string;
  risk: string;
  tips: string;
  action: string;
  diet_suggestion?: string[];
  life_style?: string[];
}

interface MedicalReport {
  report_summary_title: string;
  ai_tip_title: string;
  report_sections: ReportSection[];
  ai_tip_sections: AiTipSection[];
}

interface ReportApiResponse {
  result: MedicalReport;
}


export default function HomePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ReportApiResponse | null>(null);;
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('anonymized');
  const aitip = result?.result?.ai_tip_sections;
  const report = result?.result?.report_sections;

  const processFile = async (file: File) => {
    setIsLoading(true);
    setUploadedFile(file);
    try {
      const api = "http://127.0.0.1:8000/upload";

      const formDta = new FormData();
      formDta.append('file', file);

      const response = await fetch(api, {
        method: 'POST',
        body: formDta,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze report.");
      }
      const result: ReportApiResponse = await response.json();
      setResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your test report has been successfully analyzed.",
      });

    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: `There was an error processing your file. Please try again.${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', ".webp"],
      'application/pdf': ['.pdf', ".docx"]
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: () => {
      toast({
        title: "Upload Error",
        description: "Please upload a valid image (PNG, JPG) or PDF file under 10MB.",
        variant: "destructive",
      });
    }
  });

  const onReUpload = () => {
    setUploadedFile(null);
    setResult(null);
    setActiveTab('anonymized');
  };

  const formatResultToText = (result: ReportApiResponse): string => {
    let text = `🩺 ${result.result?.report_summary_title}\n\n`;

    result.result?.report_sections.forEach((section) => {
      text += `📄 ${section.title}\n`;
      text += `🔍 Summary:\n${section.section_summary}\n\n`;

      text += `🧪 Test Results:\n`;
      section.tests.forEach((test) => {
        text += `• ${test.name}: ${test.user_value} (Normal: ${test.normal_range}) - Flag: ${test.flag}\n`;
        if (test.analysis) {
          text += `   ↳ Analysis: ${test.analysis}\n`;
        }
      });

      text += `\n`;
    });

    text += `\n🧠 ${result.result?.ai_tip_title}\n\n`;

    result.result?.ai_tip_sections.forEach((tip, i: number) => {
      text += `🔹 ${i + 1}. ${tip.title}\n`;
      text += `   - Tips: ${tip.tips}\n`;
      text += `   - Risk: ${tip.risk}\n`;
      text += `   - Action: ${tip.action}\n`;

      if (tip.diet_suggestion?.length) {
        text += `   - Diet Suggestions:\n`;
        tip.diet_suggestion.forEach((item: string) => {
          text += `     • ${item}\n`;
        });
      }

      if (tip.life_style?.length) {
        text += `   - Lifestyle Suggestions:\n`;
        tip.life_style.forEach((item: string) => {
          text += `     • ${item}\n`;
        });
      }

      text += `\n`;
    });

    return text.trim();
  };

  const plantext = result ? formatResultToText(result) : "NO DATA FOUND";

  const downloadData = (data: string, filename: string, type: string) => {
    try {


      const cleanText = (data: string) => {
        return data
          .replace(/[^\x20-\x7E\n\r•]/g, '')
          .replace(/\s{2,}/g, ' ')
          .replace(/•/g, '• ')
          .trim();
      };

      const doc = new jspdf("p", "pt", "a4");

        const text = cleanText(data);
        const lines = doc.splitTextToSize(text, 520);

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("AI Health Analysis Report", 40, 50);

        // Divider line
        doc.setDrawColor(200);
        doc.line(40, 80, 555, 80);

        // Body text
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(30);
        doc.text(lines, 40, 100);

        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Generated by DoctorXpert AI", 40, pageHeight - 30);

        doc.save(`${filename}-${type}.pdf`);
      

      toast({
        title: "Downloaded!",
        description: `${type} has been downloaded.`,
      });
    }
    catch (error) {
      toast({
        title: "Download Failed",
        description: `There was an error downloading the file. Please try again.${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <main className="bg-white text-[#111827] font-inter">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <motion.section
      initial={{x:1500}}
      animate={{x:0}}
      transition={{ease:"linear" , duration:0.7}}
      className="text-center bg-primary text-secondary py-10 px-4 rounded-b-lg shadow-xl">
        <h2 className="text-base sm:text-lg font-medium">
          AI Test Report Analysis
        </h2>
        <h1 className="text-2xl sm:text-5xl font-bold my-4">
          Let{'’'}s Find Your Issues
        </h1>

        {/* <div className="flex justify-center gap-6 py-6 flex-wrap">
          {[
            { name: "Blood Test", icon: <Droplet size={28} /> },
            { name: "X-Rays", icon: <X size={28} /> },
            { name: "MRI", icon: <ScanEye size={28} /> },
            { name: "CT Scan", icon: <Bone size={28} /> },
            { name: "Microscopy", icon: <Microscope size={28} /> },
            { name: "Pathology", icon: <Brain size={28} /> },
          ].map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-3 bg-white text-primary rounded-full shadow-lg hover:text-white hover:bg-secondary hover:scale-105 w-24 h-24 justify-center"
            >
              <div className="mb-1">{cat.icon}</div>
              <span className="text-xs font-semibold text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div> */}
      </motion.section>

      {/* Logo + Upload CTA */}
      {!uploadedFile && !result && !isLoading && (
        <section
          className="p-6 md:px-12 flex flex-col items-center justify-center text-center py-10 bg-[#ffffff] overflow-hidden">
            <div
              
              className={`w-full p-12 flex flex-col justify-center items-center text-center border-2 border-dashed cursor-pointer transition-all duration-300 bg-[url('/images/low_opacity_logo.jpg)'] ${isDragActive
                ? 'border-primary bg-primary-light border-solid'
                : 'border-border hover:border-primary hover:bg-primary-light/10'
                }`}
              style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: "url('/images/low-opacity-logo.jpg')" }}
            {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    {isDragActive ? 'Drop your file here' : 'Upload Test Report'}
                  </h3>
                  <p className="mb-4 text-primary ">
                    Drag and drop your medical report, or click to browse
                  </p>
                  <p className="text-sm ">
                    Supports JPG, PNG, PDF files up to 10MB
                  </p>
                </div>
                <Button variant="outline" className="bg-secondary text-primary hover:bg-secondary/90">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Your Report
                </Button>
              </div>
            </div>

        </section>
      )}
      {isLoading && (
        <section className="p-6 md:px-12 flex flex-col items-center justify-center text-center py-10 bg-[#ffffff]">
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.6, ease: "linear" }}
            className=" w-full p-12 md:px-8 text-center border-2 border-dashed border-primary bg-[#ffffff]">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center pulse-medical">
                  <Loader2 className="w-10 h-10 text-secondary animate-spin " />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold  mb-2">Analyzing Report...</h3>
                <p className="text-muted-foreground">
                  Our AI is processing your medical report and extracting insights.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      )}
      {/* Report Analysis Cards */}
      {result && (
        <section className=" px-4 md:px-12 py-12 bg-[#ffffff]">
          <motion.div
            
            className="space-y-8 fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className=" text-2xl md:text-3xl font-bold text-primary mb-2 ">Analysis Results</h2>
              </div>
              <Button
                onClick={onReUpload}
                variant="outline"
                className="text-primary bg-secondary hover:bg-secondary/90 "
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Re-upload
              </Button>

            </div>

            {/* Tabs for different views */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary">
                <TabsTrigger value="anonymized" className="flex items-center space-x-2  text-primary">
                  <Shield className="w-4 h-4  " />
                  <span>Anonymized Data</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center space-x-2  text-primary">
                  <Brain className="w-4 h-4" />
                  <span>AI Analysis</span>
                </TabsTrigger>
              </TabsList>

              {/* Anonymized Data Tab */}
              <TabsContent value="anonymized" className="space-y-6">
                <Card className="p-2 md:p-6 border-secondary">
                  <div className=" md:flex items-center justify-between mb-6">
                    <div className="w-full bg-secondary flex items-center justify-between px-2 py-2 rounded-sm text-primary">
                      <h3 className="text-[18px] flex items-center font-semibold ">
                        <Shield className="w-6 h-6 mr-4 text-primary" />
                        Report Summary & Findings
                      </h3>
                      <div className="space-x-2 ">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadData(plantext, result.result?.ai_tip_title, 'AI Analysis')}
                          className="hover:text-secondary hover:bg-primary/90"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="space-y-2">
                      {report?.map((finding, index: number) => (
                        <div key={index} className=" md:px-7 rounded-lg text-sm">
                          <div className=' rounded text-lg text-primary'>
                            <b>
                              {finding.title}
                            </b>
                            <div className=' rounded text-lg'>
                              {finding.tests.map((test, index: number) => (
                                <div
                                  key={index}
                                  className={`mt-4 p-4 rounded-xl border ${test.flag === "Red"
                                    ? "border-red-400 bg-red-50"
                                    : test.flag === "Green" ? "border-green-400 bg-green-50"
                                      : "border-yellow-400 bg-yellow-50"
                                    }`}
                                >
                                  <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold text-gray-800">{test.name}</h4>
                                    <span
                                      className={`text-xs font-medium px-2 py-1 rounded-full ${test.flag === "Red"
                                        ? "bg-red-400 text-white"
                                        : test.flag === "Green" ? "bg-green-400 text-white"
                                          : "bg-yellow-400 text-white"
                                        }`}
                                    >
                                      {test.flag}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600 mb-1">
                                    Value: <strong>{test.user_value}</strong> (Normal: {test.normal_range})
                                  </div>
                                  <p className="text-sm text-gray-700">{test.analysis}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* AI Analysis Tab */}
              <TabsContent value="analysis" className="space-y-6">
                <Card className="p-4 md:p-6 border-primary text-primary">
                  <div className=" md:flex items-center justify-between mb-6">
                    <div className="w-full bg-primary flex items-center justify-between px-2 py-2 rounded-sm text-secondary">
                      <h3 className="text-[18px] flex items-center font-semibold ">
                        <Brain className="w-7 h-7 mr-2 text-secondary" />
                        AI Analysis & Insights
                      </h3>
                      <div className="space-x-2 ">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadData(plantext, result.result.ai_tip_title, 'AI Analysis')}
                          className="hover:bg-secondary hover:text-primary"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>


                  {aitip?.map((ai, index: number) => {
                    return <div key={index} className="py-2 mt-3 bg-accent-light rounded-lg border-4 border-secondary">
                      <p className=" leading-relaxe m-3 p-2 border-black border-b-[1px] rounded">
                        <b>Action :</b> {ai.action}
                      </p>
                      <p className=" leading-relaxed m-3 p-2 border-black border-b-[1px] rounded ">
                        <b>Risk :</b> {ai.risk}
                      </p>
                      <p className=" leading-relaxed m-3 p-2 border-black border-b-[1px] rounded">
                        <b>Tips :</b> {ai.tips}
                      </p>
                      <p className=" leading-relaxed m-3 p-2 border-black border-b-[1px] rounded">
                        <b>Dite Suggestion :</b> <br /> {ai.diet_suggestion?.map((item: string, index: number) => {
                          return <span key={index} className="inline-block text-secondary-foreground px-2 py-1 rounded mr-1 w-full">
                            <b>{index + 1} :</b> {item}
                          </span>
                        })}
                      </p>
                      <p className=" leading-relaxed m-3 p-2 border-black border-b-[1px] rounded">
                        <b>Life Style :</b> <br /> {ai.life_style?.map((item: string, index: number) => {
                          return <span key={index} className="inline-block  text-secondary-foreground px-2 py-1 rounded mr-1 w-full">
                            <b>{index + 1} :</b> {item}
                          </span>
                        })}
                      </p>
                    </div>
                  })}

                  <div className="p-4 mt-4 bg-red-700 text-white rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy & Disclaimer Note
                    </h4>
                    <p className="text- text-white ">
                      <b>Disclaimer:</b> This is an AI-generated analysis and not a medical diagnosis. Please consult a qualified healthcare professional for final evaluation and treatment.
                      <br />
                      <br />
                      <b>Privacy Notice:</b> The analysis is based on anonymized data. All personally identifiable information has been removed or replaced to ensure patient privacy and confidentiality.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </section>
      )}

      <Footer />
    </main>
  );
}


