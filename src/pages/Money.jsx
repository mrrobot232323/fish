import React from 'react';
import { TrendingUp, Share2, Scale } from 'lucide-react';
import { Card, Button } from '../components/UI';

const Money = ({ lots, boats, settings }) => {
    const totalRevenue = lots.reduce((acc, curr) => acc + curr.totals.gross, 0);
    const totalComm = lots.reduce((acc, curr) => acc + curr.totals.commission, 0);
    const netPayable = totalRevenue - totalComm;

    const generateWhatsAppReport = (type, data) => {
        let text = `*🐟 ${settings.marketName} - ${type}*\n`;
        text += `👤 Agent: ${settings.agentName}\n`;
        text += `------------------\n`;

        if (type === 'Daily') {
            text += `📅 Date: ${new Date().toLocaleDateString()}\n`;
            text += `💰 Total Sales: $${data.totalRevenue.toFixed(2)}\n`;
            text += `🏷️ Lots Sold: ${data.totalLots}\n`;
            text += `📉 Commission: $${data.totalComm.toFixed(2)}\n`;
            text += `💵 Net Payable: $${data.netPayable.toFixed(2)}\n`;
        } else {
            const boat = boats.find(b => b.id === data.boatId);
            text += `🚤 Boat: ${boat?.name} (${boat?.owner})\n`;
            text += `📅 Period: Week Ending ${new Date().toLocaleDateString()}\n`;
            text += `💰 Total Catch Value: $${data.totalRevenue.toFixed(2)}\n`;
            text += `📉 Agent Commission: -$${data.totalComm.toFixed(2)}\n`;
            text += `💵 *FINAL PAYOUT: $${data.netPayable.toFixed(2)}*\n`;
        }

        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="space-y-6 pb-20">
            <Card className="bg-gradient-to-br from-indigo-900 to-slate-800 text-white border-none">
                <h3 className="text-indigo-200 font-bold mb-4 flex items-center gap-2"><TrendingUp size={20} /> Daily Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <div className="text-xs text-indigo-200 uppercase">Revenue</div>
                        <div className="text-xl font-bold">${totalRevenue.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <div className="text-xs text-indigo-200 uppercase">Comm.</div>
                        <div className="text-xl font-bold">${totalComm.toFixed(2)}</div>
                    </div>
                </div>
                <div className="mt-4 bg-emerald-500/20 p-4 rounded-lg border border-emerald-500/30 flex justify-between items-center">
                    <span className="font-semibold text-emerald-100">Net Payable</span>
                    <span className="font-bold text-2xl text-emerald-300">${netPayable.toFixed(2)}</span>
                </div>
                <button
                    onClick={() => generateWhatsAppReport('Daily', { totalRevenue, totalComm, netPayable, totalLots: lots.length })}
                    className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                    <Share2 size={18} /> Send Daily Report
                </button>
            </Card>

            <div>
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Scale size={18} /> Weekly Settlements</h3>
                <div className="space-y-3">
                    {boats.map(boat => {
                        const boatLots = lots.filter(l => l.boatId === boat.id);
                        if (boatLots.length === 0) return null;

                        const boatRev = boatLots.reduce((acc, c) => acc + c.totals.gross, 0);
                        const boatComm = boatLots.reduce((acc, c) => acc + c.totals.commission, 0);
                        const boatNet = boatRev - boatComm;

                        return (
                            <div key={boat.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-slate-700">{boat.name}</span>
                                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">{boatLots.length} Lots</span>
                                </div>
                                <div className="flex justify-between items-end mb-3">
                                    <div className="text-sm text-slate-500">Payable Amount</div>
                                    <div className="font-bold text-xl text-emerald-600">${boatNet.toFixed(2)}</div>
                                </div>
                                <Button
                                    variant="secondary"
                                    className="py-2 text-sm"
                                    icon={Share2}
                                    onClick={() => generateWhatsAppReport('Settlement', { boatId: boat.id, totalRevenue: boatRev, totalComm: boatComm, netPayable: boatNet })}
                                >
                                    WhatsApp Settlement
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Money;
