'use client'
import ChatInterface from "@/components/chatInterface";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default function HealthPage() {
  const handleHealthChat = async (message: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.response || "No response from health bot";
    } catch (err) {
      console.error("Health Error", err);
      return "Health bot mein error aya.";
    }
  };

  return (
    <>
      <Header />
      <ChatInterface
        title="🩺 Health Awareness Chat"
        description="Chat with our AI health advisor to stay fit and informed."
        onSend={handleHealthChat}
      />
      <Footer />
    </>
  );
}

