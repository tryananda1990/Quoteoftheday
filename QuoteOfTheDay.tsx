import React, { useEffect, useState } from 'react';
import { ShareButtons } from './ShareButtons';
import { getQuoteOfTheDay } from '../utils/quotes';
import { RefreshCwIcon, VolumeIcon, Volume2Icon } from 'lucide-react';
export const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState({
    text: '',
    author: '',
    image: ''
  });
  const [fadeIn, setFadeIn] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  // Check if speech synthesis is supported
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);
  // Get a new quote
  const refreshQuote = () => {
    // Stop any ongoing speech when changing quotes
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setFadeIn(false);
    setImageLoaded(false);
    setTimeout(() => {
      setQuote(getQuoteOfTheDay());
      setFadeIn(true);
    }, 300);
  };
  // Initialize with a quote
  useEffect(() => {
    setQuote(getQuoteOfTheDay());
    setFadeIn(true);
  }, []);
  // Preload image
  useEffect(() => {
    if (quote.image) {
      const img = new Image();
      img.src = quote.image;
      img.onload = () => setImageLoaded(true);
    }
  }, [quote.image]);
  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  // Read the quote aloud
  const speakQuote = () => {
    if (!speechSynthesis) return;
    // If already speaking, stop it
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(`${quote.text} by ${quote.author}`);
    // Set voice properties based on quote content
    utterance.rate = 0.9; // slightly slower for better clarity
    utterance.pitch = 1.0; // neutral pitch
    // Adjust tone based on quote content
    if (quote.text.includes('success') || quote.text.includes('great') || quote.text.includes('opportunity')) {
      utterance.pitch = 1.1; // slightly higher pitch for motivational quotes
      utterance.rate = 1.0;
    } else if (quote.text.includes('difficult') || quote.text.includes('fear') || quote.text.includes('failure')) {
      utterance.pitch = 0.9; // slightly lower for serious quotes
      utterance.rate = 0.85;
    }
    // Try to find a good voice
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Prefer a natural sounding voice if available
      const preferredVoice = voices.find(voice => voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Premium'));
      if (preferredVoice) utterance.voice = preferredVoice;
    }
    // Set event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    // Speak
    window.speechSynthesis.speak(utterance);
  };
  return <div className="max-w-3xl w-full mx-auto">
      <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-500 relative ${imageLoaded ? 'opacity-100' : 'opacity-90'}`} style={{
      minHeight: '400px',
      backgroundColor: imageLoaded ? 'transparent' : '#f8f9fa'
    }}>
        {/* Background Image */}
        {quote.image && <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-500" style={{
        backgroundImage: `url(${quote.image})`,
        opacity: imageLoaded ? 1 : 0
      }} />}
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        {/* Content */}
        <div className="relative z-10 p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Quote of the Day
          </h1>
          <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-6">
              <p className="text-xl md:text-2xl font-serif italic text-white mb-4 leading-relaxed">
                "{quote.text}"
              </p>
              <p className="text-right text-gray-200 font-medium">
                — {quote.author}
              </p>
            </div>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <button onClick={refreshQuote} className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                  <RefreshCwIcon size={18} />
                  <span>New Quote</span>
                </button>
                {speechSupported && <button onClick={speakQuote} className={`flex items-center gap-2 text-white hover:text-gray-300 transition-colors ${isSpeaking ? 'text-blue-300' : ''}`} aria-label={isSpeaking ? 'Stop speaking' : 'Listen to quote'} title={isSpeaking ? 'Stop speaking' : 'Listen to quote'}>
                    {isSpeaking ? <>
                        <Volume2Icon size={18} className="animate-pulse" />
                        <span>Stop</span>
                      </> : <>
                        <VolumeIcon size={18} />
                        <span>Listen</span>
                      </>}
                  </button>}
              </div>
              <ShareButtons quote={quote} />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-6">
        Refresh daily for new inspiration
      </p>
    </div>;
};