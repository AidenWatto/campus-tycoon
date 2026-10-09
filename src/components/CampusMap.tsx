import { useGame } from '@/game/GameContext';
import { BUILDING_DEFS } from '@/game/data';
import type { ConstructedBuilding, ZoneType } from '@/game/types';
import * as Icons from 'lucide-react';
import { Plus, Hammer, AlertTriangle } from 'lucide-react';

const ZONE_INFO: Record<ZoneType, { name: string; color: string; bgColor: string; borderColor: string }> = {
  academic: { name: 'Academic', color: 'text-primary-700', bgColor: 'bg-primary-50/50', borderColor: 'border-primary-200' },
  'student-life': { name: 'Student Life', color: 'text-accent-700', bgColor: 'bg-accent-50/50', borderColor: 'border-accent-200' },
  administration: { name: 'Administration', color: 'text-secondary-700', bgColor: 'bg-secondary-50/50', borderColor: 'border-secondary-200' },
  infrastructure: { name: 'Infrastructure', color: 'text-neutral-700', bgColor: 'bg-neutral-100', borderColor: 'border-neutral-300' },
};

export function CampusMap({
  onBuildingClick,
  onBuildClick,
}: {
  onBuildingClick: (building: ConstructedBuilding) => void;
  onBuildClick: (zone: ZoneType) => void;
}) {
  const { state } = useGame();
  if (!state) return null;

  const zones: ZoneType[] = ['academic', 'student-life', 'administration', 'infrastructure'];

  return (
    <div className="campus-grid bg-neutral-50 rounded-xl border border-neutral-200 p-4 lg:p-6 overflow-y-auto scrollbar-thin" style={{ minHeight: '400px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((zone) => {
          const info = ZONE_INFO[zone];
          const zoneBuildings = state.buildings.filter((b) => {
            const def = BUILDING_DEFS.find((d) => d.id === b.defId);
            return def?.zone === zone;
          });

          return (
            <div key={zone} className={`${info.bgColor} rounded-xl border ${info.borderColor} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-bold ${info.color} uppercase tracking-wider`}>{info.name}</h3>
                <button
                  onClick={() => onBuildClick(zone)}
                  className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-800 bg-white/60 hover:bg-white rounded-md px-2 py-1 transition-colors"
                >
                  <Plus size={14} /> Build
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {zoneBuildings.length === 0 && (
                  <p className="text-xs text-neutral-400 col-span-full py-4 text-center">No buildings yet</p>
                )}
                {zoneBuildings.map((b) => {
                  const def = BUILDING_DEFS.find((d) => d.id === b.defId);
                  if (!def) return null;
                  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }> >)[def.iconName] || Icons.Building2;
                  const underConstruction = !b.completed;
                  const lowCondition = b.condition < 40;
                  return (
                    <button
                      key={b.uid}
                      onClick={() => onBuildingClick(b)}
                      className={`group relative flex flex-col items-center gap-1 p-3 rounded-lg bg-white border transition-all duration-200 hover:shadow-md ${
                        underConstruction
                          ? 'border-warning-300 border-dashed opacity-70'
                          : lowCondition
                          ? 'border-error-300'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {underConstruction && (
                        <div className="absolute -top-1 -right-1 bg-warning-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <Hammer size={10} />
                        </div>
                      )}
                      {!underConstruction && lowCondition && (
                        <div className="absolute -top-1 -right-1 bg-error-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <AlertTriangle size={10} />
                        </div>
                      )}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        underConstruction ? 'bg-warning-100 text-warning-600' : info.color.replace('text-', 'bg-').replace('-700', '-100')
                      }`}>
                        <Icon size={20} />
                      </div>
                      <p className="text-xs font-medium text-neutral-700 text-center leading-tight">{def.name}</p>
                      {underConstruction ? (
                        <p className="text-xs text-warning-600">Building...</p>
                      ) : (
                        <p className="text-xs text-neutral-400">Lv {b.level} · {Math.round(b.condition)}%</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
