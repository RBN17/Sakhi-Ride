import React, { useRef, useEffect } from 'react';

interface SafetyCanvasMapProps {
  progress: number; // 0 to 1
  pickupName: string;
  dropoffName: string;
  isDeviated?: boolean;
  speedKmH?: number;
}

export const SafetyCanvasMap: React.FC<SafetyCanvasMapProps> = ({
  progress,
  pickupName,
  dropoffName,
  isDeviated = false,
  speedKmH = 28,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Background - subtle clean map tone
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Draw map city blocks
    ctx.fillStyle = '#f1f5f9';
    const blockMargin = 16;
    const cols = 5;
    const rows = 4;
    const colW = width / cols;
    const rowH = height / rows;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Leave space for roads
        ctx.fillRect(
          c * colW + blockMargin,
          r * rowH + blockMargin,
          colW - blockMargin * 2,
          rowH - blockMargin * 2
        );
      }
    }

    // Secondary roads
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Horizontal & vertical roads
    for (let r = 1; r < rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * rowH);
      ctx.lineTo(width, r * rowH);
      ctx.stroke();
    }
    for (let c = 1; c < cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * colW, 0);
      ctx.lineTo(c * colW, height);
      ctx.stroke();
    }

    // Green safe park zones
    ctx.fillStyle = '#ecfdf5';
    ctx.fillRect(colW * 1 + 20, rowH * 0 + 20, colW * 0.8, rowH * 0.8);
    ctx.fillRect(colW * 3 + 20, rowH * 2 + 20, colW * 0.8, rowH * 0.7);

    // Waypoints for the route
    const waypoints = [
      { x: width * 0.15, y: height * 0.75 },
      { x: width * 0.3, y: height * 0.75 },
      { x: width * 0.3, y: height * 0.35 },
      { x: width * 0.65, y: height * 0.35 },
      { x: width * 0.65, y: height * 0.2 },
      { x: width * 0.88, y: height * 0.2 },
    ];

    // Deviated detour path if simulated
    const deviatedWaypoints = [
      { x: width * 0.15, y: height * 0.75 },
      { x: width * 0.3, y: height * 0.75 },
      { x: width * 0.3, y: height * 0.55 },
      { x: width * 0.48, y: height * 0.55 }, // Detour branch
      { x: width * 0.55, y: height * 0.75 },
      { x: width * 0.88, y: height * 0.2 },
    ];

    const activeWaypoints = isDeviated ? deviatedWaypoints : waypoints;

    // Draw main boulevard underlying base
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(activeWaypoints[0].x, activeWaypoints[0].y);
    for (let i = 1; i < activeWaypoints.length; i++) {
      ctx.lineTo(activeWaypoints[i].x, activeWaypoints[i].y);
    }
    ctx.stroke();

    // Draw Safe Corridor / Route line
    ctx.strokeStyle = isDeviated ? '#f59e0b' : '#059669';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(activeWaypoints[0].x, activeWaypoints[0].y);
    for (let i = 1; i < activeWaypoints.length; i++) {
      ctx.lineTo(activeWaypoints[i].x, activeWaypoints[i].y);
    }
    ctx.stroke();

    // Calculate position along path based on progress (0 to 1)
    let totalLength = 0;
    const segmentLengths: number[] = [];
    for (let i = 0; i < activeWaypoints.length - 1; i++) {
      const dx = activeWaypoints[i + 1].x - activeWaypoints[i].x;
      const dy = activeWaypoints[i + 1].y - activeWaypoints[i].y;
      const len = Math.hypot(dx, dy);
      segmentLengths.push(len);
      totalLength += len;
    }

    const currentDist = progress * totalLength;
    let accumulated = 0;
    let scooterX = activeWaypoints[0].x;
    let scooterY = activeWaypoints[0].y;
    let scooterAngle = 0;

    for (let i = 0; i < segmentLengths.length; i++) {
      const len = segmentLengths[i];
      if (accumulated + len >= currentDist) {
        const segProgress = (currentDist - accumulated) / len;
        const p1 = activeWaypoints[i];
        const p2 = activeWaypoints[i + 1];
        scooterX = p1.x + (p2.x - p1.x) * segProgress;
        scooterY = p1.y + (p2.y - p1.y) * segProgress;
        scooterAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        break;
      }
      accumulated += len;
      if (i === segmentLengths.length - 1) {
        scooterX = activeWaypoints[activeWaypoints.length - 1].x;
        scooterY = activeWaypoints[activeWaypoints.length - 1].y;
      }
    }

    // Pickup Marker (Green)
    const pStart = activeWaypoints[0];
    ctx.beginPath();
    ctx.arc(pStart.x, pStart.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dropoff Marker (Rose)
    const pEnd = activeWaypoints[activeWaypoints.length - 1];
    ctx.beginPath();
    ctx.arc(pEnd.x, pEnd.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#e11d48';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Scooter / Captain on the path
    ctx.save();
    ctx.translate(scooterX, scooterY);
    ctx.rotate(scooterAngle);

    // Glowing halo around scooter
    const halo = ctx.createRadialGradient(0, 0, 4, 0, 0, 20);
    halo.addColorStop(0, isDeviated ? 'rgba(245, 158, 11, 0.4)' : 'rgba(225, 29, 72, 0.35)');
    halo.addColorStop(1, 'rgba(225, 29, 72, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();

    // Scooter badge base
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Captain scooter icon color
    ctx.fillStyle = isDeviated ? '#d97706' : '#e11d48';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    // Small heading pointer
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(-4, -4);
    ctx.lineTo(-2, 0);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }, [progress, isDeviated]);

  return (
    <div className="relative w-full h-72 sm:h-80 bg-stone-100 rounded-xl overflow-hidden border border-stone-200 shadow-inner">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Top Map Telemetry Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-sm text-xs font-semibold text-slate-800 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isDeviated ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          <span>{isDeviated ? 'Route Deviation Warning' : 'Safe Lit Corridor Geofenced'}</span>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm text-xs font-mono tabular-nums text-white flex items-center gap-2">
          <span className="text-slate-400">GPS:</span>
          <span>{Math.round(speedKmH)} km/h</span>
        </div>
      </div>

      {/* Bottom Route Landmark Indicator */}
      <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between text-xs pointer-events-none">
        <div className="truncate max-w-[45%]">
          <span className="text-[10px] uppercase font-bold text-emerald-700 block">From</span>
          <span className="font-semibold text-slate-800 truncate block">{pickupName}</span>
        </div>
        <div className="text-stone-400 text-sm">➔</div>
        <div className="truncate max-w-[45%] text-right">
          <span className="text-[10px] uppercase font-bold text-rose-700 block">To</span>
          <span className="font-semibold text-slate-800 truncate block">{dropoffName}</span>
        </div>
      </div>
    </div>
  );
};
