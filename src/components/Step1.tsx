import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { AlertTriangle, ShieldCheck, Database, User, Globe, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { metroData, shenzhenRealGDP, populationData } from '../data';

export function Step1({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = useState<'idle' | 'nodeA' | 'nodeB' | 'loading' | 'success'>('idle');
  const [inputs, setInputs] = useState({
    '2022': '',
    '2023': '',
    '2024': ''
  });

  const isDataComplete = inputs['2022'].trim() !== '' && inputs['2023'].trim() !== '' && inputs['2024'].trim() !== '';

  const handleNodeClick = (type: 'A' | 'B' | 'C') => {
    if (type === 'A') {
      setStatus('nodeA');
    } else if (type === 'B') {
      setStatus('nodeB');
    } else {
      window.open('https://tjj.sz.gov.cn/ztzl/zt/sjfb/index.html', '_blank');
      setStatus('loading');
      setTimeout(() => {
        setStatus('success');
      }, 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe]">
          接入城市核心数据库
        </h2>
        <p className="text-slate-400">请选择可靠的数据源以开始我们的城市研究</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card onClick={() => handleNodeClick('A')} className="group">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
              <User size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200">节点 A</h3>
              <p className="text-sm text-slate-400 mt-2">某旅行博主的深圳游记预估</p>
            </div>
          </div>
        </Card>

        <Card onClick={() => handleNodeClick('B')} className="group">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
              <Globe size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200">节点 B</h3>
              <p className="text-sm text-slate-400 mt-2">某百科网友编辑的匿名数据</p>
            </div>
          </div>
        </Card>

        <Card onClick={() => handleNodeClick('C')} className="group border-cyan-500/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <ShieldCheck className="text-cyan-400" size={20} />
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-cyan-900/30 text-cyan-400 group-hover:scale-110 transition-transform">
              <Database size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300">节点 C</h3>
              <p className="text-sm text-cyan-100/70 mt-2">深圳市统计局 / 交通运输局 官方数据接口</p>
            </div>
          </div>
        </Card>
      </div>

      <AnimatePresence mode="wait">
        {status === 'nodeA' && (
          <motion.div
            key="nodeA"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto"
          >
            <Card className="bg-white text-slate-900 border-red-500/30 shadow-xl">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                <div className="w-8 h-8 rounded-full bg-[#ff2442] flex items-center justify-center text-white font-bold text-sm">小</div>
                <span className="font-bold text-[#ff2442]">小红书 - 深圳游记</span>
              </div>
              <img src="https://picsum.photos/seed/shenzhen/400/200" alt="深圳游记" className="w-full h-40 object-cover rounded-lg mb-4" referrerPolicy="no-referrer" />
              <h4 className="font-bold text-lg mb-2">深圳真的太卷了！人也太多了吧😱</h4>
              <p className="text-sm text-slate-600 mb-4">
                今天去深圳湾公园，人山人海！我感觉深圳现在起码有2500万人了吧！GDP肯定也是全国第一！大家觉得呢？
              </p>
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm flex items-start gap-2">
                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                <p><strong>系统提示：</strong>个人游记中的数据（如“起码有2500万人”）属于主观感受和预估，缺乏权威统计口径与准确性，无法用于严谨的城市研究。请重新选择数据渠道。</p>
              </div>
            </Card>
          </motion.div>
        )}

        {status === 'nodeB' && (
          <motion.div
            key="nodeB"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto"
          >
            <Card className="bg-white text-slate-900 border-blue-500/30 shadow-xl">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                <div className="w-8 h-8 rounded bg-[#4e6ef2] flex items-center justify-center text-white font-bold text-sm">百</div>
                <span className="font-bold text-[#4e6ef2]">百度百科 - 网友编辑历史</span>
              </div>
              <h4 className="font-bold text-xl mb-2">深圳市</h4>
              <div className="text-sm text-slate-600 mb-4 space-y-3 bg-slate-50 p-3 rounded border border-slate-100">
                <p className="flex justify-between border-b pb-2">
                  <span><strong>人口：</strong> 约2000万</span>
                  <span className="text-slate-400 text-xs">网友A修改于2024-01-05</span>
                </p>
                <p className="flex justify-between">
                  <span><strong>GDP：</strong> 很多很多亿</span>
                  <span className="text-slate-400 text-xs">网友B修改于2024-02-10</span>
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-700 text-sm flex items-start gap-2">
                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                <p><strong>系统提示：</strong>百科类网站允许网友自行编辑，历史版本中可能存在未经核实的匿名数据，缺乏官方背书与准确性。请重新选择数据渠道。</p>
              </div>
            </Card>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <Loader2 className="animate-spin text-cyan-400" size={48} />
            <p className="text-cyan-400 font-mono animate-pulse">数据解密拉取中...</p>
            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-4 bg-emerald-900/30 border border-emerald-500/50 rounded-lg flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="shrink-0" />
              <p>接入成功！已获取核心指标数据。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <h4 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                  <Database size={16} /> 2012-2024年深圳年末人口
                </h4>
                <p className="text-xs text-amber-400 mb-4">任务：请根据弹出的官网数据，补全缺失的年份人口数据。</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-cyan-500 uppercase bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">年份</th>
                        <th className="px-4 py-3 rounded-tr-lg">人口 (万人)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {populationData.slice(8).map((row) => {
                        const isMissing = ['2022', '2023', '2024'].includes(row.year);
                        return (
                          <tr key={row.year} className="border-b border-slate-700/50 last:border-0">
                            <td className="px-4 py-3">{row.year}</td>
                            <td className="px-4 py-3 font-mono text-cyan-300">
                              {isMissing ? (
                                <input
                                  type="text"
                                  value={inputs[row.year as keyof typeof inputs]}
                                  onChange={(e) => setInputs({ ...inputs, [row.year]: e.target.value })}
                                  className="w-24 bg-slate-950/50 border border-cyan-500/50 rounded px-2 py-1 text-cyan-300 focus:outline-none focus:border-cyan-400"
                                  placeholder="???"
                                />
                              ) : (
                                row.population
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card>
                <h4 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                  <Database size={16} /> 深圳地铁历年营业里程
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-cyan-500 uppercase bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">年份</th>
                        <th className="px-4 py-3 rounded-tr-lg">里程 (公里)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metroData.slice(0, 4).map((row, i) => (
                        <tr key={row.year} className="border-b border-slate-700/50 last:border-0">
                          <td className="px-4 py-3">{row.year}</td>
                          <td className="px-4 py-3 font-mono text-cyan-300">{row.mileage}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center text-slate-500 text-xs">... 更多数据已加载</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card>
                <h4 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                  <Database size={16} /> 深圳历年真实GDP
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-cyan-500 uppercase bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">年份</th>
                        <th className="px-4 py-3 rounded-tr-lg">GDP (亿元)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shenzhenRealGDP.slice(0, 4).map((row, i) => (
                        <tr key={row.year} className="border-b border-slate-700/50 last:border-0">
                          <td className="px-4 py-3">{row.year}</td>
                          <td className="px-4 py-3 font-mono text-cyan-300">{row.gdp}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center text-slate-500 text-xs">... 更多数据已加载</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="glow" onClick={onComplete}>
                进入工作台 (下一步)
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
