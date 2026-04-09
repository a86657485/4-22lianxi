import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FileText, UploadCloud, CheckCircle2, BarChart2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { combinedData } from '../data';
import { AIAssistant } from './AIAssistant';

interface Step4Props {
  step2Analysis: string;
  step3Analysis: string;
}

export function Step4({ step2Analysis, step3Analysis }: Step4Props) {
  const [isArchived, setIsArchived] = useState(false);
  const [isCombined, setIsCombined] = useState(false);
  const [finalAnalysis, setFinalAnalysis] = useState('');

  const handleArchive = () => {
    setIsArchived(true);
  };

  const renderMetroLabel = (props: any, dataKey: 'szMetro' | 'gzMetro', position: 'top' | 'bottom') => {
    const { x, y, value, index } = props;
    const prevValue = index > 0 ? combinedData[index - 1][dataKey] : null;
    
    // 只在数值发生变化，或者是第一个/最后一个点时显示标签，避免连续相同的数值水平重叠
    const shouldShow = index === 0 || index === combinedData.length - 1 || value !== prevValue;
    
    if (!shouldShow) return null;

    const dy = position === 'top' ? -12 : 20;
    const fill = dataKey === 'szMetro' ? '#00f2fe' : '#10b981';
    
    return (
      <text x={x} y={y} dy={dy} fill={fill} fontSize={11} textAnchor="middle" fontWeight="500">
        {value}
      </text>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe] flex items-center justify-center gap-3">
          <FileText className="text-cyan-400" size={32} />
          城市发展洞察报告
        </h2>
        <p className="text-slate-400">基于数据分析生成的最终研究成果</p>
      </div>

      <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-lg border border-slate-800">
        <h3 className="text-lg font-medium text-cyan-300">双城发展对比 (深圳 vs 广州)</h3>
        <Button variant="glow" onClick={() => setIsCombined(!isCombined)}>
          {isCombined ? '拆分单线图' : '生成复式折线图对比'}
        </Button>
      </div>

      {!isCombined ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shenzhen Population */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-cyan-400 border-b border-slate-800 pb-3">
              <BarChart2 size={20} />
              <h3 className="text-lg font-semibold">深圳人口规模变迁 (万人)</h3>
            </div>
            <div className="h-48 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[1000, 2000]} />
                  <Line type="monotone" dataKey="szPop" stroke="#00f2fe" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Guangzhou Population */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 border-b border-slate-800 pb-3">
              <BarChart2 size={20} />
              <h3 className="text-lg font-semibold">广州人口规模变迁 (万人)</h3>
            </div>
            <div className="h-48 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[1000, 2000]} />
                  <Line type="monotone" dataKey="gzPop" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Shenzhen GDP */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-cyan-400 border-b border-slate-800 pb-3">
              <TrendingUp size={20} />
              <h3 className="text-lg font-semibold">深圳 GDP 增长 (亿元)</h3>
            </div>
            <div className="h-48 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="szGdp" stroke="#00f2fe" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Guangzhou GDP */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 border-b border-slate-800 pb-3">
              <TrendingUp size={20} />
              <h3 className="text-lg font-semibold">广州 GDP 增长 (亿元)</h3>
            </div>
            <div className="h-48 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="gzGdp" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Shenzhen Metro */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-cyan-400 border-b border-slate-800 pb-3">
              <TrendingUp size={20} />
              <h3 className="text-lg font-semibold">深圳地铁里程 (公里)</h3>
            </div>
            <div className="h-48 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="szMetro" stroke="#00f2fe" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }}>
                    <LabelList dataKey="szMetro" content={(props) => renderMetroLabel(props, 'szMetro', 'top')} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Guangzhou Metro */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-emerald-400 border-b border-slate-800 pb-3">
              <TrendingUp size={20} />
              <h3 className="text-lg font-semibold">广州地铁里程 (公里)</h3>
            </div>
            <div className="h-48 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="gzMetro" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }}>
                    <LabelList dataKey="gzMetro" content={(props) => renderMetroLabel(props, 'gzMetro', 'top')} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {/* Combined Population */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-white border-b border-slate-800 pb-3">
              <BarChart2 size={20} />
              <h3 className="text-lg font-semibold">人口对比 (万人)</h3>
            </div>
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[1000, 2000]} />
                  <Line type="monotone" dataKey="szPop" name="深圳" stroke="#00f2fe" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="gzPop" name="广州" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-cyan-400"><div className="w-3 h-3 bg-cyan-400 rounded-full"></div>深圳</span>
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-3 h-3 bg-emerald-400 rounded-full"></div>广州</span>
            </div>
          </Card>

          {/* Combined GDP */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-white border-b border-slate-800 pb-3">
              <TrendingUp size={20} />
              <h3 className="text-lg font-semibold">GDP对比 (亿元)</h3>
            </div>
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="szGdp" name="深圳" stroke="#00f2fe" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="gzGdp" name="广州" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-cyan-400"><div className="w-3 h-3 bg-cyan-400 rounded-full"></div>深圳</span>
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-3 h-3 bg-emerald-400 rounded-full"></div>广州</span>
            </div>
          </Card>

          {/* Combined Metro */}
          <Card className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-white border-b border-slate-800 pb-3">
              <TrendingUp size={20} />
              <h3 className="text-lg font-semibold">地铁里程对比 (公里)</h3>
            </div>
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="szMetro" name="深圳" stroke="#00f2fe" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }}>
                    <LabelList dataKey="szMetro" content={(props) => renderMetroLabel(props, 'szMetro', 'bottom')} />
                  </Line>
                  <Line type="monotone" dataKey="gzMetro" name="广州" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }}>
                    <LabelList dataKey="gzMetro" content={(props) => renderMetroLabel(props, 'gzMetro', 'top')} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-cyan-400"><div className="w-3 h-3 bg-cyan-400 rounded-full"></div>深圳</span>
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-3 h-3 bg-emerald-400 rounded-full"></div>广州</span>
            </div>
          </Card>
        </div>
      )}

      {isCombined && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
          <Card className="bg-slate-900/80 border-cyan-500/30">
            <h3 className="text-xl font-medium text-cyan-300 mb-4 flex items-center gap-2">
              <TrendingUp size={24} /> 最终洞察：双城发展对比与趋势预测
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              <AIAssistant contextPrompt="学生正在查看深圳和广州在人口、GDP、地铁里程三个维度的双城对比复式折线图。请引导学生对比深广两地的发展速度差异，并基于这些数据对深圳未来的发展趋势进行深度预测与分析。" />
              <div className="flex flex-col">
                <p className="text-sm text-slate-400 mb-2">请在下方记录你的最终洞察报告：</p>
                <textarea
                  value={finalAnalysis}
                  onChange={(e) => setFinalAnalysis(e.target.value)}
                  placeholder="请结合上方的双城对比图表，分析深圳与广州的发展速度差异，并对深圳未来的发展趋势做出你的预测。"
                  className="flex-1 w-full bg-slate-950/50 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none min-h-[200px]"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="flex justify-center pt-8">
        <AnimatePresence mode="wait">
          {!isArchived ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button 
                variant="glow" 
                onClick={handleArchive} 
                className="px-8 py-4 text-lg"
                disabled={isCombined && !finalAnalysis.trim()}
              >
                <UploadCloud className="mr-2" />
                归档报告至城市数据大脑
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-cyan-500 rounded-full blur-xl"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <CheckCircle2 className="text-cyan-400 relative z-10" size={64} />
              </div>
              <h3 className="text-2xl font-bold text-cyan-300">报告已上传至城市数据大脑</h3>
              <p className="text-slate-400">感谢研究员的付出！</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
