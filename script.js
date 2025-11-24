        let totalSeconds = 0;
        let endTime = null;
        let pausedTime = 0;
        let interval = null;
        let isRunning = false;
        let notificationShown = false;

        const display = document.getElementById('display');
        const hoursInput = document.getElementById('hours');
        const minutesInput = document.getElementById('minutes');
        const secondsInput = document.getElementById('seconds');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');

        // Solicitar permissão para notificações
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        function formatTime(secs) {
            const h = Math.floor(secs / 3600);
            const m = Math.floor((secs % 3600) / 60);
            const s = secs % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }

        function updateDisplay() {
            if (!isRunning) {
                display.textContent = formatTime(pausedTime);
                return;
            }

            const now = Date.now();
            const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
            
            display.textContent = formatTime(remaining);
            
            if (remaining === 0) {
                display.classList.add('finished');
                stopTimer();
                showNotification();
            }
        }

        function showNotification() {
            if (notificationShown) return;
            notificationShown = true;

            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Timer Finalizado! ⏰', {
                    body: 'Seu tempo de estudo terminou!',
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23000" width="100" height="100"/><circle cx="50" cy="50" r="35" fill="none" stroke="%23fff" stroke-width="4"/><line x1="50" y1="50" x2="50" y2="25" stroke="%23fff" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="50" x2="65" y2="50" stroke="%23fff" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="50" r="3" fill="%23fff"/></svg>',
                    requireInteraction: true
                });
            }
        }

        function startTimer() {
            if (!isRunning && pausedTime === 0) {
                const h = parseInt(hoursInput.value) || 0;
                const m = parseInt(minutesInput.value) || 0;
                const s = parseInt(secondsInput.value) || 0;
                
                totalSeconds = h * 3600 + m * 60 + s;
                pausedTime = totalSeconds;

                if (totalSeconds === 0) {
                    alert('Por favor, defina um tempo válido!');
                    return;
                }
            }

            if (pausedTime > 0 && !isRunning) {
                isRunning = true;
                notificationShown = false;
                display.classList.remove('finished');
                
                endTime = Date.now() + (pausedTime * 1000);
                
                interval = setInterval(updateDisplay, 100);
                updateDisplay();
            }
        }

        function pauseTimer() {
            if (isRunning) {
                isRunning = false;
                clearInterval(interval);
                
                const now = Date.now();
                pausedTime = Math.max(0, Math.ceil((endTime - now) / 1000));
                updateDisplay();
            }
        }

        function stopTimer() {
            isRunning = false;
            clearInterval(interval);
        }

        function resetTimer() {
            stopTimer();
            pausedTime = 0;
            endTime = null;
            notificationShown = false;
            display.classList.remove('finished');
            display.textContent = '00:00:00';
            hoursInput.value = 0;
            minutesInput.value = 0;
            secondsInput.value = 0;
        }

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);