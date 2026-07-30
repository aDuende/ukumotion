import { useState } from 'react'
import { AboutPage } from './components/AboutPage'
import { CameraStage } from './components/CameraStage'
import { ChordPanel } from './components/ChordPanel'
import { ConsoleHeader } from './components/ConsoleHeader'
import { ControlRail } from './components/ControlRail'
import { CoursePage } from './components/CoursePage'
import { ImmersiveLandingPage } from './components/ImmersiveLandingPage'
import { InstrumentChooser } from './components/InstrumentChooser'
import { NoteGenerator } from './components/NoteGenerator'
import { StudyPanels } from './components/StudyPanels'
import { TransportBar } from './components/TransportBar'
import { useMotionInstrument } from './hooks/useMotionInstrument'
import { GESTURES, SCORE, type Instrument } from './lib/music'

function App() {
  const [view, setView] = useState<'landing' | 'generator' | 'instruments' | 'courses' | 'about' | 'studio'>('landing')
  const [studioTheme, setStudioTheme] = useState<'dark' | 'light'>(() => localStorage.getItem('studio-theme') === 'light' ? 'light' : 'dark')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const studio = useMotionInstrument()

  const toggleStudioTheme = () => {
    setStudioTheme((theme) => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('studio-theme', nextTheme)
      return nextTheme
    })
  }

  if (view === 'landing') {
    return (
      <ImmersiveLandingPage
        theme={studioTheme}
        onEnterStudio={() => setView('studio')}
        onThemeChange={toggleStudioTheme}
        onGenerateNotes={() => setView('generator')}
        onChooseInstrument={() => setView('instruments')}
        onCourses={() => setView('courses')}
        onAbout={() => setView('about')}
      />
    )
  }

  if (view === 'instruments') {
    const selectInstrument = (instrument: Instrument) => {
      studio.switchInstrument(instrument)
      setView('studio')
    }

    const navigateFromChooser = (section: 'home' | 'generator' | 'courses' | 'about') => {
      setView(section === 'home' ? 'landing' : section)
      window.scrollTo(0, 0)
    }

    return <InstrumentChooser theme={studioTheme} onThemeChange={toggleStudioTheme} onNavigate={navigateFromChooser} onSelect={selectInstrument} />
  }

  if (view === 'generator') {
    return <NoteGenerator theme={studioTheme} onThemeChange={toggleStudioTheme} onHome={() => setView('landing')} onChooseInstrument={() => setView('instruments')} onCourses={() => setView('courses')} onAbout={() => setView('about')} />
  }

  if (view === 'courses') {
    return (
      <CoursePage
        theme={studioTheme}
        onThemeChange={toggleStudioTheme}
        onHome={() => setView('landing')}
        onGenerateNotes={() => setView('generator')}
        onChooseInstrument={() => setView('instruments')}
        onAbout={() => setView('about')}
      />
    )
  }

  if (view === 'about') {
    return (
      <AboutPage
        theme={studioTheme}
        onThemeChange={toggleStudioTheme}
        onHome={() => setView('landing')}
        onGenerateNotes={() => setView('generator')}
        onChooseInstrument={() => setView('instruments')}
        onCourses={() => setView('courses')}
      />
    )
  }

  const returnHome = () => {
    studio.stopCamera()
    setSettingsOpen(false)
    setView('landing')
  }

  const light = studioTheme === 'light'
  const targetChord = SCORE[studio.bar]
  const targetNumber = GESTURES.indexOf(targetChord) + 1
  const progress = (studio.bar + 1) / SCORE.length

  return (
    <main className={`flex min-h-svh flex-col transition-colors ${studioTheme === 'light' ? 'bg-[#f5f6f4] text-[#191a18]' : 'bg-[#080908] text-white'}`}>
      <ConsoleHeader
        theme={studioTheme}
        instrument={studio.instrument}
        cameraActive={studio.camera === 'active'}
        handCount={studio.handCount}
        bpm={studio.bpm}
        onInstrumentChange={studio.switchInstrument}
        onStrum={() => void studio.playChord()}
        onPickPattern={() => void studio.playPickPattern()}
        pickPatternId={studio.pickPatternId}
        onPickPatternId={studio.setPickPatternId}
        onBpm={studio.setBpm}
        onSettings={() => setSettingsOpen(true)}
        settingsOpen={settingsOpen}
        onThemeChange={toggleStudioTheme}
        onHome={returnHome}
      />

      <div className="flex flex-col lg:h-[calc(100svh-4rem)]">
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <div className="flex min-h-0 flex-1 flex-col">
            <div className={`flex items-center justify-between border-b px-4 py-2 text-[11px] ${light ? 'border-black/8 bg-white' : 'border-white/10 bg-[#0d0e0d]'}`}>
              <span className={`flex items-center gap-2 font-semibold ${light ? 'text-[#191a18]' : 'text-white'}`}>
                <i className={`size-1.5 rounded-full ${studio.fingerNumber ? 'bg-[#ff6b3d]' : 'bg-white/25'}`} />
                {studio.fingerNumber ? `Reading ${studio.fingerNumber} · hold your hand steady` : 'Show a number 1–5 to your camera'}
              </span>
              <span className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-[.1em] ${light ? 'border-black/10 text-black/45' : 'border-white/12 text-white/45'}`}>TRACKING 1–5</span>
            </div>
            <CameraStage
              theme={studioTheme}
              videoRef={studio.videoRef}
              canvasRef={studio.canvasRef}
              instrument={studio.instrument}
              chord={studio.chord}
              fingerNumber={studio.fingerNumber}
              camera={studio.camera}
              cameraMessage={studio.cameraMessage}
              onStart={() => void studio.startCamera()}
              onStop={studio.stopCamera}
              onChord={(chord) => studio.selectChord(chord, 'GESTURE MAP')}
            />
          </div>

          <ChordPanel
            theme={studioTheme}
            instrument={studio.instrument}
            chord={studio.chord}
            targetChord={targetChord}
            targetNumber={targetNumber}
            fingerNumber={studio.fingerNumber}
            playing={studio.playing}
            feedback={studio.feedback}
            progress={progress}
            onInstrument={studio.switchInstrument}
            onStrum={() => void studio.playChord()}
            onToggleLoop={studio.togglePlaying}
          />
        </div>

        <TransportBar
          theme={studioTheme}
          bar={studio.bar}
          playing={studio.playing}
          onToggle={studio.togglePlaying}
          onBar={studio.selectBar}
        />
      </div>

      <StudyPanels
        theme={studioTheme}
        instrument={studio.instrument}
        bar={studio.bar}
        bpm={studio.bpm}
        volume={studio.volume}
        onBar={studio.selectBar}
        onBpm={studio.setBpm}
        onVolume={studio.changeVolume}
      />

      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
          <button className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" type="button" onClick={() => setSettingsOpen(false)} aria-label="Close play settings" />
          <ControlRail
            theme={studioTheme}
            instrument={studio.instrument}
            chord={studio.chord}
            lastAction={studio.lastAction}
            volume={studio.volume}
            bar={studio.bar}
            onClose={() => setSettingsOpen(false)}
            onChord={(chord) => {
              studio.selectChord(chord, 'CHORD BANK')
              void studio.playChord()
            }}
            onVolume={studio.changeVolume}
            onBar={studio.selectBar}
          />
        </div>
      )}
    </main>
  )
}

export default App
