import { useState, useEffect, useCallback } from 'react';
import { useUserStore } from '../../store/userStore';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const PomodoroTimer = () => {
    const { user, fetchUser } = useUserStore();
    const [mode, setMode] = useState('pomodoro'); // 'pomodoro', 'shortBreak', 'longBreak'
    const [timeRemaining, setTimeRemaining] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [cycles, setCycles] = useState(0);

    // Usa as configurações do usuário ou um valor padrão seguro
    const settings = user?.settings?.pomodoro || { longTime: 25, shortTime: 5, longBreak: 15 };

    useEffect(() => {
        // Busca os dados do usuário apenas se eles ainda não estiverem carregados.
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser]);

    const resetTimer = useCallback(() => {
        setIsActive(false);
        let newTime;
        switch (mode) {
            case 'pomodoro': newTime = settings.longTime * 60; break;
            case 'shortBreak': newTime = settings.shortTime * 60; break;
            case 'longBreak': newTime = settings.longBreak * 60; break;
            default: newTime = 25 * 60;
        }
        setTimeRemaining(newTime);
    }, [settings, mode]);

    // Reseta o timer sempre que o modo ou as configurações mudarem
    useEffect(() => {
        resetTimer();
    }, [resetTimer]);

    // Lógica principal do countdown
    useEffect(() => {
        let interval = null;
        if (isActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(time => time - 1);
            }, 1000);
        } else if (timeRemaining === 0 && isActive) {
            setIsActive(false);
            if (mode === 'pomodoro') {
                const newCycles = cycles + 1;
                setCycles(newCycles);
                setMode(newCycles > 0 && newCycles % 4 === 0 ? 'longBreak' : 'shortBreak');
            } else {
                setMode('pomodoro');
            }
            // new Audio('/path/to/notification.mp3').play(); // Alternativa ao alert
        }
        return () => clearInterval(interval);
    }, [isActive, timeRemaining, cycles, mode]);

    const toggleIsActive = () => setIsActive(!isActive);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    const modeStyle = {
        pomodoro: 'bg-[var(--color-dark)]',
        shortBreak: 'bg-[var(--color-dark)]',
        longBreak: 'bg-[var(--color-dark)]'
    };

    return (
        <div className={`p-8 rounded-lg shadow-xl text-white text-center transition-colors duration-500 ${modeStyle[mode]}`}>
            <div className="flex justify-center gap-4 mb-4">
                <button onClick={() => setMode('pomodoro')} className={`px-4 py-1 rounded ${mode === 'pomodoro' ? 'bg-white/30 font-bold' : ''}`}>Pomodoro</button>
                <button onClick={() => setMode('shortBreak')} className={`px-4 py-1 rounded ${mode === 'shortBreak' ? 'bg-white/30 font-bold' : ''}`}>Pausa Curta</button>
                <button onClick={() => setMode('longBreak')} className={`px-4 py-1 rounded ${mode === 'longBreak' ? 'bg-white/30 font-bold' : ''}`}>Pausa Longa</button>
            </div>
            <div className="text-8xl font-bold my-8" style={{fontVariantNumeric: 'tabular-nums'}}>
                {formatTime(timeRemaining)}
            </div>
            <div className="flex justify-center gap-6">
                <button onClick={toggleIsActive} className="text-4xl p-4 bg-white/20 rounded-full hover:bg-white/40 transition">
                    {isActive ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={resetTimer} className="text-4xl p-4 bg-white/20 rounded-full hover:bg-white/40 transition">
                    <FaRedo />
                </button>
            </div>
            <p className="mt-4">Ciclos completos: {cycles}</p>
        </div>
    );
};

export default PomodoroTimer;