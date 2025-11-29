import React, { useState, useMemo } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card, Button } from '../components/UI';

const Ledger = ({ boats, lots, setLots, settings }) => {
    const [newLot, setNewLot] = useState({
        boatId: '',
        species: '',
        weight: '',
        price: '',
        unit: 'kg'
    });

    const calculatedLot = useMemo(() => {
        const weight = parseFloat(newLot.weight) || 0;
        const price = parseFloat(newLot.price) || 0;
        const gross = weight * price;
        const commission = (gross * settings.commissionRate) / 100;
        const net = gross - commission;
        return { gross, commission, net };
    }, [newLot.weight, newLot.price, settings.commissionRate]);

    const handleAddLot = () => {
        if (!newLot.boatId || !newLot.species || !newLot.weight || !newLot.price) return alert("Missing details");

        const lot = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            timestamp: Date.now(),
            ...newLot,
            commissionRate: settings.commissionRate,
            totals: calculatedLot
        };

        setLots([lot, ...lots]);
        setNewLot(prev => ({ ...prev, species: '', weight: '', price: '' }));
    };

    const deleteLot = (id) => {
        if (confirm("Delete this entry?")) {
            setLots(lots.filter(l => l.id !== id));
        }
    };

    return (
        <div className="space-y-4 pb-24">
            <Card className="sticky top-0 z-10 border-blue-200 shadow-md ring-1 ring-black/5">
                <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Select Boat</label>
                    <select
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-lg font-medium"
                        value={newLot.boatId}
                        onChange={e => setNewLot({ ...newLot, boatId: e.target.value })}
                    >
                        <option value="">-- Select Boat --</option>
                        {boats.map(b => <option key={b.id} value={b.id}>{b.name} ({b.owner})</option>)}
                    </select>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <input
                                className="w-full p-3 border border-slate-200 rounded-lg"
                                placeholder="Fish Species (e.g. Tuna)"
                                value={newLot.species}
                                onChange={e => setNewLot({ ...newLot, species: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 font-semibold ml-1">Weight (kg)</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-slate-200 rounded-lg text-lg font-bold text-slate-800"
                                placeholder="0.0"
                                value={newLot.weight}
                                onChange={e => setNewLot({ ...newLot, weight: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 font-semibold ml-1">Price/kg</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-slate-200 rounded-lg text-lg font-bold text-slate-800"
                                placeholder="0.00"
                                value={newLot.price}
                                onChange={e => setNewLot({ ...newLot, price: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-4 rounded-lg mt-2">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-slate-400 text-sm">Total Sales</span>
                            <span className="text-xl font-bold">${calculatedLot.gross.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end mb-2 border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-sm">Commission ({settings.commissionRate}%)</span>
                            <span className="text-red-400 text-sm">-${calculatedLot.commission.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-emerald-400 font-bold">PAYABLE</span>
                            <span className="text-2xl font-bold text-emerald-400">${calculatedLot.net.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button onClick={handleAddLot} variant="success" icon={Plus}>Add to Ledger</Button>
                </div>
            </Card>

            <div className="space-y-2">
                <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wider ml-1">Today's Ledger</h3>
                {lots.length === 0 && <div className="text-center p-8 text-slate-400">No sales recorded today</div>}

                {lots.map(lot => {
                    const boat = boats.find(b => b.id === lot.boatId);
                    return (
                        <div key={lot.id} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
                            <div>
                                <div className="font-bold text-slate-800 text-lg">{lot.species}</div>
                                <div className="text-sm text-slate-500">{boat?.name || 'Unknown Boat'} • {new Date(lot.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                <div className="text-xs text-slate-400 mt-1">{lot.weight}kg @ ${lot.price}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-emerald-600">${lot.totals.net.toFixed(2)}</div>
                                <div className="text-xs text-slate-400 line-through">${lot.totals.gross.toFixed(2)}</div>
                                <button
                                    onClick={() => deleteLot(lot.id)}
                                    className="mt-2 text-red-300 hover:text-red-500 p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Ledger;
