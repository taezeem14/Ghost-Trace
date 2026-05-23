"use client";
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBar } from '@/components/layout/StatusBar';
import { CommandBar } from '@/components/layout/CommandBar';
import { ParticleField } from '@/components/ambient/ParticleField';
import { GridPlane } from '@/components/ambient/GridPlane';
import { AmbientNoise } from '@/components/ambient/AmbientNoise';
import { useUiStore } from '@/store/uiStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ecoMode = useUiStore((s) => s.ecoMode);

  return (
    <div className={`flex h-screen w-screen bg-black overflow-hidden relative text-slate-300 font-sans ${ecoMode ? 'eco-mode' : ''}`}>
      {/* Ambient layers — completely removed in eco mode */}
      {!ecoMode && (
        <>
          <ParticleField />
          <GridPlane />
          <AmbientNoise />
        </>
      )}

      {/* Floating fixed sidebar */}
      <Sidebar />

      {/* Main Column — offset to the right by w-16 sidebar width (pl-16) to avoid layout overlaps */}
      <div className="flex flex-col flex-1 h-full min-w-0 z-10 relative pl-16">
        <TopBar />

        <main className={`flex-grow overflow-x-hidden overflow-y-auto p-6 custom-scrollbar ${
          ecoMode
            ? 'bg-gray-950'
            : 'bg-black/40 backdrop-blur-sm'
        }`}>
          {children}
        </main>

        <StatusBar />
      </div>

      {/* Cmd+K Search Modal overlay */}
      <CommandBar />

      {/* CRT Scanline Overlay — disabled in eco mode */}
      {!ecoMode && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-10 mix-blend-overlay"></div>
      )}
    </div>
  );
}
