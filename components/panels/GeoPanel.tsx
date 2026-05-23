'use client';

import React, { useEffect, useState } from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import map components to prevent SSR issues in Next.js
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export const GeoPanel = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const position: [number, number] = [37.7749, -122.4194]; // Default to SF

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <MapPin className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Geolocation</h2>
      </div>
      <div className="w-full h-48 rounded bg-black/50 border border-cyan-900/30 overflow-hidden relative z-0">
        {mounted && (
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            <Marker position={position}>
              <Popup>
                <div className="font-mono text-xs text-gray-800">
                  <strong>IP Location</strong><br/>
                  San Francisco, CA
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        )}
        {!mounted && <div className="w-full h-full flex items-center justify-center font-mono text-xs text-cyan-600">Loading Map...</div>}
      </div>
      <div className="flex justify-between font-mono text-xs text-cyan-300">
        <span>ISP: AS13335 Cloudflare, Inc.</span>
        <span>San Francisco, US</span>
      </div>
    </HolographicCard>
  );
};
