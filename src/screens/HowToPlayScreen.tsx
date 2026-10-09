import { useGame } from '@/game/GameContext';
import { ArrowLeft, GraduationCap, Building2, Users, DollarSign, Calendar, Star, Leaf, AlertCircle, Trophy, Target } from 'lucide-react';

export function HowToPlayScreen() {
  const { setScreen } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-accent-50/10 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto py-8">
        <button onClick={() => setScreen('home')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">How to Play</h1>
        <p className="text-sm text-neutral-500 mb-8">A quick guide to running your university</p>

        {/* Overview */}
        <div className="card p-6 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-800">The Big Picture</h2>
              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                You are the president of a small university. Your job is to grow it into a thriving institution by managing limited resources and making tough decisions. Every choice has consequences — spending on one thing means you can't spend on another.
              </p>
            </div>
          </div>
        </div>

        {/* Core Loop */}
        <div className="card p-6 mb-4">
          <h2 className="text-base font-bold text-neutral-800 mb-3">The Core Loop</h2>
          <div className="space-y-2">
            <Step icon={<Target size={16} />} text="Choose a goal and difficulty when starting a new game" />
            <Step icon={<Building2 size={16} />} text="Build and upgrade buildings on your campus map" />
            <Step icon={<Users size={16} />} text="Hire faculty and staff to support your students" />
            <Step icon={<DollarSign size={16} />} text="Set tuition and manage your budget" />
            <Step icon={<Calendar size={16} />} text="Advance time month-by-month or by semester" />
            <Step icon={<AlertCircle size={16} />} text="Respond to random events that create trade-offs" />
            <Step icon={<Star size={16} />} text="Review semester and yearly reports" />
            <Step icon={<Trophy size={16} />} text="Achieve your goal to win!" />
          </div>
        </div>

        {/* Key Systems */}
        <div className="card p-6 mb-4">
          <h2 className="text-base font-bold text-neutral-800 mb-3">Key Systems</h2>
          <div className="space-y-3">
            <SystemItem icon={<Building2 size={18} />} color="bg-primary-100 text-primary-700" title="Buildings" desc="Click the campus map to inspect buildings. Use the Build button in each zone to construct new buildings. Each building costs money upfront and adds monthly maintenance, but boosts capacity, academics, or satisfaction." />
            <SystemItem icon={<Users size={18} />} color="bg-accent-100 text-accent-700" title="Staff" desc="Hire faculty (improves academics), administrators (operations), maintenance (building condition), and student support (satisfaction). Each hire costs a 2-month signing bonus plus ongoing salary." />
            <SystemItem icon={<DollarSign size={18} />} color="bg-secondary-100 text-secondary-700" title="Finances" desc="Income comes from tuition, housing, grants, and donations. Expenses include salaries, maintenance, and utilities. Watch your monthly cash flow — going bankrupt ends the game." />
            <SystemItem icon={<Leaf size={18} />} color="bg-accent-100 text-accent-700" title="Sustainability" desc="Invest in solar panels, recycling, green transport, and more. These cost money upfront but boost your sustainability score and reduce maintenance over time." />
            <SystemItem icon={<AlertCircle size={18} />} color="bg-warning-100 text-warning-700" title="Events" desc="Random events pop up during play. Each gives you a choice with costs and benefits. Some only appear under certain conditions — like housing shortages when enrollment outpaces capacity." />
          </div>
        </div>

        {/* Tips */}
        <div className="card p-6 mb-4">
          <h2 className="text-base font-bold text-neutral-800 mb-3">Strategy Tips</h2>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Don't expand too fast — buildings add maintenance costs that can drain your budget.</li>
            <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Keep an eye on the student-faculty ratio. Too few faculty means lower academic quality.</li>
            <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Raising tuition helps short-term revenue but hurts satisfaction and long-term enrollment.</li>
            <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Repair buildings before they deteriorate — poor conditions reduce satisfaction.</li>
            <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Your goal determines your win condition. Check the goal progress panel on the right side of the game screen.</li>
            <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">•</span> Save often using the Save button in the top bar. The game auto-saves to your browser.</li>
          </ul>
        </div>

        {/* Win / Lose */}
        <div className="card p-6">
          <h2 className="text-base font-bold text-neutral-800 mb-3">Winning and Losing</h2>
          <div className="space-y-2 text-sm text-neutral-600">
            <p><span className="font-semibold text-success-600">Win:</span> Achieve your chosen goal — for example, reach Academic Quality 90 for Academic Excellence, or keep all metrics above 75 for Balanced University.</p>
            <p><span className="font-semibold text-error-600">Lose:</span> The game ends if your budget goes deeply negative, satisfaction collapses, or enrollment drops below sustainable levels. You'll get warnings before it's too late.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-neutral-600">
      <div className="w-7 h-7 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}

function SystemItem({ icon, color, title, desc }: { icon: React.ReactNode; color: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-800">{title}</p>
        <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
