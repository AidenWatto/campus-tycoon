import { useGame } from '@/game/GameContext';
import { ArrowLeft, Building2, Users, Calendar, DollarSign, Star, Leaf, FlaskConical, AlertCircle } from 'lucide-react';

export function AboutScreen() {
  const { setScreen } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-accent-50/10 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto py-8">
        <button onClick={() => setScreen('home')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">About Campus Tycoon</h1>
        <p className="text-sm text-neutral-500 mb-8">Build. Balance. Belong.</p>

        {/* Game Concept */}
        <div className="card p-6 mb-4">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Game Concept</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Campus Tycoon is a turn-based university management simulation. You start with a modest campus and limited resources, then gradually transform it into a successful university. Every decision has consequences — building a new library improves academics but costs budget; raising tuition increases revenue but reduces satisfaction. The game challenges you to balance competing priorities across budget, academics, student life, infrastructure, and sustainability.
          </p>
        </div>

        {/* Systems */}
        <div className="card p-6 mb-4">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Game Systems</h2>
          <div className="space-y-3">
            <SystemRow icon={<Building2 size={18} />} color="bg-primary-100 text-primary-700" title="Resource Management" desc="Track budget, income, expenses, staff, and campus capacity. All values change based on your decisions." />
            <SystemRow icon={<Building2 size={18} />} color="bg-accent-100 text-accent-700" title="Building System" desc="Construct and upgrade buildings across four campus zones. Each building affects capacity, academics, satisfaction, and maintenance." />
            <SystemRow icon={<Users size={18} />} color="bg-secondary-100 text-secondary-700" title="Student Model" desc="Enrollment, satisfaction, retention, and housing demand are calculated from campus quality, academics, tuition, and reputation." />
            <SystemRow icon={<AlertCircle size={18} />} color="bg-warning-100 text-warning-700" title="Event System" desc="Random events create meaningful choices with trade-offs — from research grants to housing shortages to campus festivals." />
            <SystemRow icon={<DollarSign size={18} />} color="bg-success-100 text-success-700" title="Financial Model" desc="Income from tuition, housing, grants, and donations. Expenses from salaries, maintenance, and utilities. Manage cash flow carefully." />
            <SystemRow icon={<Star size={18} />} color="bg-secondary-100 text-secondary-700" title="Reputation" desc="Reputation grows from academic quality, satisfaction, and sustainability. Higher reputation brings more enrollment demand and donations." />
            <SystemRow icon={<Leaf size={18} />} color="bg-accent-100 text-accent-700" title="Sustainability" desc="Invest in solar panels, recycling, green transport, and more. Upfront costs with long-term maintenance savings and environmental benefits." />
            <SystemRow icon={<FlaskConical size={18} />} color="bg-primary-100 text-primary-700" title="Research" desc="Fund research in CS, Engineering, Life Sciences, and Environmental Studies to boost academic quality and reputation." />
          </div>
        </div>

        {/* Technical */}
        <div className="card p-6 mb-4">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Technical Concepts</h2>
          <div className="space-y-2 text-sm text-neutral-600">
            <p><span className="font-semibold text-neutral-700">State Management:</span> The entire game state is managed through React context and reducers, with all derived values recalculated on every action.</p>
            <p><span className="font-semibold text-neutral-700">Simulation Engine:</span> A turn-based engine processes monthly ticks — advancing construction, calculating finances, updating student populations, drifting metrics, and triggering events.</p>
            <p><span className="font-semibold text-neutral-700">Persistence:</span> Game state is saved to browser local storage. No backend, no accounts, no server-side state.</p>
            <p><span className="font-semibold text-neutral-700">Data Visualisation:</span> Custom SVG charts render trend data for budget, enrollment, reputation, academic quality, and sustainability over time.</p>
            <p><span className="font-semibold text-neutral-700">Event-Driven Logic:</span> Weighted random events with conditional triggers create a dynamic, replayable experience.</p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Design Philosophy</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Campus Tycoon is designed as a genuine management simulation, not a dashboard. Every number has a reason. Every decision has consequences. Every system interacts with at least one other system. The simulation drives the experience — the player constantly faces the question: "If I spend money here, what happens somewhere else?"
          </p>
        </div>
      </div>
    </div>
  );
}

function SystemRow({ icon, color, title, desc }: { icon: React.ReactNode; color: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-800">{title}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
