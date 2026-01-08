
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { 
    Send, Search, MoreVertical, ShieldAlert, Circle, CheckCheck, Lock, 
    MessageSquare, Paperclip, Image as ImageIcon, FileText, X, Download, 
    Smile, CornerDownRight, Flag, User
} from 'lucide-react';
import { Tooltip } from '../Tooltip';

const EMOJIS = [
    '😀', '😂', '😍', '😎', '🤔', '😅', '😭', '😤', 
    '👍', '👎', '👏', '🙌', '🔥', '✨', '🚀', '💯', 
    '❤️', '💔', '👻', '💀', '🤖', '👾', '👽', '☠️',
    '💻', '⌚', '📱', '🔋', '🔌', '💾', '💿', '🎥'
];

export const ChatSystem = () => {
    const { user, conversations, activeConversationId, setActiveConversation, sendMessage, setView } = useStore();
    const [inputText, setInputText] = useState('');
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const emojiRef = useRef<HTMLDivElement>(null);

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation?.messages, activeConversation?.isTyping]);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
            sendMessage(inputText, 'text');
            setInputText('');
            setShowEmojiPicker(false);
        }
    };

    const handleEmojiClick = (emoji: string) => {
        setInputText(prev => prev + emoji);
    };

    // Simulate sending an attachment
    const handleAttach = (type: 'image' | 'file') => {
        setShowAttachMenu(false);
        if (type === 'image') {
             sendMessage('', 'image', { 
                 url: `https://picsum.photos/600/400?random=${Date.now()}`, 
                 name: 'screenshot_reference.png',
                 size: '1.2 MB'
             });
        } else {
             sendMessage('Here are the logs.', 'file', {
                 url: '#',
                 name: 'crash_report_v2.log',
                 size: '45 KB'
             });
        }
    };

    if (!user) {
        setView('marketplace');
        return null;
    }

    return (
        <div className="min-h-screen bg-[#050b14] pt-20 flex flex-col h-screen overflow-hidden">
            <div className="container mx-auto px-4 py-4 flex-1 flex gap-6 h-full pb-20">
                
                {/* Sidebar (Conversation List) */}
                <div className={`w-full md:w-80 bg-[#0a1220] border border-white/5 rounded-2xl flex flex-col ${activeConversationId ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-white/5">
                        <h2 className="text-white font-display font-bold text-xl mb-4">Xabarlar</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Qidirish..." 
                                className="w-full bg-[#050b14] border border-white/10 rounded-lg py-2 pl-10 text-sm text-white focus:border-cyber-cyan focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {conversations.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p>Hozircha xabarlar yo'q.</p>
                            </div>
                        ) : (
                            conversations.map(conv => (
                                <div 
                                    key={conv.id}
                                    onClick={() => setActiveConversation(conv.id)}
                                    className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors border-l-2 relative overflow-hidden ${activeConversationId === conv.id ? 'bg-white/5 border-cyber-cyan' : 'border-transparent'}`}
                                >
                                    {/* Active Highlight Glow */}
                                    {activeConversationId === conv.id && (
                                        <div className="absolute inset-0 bg-cyber-cyan/5 pointer-events-none"></div>
                                    )}

                                    <div className="relative">
                                        <img src={conv.partnerAvatar} alt={conv.partnerName} className="w-12 h-12 rounded-full bg-gray-800 object-cover border border-white/10" />
                                        {conv.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyber-green rounded-full border-2 border-[#0a1220] shadow-[0_0_5px_#00ff9d]"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className={`font-bold truncate text-sm ${conv.unreadCount > 0 ? 'text-white' : 'text-gray-300'}`}>{conv.partnerName}</h4>
                                            <span className="text-[10px] text-gray-600 font-mono">{conv.lastMessageTime}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className={`text-xs truncate max-w-[140px] ${conv.unreadCount > 0 ? 'text-white font-medium' : 'text-gray-500'}`}>
                                                {conv.isTyping ? <span className="text-cyber-cyan animate-pulse">Yozmoqda...</span> : (conv.lastMessage || 'Suhbatni boshlang')}
                                            </p>
                                            {conv.unreadCount > 0 && (
                                                <span className="bg-cyber-cyan text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-neon-cyan">{conv.unreadCount}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className={`flex-1 bg-[#0a1220] border border-white/5 rounded-2xl flex flex-col overflow-hidden relative ${!activeConversationId ? 'hidden md:flex' : 'flex'}`}>
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" 
                         style={{backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                    </div>

                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0a1220]/95 backdrop-blur z-20 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setActiveConversation('')} className="md:hidden text-gray-400">
                                        Orqaga
                                    </button>
                                    <div className="relative">
                                        <img src={activeConversation.partnerAvatar} className="w-10 h-10 rounded-full" alt="Partner" />
                                        {activeConversation.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyber-green rounded-full border-2 border-[#0a1220]"></div>}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{activeConversation.partnerName}</h3>
                                        <span className="text-xs text-cyber-cyan flex items-center gap-1 font-mono">
                                            {activeConversation.isOnline ? 'TARMOQDA' : 'OFLAYN'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tooltip content="Shikoyat Qilish" position="bottom">
                                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                            <Flag size={18} />
                                        </button>
                                    </Tooltip>
                                    <Tooltip content="Profilni Ko'rish" position="bottom">
                                        <button className="p-2 text-gray-400 hover:text-white transition-colors" onClick={() => setView('seller', activeConversation.partnerName)}>
                                            <User size={18} />
                                        </button>
                                    </Tooltip>
                                    <button className="text-gray-400 hover:text-white p-2">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Safety Warning */}
                            <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-b border-yellow-500/20 p-2 flex items-center justify-center gap-2 text-xs text-yellow-500">
                                <Lock size={12} />
                                <span className="font-mono">SHIFRLANGAN KANAL. TO'LOV MA'LUMOTLARINI ULASHMANG.</span>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-0 custom-scrollbar">
                                {/* Date Separator Mock */}
                                <div className="flex justify-center my-4">
                                     <span className="text-[10px] text-gray-600 bg-[#050b14] px-3 py-1 rounded-full border border-white/5 font-mono">BUGUN</span>
                                </div>

                                {activeConversation.messages.map((msg, idx) => {
                                    const isMe = msg.senderId === 'me';
                                    const isSystem = msg.type === 'system';

                                    if (isSystem) {
                                        return (
                                            <div key={msg.id} className="flex justify-center my-4">
                                                <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1 text-xs text-gray-400 flex items-center gap-2">
                                                    <ShieldAlert size={12} className="text-cyber-cyan" />
                                                    {msg.text}
                                                </div>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
                                            <div className={`max-w-[80%] md:max-w-[65%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                <div className={`rounded-2xl px-4 py-3 relative ${
                                                    isMe 
                                                    ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-white rounded-br-none shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                                                    : 'bg-[#1a2639] text-gray-100 rounded-bl-none border border-white/5'
                                                }`}>
                                                    
                                                    {/* Image Message */}
                                                    {msg.type === 'image' && (
                                                        <div className="mb-2 rounded-lg overflow-hidden border border-white/10">
                                                            <img src={msg.fileUrl} alt="attachment" className="max-w-full h-auto" />
                                                        </div>
                                                    )}

                                                    {/* File Message */}
                                                    {msg.type === 'file' && (
                                                        <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-white/10 mb-1 min-w-[200px]">
                                                            <div className="bg-white/10 p-2 rounded">
                                                                <FileText size={24} className="text-cyber-green" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-bold truncate text-white">{msg.fileName}</p>
                                                                <p className="text-[10px] text-gray-500">{msg.fileSize}</p>
                                                            </div>
                                                            <button className="text-cyber-cyan hover:text-white">
                                                                <Download size={18} />
                                                            </button>
                                                        </div>
                                                    )}

                                                    {msg.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                                                </div>
                                                
                                                <div className={`text-[10px] mt-1 flex items-center gap-1 font-mono opacity-60 ${isMe ? 'text-cyber-cyan' : 'text-gray-500'}`}>
                                                    {msg.timestamp}
                                                    {isMe && (
                                                        <span>
                                                            {msg.status === 'sent' && <CheckCheck size={12} className="text-gray-500" />}
                                                            {msg.status === 'delivered' && <CheckCheck size={12} className="text-gray-300" />}
                                                            {msg.status === 'read' && <CheckCheck size={12} className="text-cyber-cyan" />}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                
                                {activeConversation.isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-[#1a2639] border border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-[#0a1220] border-t border-white/5 relative z-20">
                                {/* Attachment Menu */}
                                {showAttachMenu && (
                                    <div className="absolute bottom-20 left-4 bg-[#1a2639] border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 animate-fade-in-up origin-bottom-left z-30">
                                        <button onClick={() => handleAttach('image')} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
                                            <ImageIcon size={18} className="text-purple-400" /> Rasm Yuklash
                                        </button>
                                        <button onClick={() => handleAttach('file')} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
                                            <FileText size={18} className="text-blue-400" /> Hujjat Yuborish
                                        </button>
                                    </div>
                                )}

                                {/* Emoji Picker */}
                                {showEmojiPicker && (
                                    <div ref={emojiRef} className="absolute bottom-20 right-4 w-72 bg-[#1a2639] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up origin-bottom-right z-30 flex flex-col">
                                        <div className="p-3 bg-white/5 border-b border-white/10 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                            Cyber Emotes
                                        </div>
                                        <div className="p-2 grid grid-cols-8 gap-1 h-48 overflow-y-auto custom-scrollbar">
                                            {EMOJIS.map(emoji => (
                                                <button 
                                                    key={emoji} 
                                                    onClick={() => handleEmojiClick(emoji)}
                                                    className="p-1 hover:bg-white/10 rounded text-xl transition-colors flex items-center justify-center"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSend} className="flex items-end gap-3">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowAttachMenu(!showAttachMenu)}
                                        className={`p-3 rounded-full transition-all ${showAttachMenu ? 'bg-cyber-cyan text-black rotate-45' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                                    >
                                        <Paperclip size={20} />
                                    </button>
                                    
                                    <div className="flex-1 bg-[#050b14] border border-white/10 rounded-2xl p-3 flex items-center gap-2 focus-within:border-cyber-cyan/50 focus-within:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all">
                                        <input 
                                            type="text" 
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            placeholder="Xabar yozing..."
                                            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-600"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                            className={`text-gray-500 hover:text-yellow-400 transition-colors ${showEmojiPicker ? 'text-yellow-400' : ''}`}
                                        >
                                            <Smile size={20} />
                                        </button>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={!inputText.trim()}
                                        className="bg-cyber-cyan text-black p-3 rounded-full hover:bg-white hover:shadow-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-6 relative">
                                <MessageSquare size={48} className="text-gray-600" />
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-cyber-cyan rounded-full animate-pulse"></div>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-wide">XAVFSIZ ALOQA O'RNATILDI</h3>
                            <p className="max-w-xs text-center text-sm mb-8">
                                Shifrlangan muloqotni boshlash uchun yon paneldan suhbatni tanlang.
                            </p>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-white/5 rounded border border-white/10 text-xs font-mono">SHIFRLASH: AES-256</div>
                                <div className="px-4 py-2 bg-white/5 rounded border border-white/10 text-xs font-mono">HOLAT: KUTILMOQDA</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
