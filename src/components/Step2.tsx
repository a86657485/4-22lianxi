import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { LineChart as LineChartIcon, Save, Database } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { populationData } from '../data';

import { AIAssistant } from './AIAssistant';

interface Step2Props {
  onComplete: (analysis: string) => void;
  savedAnalysis?: string;
}

export function Step2({ onComplete, savedAnalysis = '' }: Step2Props) {
  const [showChart, setShowChart] = useState(false);
  const [analysis, setAnalysis] = useState(savedAnalysis);

  const handleSave = () => {
    if (analysis.trim()) {
      onComplete(analysis);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <LineChartIcon className="text-cyan-400" />
            人口规模变迁
          </h2>
          <p className="text-slate-400 mt-1">教学目标：理解折线图可用于直观展示随时间变化的趋势</p>
        </div>
      </div>

      {!showChart && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <h4 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
              <Database size={16} /> 2012-2024年深圳年末人口数据表
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-cyan-500 uppercase bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">年份</th>
                    <th className="px-4 py-3 rounded-tr-lg">人口 (万人)</th>
                  </tr>
                </thead>
                <tbody>
                  {populationData.map((row) => (
                    <tr key={row.year} className="border-b border-slate-700/50 last:border-0">
                      <td className="px-4 py-3">{row.year}</td>
                      <td className="px-4 py-3 font-mono text-cyan-300">{row.population}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="flex justify-center">
            <Button variant="glow" onClick={() => setShowChart(true)} className="w-full md:w-auto">
              生成 2012-2024 年人口对比图
            </Button>
          </div>
        </motion.div>
      )}

      {showChart && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={populationData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8' }}
                    axisLine={{ stroke: '#334155' }}
                    dy={10}
                  />
                  <YAxis 
                    type="number"
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8' }}
                    axisLine={{ stroke: '#334155' }}
                    domain={[1100, 1900]}
                    label={{ value: '常住人口 (万人)', angle: -90, position: 'insideLeft', fill: '#64748b', dx: -20 }}
                  />
                  <Tooltip 
                    cursor={{ stroke: '#1e293b', strokeWidth: 2 }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#06b6d4', color: '#f8fafc' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="population" 
                    stroke="#00f2fe" 
                    strokeWidth={3}
                    dot={{ fill: '#0f172a', stroke: '#00f2fe', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#00f2fe' }}
                    animationDuration={1500} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-slate-900/80">
            <h3 className="text-lg font-medium text-cyan-300 mb-3">研究员记录本</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              {/* AI Assistant */}
              <AIAssistant contextPrompt="学生正在观察2012-2024年深圳常住人口的折线图。图表显示人口从2012年的1195万增长到2024年的1798万。其中2014-2020年增长较快，2020年后增长放缓。" />
              
              {/* Textarea */}
              <div className="flex flex-col">
                <p className="text-sm text-slate-400 mb-2">请在下方记录你的最终发现：</p>
                <textarea
                  value={analysis}
                  onChange={(e) => setAnalysis(e.target.value)}
                  placeholder="通过折线图观察，深圳的人口规模发生了怎样的变化趋势？哪一个时间段人口增长最陡峭？请记录你的发现。"
                  className="flex-1 w-full bg-slate-950/50 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none min-h-[200px]"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button 
                onClick={handleSave} 
                disabled={!analysis.trim()}
                variant="primary"
              >
                <Save size={18} />
                保存发现并进入下一步
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
