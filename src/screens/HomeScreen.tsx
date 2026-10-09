import { useGame } from '@/game/GameContext';
import {
  GraduationCap,
  Play,
  BookOpen,
  Trophy,
  User,
  Info,
  ArrowUpRight,
  ArrowRight,
  Users,
  Building2,
  Coins,
  Star,
} from 'lucide-react';

export function HomeScreen() {
  const { setScreen, hasSavedGame, continueGame } = useGame();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#172033]">
      {/* Top Navigation */}
      <header className="border-b border-[#e3e7ec] bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e5eff] text-white shadow-sm">
              <GraduationCap size={22} strokeWidth={2.2} />
            </div>

            <div>
              <div className="text-[15px] font-bold tracking-tight text-[#172033]">
                Campus Tycoon
              </div>

              <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8992a3]">
                University Simulator
              </div>
            </div>
          </div>

          {/* Small navigation */}
          <div className="hidden items-center gap-1 sm:flex">
            <button
              onClick={() => setScreen('how-to-play')}
              className="rounded-lg px-3 py-2 text-xs font-medium text-[#697386] transition hover:bg-[#f3f5f8] hover:text-[#172033]"
            >
              How to Play
            </button>

            <button
              onClick={() => setScreen('leaderboard')}
              className="rounded-lg px-3 py-2 text-xs font-medium text-[#697386] transition hover:bg-[#f3f5f8] hover:text-[#172033]"
            >
              Leaderboard
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-10 pt-8 sm:px-8 lg:pt-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] bg-[#172033] shadow-[0_20px_60px_rgba(23,32,51,0.12)]">
          {/* Decorative campus lines */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[50px] border-white/[0.025]" />
            <div className="absolute -right-5 -top-14 h-64 w-64 rounded-full border border-white/[0.05]" />
            <div className="absolute bottom-[-100px] left-[40%] h-72 w-72 rounded-full border border-white/[0.035]" />
          </div>

          <div className="relative grid min-h-[430px] lg:grid-cols-[1fr_0.95fr]">
            {/* Hero copy */}
            <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                  Build • Manage • Grow
                </span>
              </div>

              <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-[54px]">
                Your university.
                <span className="block text-[#8fb3ff]">
                  Your decisions.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-6 text-[#aab4c5] sm:text-[15px]">
                Start with an empty campus and turn it into a thriving
                university. Build facilities, manage your budget, and keep
                your students happy.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setScreen('new-game')}
                  className="group flex items-center justify-center gap-3 rounded-xl bg-[#2f6bff] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition-all hover:bg-[#3b74ff] hover:shadow-xl"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
                    <Play size={14} fill="currentColor" />
                  </span>

                  Start New University

                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>

                <button
                  onClick={() => hasSavedGame && continueGame()}
                  disabled={!hasSavedGame}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <BookOpen size={16} />
                  Continue
                </button>
              </div>

              <div className="mt-8 flex items-center gap-5 text-[11px] text-[#7f8ba0]">
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} />
                  Build your campus
                </span>

                <span className="hidden h-3 w-px bg-white/10 sm:block" />

                <span className="flex items-center gap-1.5">
                  <Users size={13} />
                  Manage students
                </span>
              </div>
            </div>

            {/* Campus illustration */}
            <div className="relative hidden min-h-[430px] lg:block">
              {/* Ground */}
              <div className="absolute bottom-0 right-0 h-[62%] w-[92%] rounded-tl-[100px] bg-[#1d2940]" />

              {/* Lawn */}
              <div className="absolute bottom-0 right-0 h-[46%] w-[80%] bg-[#233b35]" />

              {/* Main road */}
              <div className="absolute bottom-[-10px] right-[24%] h-[310px] w-[80px] rotate-[28deg] bg-[#263348]" />

              <div className="absolute bottom-0 right-[32%] h-[310px] w-[2px] rotate-[28deg] border-l border-dashed border-white/10" />

              {/* Main building */}
              <div className="absolute bottom-[29%] right-[27%]">
                <div className="relative h-[145px] w-[190px] rounded-t-lg border border-white/10 bg-[#697b96] shadow-2xl">
                  {/* Windows */}
                  <div className="grid grid-cols-4 gap-3 px-5 pt-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                      <div
                        key={item}
                        className="h-8 rounded-sm bg-[#9bb6df]/50"
                      />
                    ))}
                  </div>

                  {/* Entrance */}
                  <div className="absolute bottom-0 left-1/2 h-16 w-12 -translate-x-1/2 rounded-t-lg bg-[#263348]" />
                </div>

                {/* Roof */}
                <div className="absolute -left-3 -top-5 h-6 w-[206px] skew-x-[-18deg] rounded-sm bg-[#34435b]" />

                {/* Flag */}
                <div className="absolute -top-16 left-1/2 h-16 w-px bg-[#77859b]" />
                <div className="absolute -top-16 left-1/2 h-5 w-8 bg-[#3c74ff]" />
              </div>

              {/* Smaller building */}
              <div className="absolute bottom-[22%] right-[5%]">
                <div className="h-[82px] w-[105px] rounded-t bg-[#53647c]">
                  <div className="grid grid-cols-3 gap-2 px-3 pt-5">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="h-4 rounded-sm bg-[#a8bfdf]/40"
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute -top-3 -left-1 h-4 w-[107px] bg-[#34435b]" />
              </div>

              {/* Trees */}
              {[
                'bottom-[18%] right-[45%]',
                'bottom-[12%] right-[61%]',
                'bottom-[31%] right-[72%]',
                'bottom-[8%] right-[10%]',
              ].map((position, index) => (
                <div key={index} className={`absolute ${position}`}>
                  <div className="mx-auto h-5 w-1 bg-[#4b5b4d]" />
                  <div className="h-10 w-10 rounded-full bg-[#36584b] shadow-lg" />
                </div>
              ))}

              {/* Campus status card */}
              <div className="absolute right-7 top-7 w-48 rounded-xl border border-white/10 bg-[#101827]/90 p-4 shadow-xl backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#77849a]">
                    New Campus
                  </span>

                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                </div>

                <div className="mb-3 text-sm font-semibold text-white">
                  Ready to build
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[8%] rounded-full bg-blue-500" />
                </div>

                <div className="mt-2 flex justify-between text-[9px] text-[#66738a]">
                  <span>Campus progress</span>
                  <span>0%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={<Users size={18} />}
            label="Students"
            value="0"
            color="blue"
          />

          <StatCard
            icon={<Building2 size={18} />}
            label="Buildings"
            value="0"
            color="violet"
          />

          <StatCard
            icon={<Coins size={18} />}
            label="Budget"
            value="—"
            color="amber"
          />

          <StatCard
            icon={<Star size={18} />}
            label="Campus Rating"
            value="—"
            color="emerald"
          />
        </section>

        {/* Bottom menu */}
        <section className="mt-8">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa3b2]">
                Explore
              </p>
              <h2 className="mt-1 text-lg font-bold text-[#172033]">
                Campus Menu
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MenuCard
              icon={<BookOpen size={19} />}
              title="How to Play"
              description="Learn the basics"
              onClick={() => setScreen('how-to-play')}
              accent="blue"
            />

            <MenuCard
              icon={<Trophy size={19} />}
              title="Leaderboard"
              description="View high scores"
              onClick={() => setScreen('leaderboard')}
              accent="amber"
            />

            <MenuCard
              icon={<User size={19} />}
              title="Student"
              description="About the creator"
              onClick={() => setScreen('student')}
              accent="violet"
            />

            <MenuCard
              icon={<Info size={19} />}
              title="About"
              description="About the game"
              onClick={() => setScreen('about')}
              accent="slate"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[#e1e5ea] pt-5 text-xs text-[#9aa3b2] sm:flex-row">
          <span>Campus Tycoon © 2026</span>
          <span>Computer Science Portfolio Project · Aranya Vij</span>
        </footer>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'blue' | 'violet' | 'amber' | 'emerald';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="rounded-xl border border-[#e2e6eb] bg-white p-4 shadow-[0_2px_8px_rgba(23,32,51,0.03)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors[color]}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9aa3b2]">
            {label}
          </p>
          <p className="mt-0.5 text-lg font-bold text-[#172033]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function MenuCard({
  icon,
  title,
  description,
  onClick,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  accent: 'blue' | 'amber' | 'violet' | 'slate';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    violet: 'bg-violet-50 text-violet-600',
    slate: 'bg-slate-100 text-slate-600',
  };

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-xl border border-[#e2e6eb] bg-white p-4 text-left shadow-[0_2px_8px_rgba(23,32,51,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4d9e0] hover:shadow-md"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colors[accent]}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#172033]">{title}</p>
        <p className="mt-0.5 text-xs text-[#929baa]">{description}</p>
      </div>

      <ArrowRight
        size={16}
        className="text-[#c5cad2] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#667085]"
      />
    </button>
  );
}
