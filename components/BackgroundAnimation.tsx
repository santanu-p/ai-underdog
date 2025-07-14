import React, { useRef, useEffect } from 'react';

export const BackgroundAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: Infinity, y: Infinity });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        
        const handleMouseOut = () => {
            mouse.current.x = Infinity;
            mouse.current.y = Infinity;
        }
        document.addEventListener('mouseout', handleMouseOut);


        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
            }

            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

                this.x += this.speedX;
                this.y += this.speedY;
            }

            draw() {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'; // sky-400
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let particlesArray: Particle[] = [];
        const numberOfParticles = (canvas.height * canvas.width) / 9000;

        const init = () => {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 1.5 + 1;
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let speedX = (Math.random() - 0.5) * 0.5;
                let speedY = (Math.random() - 0.5) * 0.5;
                particlesArray.push(new Particle(x, y, size, speedX, speedY));
            }
        };

        init();

        const connect = () => {
            let opacityValue = 1;
            const connectionDistance = (canvas.width / 7) * (canvas.height / 7) / 100;
            
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        opacityValue = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue})`; // sky-400
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
            // Mouse connection
            for (let i = 0; i < particlesArray.length; i++) {
                let dx = particlesArray[i].x - mouse.current.x;
                let dy = particlesArray[i].y - mouse.current.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionDistance) {
                     opacityValue = 1 - (distance / connectionDistance);
                     ctx.strokeStyle = `rgba(168, 85, 247, ${opacityValue})`; // purple-500
                     ctx.lineWidth = 1;
                     ctx.beginPath();
                     ctx.moveTo(mouse.current.x, mouse.current.y);
                     ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
                     ctx.stroke();
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="background-canvas" className="fixed top-0 left-0 w-full h-full z-0" />;
};
