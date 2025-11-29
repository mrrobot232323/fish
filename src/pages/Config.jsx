import React from 'react';
import { UserCircle, MapPin, Settings, Trash2 } from 'lucide-react';
import { Card } from '../components/UI';

const Config = ({ settings, setSettings, setBoats, setLots }) => {
    const handleResetData = () => {
        if (confirm("⚠ CRITICAL WARNING ⚠\n\nThis will delete ALL boats and ledger entries permanently.\n\nAre you sure?")) {
            setBoats([]);
            setLots([]);
            alert("System reset complete.");
        }
    };

    return (
        <div className="space-y-6 pb-24">
            <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-none">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <UserCircle size={40} className="text-blue-200" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{settings.agentName}</h2>
                        <div className="flex items-center gap-1 text-blue-200 text-sm mt-1">
                            <MapPin size={14} />
                            {settings.marketName}
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Settings size={18} /> Auction Settings
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Agent Name</label>
                        <input
                            className="w-full p-3 border border-slate-200 rounded-lg mt-1"
                            value={settings.agentName}
                            onChange={e => setSettings({ ...settings, agentName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Market Location</label>
                        <input
                            className="w-full p-3 border border-slate-200 rounded-lg mt-1"
                            value={settings.marketName}
                            onChange={e => setSettings({ ...settings, marketName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Default Commission (%)</label>
                        <input
                            type="number"
                            className="w-full p-3 border border-slate-200 rounded-lg mt-1 font-bold text-lg"
                            value={settings.commissionRate}
                            onChange={e => setSettings({ ...settings, commissionRate: parseFloat(e.target.value) || 0 })}
                        />
                        <p className="text-xs text-slate-400 mt-1">This rate updates automatically for all new entries.</p>
                    </div>
                </div>
            </Card>

            <div className="pt-4">
                <button
                    onClick={handleResetData}
                    className="w-full py-4 text-red-500 bg-red-50 rounded-xl border border-red-100 font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                    <Trash2 size={18} /> Factory Reset App
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">Version 1.0.3 • Modular Refactor</p>
            </div>
        </div>
    );
};

export default Config;
