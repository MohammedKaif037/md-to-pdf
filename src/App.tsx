import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';
import { FileText, Download, Sun, Moon } from 'lucide-react';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [isColorful, setIsColorful] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    if (previewRef.current) {
      const element = previewRef.current;
      const opt = {
        margin: 1,
        filename: 'markdown-converted.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">MD to PDF Converter</h1>
            </div>
            <button
              onClick={() => setIsColorful(!isColorful)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              {isColorful ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span>{isColorful ? 'Simple Theme' : 'Colorful Theme'}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Markdown Input</h2>
              <button
                onClick={generatePDF}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Download className="h-5 w-5" />
                <span>Export PDF</span>
              </button>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[calc(100vh-250px)] p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your markdown here..."
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            <div
              ref={previewRef}
              className={`w-full h-[calc(100vh-250px)] p-4 border rounded-lg overflow-y-auto ${
                isColorful ? 'markdown-colorful' : 'markdown-simple'
              }`}
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;