import { GameProvider, useGame } from '@/game/GameContext';
import { HomeScreen } from '@/screens/HomeScreen';
import { NewGameScreen } from '@/screens/NewGameScreen';
import { GameScreen } from '@/screens/GameScreen';
import { AnalyticsScreen } from '@/screens/AnalyticsScreen';
import { DecisionLogScreen } from '@/screens/DecisionLogScreen';
import { StudentScreen } from '@/screens/StudentScreen';
import { AboutScreen } from '@/screens/AboutScreen';
import { LeaderboardScreen } from '@/screens/LeaderboardScreen';
import { HowToPlayScreen } from '@/screens/HowToPlayScreen';

function ScreenRouter() {
  const { screen } = useGame();

  switch (screen) {
    case 'home':
      return <HomeScreen />;
    case 'new-game':
      return <NewGameScreen />;
    case 'game':
      return <GameScreen />;
    case 'analytics':
      return <AnalyticsScreen />;
    case 'decision-log':
      return <DecisionLogScreen />;
    case 'student':
      return <StudentScreen />;
    case 'about':
      return <AboutScreen />;
    case 'leaderboard':
      return <LeaderboardScreen />;
    case 'how-to-play':
      return <HowToPlayScreen />;
    default:
      return <HomeScreen />;
  }
}

function App() {
  return (
    <GameProvider>
      <ScreenRouter />
    </GameProvider>
  );
}

export default App;
