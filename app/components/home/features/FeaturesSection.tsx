"use client"

import { motion } from 'framer-motion';
import { Zap, Brain, GitBranch, Database, Check, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

interface FeaturesSectionProps {
  isFeaturesInView?: boolean;
}

export function FeaturesSection({ isFeaturesInView = true }: FeaturesSectionProps) {
  const featuresRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  // Auto-rotate through features every 5 seconds if none are hovered
  useEffect(() => {
    if (activeFeature !== null) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % keyFeatures.length;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeFeature]);
  
  return (
    <section ref={featuresRef} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isFeaturesInView ? 1 : 0, y: isFeaturesInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6 backdrop-blur-sm border border-accent/10">
            <Zap className="w-4 h-4" />
            <span>Core Technologies</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Three Powerful Products,
            <span className="block mt-2">
              <span className="relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
                  One Unified Platform
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent/60 blur-sm"></div>
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent/60"></div>
              </span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our integrated suite of security products works seamlessly together to provide comprehensive protection at every stage of development.
          </p>
        </motion.div>
        
        {/* Feature Navigation */}
        <div className="flex justify-center gap-4 mb-16">
          {keyFeatures.map((feature, idx) => (
            <motion.button
              key={idx}
              className={`px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeFeature === idx 
                  ? 'bg-accent text-background shadow-lg shadow-accent/20' 
                  : 'bg-accent/10 text-foreground hover:bg-accent/20'
              }`}
              onClick={() => setActiveFeature(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-5 h-5">
                {feature.icon}
              </div>
              <span className="font-medium">{feature.title}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Active Feature Display */}
        <div className="relative min-h-[40rem]">
          {keyFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                opacity: activeFeature === idx || activeFeature === null ? 1 : 0,
                scale: activeFeature === idx || activeFeature === null ? 1 : 0.95,
                zIndex: activeFeature === idx ? 10 : 0
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`absolute inset-0 ${activeFeature !== null && activeFeature !== idx ? 'pointer-events-none' : ''}`}
              onMouseEnter={() => setActiveFeature(idx)}
            >
              <FeatureCard feature={feature} index={idx} isActive={activeFeature === idx || activeFeature === null} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: FeatureType;
  index: number;
  isActive: boolean;
}

function FeatureCard({ feature, index, isActive }: FeatureCardProps) {
  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
    >
      <FeatureContent feature={feature} index={index} isActive={isActive} />
      <FeatureVisual feature={feature} isActive={isActive} />
    </motion.div>
  );
}

function FeatureContent({ feature, index, isActive }: { 
  feature: FeatureType;
  index: number;
  isActive: boolean;
}) {
  return (
    <div className="w-full md:w-1/2 space-y-6">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-accent/5 border border-accent/10 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent via-primary to-accent/80 p-0.5 shadow-lg shadow-accent/20">
          <div className="w-full h-full rounded-lg bg-background/90 flex items-center justify-center">
            <div className="w-5 h-5 text-accent">
              {feature.icon}
            </div>
          </div>
        </div>
        <span className="font-semibold">{feature.title}</span>
      </div>
      
      <h3 className="text-3xl font-bold">
        {feature.featureTitle}
      </h3>
      
      <p className="text-lg text-muted-foreground">
        {feature.description}
      </p>
      
      <ul className="space-y-4">
        {feature.bulletPoints.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: isActive ? 1 : 0.7, 
              x: 0,
              transition: { duration: 0.3, delay: i * 0.1 }
            }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 border border-accent/20">
              <Check className="w-4 h-4 text-accent" />
            </div>
            <span className="text-foreground/80">
              {point}
            </span>
          </motion.li>
        ))}
      </ul>
      
      <div className="pt-6">
        <Button
          variant="ghost"
          className="bg-accent/5 hover:bg-accent/10 text-accent hover:text-accent group px-6 border border-accent/10"
        >
          Learn More About {feature.title}
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

function FeatureVisual({ feature, isActive }: { feature: FeatureType; isActive: boolean }) {
  return (
    <div className="w-full md:w-1/2">
      <motion.div 
        className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl"
        initial={false}
        animate={{ 
          y: isActive ? [0, -5, 0] : 0 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      >
        {feature.title === "Hybrid AI Model" && (
          <HybridAIVisual />
        )}
        {feature.title === "Visual Pipeline Builder" && (
          <PipelineBuilderVisual />
        )}
        {feature.title === "Sentinel Database" && (
          <SentinelDatabaseVisual />
        )}
        
        <FeatureFloatingElement feature={feature} />
        
        {/* Add glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-primary/20 opacity-30 mix-blend-overlay"></div>
      </motion.div>
    </div>
  );
}

// Visual Components
export function HybridAIVisual() {
  return (
    <div className="absolute inset-0 p-6">
      <div className="h-full rounded-xl bg-background/90 border border-border/50 p-4 font-mono text-sm">
        <div className="flex items-center gap-2 mb-4 text-accent">
          <Brain className="w-4 h-4" />
          <span className="text-xs">AI Analysis in Progress</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs">Rule-based scan complete</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
            <span className="text-xs">ML model analyzing patterns...</span>
          </div>
          <div className="mt-4 p-2 rounded bg-accent/5 border border-accent/10">
            <motion.pre 
              className="text-xs text-accent overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 2 }}
            >
              {`Analyzing vulnerability patterns...
Checking against known CVEs...
Training on your codebase...
Generating security recommendations...`}
            </motion.pre>
          </div>
          
          {/* Add analysis progress bar */}
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-1">Analysis Progress</div>
            <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-accent to-primary"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              ></motion.div>
            </div>
          </div>
          
          {/* Add results preview */}
          <div className="mt-6 p-2 rounded bg-accent/5 border border-accent/10">
            <div className="text-xs font-medium mb-2">Detected Vulnerabilities:</div>
            <motion.div 
              className="space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="flex justify-between text-xs">
                <span className="text-red-400">SQL Injection</span>
                <span>Critical</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-yellow-400">XSS Vulnerability</span>
                <span>Medium</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PipelineBuilderVisual() {
  const steps = [
    { name: 'Code Scanner', icon: <Shield className="w-3 h-3" /> },
    { name: 'Dependency Check', icon: <Database className="w-3 h-3" /> },
    { name: 'Secret Scanner', icon: <GitBranch className="w-3 h-3" /> }
  ];

  return (
    <div className="absolute inset-0 p-6">
      <div className="h-full rounded-xl bg-background/90 border border-border/50 p-4">
        <div className="flex items-center gap-2 mb-6 text-accent">
          <GitBranch className="w-4 h-4" />
          <span className="text-xs font-medium">Pipeline Editor</span>
        </div>
        <div className="relative h-full">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
          <div className="relative space-y-6">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                className="relative"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-40 p-3 rounded-lg bg-accent/5 border border-accent/10 text-xs font-medium shadow-sm hover:shadow-md transition-shadow flex items-center justify-between cursor-pointer"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(var(--accent)/0.1)" }}
                  >
                    <span>{step.name}</span>
                    <div className="opacity-70">{step.icon}</div>
                  </motion.div>
                  
                  {/* Connection dots */}
                  {i < steps.length - 1 && (
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-px bg-accent/20"></div>
                      <div className="w-1 h-1 rounded-full bg-accent/50 mt-1"></div>
                    </div>
                  )}
                </div>
                
                {/* Add configuration panel for first item */}
                {i === 0 && (
                  <motion.div 
                    className="ml-12 mt-2 p-3 rounded-lg bg-accent/5 border border-accent/10 text-xs"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="font-medium mb-2">Configuration</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        <input type="checkbox" checked className="w-3 h-3 accent-accent" />
                        <span>SAST</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="checkbox" checked className="w-3 h-3 accent-accent" />
                        <span>DAST</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            
            {/* Add button */}
            <motion.div 
              className="flex items-center justify-center w-40 p-2 rounded-lg border border-dashed border-accent/20 text-xs text-accent/60 cursor-pointer"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(var(--accent)/0.05)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              + Add Pipeline Step
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SentinelDatabaseVisual() {
  const threats = [
    { type: 'critical', count: 2, trend: '+1' },
    { type: 'high', count: 5, trend: '-2' },
    { type: 'medium', count: 12, trend: '+3' },
    { type: 'low', count: 24, trend: '-5' }
  ];

  return (
    <div className="absolute inset-0 p-6">
      <div className="h-full rounded-xl bg-background/90 border border-border/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-accent">
            <Database className="w-4 h-4" />
            <span className="text-xs font-medium">Threat Intelligence Feed</span>
          </div>
          <div className="text-xs text-muted-foreground">Updated 5m ago</div>
        </div>
        
        {/* Threat Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 text-center">
            <div className="text-xs text-muted-foreground">Total Threats</div>
            <div className="text-xl font-bold mt-1">43</div>
          </div>
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/10 text-center">
            <div className="text-xs text-muted-foreground">Critical/High</div>
            <div className="text-xl font-bold mt-1 text-red-500">7</div>
          </div>
        </div>
        
        <div className="space-y-3">
          {threats.map((threat, i) => (
            <motion.div 
              key={i} 
              className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/10"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  threat.type === 'critical' ? 'bg-red-500' :
                  threat.type === 'high' ? 'bg-orange-500' : 
                  threat.type === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <span className="text-xs capitalize">{threat.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">{threat.count}</span>
                <span className={`text-xs ${
                  threat.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
                }`}>{threat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Add chart visualization */}
        <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
          <div className="text-xs mb-2">Threat Trend (Last 7 Days)</div>
          <div className="h-12 flex items-end gap-1">
            {[4, 7, 5, 8, 12, 9, 7].map((value, i) => (
              <motion.div 
                key={i}
                className="flex-1 bg-accent/70 rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${(value/12) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              ></motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureFloatingElement({ feature }: { feature: FeatureType }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute -top-4 -right-4 bg-accent/10 backdrop-blur-md border border-accent/20 rounded-lg p-3 shadow-lg"
    >
      <div className="flex items-center gap-2">
        {feature.title === "Hybrid AI Model" && (
          <>
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium">99.9% Accuracy</span>
          </>
        )}
        {feature.title === "Visual Pipeline Builder" && (
          <>
            <GitBranch className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium">Drag & Drop</span>
          </>
        )}
        {feature.title === "Sentinel Database" && (
          <>
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium">Real-time Updates</span>
          </>
        )}
      </div>
    </motion.div>
  );
}

// Define types
interface FeatureType {
  icon: React.ReactNode;
  title: string;
  featureTitle: string;
  description: string;
  bulletPoints: string[];
}

// Data
const keyFeatures: FeatureType[] = [
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