import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface AIAssistantProps {
  contextPrompt: string;
}

export function AIAssistant({ contextPrompt }: AIAssistantProps) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: '你好！我是你的AI数据分析师。观察上面的图表，你有什么发现吗？如果有不明白的地方，随时问我！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-eb65e011c69a4e1cb667eecdfce990a8'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { 
              role: 'system', 
              content: `你是一个专业的AI数据分析师，正在辅助一名中学生进行数据图表分析。
              你的目标是【引导】学生自己得出结论，而不是直接告诉他们答案。
              你可以使用苏格拉底式提问法，指出图表中的关键变化点，或者给出思考方向。
              当前任务背景：${contextPrompt}
              请保持语气友好、鼓励，回答尽量简短精炼。` 
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我的网络连接似乎出了点问题，请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[300px] bg-slate-950/50 border border-cyan-500/30 rounded-lg overflow-hidden">
      <div className="bg-cyan-950/50 px-4 py-2 border-b border-cyan-500/30 flex items-center gap-2">
        <Sparkles className="text-cyan-400" size={16} />
        <span className="text-sm font-medium text-cyan-100">AI 数据分析师</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center shrink-0 border border-cyan-500/30">
                <Bot size={16} className="text-cyan-400" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-100' 
                : 'bg-slate-800/50 border border-slate-700 text-slate-300'
            }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                <User size={16} className="text-slate-400" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center shrink-0 border border-cyan-500/30">
              <Bot size={16} className="text-cyan-400" />
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-cyan-400" />
              <span className="text-xs text-slate-400">分析师正在思考...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="向AI分析师提问..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
        />
        <Button variant="glow" onClick={handleSend} disabled={isLoading || !input.trim()} className="px-3 py-2">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
