import { CircleCheck, Circle, Clock, Plus, Trash2, Calendar } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";

interface Activity {
    id: string;
    title: string;
    time: string;
    completed: boolean;
}

interface DayActivities {
    date: string;
    dayName: string;
    activities: Activity[];
}

export function Activities() {
    const [activities, setActivities] = useState<DayActivities[]>([
        {
            date: "17",
            dayName: "Sábado",
            activities: []
        },
        {
            date: "18",
            dayName: "Domingo",
            activities: [
                {
                    id: "1",
                    title: "Academia em teste",
                    time: "08:00",
                    completed: true
                },
                {
                    id: "2",
                    title: "Fazer Exercícios",
                    time: "18:00",
                    completed: false
                }
            ]
        },
        {
            date: "19",
            dayName: "Segunda",
            activities: []
        }
    ]);

    const [newActivity, setNewActivity] = useState("");
    const [newTime, setNewTime] = useState("");
    const [showAddForm, setShowAddForm] = useState<string | null>(null);

    const toggleActivity = (dateIndex: number, activityId: string) => {
        setActivities(prev => {
            const newActivities = [...prev];
            const dayActivities = newActivities[dateIndex];
            const activityIndex = dayActivities.activities.findIndex(a => a.id === activityId);

            if (activityIndex !== -1) {
                dayActivities.activities[activityIndex].completed =
                    !dayActivities.activities[activityIndex].completed;
            }

            return newActivities;
        });
    };

    const deleteActivity = (dateIndex: number, activityId: string) => {
        if (confirm("Remover esta atividade?")) {
            setActivities(prev => {
                const newActivities = [...prev];
                newActivities[dateIndex].activities =
                    newActivities[dateIndex].activities.filter(a => a.id !== activityId);
                return newActivities;
            });
        }
    };

    const addActivity = (dateIndex: number) => {
        if (!newActivity.trim() || !newTime.trim()) return;

        const newActivityObj: Activity = {
            id: crypto.randomUUID(),
            title: newActivity.trim(),
            time: newTime.trim(),
            completed: false
        };

        setActivities(prev => {
            const newActivities = [...prev];
            newActivities[dateIndex].activities = [
                ...newActivities[dateIndex].activities,
                newActivityObj
            ];
            return newActivities;
        });

        setNewActivity("");
        setNewTime("");
        setShowAddForm(null);
    };

    const getActivityStats = () => {
        const total = activities.reduce((acc, day) => acc + day.activities.length, 0);
        const completed = activities.reduce((acc, day) =>
            acc + day.activities.filter(a => a.completed).length, 0
        );
        return { total, completed };
    };

    const stats = getActivityStats();

    return (
        <div className="space-y-8">
            {/* Header com estatísticas */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Atividades</h2>
                    {stats.total > 0 && (
                        <p className="text-sm text-zinc-400 mt-1">
                            {stats.completed} de {stats.total} atividades concluídas
                            <span className="ml-2 text-xs text-zinc-500">
                                ({Math.round((stats.completed / stats.total) * 100)}%)
                            </span>
                        </p>
                    )}
                </div>

                {/* Barra de progresso */}
                {stats.total > 0 && (
                    <div className="w-full sm:w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-lime-400 rounded-full transition-all duration-500"
                            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Dias */}
            {activities.map((day, index) => (
                <div key={day.date} className="space-y-3">
                    {/* Cabeçalho do dia */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl font-semibold text-zinc-300">
                                Dia {day.date}
                            </span>
                            <span className="text-sm text-zinc-500">
                                {day.dayName}
                            </span>
                            {day.activities.length > 0 && (
                                <span className="text-xs text-zinc-600 ml-2">
                                    • {day.activities.length} atividade{day.activities.length !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>

                        {showAddForm !== day.date && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setShowAddForm(day.date)}
                            >
                                <Plus className="size-4" />
                                Adicionar
                            </Button>
                        )}
                    </div>

                    {/* Lista de atividades */}
                    {day.activities.length > 0 ? (
                        <div className="space-y-2">
                            {day.activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className={`group px-4 py-3 bg-zinc-800/80 rounded-xl shadow-lg border transition-all duration-300 flex items-center gap-3 ${
                                        activity.completed
                                            ? 'border-lime-400/20 bg-zinc-800/50'
                                            : 'border-zinc-700/50 hover:border-zinc-600'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleActivity(index, activity.id)}
                                        className="shrink-0 transition-transform hover:scale-110"
                                    >
                                        {activity.completed ? (
                                            <CircleCheck className="size-5 text-lime-400" />
                                        ) : (
                                            <Circle className="size-5 text-zinc-500 hover:text-zinc-400 transition-colors" />
                                        )}
                                    </button>

                                    <span className={`flex-1 text-sm transition-all ${
                                        activity.completed
                                            ? 'text-zinc-400 line-through'
                                            : 'text-zinc-100'
                                    }`}>
                                        {activity.title}
                                    </span>

                                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                                        <Clock className="size-3.5" />
                                        {activity.time}
                                    </span>

                                    <button
                                        onClick={() => deleteActivity(index, activity.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-red-400"
                                        aria-label="Remover atividade"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 bg-zinc-800/30 rounded-xl border border-dashed border-zinc-700/50">
                            <Calendar className="size-6 text-zinc-600 mx-auto mb-2" />
                            <p className="text-zinc-500 text-sm">
                                Nenhuma atividade cadastrada para este dia
                            </p>
                            <p className="text-xs text-zinc-600 mt-1">
                                Clique em "Adicionar" para planejar seu dia
                            </p>
                        </div>
                    )}

                    {/* Formulário de adicionar atividade */}
                    {showAddForm === day.date && (
                        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 space-y-3 animate-in slide-in-from-top-2">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    value={newActivity}
                                    onChange={(e) => setNewActivity(e.target.value)}
                                    placeholder="Nome da atividade"
                                    className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-lime-400/50 transition-colors"
                                    autoFocus
                                />
                                <input
                                    type="time"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full sm:w-32 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 outline-none focus:border-lime-400/50 transition-colors"
                                />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => {
                                        setShowAddForm(null);
                                        setNewActivity("");
                                        setNewTime("");
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => addActivity(index)}
                                    disabled={!newActivity.trim() || !newTime.trim()}
                                >
                                    <Plus className="size-4" />
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Footer com resumo */}
            {stats.total > 0 && (
                <div className="pt-4 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 text-center">
                        {stats.completed === stats.total && stats.total > 0
                            ? '🎉 Todas as atividades concluídas!'
                            : `${stats.total - stats.completed} atividade${stats.total - stats.completed !== 1 ? 's' : ''} pendente${stats.total - stats.completed !== 1 ? 's' : ''}`
                        }
                    </p>
                </div>
            )}
        </div>
    );
}
