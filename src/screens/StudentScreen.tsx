import { useGame } from '@/game/GameContext';
import { ArrowLeft, GraduationCap, Mail, School, Code } from 'lucide-react';

export function StudentScreen() {
  const { setScreen } = useGame();

  const topics = [
    'Simulation design',
    'Resource allocation',
    'State management',
    'Decision systems',
    'Event-driven logic',
    'Data visualisation',
    'Strategy mechanics',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-accent-50/10 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto py-8">
        <button onClick={() => setScreen('home')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 mb-6 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-20 h-20 rounded-2xl bg-primary-600 text-white items-center justify-center mb-4 shadow-lg shadow-primary-600/30">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900">Aranya Vij</h1>
          <p className="text-sm text-neutral-500 mt-1">Computer Science Applicant</p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary-50 text-secondary-600 flex items-center justify-center">
              <School size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-500">School</p>
              <p className="text-sm font-semibold text-neutral-800">Redmond High School</p>
            </div>
          </div>
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
              <Code size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Field</p>
              <p className="text-sm font-semibold text-neutral-800">Computer Science</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <a
          href="mailto:aranyavij9@gmail.com"
          className="card p-4 flex items-center gap-3 mb-6 hover:border-primary-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-accent-50 text-accent-600 flex items-center justify-center">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-500">Email</p>
            <p className="text-sm font-semibold text-primary-700">aranyavij9@gmail.com</p>
          </div>
        </a>

        {/* About the project */}
        <div className="card p-6 mb-6">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">About the Project</h2>
          <blockquote className="text-sm text-neutral-600 leading-relaxed italic border-l-3 border-primary-300 pl-4">
            "I designed Campus Tycoon to explore how software can model complex decisions where resources are limited and every choice has consequences. The project combines simulation logic, state management, visualisation, and strategy into an interactive environment."
          </blockquote>
        </div>

        {/* What I explored */}
        <div className="card p-6">
          <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">What I Explored</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span key={topic} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
