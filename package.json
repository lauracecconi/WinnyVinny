import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

export default function MiniGolf() {
  const canvasRef = useRef(null);
  const [ball, setBall] = useState({ x: 100, y: 300, vx: 0, vy: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentHole, setCurrentHole] = useState(0);
  const [strokes, setStrokes] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [holeComplete, setHoleComplete] = useState(false);
  const [windmillRotation, setWindmillRotation] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const holes = [
    {
      start: { x: 100, y: 300 },
      hole: { x: 700, y: 300 },
      obstacles: [
        { type: 'windmill', x: 350, y: 300, size: 80, blades: 4 },
        { type: 'tunnel', x: 550, y: 250, width: 60, height: 100 },
        { type: 'bridge', x: 200, y: 280, width: 100, height: 15 },
        { type: 'ramp', x: 150, y: 400, width: 120, height: 25 },
        { type: 'sand', x: 250, y: 350, width: 80, height: 80 },
        { type: 'sand', x: 450, y: 200, width: 100, height: 70 }
      ]
    },
    {
      start: { x: 100, y: 500 },
      hole: { x: 700, y: 100 },
      obstacles: [
        { type: 'castle', x: 300, y: 300, width: 100, height: 120 },
        { type: 'windmill', x: 550, y: 250, size: 70, blades: 4 },
        { type: 'ramp', x: 200, y: 450, width: 150, height: 30 },
        { type: 'tunnel', x: 450, y: 150, width: 70, height: 90 },
        { type: 'bridge', x: 600, y: 380, width: 80, height: 12 },
        { type: 'sand', x: 150, y: 350, width: 90, height: 90 },
        { type: 'sand', x: 500, y: 400, width: 120, height: 60 }
      ]
    },
    {
      start: { x: 400, y: 500 },
      hole: { x: 400, y: 100 },
      obstacles: [
        { type: 'lighthouse', x: 250, y: 200, radius: 40, height: 200 },
        { type: 'windmill', x: 550, y: 350, size: 90, blades: 4 },
        { type: 'bridge', x: 350, y: 300, width: 100, height: 15 },
        { type: 'tunnel', x: 200, y: 420, width: 65, height: 95 },
        { type: 'ramp', x: 500, y: 200, width: 130, height: 28 },
        { type: 'bridge', x: 300, y: 180, width: 90, height: 12 },
        { type: 'sand', x: 350, y: 400, width: 100, height: 80 },
        { type: 'sand', x: 450, y: 250, width: 70, height: 70 }
      ]
    },
    {
      start: { x: 50, y: 300 },
      hole: { x: 750, y: 300 },
      obstacles: [
        { type: 'windmill', x: 200, y: 300, size: 75, blades: 4 },
        { type: 'windmill', x: 400, y: 300, size: 75, blades: 4 },
        { type: 'windmill', x: 600, y: 300, size: 75, blades: 4 },
        { type: 'sand', x: 300, y: 200, width: 80, height: 200 },
        { type: 'sand', x: 500, y: 200, width: 80, height: 200 }
      ]
    },
    {
      start: { x: 400, y: 550 },
      hole: { x: 400, y: 50 },
      obstacles: [
        { type: 'castle', x: 200, y: 200, width: 120, height: 150 },
        { type: 'castle', x: 480, y: 350, width: 120, height: 150 },
        { type: 'tunnel', x: 350, y: 250, width: 100, height: 80 },
        { type: 'sand', x: 250, y: 450, width: 300, height: 60 },
        { type: 'bridge', x: 350, y: 150, width: 100, height: 15 }
      ]
    },
    {
      start: { x: 100, y: 100 },
      hole: { x: 700, y: 500 },
      obstacles: [
        { type: 'ramp', x: 150, y: 150, width: 100, height: 25 },
        { type: 'ramp', x: 300, y: 250, width: 100, height: 25 },
        { type: 'ramp', x: 450, y: 350, width: 100, height: 25 },
        { type: 'sand', x: 200, y: 300, width: 80, height: 80 },
        { type: 'sand', x: 500, y: 200, width: 80, height: 80 },
        { type: 'windmill', x: 400, y: 400, size: 70, blades: 4 }
      ]
    },
    {
      start: { x: 700, y: 300 },
      hole: { x: 100, y: 300 },
      obstacles: [
        { type: 'lighthouse', x: 400, y: 200, radius: 50, height: 220 },
        { type: 'tunnel', x: 200, y: 250, width: 80, height: 100 },
        { type: 'tunnel', x: 520, y: 250, width: 80, height: 100 },
        { type: 'sand', x: 300, y: 400, width: 200, height: 60 },
        { type: 'bridge', x: 150, y: 280, width: 100, height: 15 }
      ]
    },
    {
      start: { x: 400, y: 300 },
      hole: { x: 400, y: 50 },
      obstacles: [
        { type: 'windmill', x: 300, y: 200, size: 80, blades: 4 },
        { type: 'windmill', x: 500, y: 200, size: 80, blades: 4 },
        { type: 'castle', x: 350, y: 350, width: 100, height: 120 },
        { type: 'sand', x: 250, y: 450, width: 300, height: 80 },
        { type: 'ramp', x: 350, y: 100, width: 100, height: 30 }
      ]
    },
    {
      start: { x: 100, y: 500 },
      hole: { x: 700, y: 50 },
      obstacles: [
        { type: 'bridge', x: 150, y: 400, width: 120, height: 15 },
        { type: 'bridge', x: 300, y: 300, width: 120, height: 15 },
        { type: 'bridge', x: 450, y: 200, width: 120, height: 15 },
        { type: 'sand', x: 200, y: 350, width: 80, height: 100 },
        { type: 'sand', x: 400, y: 250, width: 80, height: 100 },
        { type: 'windmill', x: 600, y: 400, size: 75, blades: 4 }
      ]
    },
    {
      start: { x: 50, y: 50 },
      hole: { x: 750, y: 550 },
      obstacles: [
        { type: 'tunnel', x: 200, y: 100, width: 70, height: 100 },
        { type: 'tunnel', x: 400, y: 300, width: 70, height: 100 },
        { type: 'tunnel', x: 600, y: 450, width: 70, height: 100 },
        { type: 'sand', x: 300, y: 200, width: 100, height: 100 },
        { type: 'sand', x: 500, y: 400, width: 100, height: 100 }
      ]
    },
    {
      start: { x: 400, y: 550 },
      hole: { x: 400, y: 50 },
      obstacles: [
        { type: 'lighthouse', x: 300, y: 250, radius: 45, height: 200 },
        { type: 'lighthouse', x: 500, y: 350, radius: 45, height: 200 },
        { type: 'windmill', x: 400, y: 400, size: 85, blades: 4 },
        { type: 'sand', x: 350, y: 150, width: 100, height: 60 },
        { type: 'bridge', x: 350, y: 480, width: 100, height: 15 }
      ]
    },
    {
      start: { x: 100, y: 300 },
      hole: { x: 700, y: 300 },
      obstacles: [
        { type: 'castle', x: 250, y: 200, width: 100, height: 140 },
        { type: 'castle', x: 450, y: 260, width: 100, height: 140 },
        { type: 'ramp', x: 350, y: 150, width: 100, height: 30 },
        { type: 'ramp', x: 350, y: 420, width: 100, height: 30 },
        { type: 'sand', x: 600, y: 250, width: 80, height: 100 }
      ]
    },
    {
      start: { x: 700, y: 500 },
      hole: { x: 100, y: 100 },
      obstacles: [
        { type: 'windmill', x: 300, y: 250, size: 90, blades: 4 },
        { type: 'windmill', x: 500, y: 350, size: 90, blades: 4 },
        { type: 'tunnel', x: 400, y: 150, width: 80, height: 100 },
        { type: 'sand', x: 200, y: 350, width: 150, height: 80 },
        { type: 'sand', x: 550, y: 200, width: 100, height: 120 },
        { type: 'bridge', x: 150, y: 180, width: 100, height: 15 }
      ]
    },
    {
      start: { x: 400, y: 300 },
      hole: { x: 700, y: 100 },
      obstacles: [
        { type: 'lighthouse', x: 250, y: 250, radius: 50, height: 220 },
        { type: 'castle', x: 500, y: 350, width: 110, height: 130 },
        { type: 'windmill', x: 600, y: 250, size: 75, blades: 4 },
        { type: 'sand', x: 350, y: 200, width: 120, height: 80 },
        { type: 'ramp', x: 150, y: 350, width: 100, height: 30 },
        { type: 'tunnel', x: 550, y: 450, width: 70, height: 90 }
      ]
    },
    {
      start: { x: 50, y: 550 },
      hole: { x: 750, y: 50 },
      obstacles: [
        { type: 'windmill', x: 200, y: 450, size: 80, blades: 4 },
        { type: 'windmill', x: 400, y: 300, size: 80, blades: 4 },
        { type: 'windmill', x: 600, y: 150, size: 80, blades: 4 },
        { type: 'bridge', x: 150, y: 350, width: 100, height: 15 },
        { type: 'bridge', x: 350, y: 200, width: 100, height: 15 },
        { type: 'bridge', x: 550, y: 100, width: 100, height: 15 },
        { type: 'sand', x: 300, y: 400, width: 100, height: 100 },
        { type: 'sand', x: 500, y: 250, width: 100, height: 100 }
      ]
    },
    {
      start: { x: 400, y: 550 },
      hole: { x: 400, y: 50 },
      obstacles: [
        { type: 'castle', x: 250, y: 250, width: 120, height: 150 },
        { type: 'castle', x: 430, y: 250, width: 120, height: 150 },
        { type: 'lighthouse', x: 400, y: 400, radius: 45, height: 180 },
        { type: 'tunnel', x: 340, y: 150, width: 120, height: 80 },
        { type: 'sand', x: 200, y: 450, width: 100, height: 70 },
        { type: 'sand', x: 500, y: 450, width: 100, height: 70 },
        { type: 'ramp', x: 300, y: 100, width: 200, height: 35 }
      ]
    },
    {
      start: { x: 100, y: 100 },
      hole: { x: 700, y: 500 },
      obstacles: [
        { type: 'windmill', x: 250, y: 200, size: 85, blades: 4 },
        { type: 'windmill', x: 450, y: 350, size: 85, blades: 4 },
        { type: 'windmill', x: 600, y: 450, size: 85, blades: 4 },
        { type: 'tunnel', x: 300, y: 300, width: 80, height: 100 },
        { type: 'bridge', x: 500, y: 250, width: 120, height: 15 },
        { type: 'sand', x: 150, y: 350, width: 120, height: 100 },
        { type: 'sand', x: 550, y: 200, width: 100, height: 80 },
        { type: 'ramp', x: 350, y: 450, width: 100, height: 30 }
      ]
    },
    {
      start: { x: 400, y: 300 },
      hole: { x: 100, y: 300 },
      obstacles: [
        { type: 'lighthouse', x: 550, y: 200, radius: 50, height: 240 },
        { type: 'castle', x: 250, y: 250, width: 120, height: 140 },
        { type: 'windmill', x: 400, y: 450, size: 80, blades: 4 },
        { type: 'windmill', x: 400, y: 150, size: 80, blades: 4 },
        { type: 'tunnel', x: 600, y: 350, width: 70, height: 100 },
        { type: 'sand', x: 450, y: 250, width: 100, height: 100 },
        { type: 'sand', x: 150, y: 350, width: 80, height: 80 },
        { type: 'bridge', x: 180, y: 280, width: 100, height: 15 },
        { type: 'ramp', x: 320, y: 380, width: 160, height: 35 }
      ]
    }
  ];

  const currentHoleData = holes[currentHole];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const friction = 0.98;
    const ballRadius = 10;
    const holeRadius = 20;

    const gameLoop = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animate windmill rotation
      setWindmillRotation(prev => (prev + 0.03) % (Math.PI * 2));

      // Draw grass background
      ctx.fillStyle = '#2d5016';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      ctx.strokeStyle = '#3d6026';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw obstacles
      currentHoleData.obstacles.forEach(obs => {
        if (obs.type === 'windmill') {
          // Base
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(obs.x - 15, obs.y, 30, 60);
          ctx.fillStyle = '#A0522D';
          ctx.fillRect(obs.x - 10, obs.y + 5, 20, 50);
          
          // Windmill house
          ctx.fillStyle = '#CD853F';
          ctx.beginPath();
          ctx.arc(obs.x, obs.y, obs.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 3;
          ctx.stroke();
          
          // Window
          ctx.fillStyle = '#87CEEB';
          ctx.fillRect(obs.x - 10, obs.y - 10, 20, 20);
          
          // Blades
          ctx.save();
          ctx.translate(obs.x, obs.y);
          ctx.rotate(windmillRotation);
          
          for (let i = 0; i < obs.blades; i++) {
            ctx.rotate((Math.PI * 2) / obs.blades);
            ctx.fillStyle = '#DEB887';
            ctx.fillRect(-8, -obs.size / 1.5, 16, obs.size / 1.5);
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 2;
            ctx.strokeRect(-8, -obs.size / 1.5, 16, obs.size / 1.5);
          }
          ctx.restore();
          
          // Center cap
          ctx.fillStyle = '#654321';
          ctx.beginPath();
          ctx.arc(obs.x, obs.y, 12, 0, Math.PI * 2);
          ctx.fill();
          
        } else if (obs.type === 'castle') {
          // Castle base
          ctx.fillStyle = '#808080';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          
          // Battlements
          for (let i = 0; i < 5; i++) {
            ctx.fillStyle = i % 2 === 0 ? '#696969' : '#808080';
            ctx.fillRect(obs.x + i * 20, obs.y - 15, 20, 15);
          }
          
          // Door
          ctx.fillStyle = '#4B3621';
          ctx.fillRect(obs.x + 35, obs.y + 60, 30, 60);
          ctx.strokeStyle = '#654321';
          ctx.lineWidth = 2;
          ctx.strokeRect(obs.x + 35, obs.y + 60, 30, 60);
          
          // Windows
          ctx.fillStyle = '#FFFF99';
          ctx.fillRect(obs.x + 15, obs.y + 30, 15, 20);
          ctx.fillRect(obs.x + 70, obs.y + 30, 15, 20);
          
        } else if (obs.type === 'tunnel') {
          // Tunnel opening
          ctx.fillStyle = '#4B3621';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          
          // Tunnel arch
          ctx.fillStyle = '#8B4513';
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height, obs.width / 2, Math.PI, 0);
          ctx.fill();
          
          // Striped pattern
          ctx.strokeStyle = '#FF6347';
          ctx.lineWidth = 5;
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(obs.x + obs.width / 2, obs.y + obs.height, obs.width / 2 - i * 10, Math.PI, 0);
            ctx.stroke();
          }
          
        } else if (obs.type === 'lighthouse') {
          // Lighthouse base
          ctx.fillStyle = '#B22222';
          ctx.beginPath();
          ctx.moveTo(obs.x - obs.radius, obs.y + obs.height);
          ctx.lineTo(obs.x - obs.radius / 2, obs.y);
          ctx.lineTo(obs.x + obs.radius / 2, obs.y);
          ctx.lineTo(obs.x + obs.radius, obs.y + obs.height);
          ctx.closePath();
          ctx.fill();
          
          // White stripes
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(obs.x - obs.radius / 2 + 5, obs.y + 50, obs.radius - 10, 30);
          ctx.fillRect(obs.x - obs.radius / 2 + 5, obs.y + 120, obs.radius - 10, 30);
          
          // Light at top
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(obs.x, obs.y, obs.radius / 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Light rays
          ctx.strokeStyle = '#FFFF00';
          ctx.lineWidth = 6;
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4 + windmillRotation;
            ctx.beginPath();
            ctx.moveTo(obs.x, obs.y);
            ctx.lineTo(obs.x + Math.cos(angle) * 60, obs.y + Math.sin(angle) * 60);
            ctx.stroke();
          }
          
        } else if (obs.type === 'ramp') {
          ctx.fillStyle = '#8B7355';
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.height);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.lineTo(obs.x + obs.width, obs.y);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#654321';
          ctx.lineWidth = 3;
          ctx.stroke();
          
        } else if (obs.type === 'bridge') {
          // Bridge planks
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          
          // Plank lines
          ctx.strokeStyle = '#654321';
          ctx.lineWidth = 2;
          for (let i = 0; i < obs.width; i += 15) {
            ctx.beginPath();
            ctx.moveTo(obs.x + i, obs.y);
            ctx.lineTo(obs.x + i, obs.y + obs.height);
            ctx.stroke();
          }
          
          // Rope railings
          ctx.strokeStyle = '#D2691E';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y - 5);
          ctx.lineTo(obs.x + obs.width, obs.y - 5);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.height + 5);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height + 5);
          ctx.stroke();
        } else if (obs.type === 'sand') {
          // Sand pit base
          ctx.fillStyle = '#F4A460';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          
          // Sand texture - random dots
          ctx.fillStyle = '#DEB887';
          for (let i = 0; i < 30; i++) {
            const dotX = obs.x + Math.random() * obs.width;
            const dotY = obs.y + Math.random() * obs.height;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Darker sand spots
          ctx.fillStyle = '#CD853F';
          for (let i = 0; i < 20; i++) {
            const dotX = obs.x + Math.random() * obs.width;
            const dotY = obs.y + Math.random() * obs.height;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Border
          ctx.strokeStyle = '#D2691E';
          ctx.lineWidth = 2;
          ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
        }
      });

      // Draw hole
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(currentHoleData.hole.x, currentHoleData.hole.y, holeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw flag
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(currentHoleData.hole.x, currentHoleData.hole.y);
      ctx.lineTo(currentHoleData.hole.x, currentHoleData.hole.y - 40);
      ctx.stroke();
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.moveTo(currentHoleData.hole.x, currentHoleData.hole.y - 40);
      ctx.lineTo(currentHoleData.hole.x + 20, currentHoleData.hole.y - 30);
      ctx.lineTo(currentHoleData.hole.x, currentHoleData.hole.y - 20);
      ctx.fill();

      // Update ball position
      setBall(prevBall => {
        let newBall = { ...prevBall };
        
        if (Math.abs(newBall.vx) > 0.1 || Math.abs(newBall.vy) > 0.1) {
          newBall.x += newBall.vx;
          newBall.y += newBall.vy;
          newBall.vx *= friction;
          newBall.vy *= friction;

          // Check if ball is in sand - apply extra friction
          let inSand = false;
          currentHoleData.obstacles.forEach(obs => {
            if (obs.type === 'sand') {
              if (newBall.x >= obs.x && newBall.x <= obs.x + obs.width &&
                  newBall.y >= obs.y && newBall.y <= obs.y + obs.height) {
                inSand = true;
              }
            }
          });
          
          if (inSand) {
            newBall.vx *= 0.85; // Extra friction in sand
            newBall.vy *= 0.85;
          }

          // Wall collisions
          if (newBall.x - ballRadius < 0 || newBall.x + ballRadius > canvas.width) {
            newBall.vx *= -0.7;
            newBall.x = Math.max(ballRadius, Math.min(canvas.width - ballRadius, newBall.x));
          }
          if (newBall.y - ballRadius < 0 || newBall.y + ballRadius > canvas.height) {
            newBall.vy *= -0.7;
            newBall.y = Math.max(ballRadius, Math.min(canvas.height - ballRadius, newBall.y));
          }

          // Obstacle collisions
          currentHoleData.obstacles.forEach(obs => {
            if (obs.type === 'windmill') {
              // Check collision with windmill blades
              const dx = newBall.x - obs.x;
              const dy = newBall.y - obs.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist < obs.size / 1.5 + ballRadius && dist > 15) {
                // Check if ball hits a blade
                const angleToBall = Math.atan2(dy, dx);
                const normalizedAngle = (angleToBall - windmillRotation + Math.PI * 2) % (Math.PI * 2);
                
                const bladeAngle = (Math.PI * 2) / obs.blades;
                for (let i = 0; i < obs.blades; i++) {
                  const bladeStart = i * bladeAngle - 0.2;
                  const bladeEnd = i * bladeAngle + 0.2;
                  
                  if (normalizedAngle >= bladeStart && normalizedAngle <= bladeEnd) {
                    const angle = Math.atan2(dy, dx);
                    newBall.x = obs.x + Math.cos(angle) * (dist + 5);
                    newBall.y = obs.y + Math.sin(angle) * (dist + 5);
                    newBall.vx *= -0.8;
                    newBall.vy *= -0.8;
                  }
                }
              }
              
              // Check collision with windmill center
              if (dist < obs.size / 2 + ballRadius) {
                const angle = Math.atan2(dy, dx);
                newBall.x = obs.x + Math.cos(angle) * (obs.size / 2 + ballRadius);
                newBall.y = obs.y + Math.sin(angle) * (obs.size / 2 + ballRadius);
                const normalX = dx / dist;
                const normalY = dy / dist;
                const dotProduct = newBall.vx * normalX + newBall.vy * normalY;
                newBall.vx = (newBall.vx - 2 * dotProduct * normalX) * 0.7;
                newBall.vy = (newBall.vy - 2 * dotProduct * normalY) * 0.7;
              }
            } else if (obs.type === 'castle' || obs.type === 'tunnel' || obs.type === 'ramp' || obs.type === 'bridge') {
              const closestX = Math.max(obs.x, Math.min(newBall.x, obs.x + obs.width));
              const closestY = Math.max(obs.y, Math.min(newBall.y, obs.y + obs.height));
              const distX = newBall.x - closestX;
              const distY = newBall.y - closestY;
              const distance = Math.sqrt(distX * distX + distY * distY);

              if (distance < ballRadius) {
                const angle = Math.atan2(distY, distX);
                newBall.x = closestX + Math.cos(angle) * ballRadius;
                newBall.y = closestY + Math.sin(angle) * ballRadius;
                
                const normalX = distX / distance;
                const normalY = distY / distance;
                const dotProduct = newBall.vx * normalX + newBall.vy * normalY;
                newBall.vx = (newBall.vx - 2 * dotProduct * normalX) * 0.7;
                newBall.vy = (newBall.vy - 2 * dotProduct * normalY) * 0.7;
              }
            } else if (obs.type === 'lighthouse') {
              // Check collision with lighthouse (triangular shape)
              const topRadius = obs.radius / 2;
              const bottomRadius = obs.radius;
              
              // Check if ball is within the vertical range of the lighthouse
              if (newBall.y >= obs.y && newBall.y <= obs.y + obs.height) {
                // Calculate the radius at the ball's current height
                const heightRatio = (newBall.y - obs.y) / obs.height;
                const radiusAtY = topRadius + (bottomRadius - topRadius) * heightRatio;
                
                // Check horizontal distance from lighthouse center
                const dx = newBall.x - obs.x;
                const distance = Math.abs(dx);
                
                if (distance < radiusAtY + ballRadius) {
                  // Ball is colliding with lighthouse
                  // Push ball out to the side
                  if (dx > 0) {
                    newBall.x = obs.x + radiusAtY + ballRadius;
                  } else {
                    newBall.x = obs.x - radiusAtY - ballRadius;
                  }
                  
                  // Bounce off horizontally
                  newBall.vx *= -0.7;
                  newBall.vy *= 0.9;
                }
              }
            }
          });

          // Check if ball reached hole
          const distToHole = Math.sqrt(
            Math.pow(newBall.x - currentHoleData.hole.x, 2) + 
            Math.pow(newBall.y - currentHoleData.hole.y, 2)
          );
          
          const speed = Math.sqrt(newBall.vx * newBall.vx + newBall.vy * newBall.vy);
          
          if (distToHole < holeRadius - 5 && speed < 3) {
            newBall.vx = 0;
            newBall.vy = 0;
            setHoleComplete(true);
          }
        } else {
          newBall.vx = 0;
          newBall.vy = 0;
        }

        return newBall;
      });

      // Draw ball
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw aiming line when dragging
      if (isDragging) {
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(dragStart.x, dragStart.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw power indicator
        const power = Math.min(Math.sqrt(
          Math.pow(dragStart.x - ball.x, 2) + 
          Math.pow(dragStart.y - ball.y, 2)
        ) / 2, 100);
        
        ctx.fillStyle = power > 70 ? '#ff0000' : power > 40 ? '#ffaa00' : '#00ff00';
        ctx.fillRect(10, 10, power * 2, 20);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(10, 10, 200, 20);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial';
        ctx.fillText('POWER', 220, 25);
      }

      // Draw golf club cursor
      if (mousePos.x > 0 && mousePos.y > 0) {
        const dx = mousePos.x - ball.x;
        const dy = mousePos.y - ball.y;
        const angle = Math.atan2(dy, dx);
        
        ctx.save();
        ctx.translate(mousePos.x, mousePos.y);
        ctx.rotate(angle);
        
        // Club shaft (longer and thinner)
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-60, 0);
        ctx.stroke();
        
        // Club head (putter style - flat face)
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(-70, -12, 12, 24);
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 1;
        ctx.strokeRect(-70, -12, 12, 24);
        
        // Grip (wrapped grip look)
        ctx.fillStyle = '#000';
        ctx.fillRect(0, -2, 15, 4);
        
        // Grip details
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(i * 3, -2);
          ctx.lineTo(i * 3, 2);
          ctx.stroke();
        }
        
        ctx.restore();
      }

    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [ball, isDragging, dragStart, currentHoleData, windmillRotation, mousePos]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (Math.abs(ball.vx) < 0.1 && Math.abs(ball.vy) < 0.1) {
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    
    if (isDragging) {
      setDragStart({ x, y });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const dx = dragStart.x - ball.x;
      const dy = dragStart.y - ball.y;
      
      setBall(prev => ({
        ...prev,
        vx: -dx * 0.15,
        vy: -dy * 0.15
      }));
      
      setStrokes(prev => prev + 1);
      setIsDragging(false);
    }
  };

  const nextHole = () => {
    setTotalStrokes(prev => prev + strokes);
    if (currentHole < holes.length - 1) {
      setCurrentHole(prev => prev + 1);
      setBall({ x: holes[currentHole + 1].start.x, y: holes[currentHole + 1].start.y, vx: 0, vy: 0 });
      setStrokes(0);
      setHoleComplete(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetHole = () => {
    setBall({ x: currentHoleData.start.x, y: currentHoleData.start.y, vx: 0, vy: 0 });
    setStrokes(0);
    setHoleComplete(false);
  };

  const restartGame = () => {
    setCurrentHole(0);
    setBall({ x: holes[0].start.x, y: holes[0].start.y, vx: 0, vy: 0 });
    setStrokes(0);
    setTotalStrokes(0);
    setGameComplete(false);
    setHoleComplete(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-sky-600 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-green-700" style={{ fontFamily: 'Arial Black, sans-serif' }}>
          🏌️ VINNY GOLF 🏌️
        </h1>
        
        <div className="flex justify-between items-center mb-4 text-lg font-bold">
          <div className="text-blue-600">HOLE: {currentHole + 1}/18</div>
          <div className="text-purple-600">STROKES: {strokes}</div>
          <div className="text-orange-600">TOTAL: {totalStrokes + strokes}</div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-4 border-green-800 rounded cursor-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        <div className="mt-4 text-center">
          <p className="text-gray-700 font-semibold mb-2">
            Click and drag the ball to aim, then release to shoot!
          </p>
          <button
            onClick={resetHole}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
          >
            <RotateCcw size={20} />
            Reset Hole
          </button>
        </div>

        {holeComplete && !gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 HOLE COMPLETE! 🎉</h2>
              <p className="text-xl mb-4">Strokes: {strokes}</p>
              <button
                onClick={nextHole}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded text-xl"
              >
                Next Hole →
              </button>
            </div>
          </div>
        )}

        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
              <h2 className="text-4xl font-bold text-yellow-600 mb-4">🏆 GAME COMPLETE! 🏆</h2>
              <p className="text-2xl mb-2">Total Strokes: {totalStrokes + strokes}</p>
              <p className="text-lg mb-4 text-gray-600">
                {totalStrokes + strokes <= 36 ? "⭐ AMAZING! UNDER PAR! ⭐" : 
                 totalStrokes + strokes <= 54 ? "🎯 GREAT JOB! 🎯" : 
                 totalStrokes + strokes <= 72 ? "👍 NICE ROUND! 👍" :
                 "🏌️ KEEP PRACTICING! 🏌️"}
              </p>
              <button
                onClick={restartGame}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded text-xl"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}