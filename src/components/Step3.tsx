import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { TrendingUp, Save, MousePointerClick, GripHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { gdpData } from '../data';
import { AIAssistant } from './AIAssistant';

interface Step3Props {
  onComplete: (analysis: string) => void;
  savedAnalysis?: string;
}

export function Step3({ onComplete, savedAnalysis = '' }: Step3Props) {
  const [phase, setPhase] = useState<'setup' | 'plot' | 'analyze'>('setup');
  const [xAxis, setXAxis] = useState<string | null>(null);
  const [yAxis, setYAxis] = useState<string | null>(null);
  const [plottedPoints, setPlottedPoints] = useState<Record<number, number>>({});
  const [plotIndex, setPlotIndex] = useState(0);
  const [hoverY, setHoverY] = useState<number | null>(null);
  const [hoverGdp, setHoverGdp] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState(savedAnalysis);
  const svgRef = useRef<SVGSVGElement>(null);

  const labels: Record<string, string> = {
    year: '年份',
    gdp: 'GDP (亿元)',
    population: '人口 (万人)'
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e: React.DragEvent, target: 'x' | 'y') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (target === 'x') setXAxis(id);
    if (target === 'y') setYAxis(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (xAxis === 'year' && yAxis === 'gdp' && phase === 'setup') {
      setTimeout(() => setPhase('plot'), 500); // Small delay for UX
    }
  }, [xAxis, yAxis, phase]);

  const handlePlotNext = () => {
    if (plotIndex < gdpData.length) {
      const data = gdpData[plotIndex];
      setPlottedPoints(prev => ({ ...prev, [data.year]: data.gdp }));
      setPlotIndex(prev => prev + 1);
    }
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (phase !== 'plot') return;
    if (plotIndex >= gdpData.length) return;
    
    // 无论点击坐标系中的哪个模糊位置，都自动校准并绘制当前进度对应的准确点
    handlePlotNext();
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (phase !== 'plot' || plotIndex >= gdpData.length) {
      setHoverY(null);
      return;
    }
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const svgY = y * (400 / rect.height);

    let gdp = (1 - (svgY - 60) / 300) * 40000;
    gdp = Math.max(0, Math.min(40000, gdp));

    setHoverY(svgY);
    setHoverGdp(Math.round(gdp));
  };

  const handleMouseLeave = () => {
    setHoverY(null);
    setHoverGdp(null);
  };

  const sortedPoints = Object.entries(plottedPoints)
    .map(([year, gdp]) => ({ year: parseInt(year), gdp }))
    .sort((a, b) => a.year - b.year);

  const handleFinishPlotting = () => {
    setPhase('analyze');
  };

  const handleSave = () => {
    if (analysis.trim()) {
      onComplete(analysis);
    }
  };

  const isError = (xAxis && xAxis !== 'year') || (yAxis && yAxis !== 'gdp');

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <TrendingUp className="text-cyan-400" />
            感受深圳速度 (GDP)
          </h2>
          <p className="text-slate-400 mt-1">教学目标：亲自动手构建坐标系并绘制折线图，感受深圳GDP的增长速度</p>
        </div>
      </div>

      {phase === 'setup' && (
        <Card className="bg-slate-900/80 border-cyan-500/30">
          <h3 className="text-lg font-medium text-cyan-300 mb-4 flex items-center gap-2">
            <GripHorizontal size={18} /> 第一步：构建坐标系
          </h3>
          <p className="text-slate-400 mb-4 text-sm">请将下方的标签拖拽到图表对应的横轴和纵轴位置，以建立正确的坐标系。</p>
          
          <div className="flex gap-4 mb-6">
            {Object.entries(labels).map(([id, label]) => (
              <div
                key={id}
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded cursor-grab active:cursor-grabbing hover:border-cyan-500 hover:text-cyan-400 transition-colors shadow-lg"
              >
                {label}
              </div>
            ))}
          </div>
          
          {isError && (
            <p className="text-amber-400 text-sm mb-4">提示：坐标轴选择似乎不太对哦，我们要看的是“年份”和“GDP”的关系。</p>
          )}
        </Card>
      )}

      {phase === 'plot' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-slate-900/80 border-cyan-500/30 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-lg font-medium text-cyan-300 flex items-center gap-2">
                <MousePointerClick size={18} /> 第二步：绘制折线图
              </h3>
              <div className="flex gap-3">
                {plotIndex < gdpData.length ? (
                  <Button variant="glow" onClick={handlePlotNext}>
                    绘制 {gdpData[plotIndex].year} 年数据
                  </Button>
                ) : (
                  <Button variant="glow" onClick={handleFinishPlotting}>
                    完成绘制并分析
                  </Button>
                )}
              </div>
            </div>
            <p className="text-slate-400 mb-4 text-sm">点击上方按钮，或者<strong>在下方坐标系的大致位置点击</strong>，系统会自动校准并连成折线。</p>
            
            <div className="overflow-x-auto mb-4 rounded-lg border border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,254,0.1)]">
              <table className="w-full text-sm text-center border-collapse">
                <thead className="text-xs text-cyan-100 uppercase bg-cyan-900/60">
                  <tr>
                    <th className="px-3 py-3 border-b border-r border-cyan-500/50 font-bold whitespace-nowrap">年份</th>
                    {gdpData.map(d => <th key={d.year} className="px-2 py-3 border-b border-cyan-500/50 font-bold">{d.year}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-900/80">
                    <td className="px-3 py-3 border-r border-cyan-500/50 font-bold text-cyan-100 whitespace-nowrap">GDP<br/><span className="text-[10px] text-cyan-300/70">(亿元)</span></td>
                    {gdpData.map(d => <td key={d.year} className="px-2 py-3 border-cyan-500/50 font-mono text-cyan-300 font-bold text-base">{d.gdp}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Chart Area (Always visible, but interactive only in plot phase) */}
      <Card className="p-0 overflow-hidden border-cyan-500/50 shadow-[0_0_30px_rgba(0,242,254,0.15)]">
        <div className="relative w-full h-[400px] bg-slate-950">
          {/* Drop Zones */}
          {phase === 'setup' && (
            <>
              <div 
                className={`absolute left-4 top-4 w-32 h-10 border-2 border-dashed flex items-center justify-center rounded z-10 transition-colors ${yAxis ? (yAxis === 'gdp' ? 'border-emerald-500 bg-emerald-900/20 text-emerald-300' : 'border-amber-500 bg-amber-900/20 text-amber-300') : 'border-slate-600 bg-slate-800/50 text-slate-400'}`}
                onDrop={(e) => handleDrop(e, 'y')}
                onDragOver={handleDragOver}
              >
                {yAxis ? labels[yAxis] : '拖拽纵轴到此'}
              </div>

              <div 
                className={`absolute bottom-4 right-4 w-32 h-10 border-2 border-dashed flex items-center justify-center rounded z-10 transition-colors ${xAxis ? (xAxis === 'year' ? 'border-emerald-500 bg-emerald-900/20 text-emerald-300' : 'border-amber-500 bg-amber-900/20 text-amber-300') : 'border-slate-600 bg-slate-800/50 text-slate-400'}`}
                onDrop={(e) => handleDrop(e, 'x')}
                onDragOver={handleDragOver}
              >
                {xAxis ? labels[xAxis] : '拖拽横轴到此'}
              </div>
            </>
          )}

          {/* Axis Labels (after setup) */}
          {phase !== 'setup' && (
            <>
              <div className="absolute left-4 top-4 text-cyan-400 font-medium text-sm">{labels['gdp']}</div>
              <div className="absolute bottom-4 right-4 text-cyan-400 font-medium text-sm">{labels['year']}</div>
            </>
          )}

          <svg 
            ref={svgRef} 
            viewBox="0 0 800 400" 
            className={`w-full h-full ${phase === 'plot' ? 'cursor-crosshair' : ''}`} 
            onClick={handleSvgClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grid and Axes */}
            {[0, 10000, 20000, 30000, 40000].map(val => {
              const y = 60 + 300 - (val / 40000) * 300;
              return (
                <g key={`grid-y-${val}`}>
                  <line x1="80" y1={y} x2="760" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                  {(yAxis === 'gdp' || phase !== 'setup') && <text x="70" y={y + 4} fill="#64748b" fontSize="12" textAnchor="end">{val}</text>}
                </g>
              );
            })}
            {Array.from({ length: 13 }).map((_, i) => {
              const year = 2012 + i;
              const x = 80 + (i / 12) * 680;
              return (
                <g key={`grid-x-${year}`}>
                  <line x1={x} y1="60" x2={x} y2="360" stroke="#1e293b" strokeDasharray="3 3" />
                  {(xAxis === 'year' || phase !== 'setup') && <text x={x} y="380" fill="#64748b" fontSize="12" textAnchor="middle">{year}</text>}
                </g>
              );
            })}
            
            <line x1="80" y1="60" x2="80" y2="360" stroke="#334155" strokeWidth="2" />
            <line x1="80" y1="360" x2="760" y2="360" stroke="#334155" strokeWidth="2" />
            
            {/* Plotted Line */}
            {sortedPoints.length > 1 && (
              <polyline 
                points={sortedPoints.map(p => {
                  const x = 80 + ((Number(p.year) - 2012) / 12) * 680;
                  const y = 60 + 300 - (Number(p.gdp) / 40000) * 300;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#00f2fe"
                strokeWidth="3"
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,242,254,0.5))' }}
              />
            )}
            
            {/* Plotted Points */}
            {sortedPoints.map(p => {
              const x = 80 + ((Number(p.year) - 2012) / 12) * 680;
              const y = 60 + 300 - (Number(p.gdp) / 40000) * 300;
              return (
                <circle key={`point-${p.year}`} cx={x} cy={y} r="6" fill="#00f2fe" stroke="#0f172a" strokeWidth="2" />
              );
            })}

            {/* Hover Indicator */}
            {hoverY !== null && hoverGdp !== null && phase === 'plot' && (
              <g className="pointer-events-none">
                <line x1="80" y1={hoverY} x2="760" y2={hoverY} stroke="#06b6d4" strokeDasharray="4 4" opacity="0.5" />
                <rect x="80" y={hoverY - 25} width="80" height="20" fill="#0891b2" rx="4" />
                <text x="120" y={hoverY - 11} fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold">
                  {hoverGdp} 亿元
                </text>
              </g>
            )}
          </svg>
        </div>
      </Card>

      {phase === 'analyze' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-slate-900/80">
            <h3 className="text-lg font-medium text-cyan-300 mb-3">研究员记录本</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              <AIAssistant contextPrompt="学生刚刚亲手绘制了2012-2024年深圳GDP的折线图。请引导学生分析这条陡峭的增长曲线，并鼓励他们基于现有数据趋势，对深圳未来的GDP发展做出合理的预测。" />
              
              <div className="flex flex-col">
                <p className="text-sm text-slate-400 mb-2">请在下方记录你的最终发现：</p>
                <textarea
                  value={analysis}
                  onChange={(e) => setAnalysis(e.target.value)}
                  placeholder="请观察你绘制的深圳GDP折线。基于目前的增长趋势，你对深圳未来的经济发展有怎样的预测？请写下你的分析与预测。"
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
                保存发现并生成报告
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
