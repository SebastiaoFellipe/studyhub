import PomodoroTimer from "../components/Pomodoro/PomodoroTimer";
import TaskManager from "../components/Pomodoro/TaskManager";

const Pomodoro = () => {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="lg:sticky lg:top-8">
                    <PomodoroTimer />
                </div>
                <div className="min-h-[60vh]">
                    <TaskManager />
                </div>
            </div>
        </div>
    );
};

export default Pomodoro;
