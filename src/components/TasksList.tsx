import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import type { EcoProblem } from '@/pages/Index';

interface TasksListProps {
  problems: EcoProblem[];
}

const TasksList = ({ problems }: TasksListProps) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProblems = problems.filter((problem) => {
    const typeMatch = filterType === 'all' || problem.type === filterType;
    const statusMatch = filterStatus === 'all' || problem.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const typeConfig = {
    air: { color: 'bg-[hsl(var(--eco-green))]', icon: 'Wind', label: 'Воздух' },
    water: { color: 'bg-[hsl(var(--eco-water))]', icon: 'Droplet', label: 'Вода' },
    waste: { color: 'bg-[hsl(var(--eco-warning))]', icon: 'Trash2', label: 'Отходы' },
    noise: { color: 'bg-[hsl(var(--eco-danger))]', icon: 'Volume2', label: 'Шум' },
  };

  const statusLabels = {
    new: 'Новая',
    in_progress: 'В работе',
    resolved: 'Решена',
  };

  const priorityVariants = {
    critical: 'destructive',
    high: 'default',
    medium: 'secondary',
    low: 'outline',
  } as const;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Icon name="ListChecks" size={24} />
              Список задач
            </CardTitle>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Тип проблемы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="air">Воздух</SelectItem>
                  <SelectItem value="water">Вода</SelectItem>
                  <SelectItem value="waste">Отходы</SelectItem>
                  <SelectItem value="noise">Шум</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="resolved">Решенные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="SearchX" size={48} className="mx-auto mb-2 opacity-50" />
                <p>Задачи не найдены</p>
              </div>
            ) : (
              filteredProblems.map((problem) => {
                const config = typeConfig[problem.type];
                return (
                  <Card key={problem.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center shrink-0`}>
                          <Icon name={config.icon as any} size={20} className="text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold line-clamp-1">{problem.title}</h4>
                            <Badge variant={priorityVariants[problem.priority]} className="shrink-0">
                              {problem.priority}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {problem.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Icon name="Tag" size={14} />
                              {config.label}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Icon name="Calendar" size={14} />
                              {problem.date}
                            </div>
                            {problem.reporter && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Icon name="User" size={14} />
                                {problem.reporter}
                              </div>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {statusLabels[problem.status]}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Icon name="MapPin" size={16} />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">{problems.filter(p => p.status === 'new').length}</div>
              <p className="text-sm text-muted-foreground mt-1">Требуют внимания</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{problems.filter(p => p.status === 'in_progress').length}</div>
              <p className="text-sm text-muted-foreground mt-1">В процессе работы</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{problems.filter(p => p.status === 'resolved').length}</div>
              <p className="text-sm text-muted-foreground mt-1">Успешно решено</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksList;
