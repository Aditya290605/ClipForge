import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What video formats are supported?",
      answer: "MemeDownloader supports all standard YouTube video formats including MP4, WebM, and FLV. Our tool automatically detects and processes the best available format for your selected video."
    },
    {
      id: 2,
      question: "What quality options are available for download?",
      answer: "You can download videos in multiple quality options: 360p (mobile-friendly), 420p (standard), 720p (HD), and 1080p (Full HD). The available qualities depend on the source video's original resolution."
    },
    {
      id: 3,
      question: "Is there a limit on video length?",
      answer: "There are no strict limits on video length. However, for optimal performance and faster processing, we recommend working with videos under 30 minutes. Longer videos may take more time to process and download."
    },
    {
      id: 4,
      question: "Can I use the downloaded videos commercially?",
      answer: "The usage rights depend on the original video's copyright. MemeDownloader is a tool for downloading and editing videos, but you must respect the original creator's copyright and YouTube's Terms of Service. Always ensure you have permission to use content commercially."
    },
    {
      id: 5,
      question: "Do I need to create an account?",
      answer: "No account is required for basic features! You can start creating memes immediately. However, creating a free account allows you to save your projects, access your download history, and unlock additional features."
    },
    {
      id: 6,
      question: "Is my data secure?",
      answer: "Absolutely! We take privacy seriously. All video processing happens in your browser, and we don't store your videos on our servers. Your download history and projects are only saved if you create an account, and you have full control over your data."
    },
    {
      id: 7,
      question: "Can I edit videos offline?",
      answer: "The initial video download requires an internet connection. However, once downloaded, you can use our editing tools offline. Your edited videos are saved locally in your browser until you're ready to export them."
    },
    {
      id: 8,
      question: "What browsers are supported?",
      answer: "MemeDownloader works best on modern browsers including Chrome, Firefox, Safari, and Edge (latest versions). We recommend using Chrome or Firefox for the best performance and feature compatibility."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm md:text-base font-medium mb-4 md:mb-6">
            <Icon name="HelpCircle" size={18} />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Frequently Asked Questions
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about MemeDownloader and how to get started.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {faqs?.map((faq, index) => (
            <div
              key={faq?.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-muted/50 transition-colors duration-200"
                aria-expanded={openIndex === index}
              >
                <span className="text-base md:text-lg font-semibold text-foreground pr-4">
                  {faq?.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <Icon name="ChevronDown" size={20} color="var(--color-primary)" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {faq?.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 md:p-8 border border-border">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="MessageCircle" size={28} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                Still have questions?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Our support team is here to help you get started
              </p>
              <a
                href="mailto:support@memedownloader.com"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                <span>Contact Support</span>
                <Icon name="ArrowRight" size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;