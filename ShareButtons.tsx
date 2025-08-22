import React, { useState, Component } from 'react';
import { TwitterIcon, FacebookIcon, LinkedinIcon, CopyIcon, CheckIcon } from 'lucide-react';
interface ShareButtonsProps {
  quote: {
    text: string;
    author: string;
    image?: string;
  };
}
export const ShareButtons = ({
  quote
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const fullQuote = `"${quote.text}" — ${quote.author}`;
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullQuote)}`;
    window.open(twitterUrl, '_blank');
  };
  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(fullQuote)}`;
    window.open(facebookUrl, '_blank');
  };
  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedinUrl, '_blank');
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullQuote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className="flex items-center gap-3">
      <button onClick={shareToTwitter} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors" aria-label="Share on Twitter">
        <TwitterIcon size={18} />
      </button>
      <button onClick={shareToFacebook} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors" aria-label="Share on Facebook">
        <FacebookIcon size={18} />
      </button>
      <button onClick={shareToLinkedIn} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors" aria-label="Share on LinkedIn">
        <LinkedinIcon size={18} />
      </button>
      <button onClick={copyToClipboard} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors relative" aria-label="Copy to clipboard">
        {copied ? <CheckIcon size={18} className="text-green-400" /> : <CopyIcon size={18} />}
        {copied && <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-black bg-opacity-80 text-white px-2 py-1 rounded">
            Copied!
          </span>}
      </button>
    </div>;
};