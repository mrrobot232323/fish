import React, { useState, useEffect } from 'react';
import {
    Anchor,
    FileText,
    DollarSign,
    Users,
    Settings
} from 'lucide-react';

import Boats from './pages/Boats';
import Ledger from './pages/Ledger';
import Money from './pages/Money';
import Config from './pages/Config';

// ==========================================
// MAIN APP COMPONENT (App.jsx)
// ==========================================

export default function FishAuctionLedger() {
    const [activeTab, setActiveTab] = useState('entry');

    // -- GLOBAL DATA STATE --
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('fish_settings');
        return saved ? JSON.parse(saved) : {
            commissionRate: 5,
            agentName: 'Auction Agent',
            marketName: 'Coastal Fish Market'
        };
    });

    const [boats, setBoats] = useState(() => {
        const saved = localStorage.getItem('fish_boats');
        return saved ? JSON.parse(saved) : [];
    });

    const [lots, setLots] = useState(() => {
        const saved = localStorage.getItem('fish_lots');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist Data
    useEffect(() => {
        localStorage.setItem('fish_boats', JSON.stringify(boats));
        localStorage.setItem('fish_lots', JSON.stringify(lots));
        localStorage.setItem('fish_settings', JSON.stringify(settings));
    }, [boats, lots, settings]);

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-start p-0 md:p-4">
            <div className="w-full max-w-[480px] bg-white min-h-screen md:min-h-[calc(100vh-2rem)] md:rounded-lg shadow-2xl flex flex-col relative">

                {/* Header */}
                <div className="bg-blue-900 text-white p-4 pt-6 md:pt-4 md:rounded-t-lg sticky top-0 z-20 shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Coastal Auction</h1>
                            <p className="text-xs text-blue-200">Digital Ledger System</p>
                        </div>
                        <div className="bg-blue-800 p-2 rounded-full">
                            <Anchor size={20} className="text-blue-200" />
                        </div>
                    </div>
                </div>

                {/* Dynamic Content Rendering */}
                <div className="flex-1 p-4 bg-slate-50 overflow-y-auto">
                    {activeTab === 'boats' && (
                        <Boats boats={boats} setBoats={setBoats} />
                    )}

                    {activeTab === 'entry' && (
                        <Ledger boats={boats} lots={lots} setLots={setLots} settings={settings} />
                    )}

                    {activeTab === 'reports' && (
                        <Money lots={lots} boats={boats} settings={settings} />
                    )}

                    {activeTab === 'profile' && (
                        <Config settings={settings} setSettings={setSettings} setBoats={setBoats} setLots={setLots} />
                    )}
                </div>

                {/* Navigation Bar */}
                <div className="bg-white border-t border-slate-200 p-2 pb-6 md:pb-4 md:rounded-b-lg grid grid-cols-4 gap-2 sticky bottom-0 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={() => setActiveTab('boats')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'boats' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}
                    >
                        <Users size={22} />
                        <span className="text-[10px] font-bold uppercase">Boats</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('entry')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'entry' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}
                    >
                        <FileText size={22} />
                        <span className="text-[10px] font-bold uppercase">Ledger</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'reports' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}
                    >
                        <DollarSign size={22} />
                        <span className="text-[10px] font-bold uppercase">Money</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-slate-400'}`}
                    >
                        <Settings size={22} />
                        <span className="text-[10px] font-bold uppercase">Config</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
