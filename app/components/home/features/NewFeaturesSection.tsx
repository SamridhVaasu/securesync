"use client"

import React, { useState } from 'react';
import { Brain, GitBranch, Database, ArrowRight, Shield, Code, Eye, Lock, AlertCircle, CheckCircle } from 'lucide-react';

// Workflow visualization component
const WorkflowVisual = ({ active }: { active: number }) => {
  const steps = [
    { icon: <Code className="w-5 h-5" />, label: "Code Scan", color: "bg-blue-500" },
    { icon: <Eye className="w-5 h-5" />, label: "Analysis", color: "bg-indigo-500" },
    { icon: <AlertCircle className="w-5 h-5" />, label: "Detection", color: "bg-purple-500" },
    { icon: <Shield className="w-5 h-5" />, label: "Protection", color: "bg-green-500" }
  ];

  return (
    <div className="mt-8 mb-2">
      <div className="flex items-center justify-between w-full relative">
        {/* Connection lines */}
        <div className="absolute h-1 bg-slate-200 dark:bg-slate-700 left-0 right-0 top-6 -z-10"></div>
        
        {/* Process steps */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white ${active === index ? step.color : 'bg-slate-300 dark:bg-slate-700'} transition-colors duration-500`}>
              {step.icon}
            </div>
            <span className="text-xs font-medium mt-2 text-slate-600 dark:text-slate-400">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pipeline builder visual
const PipelineVisual = () => {
  return (
    <div className="mt-8 mb-2 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl">
      <div className="flex flex-col space-y-3">
        {/* Pipeline modules */}
        <div className="flex space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium border-2 border-dashed border-blue-200 dark:border-blue-800/50">
            Source Code
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 self-center" />
          <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-lg text-sm font-medium">
            AI Scanner
          </div>
        </div>
        
        {/* Second row */}
        <div className="flex space-x-3 pl-16">
          <ArrowRight className="w-5 h-5 text-slate-400 self-center transform rotate-90" />
        </div>
        
        {/* Third row */}
        <div className="flex space-x-3 justify-between">
          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-2 rounded-lg text-sm font-medium">
            Report Gen
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 self-center transform -rotate-180" />
          <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-2 rounded-lg text-sm font-medium">
            Threat Analysis
          </div>
        </div>
      </div>
    </div>
  );
};

// Database visual
const DatabaseVisual = () => {
  return (
    <div className="mt-8 mb-2 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-indigo-500/5 rounded-xl"></div>
      <div className="grid grid-cols-2 gap-2 p-4 relative">
        {/* Database entries */}
        {[1, 2, 3, 4].map(item => (
          <div key={item} className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${item % 3 === 0 ? 'bg-red-500' : item % 2 === 0 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <span className="text-xs truncate text-slate-700 dark:text-slate-300">Threat-{item}0{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  featureTitle: string;
  description: string;
  bulletPoints: string[];
  index: number;
}

const FeatureCard = ({ icon, title, featureTitle, description, bulletPoints, index }: FeatureCardProps) => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Cycle through the workflow steps for the first card
  React.useEffect(() => {
    if (index === 0) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [index]);

  return (
    <div className="relative group bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 transition-opacity duration-300"></div>
      
      {/* Feature number */}
      <div className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 h-8 w-8 rounded-full flex items-center justify-center font-mono text-sm">
        0{index + 1}
      </div>
      
      <div className="p-8">
        {/* Icon with gradient background */}
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white mb-6">
          {icon}
        </div>
        
        {/* Labels */}
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
            {title}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
          {featureTitle}
        </h3>
        
        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {description}
        </p>
        
        {/* Visual component based on feature type */}
        {index === 0 && <WorkflowVisual active={activeStep} />}
        {index === 1 && <PipelineVisual />}
        {index === 2 && <DatabaseVisual />}
        
        {/* Bullet points */}
        <ul className="space-y-3 mt-6">
          {bulletPoints.map((point, i) => (
            <li key={i} className="flex items-start">
              <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300">{point}</span>
            </li>
          ))}
        </ul>
        
        {/* Learn more button */}
        <button className="group flex items-center text-sm font-medium mt-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
          Learn more
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

const keyFeatures = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Hybrid AI Model",
    featureTitle: "Next-Gen Security Intelligence",
    description: "Revolutionary dual-model architecture combining traditional rule-based scanning with advanced machine learning for unparalleled security analysis.",
    bulletPoints: [
      "Adaptive learning from your codebase",
      "Zero-day vulnerability detection",
      "Context-aware security analysis",
      "99.9% accuracy in threat detection"
    ]
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Visual Pipeline Builder",
    featureTitle: "Build Security Workflows Visually",
    description: "Intuitive drag-and-drop interface to create, customize, and manage your security scanning pipelines with enterprise-grade flexibility.",
    bulletPoints: [
      "Drag-and-drop workflow creation",
      "Real-time pipeline visualization",
      "Custom security rule integration",
      "Automated deployment triggers"
    ]
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Sentinel Database",
    featureTitle: "Intelligent Threat Detection",
    description: "Intelligent security database that continuously learns and adapts to new threats while maintaining a comprehensive vulnerability history.",
    bulletPoints: [
      "Real-time threat intelligence",
      "Pattern-based vulnerability tracking",
      "Historical security metrics",
      "Predictive risk assessment"
    ]
  }
];

export function NewFeaturesSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Advanced Security, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Simplified</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our platform combines cutting-edge AI with intuitive workflows to deliver enterprise-grade security that's accessible to everyone.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {keyFeatures.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
} 