import { useState } from 'react';
import { useGame } from '@/game/GameContext';
import { GOAL_DEFS } from '@/game/data';
import type { GameGoal, Difficulty } from '@/game/types';
import { ArrowLeft, ArrowRight, GraduationCap, Check } from 'lucide-react';
import * as Icons from 'lucide-react';

export function NewGameScreen() {
  const { setScreen, startNewGame } = useGame();
  const [name, setName] = useState('');
  const [goal, setGoal] = useState<GameGoal | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('standard');

  const canStart = name.trim().length > 0 && goal !== null;

  const handleStart = () => {
    if (!canStart || !goal) return;
    startNewGame(name.trim(), goal, difficulty);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-accent-50/10 p-6">
      <div className="max-w-3xl mx-auto py-8">
        {/* Back */}
        <button
          onClick={() => setScreen('home')}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">Found a New University</h1>
        <p className="text-neutral-500 mb-8">Set up your institution and choose your strategic path.</p>

        {/* University Name */}
        <div className="card p-6 mb-6">
          <label className="panel-title block mb-2">University Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aranya State University"
            maxLength={40}
            className="input-field"
            autoFocus
          />
        </div>

        {/* Goal Selection */}
        <div className="card p-6 mb-6">
          <label className="panel-title block mb-3">Strategic Objective</label>
          <div className="space-y-2">
            {(Object.keys(GOAL_DEFS) as GameGoal[]).map((key) => {
              const def = GOAL_DEFS[key];
              const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number }> >)[def.icon] || GraduationCap;
              const selected = goal === key;
              return (
                <button
                  key={key}
                  onClick={() => setGoal(key)}
                  className={`w-full flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 text-left ${
                    selected
                      ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-200'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    selected ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-800">{def.name}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">{def.description}</p>
                  </div>
                  {selected && <Check size={20} className="text-primary-600 shrink-0 mt-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div className="card p-6 mb-8">
          <label className="panel-title block mb-3">Difficulty</label>
          <div className="grid grid-cols-3 gap-3">
            {([
              { key: 'easy', label: 'Easy', desc: 'Higher budget, fewer events' },
              { key: 'standard', label: 'Standard', desc: 'Balanced challenge' },
              { key: 'challenge', label: 'Challenge', desc: 'Tight budget, frequent events' },
            ] as { key: Difficulty; label: string; desc: string }[]).map((d) => (
              <button
                key={d.key}
                onClick={() => setDifficulty(d.key)}
                className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                  difficulty === d.key
                    ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-200'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <p className={`font-semibold ${difficulty === d.key ? 'text-primary-700' : 'text-neutral-800'}`}>{d.label}</p>
                <p className="text-xs text-neutral-500 mt-1">{d.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Start */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          className="btn-primary w-full py-3.5 text-base"
        >
          Found University <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
