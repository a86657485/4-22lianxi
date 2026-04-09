import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { GraduationCap, CheckCircle2, XCircle, Bot, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuestionOption {
  text: string;
  chartType?: 'bar' | 'line' | 'pie' | 'radar' | 'area' | 'scatter';
}

interface Question {
  id: number;
  type: 'single' | 'comprehensive';
  text: string;
  options?: (string | QuestionOption)[];
  correctAnswer?: number | string;
  explanation?: string;
  image?: string;
}

const quizData: Question[] = [
  {
    id: 1,
    type: 'single',
    text: '学习活动中，老师要求同学们收集“近十年中国高速铁路营业里程”的数据。为了保证数据的准确性和可靠性，以下哪个渠道获取的数据最具有权威性？',
    options: [
      '某网友在个人博客上发布的数据',
      '某不知名自媒体账号的推文',
      '国家统计局或中国国家铁路集团官方网站',
      '某旅游论坛里的网友讨论帖'
    ],
    correctAnswer: 2,
    explanation: '在进行数据分析时，必须从可靠、正规的权威信息渠道（如国家统计局、官方机构网站）获取数据，以保证数据的准确性和科学性。'
  },
  {
    id: 2,
    type: 'single',
    text: '小明想直观地展示“2015年至2022年我国高速铁路营业里程的变化趋势”，以下四种图表中，最适合用来呈现这一数据的是？',
    options: [
      { text: '条形图（柱状图）', chartType: 'bar' },
      { text: '折线图', chartType: 'line' },
      { text: '饼图', chartType: 'pie' },
      { text: '雷达图', chartType: 'radar' }
    ],
    correctAnswer: 1,
    explanation: '折线图最适合用来呈现一组数据随时间的变化趋势。'
  },
  {
    id: 3,
    type: 'single',
    text: '观察“某市新能源汽车保有量变化”的折线图草图。在这段时间内，新能源汽车保有量增长速度最快的是哪一个阶段？\n(图表描述：2018-2019年线条平缓，2019-2020年线条极度陡峭上升，2020-2021年线条再次趋于平缓)',
    options: [
      '2018年 — 2019年',
      '2019年 — 2020年',
      '2020年 — 2021年',
      '每年增长速度都一样'
    ],
    correctAnswer: 1,
    explanation: '在折线图中，折线越陡峭，代表增长速度越快；折线越平缓，代表增长速度越慢。'
  },
  {
    id: 4,
    type: 'single',
    text: '在使用数字化工具（如电子表格软件）绘制“某地3月份每日平均气温”折线图时，关于横轴（X轴）和纵轴（Y轴）的设置，通常最合理的是？',
    options: [
      '横轴代表“气温”，纵轴代表“日期”',
      '横轴代表“日期”，纵轴代表“气温”',
      '横轴代表“年份”，纵轴代表“气温”',
      '横轴代表“日期”，纵轴代表“降水量”'
    ],
    correctAnswer: 1,
    explanation: '通常情况下，横轴（X轴）用来表示时间（如日期、年份），纵轴（Y轴）用来表示具体的数值（如气温）。'
  },
  {
    id: 5,
    type: 'single',
    text: '教材中展示了“某地某年2021-2023年三月份的每日平均气温”图表，将三年的数据画在同一张折线图（复式折线图）上，其主要目的是？',
    options: [
      '为了让图表看起来色彩更丰富、更复杂',
      '为了对比不同年份在同一时间段内的气温变化规律',
      '为了计算这三年的平均总气温',
      '为了统计这三年共有多少个晴天'
    ],
    correctAnswer: 1,
    explanation: '复式折线图不仅能呈现数据随时间的变化趋势，还能用来对比多组数据在同一时间段内的变化规律。'
  },
  {
    id: 6,
    type: 'single',
    text: '根据教材中“某地某年2021-2023年三月份的每日平均气温”折线图，我们可以发现一个明显的共同规律是？',
    options: [
      '气温每天都在持续不断地上升',
      '到了月中，通常会有降温的情况发生',
      '月末的气温总是全月最低的',
      '三年的每一天气温数据完全一模一样'
    ],
    correctAnswer: 1,
    explanation: '通过分析三组数据可发现，每年三月月初气温呈上升趋势，到了月中会有降温发生，月末气温又逐步回升。'
  },
  {
    id: 7,
    type: 'single',
    text: '关于“基于折线图的数据规律对未来进行预测”，下列说法中最科学、准确的是？',
    options: [
      '只要画出折线图，预测结果就是100%准确的',
      '预测毫无意义，因为未来的事情谁也说不准',
      '预测具有一定的科学性，但实际情况可能受未知因素影响而产生偏差',
      '只要收集的数据足够多，预测就绝对不会出错'
    ],
    correctAnswer: 2,
    explanation: '基于数据的分析与预测具有一定的科学性，但受未知因素的影响，实际的数据规律和趋势可能和预测结果不同。'
  },
  {
    id: 8,
    type: 'single',
    text: '小红收集了我国四个不同城市在2023年的GDP总量数据，她想直观地对比这四个城市GDP的“多少”（而非变化趋势）。以下选项中，最适合的图表是？',
    options: [
      { text: '折线图', chartType: 'line' },
      { text: '条形图', chartType: 'bar' },
      { text: '面积图', chartType: 'area' },
      { text: '散点图', chartType: 'scatter' }
    ],
    correctAnswer: 1,
    explanation: '条形图最适合用来对比不同类别（如不同城市）之间数据的多少。'
  },
  {
    id: 9,
    type: 'single',
    text: '在利用数字化工具生成折线图之前，我们首先必须完成的关键步骤是？',
    options: [
      '直接在软件中点击“插入折线图”按钮',
      '挑选图表的背景颜色和线条粗细',
      '从可靠来源收集数据，并规范地录入、整理到电子表格中',
      '凭空猜测未来的数据趋势'
    ],
    correctAnswer: 2,
    explanation: '数据可视化（作图）的前提是拥有准确的数据，因此必须先从可靠来源收集数据并进行整理。'
  },
  {
    id: 10,
    type: 'single',
    text: '观察“中国高速铁路营业里程”折线图，发现线条呈现逐年上升的趋势，且近几年的线条比早年更加陡峭。这说明了什么？',
    options: [
      '我国高铁营业里程在减少',
      '我国高铁营业里程在增加，且近年来的增长速度越来越快',
      '我国高铁营业里程在增加，但近年来的增长速度变慢了',
      '我国高铁建设已经停止'
    ],
    correctAnswer: 1,
    explanation: '线条上升代表数值增加，线条越陡峭代表增长速度越快。'
  },
  {
    id: 11,
    type: 'comprehensive',
    text: '【综合分析题】我国一直重视环境治理，近些年取得了显著的成效。某班级信息科技兴趣小组从国家统计局官方网站获取了“近年来我国废气中主要污染物排放指标”的部分数据，整理成表格。请结合本节课所学知识，简述：\n1. 为了直观展示“二氧化硫排放量”随时间的变化趋势，应该选择哪种图表？\n2. 绘制该图表时，横轴和纵轴分别应该代表什么？\n3. 假设绘制出的图表显示线条呈现明显的下降趋势，这说明了什么？',
    correctAnswer: '1. 应该选择折线图。\n2. 横轴应该代表年份（时间），纵轴应该代表二氧化硫排放量（万吨）。\n3. 线条呈现下降趋势，说明我国二氧化硫的排放量在逐年减少，反映了我国环境治理取得了显著成效。'
  }
];

const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(40)].map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        const randomDuration = 2 + Math.random() * 3;
        const colors = ['bg-yellow-400', 'bg-cyan-400', 'bg-emerald-400', 'bg-rose-400', 'bg-purple-400'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-sm ${color}`}
            initial={{ top: '-5%', left: `${randomX}%`, rotate: 0, opacity: 1 }}
            animate={{ top: '105%', rotate: 360, opacity: [1, 1, 0] }}
            transition={{ duration: randomDuration, delay: randomDelay, repeat: Infinity, ease: 'linear' }}
          />
        );
      })}
    </div>
  );
};

const ChartGraphic = ({ type, isSelected, isCorrect }: { type: string, isSelected: boolean, isCorrect: boolean | null }) => {
  const colorClass = isSelected 
    ? (isCorrect ? "text-emerald-400" : "text-rose-400") 
    : "text-cyan-400";

  switch (type) {
    case 'bar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-16 h-16 mb-3 ${colorClass}`}>
          <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 20h18" strokeLinecap="round"/>
        </svg>
      );
    case 'line':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-16 h-16 mb-3 ${colorClass}`}>
          <path d="M3 20h18" strokeLinecap="round"/>
          <path d="M4 16l5-5 4 4 7-9" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="4" cy="16" r="1" fill="currentColor"/>
          <circle cx="9" cy="11" r="1" fill="currentColor"/>
          <circle cx="13" cy="15" r="1" fill="currentColor"/>
          <circle cx="20" cy="6" r="1" fill="currentColor"/>
        </svg>
      );
    case 'pie':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-16 h-16 mb-3 ${colorClass}`}>
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 12A10 10 0 0 0 12 2v10z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'radar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-16 h-16 mb-3 ${colorClass}`}>
          <polygon points="12 2 22 8.5 18.5 20 5.5 20 2 8.5" strokeLinecap="round" strokeLinejoin="round"/>
          <polygon points="12 7 17 10.5 15 16 9 16 7 10.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2v20M2 8.5l20 0M5.5 20l13-11.5M18.5 20L5.5 8.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
        </svg>
      );
    case 'area':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-16 h-16 mb-3 ${colorClass}`}>
          <path d="M3 20h18" strokeLinecap="round"/>
          <path d="M4 16l5-5 4 4 7-9 v14 H4 z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'scatter':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-16 h-16 mb-3 ${colorClass}`}>
          <path d="M3 20h18" strokeLinecap="round"/>
          <path d="M3 4v16" strokeLinecap="round"/>
          <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
          <circle cx="18" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="9" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="14" cy="13" r="1.5" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
};

export function Step5() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSelection, setCurrentSelection] = useState<number | null>(null);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean | null>(null);
  
  const [comprehensiveAnswer, setComprehensiveAnswer] = useState('');
  const [showComprehensiveFeedback, setShowComprehensiveFeedback] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    if (isCurrentCorrect) return; // 如果已经答对，锁定选项
    setCurrentSelection(optionIndex);
    setIsCurrentCorrect(optionIndex === currentQuestion.correctAnswer);
  };

  const handleNext = () => {
    if (currentQuestion.type === 'single') {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentSelection(null);
      setIsCurrentCorrect(null);
    } else {
      if (!showComprehensiveFeedback) {
        setShowComprehensiveFeedback(true);
      } else {
        setShowCertificate(true);
      }
    }
  };

  const renderQuestion = () => {
    if (currentQuestion.type === 'single') {
      const hasGraphicOptions = currentQuestion.options?.some(opt => typeof opt !== 'string' && opt.chartType);

      return (
        <div className="space-y-4">
          <div className={hasGraphicOptions ? "grid grid-cols-2 gap-4" : "space-y-4"}>
            {currentQuestion.options?.map((option, index) => {
              const isSelected = currentSelection === index;
              const optionObj = typeof option === 'string' ? { text: option, chartType: undefined } : option;
              
              let buttonClass = 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600';
              if (isSelected) {
                if (isCurrentCorrect) {
                  buttonClass = 'bg-emerald-900/50 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                } else {
                  buttonClass = 'bg-rose-900/50 border-rose-500 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.2)]';
                }
              } else if (isCurrentCorrect && currentQuestion.correctAnswer === index) {
                buttonClass = 'bg-emerald-900/50 border-emerald-500 text-emerald-100';
              }

              if (hasGraphicOptions) {
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isCurrentCorrect === true}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300 ${buttonClass}`}
                  >
                    {optionObj.chartType && (
                      <ChartGraphic 
                        type={optionObj.chartType} 
                        isSelected={isSelected || (isCurrentCorrect && currentQuestion.correctAnswer === index) || false} 
                        isCorrect={isCurrentCorrect} 
                      />
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-medium">{String.fromCharCode(65 + index)}. {optionObj.text}</span>
                      {isSelected && isCurrentCorrect && <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />}
                      {isSelected && isCurrentCorrect === false && <XCircle className="text-rose-500 shrink-0" size={18} />}
                    </div>
                  </button>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isCurrentCorrect === true}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${buttonClass}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{String.fromCharCode(65 + index)}. {optionObj.text}</span>
                    {isSelected && isCurrentCorrect && <CheckCircle2 className="text-emerald-500" size={20} />}
                    {isSelected && isCurrentCorrect === false && <XCircle className="text-rose-500" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {currentSelection !== null && (
              <motion.div
                key={isCurrentCorrect ? 'correct' : 'incorrect'}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`mt-6 flex items-start gap-4 p-5 rounded-xl border ${
                  isCurrentCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/30'
                    : 'bg-rose-950/40 border-rose-500/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${
                  isCurrentCorrect
                    ? 'bg-emerald-900/80 border-emerald-500/50'
                    : 'bg-rose-900/80 border-rose-500/50'
                }`}>
                  <Bot className={isCurrentCorrect ? 'text-emerald-400' : 'text-rose-400'} size={24} />
                </div>
                <div>
                  <h4 className={`font-medium mb-1 ${isCurrentCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isCurrentCorrect ? '回答正确！' : 'AI 导师提示：'}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isCurrentCorrect
                      ? currentQuestion.explanation
                      : `${currentQuestion.explanation} 请再思考一下，重新选择吧！`}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <textarea
            value={comprehensiveAnswer}
            onChange={(e) => setComprehensiveAnswer(e.target.value)}
            disabled={showComprehensiveFeedback}
            placeholder="请在此输入你的分析与解答..."
            className="w-full h-48 bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
          />
          <AnimatePresence>
            {showComprehensiveFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 p-5 bg-indigo-950/50 border border-indigo-500/30 rounded-xl mt-6"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-900/80 flex items-center justify-center border border-indigo-500/50 shrink-0">
                  <Bot className="text-indigo-300" size={24} />
                </div>
                <div>
                  <h4 className="text-indigo-300 font-medium mb-2">AI 导师点评</h4>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">你的分析很有深度！以下是标准的参考答案，你可以对比一下：</p>
                  <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                    <p className="text-emerald-400 whitespace-pre-wrap leading-relaxed">{currentQuestion.correctAnswer}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl mx-auto relative">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe] flex items-center justify-center gap-3">
          <GraduationCap className="text-cyan-400" size={32} />
          随堂测试：探寻趋势与规律
        </h2>
        <p className="text-slate-400">检验学习成果，巩固数据分析知识</p>
      </div>

      <Card className="bg-slate-900/80 border-cyan-500/30 relative z-10">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <span className="text-cyan-400 font-medium">
            第 {currentQuestionIndex + 1} 题 / 共 {quizData.length} 题
          </span>
          <span className="text-slate-400 text-sm">
            {currentQuestion.type === 'single' ? '单项选择题' : '综合分析题'}
          </span>
        </div>

        <div className="mb-8">
          <h3 className="text-lg text-slate-200 leading-relaxed whitespace-pre-wrap">
            {currentQuestion.text}
          </h3>
        </div>

        {renderQuestion()}

        <div className="flex justify-end mt-8 pt-6 border-t border-slate-800">
          <Button
            variant="glow"
            onClick={handleNext}
            disabled={
              (currentQuestion.type === 'single' && !isCurrentCorrect) ||
              (currentQuestion.type === 'comprehensive' && !comprehensiveAnswer.trim())
            }
          >
            {currentQuestion.type === 'single'
              ? '下一题'
              : showComprehensiveFeedback
              ? '领取数据分析师证书'
              : '提交并查看点评'}
          </Button>
        </div>
      </Card>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          >
            <Confetti />
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative max-w-2xl w-full bg-gradient-to-b from-slate-900 to-slate-950 border border-yellow-500/30 shadow-[0_0_80px_rgba(234,179,8,0.15)] rounded-2xl overflow-hidden text-center py-16 px-8"
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-500/50 rounded-tl-2xl m-4" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-yellow-500/50 rounded-tr-2xl m-4" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-yellow-500/50 rounded-bl-2xl m-4" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-500/50 rounded-br-2xl m-4" />

              <motion.div
                initial={{ rotateY: 180, scale: 0 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="relative inline-block mb-8"
              >
                <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 rounded-full" />
                <Award size={100} className="relative text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 mb-4">
                  结 业 证 书
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">
                  恭喜你！成功完成了“解码深圳速度”的所有数据分析任务与考核。你已经熟练掌握了数据获取、图表绘制与趋势预测的核心技能。
                </p>
                <div className="inline-flex items-center gap-3 border border-yellow-500/40 bg-yellow-500/10 px-8 py-4 rounded-full text-yellow-300 font-bold tracking-widest text-xl shadow-[inset_0_0_20px_rgba(234,179,8,0.1)]">
                  <Sparkles size={24} className="text-yellow-400" />
                  初级城市数据分析师
                  <Sparkles size={24} className="text-yellow-400" />
                </div>
                <div className="mt-16 flex justify-between items-end px-12 text-slate-500 font-medium">
                  <div>
                    <p className="border-b border-slate-700 pb-2 mb-2 w-32 mx-auto">AI 导师</p>
                    <p className="text-sm">授权认证</p>
                  </div>
                  <div>
                    <p className="border-b border-slate-700 pb-2 mb-2 w-32 mx-auto">2026年</p>
                    <p className="text-sm">颁发日期</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute bottom-4 right-4">
                <Button variant="outline" onClick={() => setShowCertificate(false)} className="text-xs border-slate-700 text-slate-500 hover:text-slate-300">
                  关闭
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
