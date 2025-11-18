import React, { useRef, useState } from 'react';
import { Download, Upload, Sparkles, Save, Trash2, Loader2 } from 'lucide-react';
import { DiagramData } from '../types';
import { generateDiagramFromPrompt } from '../services/geminiService';

interface TopBarProps {
  onSave: () => void;
  onLoad: (data: DiagramData) => void;
  onClear: () => void;
  onAiGenerate: (response: any) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSave, onLoad, onClear, onAiGenerate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        if (event.target?.result && typeof event.target.result === 'string') {
          const data = JSON.parse(event.target.result);
          onLoad(data);
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const diagramData = await generateDiagramFromPrompt(aiPrompt);
      if (diagramData) {
        onAiGenerate(diagramData);
      } else {
        alert("AI could not generate a diagram for this prompt.");
      }
    } catch (e) {
      alert("Error connecting to Gemini API. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 relative">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="font-bold text-xl text-slate-800 tracking-tight">FlowGenius<span className="text-blue-600">AI</span></h1>
      </div>

      {/* AI Input Section */}
      <div className="flex-1 max-w-2xl mx-8 relative">
        <input 
          type="text" 
          placeholder="Describe a flow to generate (e.g., 'Flowchart for user login process with password reset')"
          className="w-full pl-4 pr-12 py-2 rounded-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-sm"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
          disabled={isGenerating}
        />
        <button 
          className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
          onClick={handleAiGenerate}
          disabled={isGenerating || !aiPrompt}
        >
           {isGenerating ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Sparkles className="w-4 h-4 text-white" />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onClear}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>

        <div className="h-6 w-px bg-slate-300 mx-1"></div>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Import</span>
        </button>
        <input 
          type="file" 
          accept=".json" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />

        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
