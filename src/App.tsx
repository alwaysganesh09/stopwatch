import React, { useEffect, useState } from 'react';
import { Timer, Github, Moon, Sun, Menu, Play, Pause, RotateCcw, Flag } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setTime(time => time + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-black' : 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300'}`}>
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Timer className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-900'}`} />
              <span className={`ml-2 text-xl font-bold ${isDark ? 'text-white' : 'text-blue-900'}`}>StopWatch</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" className={`px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-white hover:bg-white/10' : 'text-blue-900 hover:bg-blue-900/10'}`}>Features</a>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${isDark ? 'text-white hover:bg-white/10' : 'text-blue-900 hover:bg-blue-900/10'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${isDark ? 'text-white hover:bg-white/10' : 'text-blue-900 hover:bg-blue-900/10'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className={`block px-3 py-2 rounded-md text-base font-medium ${isDark ? 'text-white hover:bg-white/10' : 'text-blue-900 hover:bg-blue-900/10'}`}>Features</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-blue-900'}`}>
              Precision Timing
            </h1>
            <p className={`text-xl ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
              Track your time with millisecond accuracy
            </p>
          </div>

          {/* Stopwatch Display */}
          <div className="flex flex-col items-center justify-center gap-8 mb-16 w-full max-w-2xl">
            {/* Time Display */}
            <div className={`${isDark ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-sm p-8 rounded-xl border ${isDark ? 'border-blue-500/30' : 'border-blue-900/30'} w-full`}>
              <div className={`text-6xl md:text-7xl font-mono text-center ${isDark ? 'text-blue-400' : 'text-blue-900'}`}>
                {formatTime(time)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={handleStartStop}
                className={`p-4 rounded-full ${
                  isDark 
                    ? isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    : isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                } text-white transition-colors`}
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={handleLap}
                disabled={!isRunning}
                className={`p-4 rounded-full ${
                  isDark
                    ? 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50'
                    : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50'
                } text-white transition-colors disabled:cursor-not-allowed`}
              >
                <Flag className="w-6 h-6" />
              </button>
              <button
                onClick={handleReset}
                className={`p-4 rounded-full ${
                  isDark
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white transition-colors`}
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            {/* Laps */}
            {laps.length > 0 && (
              <div className={`${isDark ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-sm p-6 rounded-xl border ${isDark ? 'border-blue-500/30' : 'border-blue-900/30'} w-full`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-blue-900'}`}>Lap Times</h3>
                <div className="space-y-2">
                  {laps.map((lapTime, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center ${isDark ? 'text-blue-200' : 'text-blue-700'} font-mono`}
                    >
                      <span>Lap {laps.length - index}</span>
                      <span>{formatTime(lapTime)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <section id="features" className="w-full mb-16">
            <h2 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-blue-900'}`}>Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Millisecond Precision', desc: 'Track time with high accuracy down to milliseconds' },
                { title: 'Lap Recording', desc: 'Record and display multiple lap times during your session' },
                { title: 'Dark Mode', desc: 'Easy on the eyes with beautiful color transitions' }
              ].map((feature, i) => (
                <div key={i} className={`${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-sm p-6 rounded-xl border ${isDark ? 'border-blue-500/20' : 'border-blue-900/20'}`}>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-900'}`}>{feature.title}</h3>
                  <p className={isDark ? 'text-blue-200' : 'text-blue-700'}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-sm border-t ${isDark ? 'border-white/10' : 'border-blue-900/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <p className={isDark ? 'text-white/60' : 'text-blue-900/60'}>© 2025 StopWatch. All rights reserved.</p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDark ? 'text-white/60 hover:text-white' : 'text-blue-900/60 hover:text-blue-900'}`}
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;