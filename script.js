// Script avançado para controle de apresentação com animações industriais
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurações globais
    const config = {
        totalSlides: 7,
        animationDuration: 600,
        autoProgressBars: true,
        industrialEffects: true
    };
    
    // Estado da aplicação
    const state = {
        currentSlide: 0,
        isAnimating: false,
        timers: {},
        sequences: {},
        quality: {
            testsRunning: false,
            currentTest: 0
        }
    };
    
    // Elementos DOM
    const elements = {
        slides: document.querySelectorAll('.slide'),
        nextBtns: document.querySelectorAll('.next-btn'),
        prevBtns: document.querySelectorAll('.prev-btn'),
        progressFill: document.querySelector('.progress-fill'),
        currentSlideSpan: document.querySelector('.current-slide'),
        productionMetrics: document.querySelectorAll('.metric-value'),
        kpiValues: document.querySelectorAll('.kpi-value'),
        efficiencyValue: document.querySelector('.efficiency-value')
    };
    
    // Inicialização
    init();
    
    function init() {
        setupEventListeners();
        initializeAnimations();
        startProductionSimulation();
        updateProgress();
        
        // Animar métricas na inicialização
        setTimeout(() => animateMetrics(), 1000);
    }
    
    // Event Listeners
    function setupEventListeners() {
        elements.nextBtns.forEach(btn => {
            btn.addEventListener('click', () => nextSlide());
        });
        
        elements.prevBtns.forEach(btn => {
            btn.addEventListener('click', () => prevSlide());
        });
        
        // Navegação por teclado
        document.addEventListener('keydown', handleKeyNavigation);
        
        // Resize observer para responsividade
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });
        resizeObserver.observe(document.body);
    }
    
    function handleKeyNavigation(e) {
        if (state.isAnimating) return;
        
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(config.totalSlides - 1);
                break;
        }
    }
    
    function handleResize() {
        // Ajustar animações para diferentes tamanhos de tela
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            adjustMobileAnimations();
        }
    }
    
    function adjustMobileAnimations() {
        // Implementar ajustes para mobile
        console.log('Ajustando animações para mobile');
    }
    
    // Navegação entre slides
    function nextSlide() {
        if (state.isAnimating) return;
        
        const next = state.currentSlide + 1;
        if (next < config.totalSlides) {
            goToSlide(next);
        }
    }
    
    function prevSlide() {
        if (state.isAnimating) return;
        
        const prev = state.currentSlide - 1;
        if (prev >= 0) {
            goToSlide(prev);
        }
    }
    
    function goToSlide(index) {
        if (state.isAnimating || index === state.currentSlide) return;
        
        state.isAnimating = true;
        
        // Ocultar slide atual
        const currentSlideEl = elements.slides[state.currentSlide];
        currentSlideEl.classList.remove('active');
        
        // Mostrar novo slide
        const newSlideEl = elements.slides[index];
        
        setTimeout(() => {
            newSlideEl.classList.add('active');
            state.currentSlide = index;
            
            // Executar animações específicas do slide
            executeSlideAnimations(index);
            
            // Atualizar progresso
            updateProgress();
            
            setTimeout(() => {
                state.isAnimating = false;
            }, config.animationDuration);
            
        }, config.animationDuration / 2);
    }
    
    // Função para atualizar progresso
    function updateProgress() {
        const progress = ((state.currentSlide + 1) / config.totalSlides) * 100;
        if (elements.progressFill) {
            elements.progressFill.style.width = progress + '%';
        }
        if (elements.currentSlideSpan) {
            elements.currentSlideSpan.textContent = state.currentSlide + 1;
        }
    }
    
    // Função para inicializar animações
    function initializeAnimations() {
        // Configurar animações iniciais
        console.log('Inicializando animações');
    }
    
    // Função para simular produção
    function startProductionSimulation() {
        // Atualizar eficiência em tempo real
        if (elements.efficiencyValue) {
            setInterval(() => {
                const efficiency = 95 + Math.floor(Math.random() * 5);
                elements.efficiencyValue.textContent = efficiency + '%';
            }, 3000);
        }
    }
    
    // Animações específicas por slide
    function executeSlideAnimations(slideIndex) {
        switch(slideIndex) {
            case 0:
                animateHeroSection();
                break;
            case 1:
                animateBOMTable();
                animateInventoryCards();
                break;
            case 2:
                // Sequenciamento será iniciado pelo usuário
                break;
            case 3:
                // Timeline será iniciada pelo usuário
                animateKPIs();
                break;
            case 4:
                animateQualityCheckpoints();
                // CORREÇÃO: Animar métricas de qualidade automaticamente
                setTimeout(() => animateQualityMetrics(), 1000);
                break;
            case 5:
                animateIntegrationDiagram();
                animateBenefitBars();
                break;
            case 6:
                animateScheduleCards();
                break;
        }
    }
    
    // Animações do Hero Section
    function animateHeroSection() {
        animateMetrics();
        
        // Animar robot
        const robot = document.querySelector('.robot-body i');
        if (robot) {
            robot.style.animation = 'none';
            setTimeout(() => {
                robot.style.animation = 'float 3s ease-in-out infinite';
            }, 100);
        }
    }
    
    // Animar métricas de produção
    function animateMetrics() {
        elements.productionMetrics.forEach((metric, index) => {
            const target = parseInt(metric.dataset.target) || 0;
            animateCounter(metric, target, 1500 + (index * 200));
        });
    }
    
    // NOVA FUNÇÃO: Animar métricas de qualidade
    function animateQualityMetrics() {
        console.log('Iniciando animação das métricas de qualidade');
        
        // Selecionar todos os elementos de métricas de qualidade
        const qualityMetrics = [
            { element: document.getElementById('approval-rate'), target: 96.5, suffix: '%' },
            { element: document.getElementById('defects-ppm'), target: 340, suffix: ' DPM' },
            { element: document.getElementById('rework-rate'), target: 2.1, suffix: '%' }
        ];
        
        qualityMetrics.forEach((metric, index) => {
            if (metric.element) {
                console.log(`Animando métrica: ${metric.element.id}`);
                
                setTimeout(() => {
                    // Animar contador
                    animateCounterWithDecimals(metric.element, metric.target, 1500, metric.suffix);
                }, index * 300);
            } else {
                console.warn(`Elemento não encontrado: ${metric.element}`);
            }
        });
    }
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOutCubic);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // NOVA FUNÇÃO: Contador com decimais para métricas de qualidade
    function animateCounterWithDecimals(element, target, duration, suffix = '') {
        let start = 0;
        const startTime = performance.now();
        const hasDecimals = target % 1 !== 0;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * easeOutCubic;
            
            // Formatação baseada no tipo de valor
            let displayValue;
            if (hasDecimals) {
                displayValue = current.toFixed(1);
            } else {
                displayValue = Math.floor(current).toString();
            }
            
            element.textContent = displayValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Animações da tabela BOM
    function animateBOMTable() {
        const bomItems = document.querySelectorAll('.bom-item');
        bomItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 50);
            }, index * 100);
        });
    }
    
    // Animar cards de inventário
    function animateInventoryCards() {
        const progressBars = document.querySelectorAll('.inventory-card .progress');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            }, 500 + (index * 200));
        });
    }
    
    // Animação de sequenciamento
    window.startSequenceAnimation = function() {
        const steps = document.querySelectorAll('.flow-step');
        
        // Reset
        steps.forEach(step => step.classList.remove('active'));
        
        // Animar cada step
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
                
                // Efeito sonoro visual
                createProductionEffect(step);
            }, index * 800);
        });
    };
    
    window.resetSequence = function() {
        const steps = document.querySelectorAll('.flow-step');
        steps.forEach(step => step.classList.remove('active'));
    };
    
    // Animação da timeline
    window.startTimelineSimulation = function() {
        const tasks = document.querySelectorAll('.gantt-task');
        
        tasks.forEach((task, index) => {
            setTimeout(() => {
                const progress = task.querySelector('.task-progress');
                const duration = parseInt(task.dataset.duration) || 10;
                
                // Animar progresso da task
                let currentProgress = 0;
                const interval = setInterval(() => {
                    currentProgress += 2;
                    progress.style.width = Math.min(currentProgress, 100) + '%';
                    
                    if (currentProgress >= 100) {
                        clearInterval(interval);
                    }
                }, 100);
                
            }, index * 200);
        });
        
        // Animar KPIs simultaneamente
        animateKPIs();
    };
    
    window.pauseTimeline = function() {
        // Pausar todas as animações de timeline
        const progresses = document.querySelectorAll('.task-progress');
        progresses.forEach(progress => {
            progress.style.animationPlayState = 'paused';
        });
    };
    
    // Animar KPIs
    function animateKPIs() {
        const kpis = [
            { element: document.getElementById('efficiency-kpi'), target: 94, suffix: '%' },
            { element: document.getElementById('quality-kpi'), target: 97, suffix: '%' },
            { element: document.getElementById('throughput-kpi'), target: 15, suffix: '' },
            { element: document.getElementById('cycle-time-kpi'), target: 58, suffix: 'min' }
        ];
        
        kpis.forEach((kpi, index) => {
            if (kpi.element) {
                setTimeout(() => {
                    animateCounter(kpi.element, kpi.target, 1000);
                    // Adicionar suffix após animação
                    setTimeout(() => {
                        if (kpi.suffix && !kpi.element.textContent.includes(kpi.suffix)) {
                            kpi.element.textContent += kpi.suffix;
                        }
                    }, 1100);
                }, index * 200);
            }
        });
    }
    
    // Animações de qualidade
    function animateQualityCheckpoints() {
        const checkpoints = document.querySelectorAll('.checkpoint');
        
        checkpoints.forEach((checkpoint, index) => {
            setTimeout(() => {
                checkpoint.classList.add('active');
                
                // Atualizar status
                const status = checkpoint.querySelector('.checkpoint-status');
                if (index === 0) {
                    status.textContent = 'PASS';
                    status.className = 'checkpoint-status passed';
                }
            }, index * 600);
        });
    }
    
    window.startQualityTests = function() {
        if (state.quality.testsRunning) return;
        
        state.quality.testsRunning = true;
        state.quality.currentTest = 0;
        
        const testItems = document.querySelectorAll('.test-item');
        
        function runNextTest() {
            if (state.quality.currentTest >= testItems.length) {
                state.quality.testsRunning = false;
                
                // Atualizar métricas após os testes
                setTimeout(() => {
                    animateQualityMetrics();
                }, 500);
                
                return;
            }
            
            const currentTest = testItems[state.quality.currentTest];
            const progress = currentTest.querySelector('.progress');
            const result = currentTest.querySelector('.test-result');
            
            // Reset
            progress.style.width = '0%';
            result.textContent = '🔄';
            result.className = 'test-result testing';
            
            // Animar progresso
            let progressValue = 0;
            const interval = setInterval(() => {
                progressValue += 5;
                progress.style.width = progressValue + '%';
                
                if (progressValue >= 100) {
                    clearInterval(interval);
                    
                    // Resultado do teste
                    setTimeout(() => {
                        const success = Math.random() > 0.2; // 80% de sucesso
                        result.textContent = success ? '✅' : '❌';
                        result.className = success ? 'test-result pass' : 'test-result fail';
                        
                        state.quality.currentTest++;
                        setTimeout(runNextTest, 500);
                    }, 200);
                }
            }, 100);
        }
        
        runNextTest();
    };
    
    window.generateQualityReport = function() {
        alert('📊 Relatório de qualidade gerado com sucesso!\n\nResumo:\n- Testes executados: 6\n- Taxa de aprovação: 96.5%\n- Defeitos por milhão: 340 DPM\n- Taxa de retrabalho: 2.1%\n- Tempo total: 2.5 min');
    };
    
    window.exportQualityData = function() {
        const data = {
            timestamp: new Date().toISOString(),
            metrics: {
                approvalRate: 96.5,
                defectsPerMillion: 340,
                reworkRate: 2.1
            },
            tests: [
                { name: 'Continuidade dos Circuitos', result: 'PASS', value: 100 },
                { name: 'Tensão da Bateria', result: 'PASS', value: 85 },
                { name: 'Consumo de Corrente', result: 'PENDING', value: 0 },
                { name: 'Movimento das Rodas', result: 'PASS', value: 100 },
                { name: 'Alinhamento do Chassi', result: 'PASS', value: 92 },
                { name: 'Fixação dos Componentes', result: 'PASS', value: 78 }
            ]
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quality_report.json';
        a.click();
        URL.revokeObjectURL(url);
    };
    
    // Animação do diagrama de integração
    function animateIntegrationDiagram() {
        const layers = document.querySelectorAll('.system-layer');
        
        layers.forEach((layer, index) => {
            layer.style.opacity = '0';
            layer.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                layer.style.transition = 'all 0.5s ease';
                layer.style.opacity = '1';
                layer.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
    
    // Animar barras de benefícios
    function animateBenefitBars() {
        const benefitBars = document.querySelectorAll('.benefit-progress');
        
        benefitBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            }, 1000 + (index * 200));
        });
    }
    
    // Animar cards de agendamento
    function animateScheduleCards() {
        const cards = document.querySelectorAll('.schedule-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 150);
        });
    }
    
    // Efeitos de produção
    function createProductionEffect(element) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #3182ce, transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: productionPulse 1s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(effect);
        
        // Remover após animação
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1000);
    }
    
    // Função para mostrar detalhes de localização
    window.showLocationDetails = function() {
        alert('📍 Localização da Oficina:\n\n🏢 Edifício Principal\n📍 Sala 25 - 2º Andar\n\n🚶‍♂️ Como chegar:\n- Use o elevador principal\n- Vire à direita ao sair do elevador\n- A Sala 25 fica no final do corredor\n\n⏰ Lembre-se: Chegue 30 minutos antes!');
    };
    
    // Função para reiniciar apresentação
    window.restartPresentation = function() {
        goToSlide(0);
    };
    
    // Adicionar CSS para efeitos de produção
    const style = document.createElement('style');
    style.textContent = `
        @keyframes productionPulse {
            0% {
                width: 10px;
                height: 10px;
                opacity: 1;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
        
        @keyframes factoryHum {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
        }
        
        .factory-animation {
            animation: factoryHum 4s ease-in-out infinite;
        }
        
        .chart-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #718096;
            font-size: 0.875rem;
            background: linear-gradient(45deg, #f7fafc, #edf2f7);
            height: 100%;
            border-radius: 8px;
        }
    `;
    
    document.head.appendChild(style);
    
    // Log de inicialização
    console.log('🏭 Sistema PCP inicializado com sucesso!');
    console.log('📊 Métricas de produção ativas');
    console.log('🔧 Animações industriais carregadas');
    console.log('✅ Correção das métricas de qualidade implementada');
    
}); // Fechamento do DOMContentLoaded
