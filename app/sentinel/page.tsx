'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
} from 'recharts';
import { Shield, AlertTriangle, RefreshCcw, FileCode, Folder, Code, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';

interface VulnerabilityData {
  type: string;
  count: number;
  files: Array<{
    path: string;
    language: string;
  }>;
  languages: {
    [key: string]: number;
  };
}

export default function SentinelPage() {
  const [vulnerabilityData, setVulnerabilityData] = useState<VulnerabilityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activePieIndex, setActivePieIndex] = useState(0);

  const COLORS = {
    primary: '#0F172A',
    secondary: '#334155',
    accent: '#6366f1',
    error: '#ef4444',
    warning: '#f97316',
    success: '#22c55e',
    info: '#06b6d4',
    muted: '#64748b',
    chart1: '#4F46E5',
    chart2: '#EF4444',
    chart3: '#10B981',
    chart4: '#F59E0B',
    chart5: '#3B82F6',
    chart6: '#8B5CF6',
    chart7: '#EC4899',
    chart8: '#14B8A6',
    gradientFrom: '#4F46E5',
    gradientTo: '#8B5CF6',
  };

  const CHART_COLORS = [
    COLORS.chart1,
    COLORS.chart2,
    COLORS.chart3,
    COLORS.chart4,
    COLORS.chart5,
    COLORS.chart6,
    COLORS.chart7,
    COLORS.chart8,
  ];

  const getLanguageFromFile = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase() || '';
    const languageMap: { [key: string]: string } = {
      'py': 'Python',
      'php': 'PHP',
      'js': 'JavaScript',
      'java': 'Java',
      'go': 'Go',
      'c': 'C',
      'cpp': 'C++',
      'html': 'HTML',
      'css': 'CSS',
      'sql': 'SQL',
    };
    return languageMap[ext] || 'Other';
  };

  const fetchVulnerabilityData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      };

      // Fetch repository contents
      const response = await fetch('https://api.github.com/repos/yeswehack/vulnerable-code-snippets/git/trees/main?recursive=1', {
        headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch repository data');
      }

      const data = await response.json();
      const vulnerabilities: { [key: string]: VulnerabilityData } = {};

      // Process all files in the repository
      data.tree.forEach((item: any) => {
        if (item.type === 'blob') {
          const pathParts = item.path.split('/');
          if (pathParts.length > 1) {
            const vulnType = pathParts[0];
            const language = getLanguageFromFile(item.path);

            if (!vulnerabilities[vulnType]) {
              vulnerabilities[vulnType] = {
                type: vulnType,
                count: 0,
                files: [],
                languages: {}
              };
            }

            vulnerabilities[vulnType].count++;
            vulnerabilities[vulnType].files.push({
              path: item.path,
              language
            });

            vulnerabilities[vulnType].languages[language] = 
              (vulnerabilities[vulnType].languages[language] || 0) + 1;
          }
        }
      });

      const processedData = Object.values(vulnerabilities)
        .filter(v => v.type !== '.git' && !v.type.startsWith('.'))
        .sort((a, b) => b.count - a.count);

      setVulnerabilityData(processedData);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vulnerability data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVulnerabilityData();
  }, []);

  const totalVulnerabilities = vulnerabilityData.reduce((sum, item) => sum + item.count, 0);
  const totalLanguages = new Set(
    vulnerabilityData.flatMap(v => Object.keys(v.languages))
  ).size;

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-lg font-medium">
          {payload.type}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          className="text-sm"
        >{`${payload.type} (${value})`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
          className="text-xs"
        >
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen gap-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="text-lg font-semibold text-destructive">Error Loading Data</h2>
        <p className="text-muted-foreground text-center">{error}</p>
        <Button onClick={fetchVulnerabilityData} variant="default">
          Try Again
        </Button>
      </div>
    );
  }

  const languageData = vulnerabilityData.reduce((acc: { [key: string]: number }, vuln) => {
    Object.entries(vuln.languages).forEach(([lang, count]) => {
      acc[lang] = (acc[lang] || 0) + count;
    });
    return acc;
  }, {});

  const languageChartData = Object.entries(languageData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-background/50 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight flex items-center gap-3 text-foreground"
          >
            <Shield className="h-10 w-10 text-accent" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6]">
              Vulnerability Sentinel
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground max-w-2xl leading-relaxed"
          >
            Monitor and analyze security vulnerabilities across your codebase. Track vulnerability patterns, 
            language distributions, and security hotspots in real-time.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Badge variant="outline" className="h-8 bg-background/50 backdrop-blur-sm border-accent/20 px-4">
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              Last updated: {lastUpdated}
            </p>
          </Badge>
          <Button 
            onClick={fetchVulnerabilityData} 
            variant="outline" 
            size="sm"
            className="hover:bg-accent hover:text-white transition-all duration-300 backdrop-blur-sm border-accent/20"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10 group">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileCode className="h-4 w-4 text-accent group-hover:text-accent/80 transition-colors" />
              Total Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4F46E5] group-hover:to-[#8B5CF6] transition-all">
              {totalVulnerabilities}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Vulnerable code samples</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10 group">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-error group-hover:text-error/80 transition-colors" />
              Vulnerability Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#EF4444] group-hover:to-[#EF4444]/80 transition-all">
              {vulnerabilityData.length}
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10 group">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Code className="h-4 w-4 text-warning group-hover:text-warning/80 transition-colors" />
              Programming Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#10B981] group-hover:to-[#10B981]/80 transition-all">
              {totalLanguages}
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10 group">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Folder className="h-4 w-4 text-success group-hover:text-success/80 transition-colors" />
              Most Common Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#10B981] group-hover:to-[#10B981]/80 transition-all">
              {vulnerabilityData[0]?.type || 'N/A'}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-background/50 backdrop-blur-sm border-accent/10 p-1">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4F46E5] data-[state=active]:to-[#8B5CF6] data-[state=active]:text-white transition-all duration-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="languages" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4F46E5] data-[state=active]:to-[#8B5CF6] data-[state=active]:text-white transition-all duration-300"
          >
            Languages
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#4F46E5] data-[state=active]:to-[#8B5CF6] data-[state=active]:text-white transition-all duration-300"
          >
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5 text-accent" />
                  Vulnerability Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vulnerabilityData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={COLORS.gradientFrom} stopOpacity={1} />
                          <stop offset="100%" stopColor={COLORS.gradientTo} stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="type"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                      />
                      <YAxis tick={{ fill: '#64748b' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          padding: '12px'
                        }} 
                      />
                      <Bar 
                        dataKey="count" 
                        fill="url(#barGradient)"
                        radius={[4, 4, 0, 0]}
                      >
                        {vulnerabilityData.map((_, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                            className="hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-accent" />
                  Category Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        {CHART_COLORS.map((color, index) => (
                          <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                            <stop offset="100%" stopColor={color} stopOpacity={1} />
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        activeIndex={activePieIndex}
                        activeShape={renderActiveShape}
                        data={vulnerabilityData}
                        dataKey="count"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        onMouseEnter={(_, index) => setActivePieIndex(index)}
                      >
                        {vulnerabilityData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#pieGradient-${index % CHART_COLORS.length})`}
                            className="hover:opacity-90 transition-opacity duration-300"
                            stroke="none"
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          padding: '12px'
                        }}
                      />
                      <Legend 
                        layout="vertical" 
                        align="right"
                        verticalAlign="middle"
                        wrapperStyle={{
                          paddingLeft: '20px',
                          maxHeight: '300px',
                          overflowY: 'auto',
                          overflowX: 'hidden',
                          fontSize: '12px'
                        }}
                        formatter={(value, entry: any) => (
                          <span className="text-sm text-foreground whitespace-nowrap">
                            {value.length > 15 ? `${value.substring(0, 15)}...` : value} ({entry.payload.count})
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="languages">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5 text-accent" />
                  Language Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={languageChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                      />
                      <YAxis tick={{ fill: '#64748b' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          padding: '12px'
                        }}
                      />
                      <Bar dataKey="value" fill={COLORS.accent}>
                        {languageChartData.map((_, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                            className="hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-accent" />
                  Language Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label={(entry) => `${entry.name} (${entry.value})`}
                      >
                        {languageChartData.map((_, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                            className="hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          padding: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <Card className="hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm border-accent/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Folder className="h-5 w-5 text-accent" />
                Vulnerability Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8">
                  {vulnerabilityData.map((vuln, index) => (
                    <div 
                      key={vuln.type} 
                      className="space-y-4 pb-6 border-b border-border last:border-0 hover:bg-accent/5 p-4 rounded-lg transition-colors"
                    >
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                        />
                        <span className="truncate" title={vuln.type}>{vuln.type}</span>
                        <Badge variant="secondary" className="ml-2 whitespace-nowrap">
                          {vuln.count} files
                        </Badge>
                      </h3>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-foreground">
                          <Code className="h-4 w-4 text-accent" />
                          Languages Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(vuln.languages).map(([lang, count]) => (
                            <Badge
                              key={lang}
                              variant="outline"
                              className="bg-background/50 hover:bg-accent hover:text-white transition-colors"
                            >
                              {lang} ({count})
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                          <FileCode className="h-4 w-4 text-accent" />
                          Files
                        </h4>
                        <ul className="space-y-1 max-h-[200px] overflow-y-auto pr-2">
                          {vuln.files.map(file => (
                            <li 
                              key={file.path} 
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-2 p-2 hover:bg-accent/5 rounded"
                            >
                              <FileCode className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate" title={file.path}>{file.path}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 