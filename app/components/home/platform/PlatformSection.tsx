"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Users, 
  Code, 
  Brain, 
  Network, 
  Database, 
  Shield, 
  GitBranch, 
  Check,
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PlatformSectionProps {
  isPlatformInView: boolean;
}

export function PlatformSection({ isPlatformInView }: PlatformSectionProps) {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isPlatformInView ? 1 : 0, y: isPlatformInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
            <Eye className="w-4 h-4" />
            <span>Platform Overview</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">See How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Explore our advanced platform architecture, intuitive dashboards, and flexible pipeline builder.
          </p>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['architecture', 'dashboard', 'pipeline'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab 
                ? 'bg-accent text-white shadow-md' 
                : 'bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="relative bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 p-4 md:p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {activeTab === 'architecture' && (
              <ArchitectureTab key="architecture" />
            )}
            
            {activeTab === 'dashboard' && (
              <DashboardTab key="dashboard" />
            )}
            
            {activeTab === 'pipeline' && (
              <PipelineTab key="pipeline" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ArchitectureTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="aspect-video w-full bg-gradient-to-br from-background to-secondary/5 rounded-xl overflow-hidden relative">
        {/* Architecture Diagram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {/* User Layer */}
            <div className="flex justify-center mb-8">
              <div className="px-6 py-3 rounded-lg bg-accent/10 border border-accent/20 text-accent font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Development Teams</span>
              </div>
            </div>
            
            {/* API Gateway */}
            <div className="flex justify-center mb-8">
              <div className="px-6 py-3 rounded-lg bg-primary/10 border border-primary/20 text-primary font-medium w-72 text-center">
                API Gateway
              </div>
            </div>
            
            {/* Services Layer */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {['Authentication', 'CI/CD Integration', 'AI Analysis Engine', 'Reporting Service'].map((service, index) => (
                <div key={index} className="px-4 py-3 rounded-lg bg-secondary/20 border border-border/50 text-center text-sm">
                  {service}
                </div>
              ))}
            </div>
            
            {/* Core Layer */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="px-4 py-6 rounded-lg bg-accent/5 border border-accent/10 text-center flex flex-col items-center gap-2">
                <Code className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">SAST Engine</span>
              </div>
              <div className="px-4 py-6 rounded-lg bg-primary/5 border border-primary/10 text-center flex flex-col items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">AI Model Core</span>
              </div>
              <div className="px-4 py-6 rounded-lg bg-accent/5 border border-accent/10 text-center flex flex-col items-center gap-2">
                <Network className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">DAST Engine</span>
              </div>
            </div>
            
            {/* Data Layer */}
            <div className="flex justify-center">
              <div className="px-6 py-3 rounded-lg bg-secondary/30 border border-border/50 text-center w-96 flex items-center justify-center gap-3">
                <Database className="w-4 h-4" />
                <span>Unified Security Database</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Architecture Description */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 max-w-xs">
            <h4 className="font-medium mb-2 text-sm">Modular Architecture</h4>
            <p className="text-xs text-muted-foreground">
              Our cloud-native platform scales automatically with your needs, leveraging containerized microservices for maximum flexibility.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-video w-full bg-gradient-to-br from-background to-secondary/5 rounded-xl overflow-hidden relative">
        {/* Dashboard Content */}
        <div className="absolute inset-0 p-6">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Security Score */}
            <div className="col-span-3 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold mb-6">Security Score</h3>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-400">Good</span>
                  <span className="text-lg font-bold">85%</span>
                </div>
                <div className="h-2 bg-gray-200/20 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last scan:</span>
                    <span>10 minutes ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active projects:</span>
                    <span>12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Issues resolved:</span>
                    <span className="text-green-500">85%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Threat Detection Timeline */}
            <div className="col-span-5 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold mb-6">Threat Detection Timeline</h3>
              <div className="h-40">
                <div className="h-32 flex items-end gap-1">
                  {[35, 28, 45, 32, 55, 42, 38, 62, 48, 40, 30, 52, 45, 35].map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-400/20 hover:bg-blue-400/30 transition-colors rounded-t-sm"
                      style={{ height: `${value}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>Feb 15</span>
                  <span>Yesterday</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Issue Breakdown */}
            <div className="col-span-4 bg-white/5 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <h3 className="text-lg font-semibold mb-6">Issue Breakdown</h3>
              <div className="space-y-4">
                {[
                  { level: 'Critical', count: 2, color: 'bg-red-500' },
                  { level: 'High', count: 7, color: 'bg-orange-500' },
                  { level: 'Medium', count: 15, color: 'bg-yellow-500' },
                  { level: 'Low', count: 28, color: 'bg-blue-500' }
                ].map((issue) => (
                  <div key={issue.level} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${issue.color}`}></div>
                      <span>{issue.level}</span>
                    </div>
                    <span className="font-semibold">{issue.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border/50">
                <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-1">
                  View all issues
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Label */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 max-w-xs">
            <h4 className="font-medium mb-2 text-sm">Real-time Monitoring</h4>
            <p className="text-xs text-muted-foreground">
              Visualize your security posture with intuitive dashboards that provide actionable insights.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PipelineTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-video w-full bg-gradient-to-br from-background to-secondary/5 rounded-xl overflow-hidden relative">
        {/* Pipeline Builder Mockup */}
        <div className="absolute inset-0 p-4">
          <div className="bg-background/90 rounded-lg border border-border/50 h-full overflow-hidden shadow-lg">
            {/* Pipeline Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-accent">
                  <GitBranch className="w-5 h-5" />
                  <span className="font-semibold">Pipeline Builder</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-xs">Cancel</Button>
                <Button size="sm" className="h-8 text-xs bg-accent">Save Pipeline</Button>
              </div>
            </div>
            
            {/* Pipeline Content */}
            <div className="p-4 h-[calc(100%-61px)] flex">
              {/* Tools Panel */}
              <div className="w-56 border-r border-border/50 pr-4">
                <h4 className="text-xs font-medium uppercase text-muted-foreground mb-3">Tools</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Code Scanner', icon: Code, color: 'text-accent' },
                    { name: 'AI Analyzer', icon: Brain, color: 'text-primary' },
                    { name: 'Dependency Check', icon: Database, color: 'text-foreground' },
                    { name: 'Secret Scanner', icon: Shield, color: 'text-foreground' }
                  ].map((tool) => (
                    <div key={tool.name} className="p-2 bg-secondary/20 rounded border border-border/50 flex items-center gap-2 cursor-pointer">
                      <tool.icon className={`w-4 h-4 ${tool.color}`} />
                      <span className="text-xs">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pipeline Canvas */}
              <div className="flex-1 pl-4 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
                <div className="relative z-10">
                  {/* Pipeline Nodes */}
                  <div className="flex flex-col items-center gap-6">
                    {[
                      { name: 'Git Repository', icon: GitBranch, type: 'start' },
                      { name: 'AI Analyzer', icon: Brain, type: 'process' },
                      { name: 'Code Scanner', icon: Code, type: 'process' },
                      { name: 'Secret Scanner', icon: Shield, type: 'process' },
                      { name: 'Security Report', icon: Check, type: 'end' }
                    ].map((node, index) => (
                      <div key={node.name} className="flex flex-col items-center">
                        <div className={`p-3 ${
                          node.type === 'start' ? 'bg-accent/10 border-accent/20' :
                          node.type === 'end' ? 'bg-green-500/10 border-green-500/20' :
                          'bg-secondary/20 border-border/50'
                        } border rounded-lg w-40 flex flex-col items-center`}>
                          <div className={`w-8 h-8 rounded-full ${
                            node.type === 'start' ? 'bg-accent/20' :
                            node.type === 'end' ? 'bg-green-500/20' :
                            'bg-secondary/30'
                          } flex items-center justify-center mb-2`}>
                            <node.icon className={`w-4 h-4 ${
                              node.type === 'start' ? 'text-accent' :
                              node.type === 'end' ? 'text-green-500' :
                              'text-foreground'
                            }`} />
                          </div>
                          <span className="text-xs font-medium">{node.name}</span>
                        </div>
                        {index < 4 && (
                          <div className="h-6 w-0.5 bg-border"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pipeline Label */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border/50 max-w-xs">
            <h4 className="font-medium mb-2 text-sm">Customizable Workflows</h4>
            <p className="text-xs text-muted-foreground">
              Build tailored security pipelines with our intuitive drag-and-drop workflow builder.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 