import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

// Bilingual Knowledge Base
const KNOWLEDGE_BASE = [
    { matchEN: ["prenatal", "vitamin", "forgot"], matchTE: ["విటమిన్", "మర్చిపోయాను"], responseKey: "ai_response_forgot_vitamin" },
    { matchEN: ["headache", "pain"], matchTE: ["తలనొప్పి", "నొప్పి"], responseKey: "ai_response_headache" },
    { matchEN: ["kick", "movement", "baby"], matchTE: ["కదలికలు", "బిడ్డ"], responseKey: "ai_response_kick" },
    { matchEN: ["nauseous", "morning sickness"], matchTE: ["వికారం"], responseKey: "ai_response_nauseous" },
    { matchEN: ["hi", "hello", "hey"], matchTE: ["నమస్తే", "హలో"], responseKey: "ai_response_greeting" },
];

function getBotResponse(input, lang, t) {
    const lower = input.toLowerCase();
    for (const knowledge of KNOWLEDGE_BASE) {
        const keywords = lang === 'te' ? knowledge.matchTE : knowledge.matchEN;
        if (keywords.some((keyword) => lower.includes(keyword))) {
            return t(knowledge.responseKey);
        }
    }
    return t("ai_response_default");
}

export default function AIChatbot() {
    const { lang, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: t("Hi! I am your Bloom AI Assistant. You can type or use the microphone to ask me anything about your pregnancy!") }
    ]);
    const [inputVal, setInputVal] = useState("");
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Update greeting if language changes
    useEffect(() => {
        if (messages.length === 1 && messages[0].sender === 'bot') {
            setMessages([{ sender: "bot", text: t("Hi! I am your Bloom AI Assistant. You can type or use the microphone to ask me anything about your pregnancy!") }]);
        }
    }, [lang, t]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Speech Recognition Setup
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            // Re-assign language dynamically before listening
            recognition.lang = lang === 'te' ? "te-IN" : "en-US";

            recognition.onstart = () => setIsListening(true);

            recognition.onresult = (e) => {
                const transcript = e.results[0][0].transcript;
                handleSend(transcript);
            };

            recognition.onend = () => setIsListening(false);

            recognition.onerror = (e) => {
                console.error("Speech recognition error", e.error);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, [lang]);

    function toggleListen() {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            // Ensure correct language is set before starting
            if (recognitionRef.current) {
                recognitionRef.current.lang = lang === 'te' ? "te-IN" : "en-US";
                recognitionRef.current.start();
            }
        }
    }

    function speakText(text) {
        // Stop any ongoing speech
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        // Attempt to find a suitable voice based on language
        const voices = window.speechSynthesis.getVoices();
        let chosenVoice;

        if (lang === 'te') {
            chosenVoice = voices.find(v => v.lang.includes("te") || v.lang.includes("te-IN"));
        } else {
            chosenVoice = voices.find(v => (v.name.includes("Female") || v.name.includes("Google US English")) && v.lang.includes("en")) || voices.find(v => v.lang.includes("en"));
        }

        if (!chosenVoice) chosenVoice = voices[0];

        utterance.voice = chosenVoice;
        utterance.rate = lang === 'te' ? 0.9 : 1.0; // slightly slower for Telugu
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }

    function handleSend(overrideInput) {
        const text = overrideInput || inputVal;
        if (!text.trim()) return;

        // 1. Add User Message
        const userMsg = { sender: "user", text: text };
        setMessages((prev) => [...prev, userMsg]);
        setInputVal("");

        // 2. Generate and Add Bot Response
        setTimeout(() => {
            const botReply = getBotResponse(text, lang, t);
            setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);

            // 3. Optional: Speak the response out loud if they asked via voice
            speakText(botReply);

        }, 800);
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    position: "fixed",
                    bottom: 40,
                    right: 40,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #E07A94, #9B7ED9)",
                    color: "white",
                    border: "none",
                    boxShadow: "0 8px 24px rgba(224,122,148,0.4)",
                    fontSize: 24,
                    cursor: "pointer",
                    zIndex: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                ✨
            </button>
        );
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: 40,
                right: 40,
                width: 360,
                height: 500,
                borderRadius: 24,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.8)",
                zIndex: 999,
                animation: "slideUp 0.3s ease-out",
            }}
        >
            <div
                style={{
                    padding: 20,
                    background: "linear-gradient(135deg, #E07A94, #9B7ED9)",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ fontWeight: 600, fontSize: 18 }}>✨ {t("Bloom AI")}</div>
                <button
                    onClick={() => {
                        setIsOpen(false);
                        window.speechSynthesis.cancel(); // stop talking if they close it
                    }}
                    style={{ background: "none", border: "none", color: "white", fontSize: 20, cursor: "pointer" }}
                >
                    ×
                </button>
            </div>

            <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                            maxWidth: "85%",
                            padding: "12px 16px",
                            borderRadius: m.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                            background: m.sender === "user" ? "#E07A94" : "#F3F4F6",
                            color: m.sender === "user" ? "white" : "#333",
                            fontSize: 14,
                            lineHeight: 1.5,
                            animation: "fadeIn 0.3s ease",
                        }}
                    >
                        {m.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: 16, borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 8, background: "white" }}>

                {/* Voice Button */}
                {recognitionRef.current && (
                    <button
                        onClick={toggleListen}
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            border: "none",
                            background: isListening ? "#E85454" : "#F3F4F6",
                            color: isListening ? "white" : "#666",
                            fontSize: 18,
                            cursor: "pointer",
                            transition: "background 0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        title={t("Use Voice")}
                    >
                        {isListening ? "🔴" : "🎤"}
                    </button>
                )}

                <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={t("Ask me anything...")}
                    style={{
                        flex: 1,
                        border: "1px solid #E5E7EB",
                        borderRadius: 24,
                        padding: "0 16px",
                        outline: "none",
                        fontSize: 14,
                    }}
                />
                <button
                    onClick={() => handleSend()}
                    style={{
                        background: "#9B7ED9",
                        color: "white",
                        border: "none",
                        borderRadius: 24,
                        padding: "0 16px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    {t("Send")}
                </button>
            </div>
            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
