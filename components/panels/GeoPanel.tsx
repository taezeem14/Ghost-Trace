'use client';

import React, { useEffect, useState } from 'react';
import { HolographicCard } from '../ui/HolographicCard';
import { MapPin, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useScanStore } from '@/store/scanStore';
import 'leaflet/dist/leaflet.css';

// Dynamically import map components to prevent SSR issues in Next.js
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export const GeoPanel = () => {
  const [mounted, setMounted] = useState(false);
  const { scanResults, activeScan } = useScanStore();
  const ipgeo = scanResults?.ipgeo;
  const isLoading = activeScan?.status === 'scanning';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!ipgeo && !isLoading) return null;

  const data = ipgeo?.data;
  const lat = data?.lat || 0;
  const lon = data?.lon || 0;
  const position: [number, number] = [lat, lon];
  const hasValidPosition = lat !== 0 && lon !== 0;

  return (
    <HolographicCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
        <MapPin className="text-cyan-400 w-5 h-5" />
        <h2 className="text-cyan-100 font-mono text-sm tracking-wider uppercase">Geolocation</h2>
      </div>
      
      {isLoading && !ipgeo ? (
        <div className="text-cyan-600 font-mono text-xs animate-pulse">Locating target infrastructure...</div>
      ) : ipgeo?.error ? (
         <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
           <AlertCircle className="w-4 h-4" /> {ipgeo.error}
         </div>
      ) : (
        <>
          <div className="w-full h-48 rounded bg-black/50 border border-cyan-900/30 overflow-hidden relative z-0">
            {mounted && hasValidPosition ? (
              <MapContainer key={`${lat}-${lon}`} center={position} zoom={11} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; CARTO'
                />
                <Marker position={position}>
                  <Popup>
                    <div className="font-mono text-xs text-gray-800">
                      <strong>IP Location</strong><br/>
                      {data?.city}, {data?.country}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : mounted && !hasValidPosition ? (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-cyan-600">Location Data Unavailable</div>
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-cyan-600">Loading Map...</div>
            )}
          </div>
          <div className="flex justify-between font-mono text-xs text-cyan-300">
            <span className="truncate pr-4" title={data?.isp || data?.as || 'Unknown ISP'}>ISP: {data?.isp || data?.as || 'Unknown'}</span>
            <span className="shrink-0">{data?.city ? `${data.city}, ${data.countryCode}` : 'Unknown Location'}</span>
          </div>
        </>
      )}
    </HolographicCard>
  );
};
