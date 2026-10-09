import { useState } from 'react';
import { useGame } from '@/game/GameContext';
import { BUILDING_DEFS } from '@/game/data';
import type { ConstructedBuilding, ZoneType } from '@/game/types';
import { Modal, formatMoneyFull, MetricBar } from '@/components/ui';
import * as Icons from 'lucide-react';
import { X, Wrench, ArrowUpCircle, Check } from 'lucide-react';

// ============================================================
// BUILDING INFO MODAL
// ============================================================

export function BuildingInfoModal({
  building,
  onClose,
}: {
  building: ConstructedBuilding | null;
  onClose: () => void;
}) {
  const { upgradeBuilding, repairBuilding } = useGame();
  if (!building) return null;

  const def = BUILDING_DEFS.find((d) => d.id === building.defId);
  if (!def) return null;

  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }> >)[def.iconName] || Icons.Building2;
  const upgrade = def.upgradeLevels[building.level - 1];
  const repairCost = Math.round(building.repairCostBase * (1 - building.condition / 100));
  const canUpgrade = !!upgrade && building.level < def.upgradeLevels.length + 1;

  return (
    <Modal open={!!building} onClose={onClose} maxWidth="max-w-md">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
              <Icon size={26} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-800">{def.name}</h3>
              <p className="text-sm text-neutral-500">
                {building.completed ? `Level ${building.level}` : 'Under Construction'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost p-1.5">
            <X size={18} />
          </button>
        </div>

        {!building.completed ? (
          <div className="bg-warning-50 rounded-lg p-4 text-center">
            <p className="text-sm text-warning-700 font-medium">
              Under construction — {def.constructionTime - building.monthsUnderConstruction} months remaining
            </p>
            <div className="mt-3">
              <MetricBar value={building.monthsUnderConstruction} max={def.constructionTime} label="Progress" color="warning" />
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <InfoBox label="Capacity" value={`+${def.capacity + (building.level > 1 ? def.upgradeLevels.slice(0, building.level - 1).reduce((s, u) => s + u.capacityBonus, 0) : 0)}`} />
                <InfoBox label="Maintenance" value={`${formatMoneyFull(def.maintenance + (building.level > 1 ? def.upgradeLevels.slice(0, building.level - 1).reduce((s, u) => s + u.maintenanceIncrease, 0) : 0))}/mo`} />
                <InfoBox label="Academic Impact" value={`+${def.academicImpact + (building.level > 1 ? def.upgradeLevels.slice(0, building.level - 1).reduce((s, u) => s + u.academicBonus, 0) : 0)}`} />
                <InfoBox label="Satisfaction" value={`+${def.satisfactionImpact + (building.level > 1 ? def.upgradeLevels.slice(0, building.level - 1).reduce((s, u) => s + u.satisfactionBonus, 0) : 0)}`} />
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Condition</p>
                <MetricBar value={building.condition} color={building.condition < 40 ? 'error' : building.condition < 70 ? 'warning' : 'success'} />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => repairBuilding(building.uid)}
                disabled={building.condition >= 100 || repairCost <= 0}
                className="btn-outline flex-1"
              >
                <Wrench size={16} /> Repair ({formatMoneyFull(repairCost)})
              </button>
              {canUpgrade && upgrade ? (
                <button
                  onClick={() => {
                    upgradeBuilding(building.uid);
                    onClose();
                  }}
                  className="btn-primary flex-1"
                >
                  <ArrowUpCircle size={16} /> Upgrade ({formatMoneyFull(upgrade.cost)})
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-center gap-1 text-sm text-neutral-400 bg-neutral-50 rounded-lg">
                  <Check size={16} /> Max Level
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-neutral-50 rounded-lg p-2.5">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-sm font-bold text-neutral-800">{value}</p>
    </div>
  );
}

// ============================================================
// BUILD MENU MODAL
// ============================================================

export function BuildMenuModal({
  zone,
  onClose,
}: {
  zone: ZoneType | null;
  onClose: () => void;
}) {
  const { state, buildBuilding } = useGame();
  if (!zone || !state) return null;

  const available = BUILDING_DEFS.filter((d) => d.zone === zone);

  return (
    <Modal open={!!zone} onClose={onClose} maxWidth="max-w-lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-800">Build — {zone.replace('-', ' ')}</h3>
          <button onClick={onClose} className="btn-ghost p-1.5">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2">
          {available.map((def) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }> >)[def.iconName] || Icons.Building2;
            const canAfford = state.budget >= def.cost;
            const alreadyBuilt = state.buildings.some((b) => b.defId === def.id);
            return (
              <div
                key={def.id}
                className={`p-4 rounded-lg border transition-all ${
                  canAfford && !alreadyBuilt
                    ? 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-sm'
                    : 'border-neutral-200 bg-neutral-50 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-neutral-800">{def.name}</p>
                      <p className="text-sm font-bold text-primary-700">{formatMoneyFull(def.cost)}</p>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{def.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-neutral-500">
                      <span>+{def.capacity} capacity</span>
                      <span>+{def.academicImpact} academic</span>
                      <span>+{def.satisfactionImpact} satisfaction</span>
                      <span>{formatMoneyFull(def.maintenance)}/mo maint.</span>
                      <span>{def.constructionTime}mo build</span>
                    </div>
                    {alreadyBuilt ? (
                      <p className="text-xs text-success-600 mt-2 font-medium">Already built</p>
                    ) : (
                      <button
                        onClick={() => {
                          buildBuilding(def.id);
                          onClose();
                        }}
                        disabled={!canAfford}
                        className="btn-primary mt-3 py-1.5 text-xs"
                      >
                        {canAfford ? 'Build' : 'Insufficient Budget'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
