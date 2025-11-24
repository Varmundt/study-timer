        let totalSeconds = 0;
        let remainingSeconds = 0;
        let interval = null;
        let isRunning = false;

        const display = document.getElementById('display');
        const hoursInput = document.getElementById('hours');
        const minutesInput = document.getElementById('minutes');
        const secondsInput = document.getElementById('seconds');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');

        function formatTime(secs) {
            const h = Math.floor(secs / 3600);
            const m = Math.floor((secs % 3600) / 60);
            const s = secs % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }

        function updateDisplay() {
            display.textContent = formatTime(remainingSeconds);
            
            if (remainingSeconds === 0 && isRunning) {
                display.classList.add('finished');
                stopTimer();
            }
        }

        function startTimer() {
            if (!isRunning && remainingSeconds === 0) {
                const h = parseInt(hoursInput.value) || 0;
                const m = parseInt(minutesInput.value) || 0;
                const s = parseInt(secondsInput.value) || 0;
                
                totalSeconds = h * 3600 + m * 60 + s;
                remainingSeconds = totalSeconds;

                if (totalSeconds === 0) {
                    alert('Por favor, defina um tempo válido!');
                    return;
                }
            }

            if (remainingSeconds > 0 && !isRunning) {
                isRunning = true;
                display.classList.remove('finished');
                
                interval = setInterval(() => {
                    remainingSeconds--;
                    updateDisplay();
                    
                    if (remainingSeconds === 0) {
                        stopTimer();
                        display.classList.add('finished');
                    }
                }, 1000);
            }
        }

        function pauseTimer() {
            if (isRunning) {
                isRunning = false;
                clearInterval(interval);
            }
        }

        function stopTimer() {
            isRunning = false;
            clearInterval(interval);
        }

        function resetTimer() {
            stopTimer();
            remainingSeconds = 0;
            display.classList.remove('finished');
            updateDisplay();
            hoursInput.value = 0;
            minutesInput.value = 0;
            secondsInput.value = 0;
        }

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);

        hoursInput.addEventListener('change', () => {
            if (!isRunning) updateDisplay();
        });
        minutesInput.addEventListener('change', () => {
            if (!isRunning) updateDisplay();
        });
        secondsInput.addEventListener('change', () => {
            if (!isRunning) updateDisplay();
        });