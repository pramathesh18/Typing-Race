import { useState, useEffect } from 'react';
import { socket } from './services/socket';
import { Header } from './components/Header';
import { ConnectionBanner } from './components/ConnectionBanner';
import { LandingScreen } from './screens/LandingScreen';
import { CreatePartyScreen } from './screens/CreatePartyScreen';
import { JoinPartyScreen } from './screens/JoinPartyScreen';
import { LobbyScreen } from './screens/LobbyScreen';
import { RaceScreen } from './screens/RaceScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { generateRandomUsername } from './utils/partyUtils';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [partyCode, setPartyCode] = useState('');
  const [partyData, setPartyData] = useState(null);
  const [initialJoinCode, setInitialJoinCode] = useState('');
  const [latestRaceResults, setLatestRaceResults] = useState(null);

  // Random Username state with local storage persistence
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem('typerace_username');
    return saved || generateRandomUsername();
  });

  // Persist username changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('typerace_username', username);
    }
  }, [username]);

  // Handle client reconnection state recovery
  useEffect(() => {
    const handleReconnect = () => {
      if (partyCode && ['lobby', 'race', 'results'].includes(currentScreen)) {
        socket.emit('join_room', { username, partyCode });
      }
    };

    socket.on('connect', handleReconnect);
    return () => {
      socket.off('connect', handleReconnect);
    };
  }, [partyCode, currentScreen, username]);

  // Extract party code from invite URL query params (e.g. ?party=4829)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const partyParam = params.get('party');
    if (partyParam && partyParam.length === 4) {
      setInitialJoinCode(partyParam);
      setCurrentScreen('join-party');
    }
  }, []);

  const handleFinishRace = (results) => {
    setLatestRaceResults(results);
    setCurrentScreen('results');
  };

  const handleRaceAgain = () => {
    setLatestRaceResults(null);
    setCurrentScreen('race');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNavigate={setCurrentScreen} />;
      case 'create-party':
        return (
          <CreatePartyScreen 
            onNavigate={setCurrentScreen} 
            setPartyCodeState={setPartyCode}
            setPartyDataState={setPartyData}
            username={username}
          />
        );
      case 'join-party':
        return (
          <JoinPartyScreen 
            onNavigate={setCurrentScreen} 
            setPartyCodeState={setPartyCode}
            setPartyDataState={setPartyData}
            initialCode={initialJoinCode}
            username={username}
          />
        );
      case 'lobby':
        return (
          <LobbyScreen 
            onNavigate={setCurrentScreen} 
            partyCode={partyCode} 
            username={username} 
            initialPartyData={partyData}
          />
        );
      case 'race':
        return (
          <RaceScreen 
            onNavigate={setCurrentScreen} 
            partyCode={partyCode} 
            username={username}
            onFinishRace={handleFinishRace}
          />
        );
      case 'results':
        return (
          <ResultsScreen 
            onNavigate={setCurrentScreen} 
            partyCode={partyCode} 
            username={username}
            raceResults={latestRaceResults}
            onRaceAgain={handleRaceAgain}
          />
        );
      default:
        return <LandingScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <>
      <Header 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen}
        username={username}
        setUsername={setUsername}
      />
      <main className="app-main">
        <ConnectionBanner />
        {renderScreen()}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} TYPE RACE — Real-time Multiplayer Typing</p>
      </footer>
    </>
  );
}

export default App;
