import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import type { EcoProblem } from '@/pages/Index';

interface AnalyticsProps {
  problems: EcoProblem[];
}

const Analytics = ({ problems }: AnalyticsProps) => {
  const typeStats = {
    air: problems.filter(p => p.type === 'air').length,
    water: problems.filter(p => p.type === 'water').length,
    waste: problems.filter(p => p.type === 'waste').length,
    noise: problems.filter(p => p.type === 'noise').length,
  };

  const statusStats = {
    new: problems.filter(p => p.status === 'new').length,
    in_progress: problems.filter(p => p.status === 'in_progress').length,
    resolved: problems.filter(p => p.status === 'resolved').length,
  };

  const priorityStats = {
    critical: problems.filter(p => p.priority === 'critical').length,
    high: problems.filter(p => p.priority === 'high').length,
    medium: problems.filter(p => p.priority === 'medium').length,
    low: problems.filter(p => p.priority === 'low').length,
  };

  const total = problems.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Icon name="Wind" size={18} className="text-[hsl(var(--eco-green))]" />
              Воздух
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeStats.air}</div>
            <Progress value={(typeStats.air / total) * 100} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {((typeStats.air / total) * 100).toFixed(0)}% от общего числа
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Icon name="Droplet" size={18} className="text-[hsl(var(--eco-water))]" />
              Вода
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeStats.water}</div>
            <Progress value={(typeStats.water / total) * 100} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {((typeStats.water / total) * 100).toFixed(0)}% от общего числа
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Icon name="Trash2" size={18} className="text-[hsl(var(--eco-warning))]" />
              Отходы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeStats.waste}</div>
            <Progress value={(typeStats.waste / total) * 100} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {((typeStats.waste / total) * 100).toFixed(0)}% от общего числа
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Icon name="Volume2" size={18} className="text-[hsl(var(--eco-danger))]" />
              Шум
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{typeStats.noise}</div>
            <Progress value={(typeStats.noise / total) * 100} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {((typeStats.noise / total) * 100).toFixed(0)}% от общего числа
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Activity" size={20} />
              Статус проблем
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Новые</span>
                <span className="text-sm font-bold text-destructive">{statusStats.new}</span>
              </div>
              <Progress value={(statusStats.new / total) * 100} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">В работе</span>
                <span className="text-sm font-bold text-primary">{statusStats.in_progress}</span>
              </div>
              <Progress value={(statusStats.in_progress / total) * 100} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Решено</span>
                <span className="text-sm font-bold text-secondary">{statusStats.resolved}</span>
              </div>
              <Progress value={(statusStats.resolved / total) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={20} />
              Приоритет проблем
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Критический</span>
                <span className="text-sm font-bold text-destructive">{priorityStats.critical}</span>
              </div>
              <Progress value={(priorityStats.critical / total) * 100} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Высокий</span>
                <span className="text-sm font-bold text-[hsl(var(--eco-warning))]">{priorityStats.high}</span>
              </div>
              <Progress value={(priorityStats.high / total) * 100} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Средний</span>
                <span className="text-sm font-bold text-primary">{priorityStats.medium}</span>
              </div>
              <Progress value={(priorityStats.medium / total) * 100} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Низкий</span>
                <span className="text-sm font-bold text-muted-foreground">{priorityStats.low}</span>
              </div>
              <Progress value={(priorityStats.low / total) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Динамика за неделю
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end justify-between gap-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
              const height = 40 + Math.random() * 60;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary/20 hover:bg-primary/40 rounded-t transition-all cursor-pointer relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.floor(height / 10)}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
