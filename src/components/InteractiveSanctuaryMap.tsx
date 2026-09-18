import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Leaf } from 'lucide-react';
import { useSanctuaryFacilities } from '../data/sanctuaryFacilities';

// Fix Leaflet marker icons issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Approx center of Pisac / Pampa Ñusta
const MAP_CENTER: [number, number] = [-13.4225, -71.8488];

export const InteractiveSanctuaryMap: React.FC = () => {
  const PAMPA_NUSTA_FACILITIES = useSanctuaryFacilities();

  return (
    <div className="w-full h-full min-h-[460px] sm:min-h-[580px] rounded-3xl overflow-hidden shadow-2xl relative">
      <MapContainer
        center={MAP_CENTER}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full absolute inset-0 z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={MAP_CENTER}>
          <Popup>
            <div className="text-center p-1">
              <h3 className="font-cinzel font-bold text-amber-800">Pampa Ñusta</h3>
              <p className="text-xs font-mono text-stone-600 mt-1">Santuario Ecológico (3,347 msnm)</p>
            </div>
          </Popup>
        </Marker>

        {/* Example to map facilities if they had coordinates. We'll use offsets from center for demo. */}
        {PAMPA_NUSTA_FACILITIES.map((facility, idx) => {
          const offsetLat = MAP_CENTER[0] + (Math.random() - 0.5) * 0.01;
          const offsetLng = MAP_CENTER[1] + (Math.random() - 0.5) * 0.01;
          return (
            <Marker key={facility.id} position={[offsetLat, offsetLng]}>
              <Popup>
                <div className="text-left p-1 max-w-[200px]">
                  <span className="text-[10px] uppercase font-bold text-amber-600">Sector 0{idx + 1}</span>
                  <h4 className="font-cinzel font-bold text-stone-900 leading-tight">{facility.name}</h4>
                  <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">{facility.shortDesc}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Overlay HUD */}
      <div className="absolute top-4 left-4 z-10 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-amber-200 shadow-md">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-amber-600" />
          <span className="font-cinzel font-bold text-stone-900">Mapa del Santuario</span>
        </div>
        <p className="text-[10px] font-mono text-stone-600 mt-1">Explora las instalaciones en Pisac</p>
      </div>
    </div>
  );
};
