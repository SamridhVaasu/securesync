'use client';

import { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Node,
  Edge,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Shield, 
  AlertTriangle, 
  Lock,
  ShieldCheck,
  FileWarning,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { 
      label: (
        <div className="flex items-center gap-2 p-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Security Overview</span>
        </div>
      )
    },
    position: { x: 250, y: 0 },
    className: 'bg-card border-primary/50 shadow-lg'
  },
  {
    id: '2',
    data: { 
      label: (
        <div className="flex items-center gap-2 p-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <span>Code Analysis</span>
        </div>
      )
    },
    position: { x: 100, y: 100 },
    className: 'bg-card border-yellow-500/50'
  },
  {
    id: '3',
    data: { 
      label: (
        <div className="flex items-center gap-2 p-2">
          <Lock className="h-5 w-5 text-blue-500" />
          <span>Security Hotspots</span>
        </div>
      )
    },
    position: { x: 400, y: 100 },
    className: 'bg-card border-blue-500/50'
  },
  {
    id: '4',
    data: { 
      label: (
        <div className="flex items-center gap-2 p-2">
          <FileWarning className="h-5 w-5 text-red-500" />
          <span>Vulnerabilities</span>
        </div>
      )
    },
    position: { x: 100, y: 200 },
    className: 'bg-card border-red-500/50'
  },
  {
    id: '5',
    data: { 
      label: (
        <div className="flex items-center gap-2 p-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <span>Quality Gates</span>
        </div>
      )
    },
    position: { x: 400, y: 200 },
    className: 'bg-card border-green-500/50'
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e3-5', source: '3', target: '5', animated: true }
];

export default function DashboardPage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    const dashboardUrls: Record<string, string> = {
      '1': 'http://20.24.56.74:9000/project/issues?id=securesync_github&resolved=false',
      '2': 'http://20.24.56.74:9000/code?id=securesync_github',
      '3': 'http://20.24.56.74:9000/security_hotspots?id=securesync_github',
      '4': 'http://20.24.56.74:9000/project/issues?id=securesync_github&resolved=false',
      '5': 'http://20.24.56.74:9000/component_measures?id=securesync_github'
    };
    
    const url = dashboardUrls[node.id];
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-8 h-screen bg-gradient-to-br from-background to-background/80">
      <Card className="h-full p-6 backdrop-blur-xl bg-card/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Security Analysis Flow</h2>
            <p className="text-sm text-muted-foreground">Click nodes to view detailed SonarQube dashboards</p>
          </div>
        </div>
        <div className="h-[calc(100%-5rem)] rounded-xl overflow-hidden border border-border/50">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            fitView
            className="bg-background/50"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </Card>
    </div>
  );
}
