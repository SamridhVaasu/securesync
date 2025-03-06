"use client"

import { motion } from 'framer-motion';
import { Brain, GitBranch, Database, Shield } from 'lucide-react';

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
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs">ML model analyzing patterns...</span>
          </div>
          <div className="mt-4 p-2 rounded bg-accent/5 border border-accent/10">
            <pre className="text-xs text-accent">
              {`Analyzing vulnerability patterns...
Checking against known CVEs...
Training on your codebase...
Generating security recommendations...`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PipelineBuilderVisual() {
  return (
    <div className="absolute inset-0 p-6">
      <div className="h-full rounded-xl bg-background/90 border border-border/50 p-4">
        <div className="flex items-center gap-2 mb-6 text-accent">
          <GitBranch className="w-4 h-4" />
          <span className="text-xs font-medium">Pipeline Editor</span>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
          <div className="relative space-y-4">
            {['Code Scanner', 'Dependency Check', 'Secret Scanner'].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-40 p-2 rounded bg-accent/5 border border-accent/10 text-xs">
                  {step}
                </div>
                {i < 2 && (
                  <div className="w-4 h-px bg-border"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SentinelDatabaseVisual() {
  return (
    <div className="absolute inset-0 p-6">
      <div className="h-full rounded-xl bg-background/90 border border-border/50 p-4">
        <div className="flex items-center gap-2 mb-4 text-accent">
          <Database className="w-4 h-4" />
          <span className="text-xs">Threat Intelligence Feed</span>
        </div>
        <div className="space-y-3">
          {[
            { type: 'critical', count: 2, trend: '+1' },
            { type: 'high', count: 5, trend: '-2' },
            { type: 'medium', count: 12, trend: '+3' }
          ].map((threat, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  threat.type === 'critical' ? 'bg-red-500' :
                  threat.type === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-xs capitalize">{threat.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">{threat.count}</span>
                <span className={`text-xs ${
                  threat.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
                }`}>{threat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureFloatingElement({ feature }: { feature: { title: string } }) {
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