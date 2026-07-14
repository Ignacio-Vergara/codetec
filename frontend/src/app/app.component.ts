// ============================================
// CODETEC - Componente Principal
// ============================================

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Codetec';
  
  @ViewChild('particlesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('particlesContainer') containerRef!: ElementRef<HTMLDivElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: any = null;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCanvas();
      this.createParticles(120);
      this.animate();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    this.ctx = canvas.getContext('2d')!;
  }

  createParticles(count: number): void {
    const canvas = this.canvasRef.nativeElement;
    this.particles = [];
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.3
      });
    }
  }

  animate(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        p.x += dx * force * 0.02;
        p.y += dy * force * 0.02;
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
      
      if (p.radius > 1.5) {
        ctx.shadowColor = 'rgba(0, 184, 148, 0.3)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
    
    // Líneas entre partículas
    const maxDistance = 150;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance);
          
          const gradient = ctx.createLinearGradient(
            this.particles[i].x, this.particles[i].y,
            this.particles[j].x, this.particles[j].y
          );
          
          const alpha = opacity * 0.6;
          gradient.addColorStop(0, `rgba(0, 184, 148, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha * 1.2})`);
          gradient.addColorStop(1, `rgba(0, 184, 148, ${alpha})`);
          
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8 + opacity * 0.8;
          ctx.stroke();
        }
      }
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  @HostListener('window:resize')
  onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;
    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
}