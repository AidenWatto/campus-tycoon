import { useState } from 'react';
import { useGame } from '@/game/GameContext';
import { HUD } from '@/components/HUD';
import { CampusMap } from '@/components/CampusMap';
import { ManagementPanel, SatisfactionFactorsPanel, GoalProgressPanel } from '@/components/ManagementPanel';
import { BuildingInfoModal, BuildMenuModal } from '@/components/BuildingModals';
import { EventModal, SemesterReviewModal, YearlyReportModal, WarningBanner, GameOverModal } from '@/components/GameModals';
import type { ConstructedBuilding, ZoneType } from '@/game/types';
import { ChevronRight, ChevronLeft, Clock, Calendar } from 'lucide-react';

export function GameScreen() {
  const { state, advanceOneMonth, advanceSemester } = useGame();
  const [selectedBuilding, setSelectedBuilding] = useState<ConstructedBuilding | null>(null);
  const [buildZone, setBuildZone] = useState<ZoneType | null>(null);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <HUD state={state} />

      {state.warning && <WarningBanner state={state} />}

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-[1400px] mx-auto w-full">
        {/* Left: Campus map + time controls */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-800">Campus Map</h2>
            <div className="flex gap-2">
              <button
                onClick={advanceOneMonth}
                disabled={state.gameOver || state.won}
                className="btn-outline py-2 text-sm"
              >
                <Clock size={16} /> Next Month
              </button>
              <button
                onClick={advanceSemester}
                disabled={state.gameOver || state.won}
                className="btn-primary py-2 text-sm"
              >
                <Calendar size={16} /> End Semester
              </button>
            </div>
          </div>
          <CampusMap onBuildingClick={setSelectedBuilding} onBuildClick={setBuildZone} />
        </div>

        {/* Right: Management panels */}
        <div className="lg:w-96 flex flex-col gap-3 shrink-0">
          <GoalProgressPanel state={state} />
          <ManagementPanel />
          <SatisfactionFactorsPanel state={state} />
        </div>
      </div>

      {/* Modals */}
      <BuildingInfoModal building={selectedBuilding} onClose={() => setSelectedBuilding(null)} />
      <BuildMenuModal zone={buildZone} onClose={() => setBuildZone(null)} />
      <EventModal event={state.pendingEvent} />
      <SemesterReviewModal state={state} />
      <YearlyReportModal state={state} />
      <GameOverModal state={state} />
    </div>
  );
}
