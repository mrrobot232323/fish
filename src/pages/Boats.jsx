import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, Button } from '../components/UI';

const Boats = ({ boats, setBoats }) => {
    const [newBoat, setNewBoat] = useState({ name: '', owner: '', phone: '' });

    const handleAddBoat = () => {
        if (!newBoat.name || !newBoat.phone) return alert("Please fill Name and Phone");
        const boat = { ...newBoat, id: Date.now().toString() };
        setBoats([...boats, boat]);
        setNewBoat({ name: '', owner: '', phone: '' });
    };

    return (
        <div className="space-y-4">
            <Card className="bg-blue-50 border-blue-100">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Plus size={18} /> Register New Boat
                </h3>
                <div className="space-y-3">
                    <input
                        className="w-full p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Boat Name (e.g., Sea Star)"
                        value={newBoat.name}
                        onChange={e => setNewBoat({ ...newBoat, name: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            className="w-full p-3 rounded-lg border border-blue-200"
                            placeholder="Owner Name"
                            value={newBoat.owner}
                            onChange={e => setNewBoat({ ...newBoat, owner: e.target.value })}
                        />
                        <input
                            className="w-full p-3 rounded-lg border border-blue-200"
                            placeholder="Phone Number"
                            type="tel"
                            value={newBoat.phone}
                            onChange={e => setNewBoat({ ...newBoat, phone: e.target.value })}
                        />
                    </div>
                    <Button onClick={handleAddBoat} variant="primary">Save Boat</Button>
                </div>
            </Card>

            <div className="space-y-2 pb-20">
                <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wider ml-1">Registered Fleet ({boats.length})</h3>
                {boats.length === 0 && <p className="text-center text-slate-400 py-8 italic">No boats added yet.</p>}
                {boats.map(boat => (
                    <div key={boat.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center shadow-sm">
                        <div>
                            <div className="font-bold text-slate-800">{boat.name}</div>
                            <div className="text-sm text-slate-500">{boat.owner} • {boat.phone}</div>
                        </div>
                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {boat.name[0]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Boats;
