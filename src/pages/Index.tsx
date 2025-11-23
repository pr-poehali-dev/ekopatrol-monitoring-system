import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import EcoMap from '@/components/EcoMap';
import ReportForm from '@/components/ReportForm';
import TasksList from '@/components/TasksList';
import Analytics from '@/components/Analytics';

export interface EcoProblem {
  id: string;
  type: 'air' | 'water' | 'waste' | 'noise';
  title: string;
  description: string;
  lat: number;
  lng: number;
  status: 'new' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  reporter?: string;
}

const mockProblems: EcoProblem[] = [
  {
    id: '1',
    type: 'air',
    title: 'Выбросы от завода',
    description: 'Сильный запах химикатов в районе промзоны',
    lat: 55.755819,
    lng: 37.617644,
    status: 'new',
    priority: 'high',
    date: '2024-11-24',
    reporter: 'Иванов П.'
  },
  {
    id: '2',
    type: 'water',
    title: 'Загрязнение реки',
    description: 'Обнаружены масляные пятна на поверхности воды',
    lat: 55.745819,
    lng: 37.627644,
    status: 'in_progress',
    priority: 'critical',
    date: '2024-11-23',
    reporter: 'Смирнова А.'
  },
  {
    id: '3',
    type: 'waste',
    title: 'Несанкционированная свалка',
    description: 'Крупная свалка строительного мусора в лесопарке',
    lat: 55.765819,
    lng: 37.607644,
    status: 'new',
    priority: 'medium',
    date: '2024-11-24',
    reporter: 'Петров С.'
  },
  {
    id: '4',
    type: 'noise',
    title: 'Превышение уровня шума',
    description: 'Строительные работы в ночное время',
    lat: 55.750819,
    lng: 37.637644,
    status: 'resolved',
    priority: 'low',
    date: '2024-11-22',
    reporter: 'Козлова Е.'
  },
  {
    id: '5',
    type: 'air',
    title: 'Задымление территории',
    description: 'Горение мусора возле жилых домов',
    lat: 55.760819,
    lng: 37.617644,
    status: 'in_progress',
    priority: 'high',
    date: '2024-11-23',
    reporter: 'Волков Д.'
  }
];

const Index = () => {
  const [problems] = useState<EcoProblem[]>(mockProblems);
  const [activeTab, setActiveTab] = useState('map');

  const stats = {
    total: problems.length,
    new: problems.filter(p => p.status === 'new').length,
    inProgress: problems.filter(p => p.status === 'in_progress').length,
    resolved: problems.filter(p => p.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Icon name="Leaf" size={28} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ЭкоПатруль</h1>
                <p className="text-sm text-muted-foreground">Система мониторинга экологии</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <div className="text-xs text-muted-foreground">Всего</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{stats.new}</div>
                  <div className="text-xs text-muted-foreground">Новых</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{stats.resolved}</div>
                  <div className="text-xs text-muted-foreground">Решено</div>
                </div>
              </div>
              
              <Button className="gap-2">
                <Icon name="Plus" size={18} />
                <span className="hidden sm:inline">Сообщить о проблеме</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="map" className="gap-2">
              <Icon name="Map" size={18} />
              <span className="hidden sm:inline">Карта</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Icon name="BarChart3" size={18} />
              <span className="hidden sm:inline">Аналитика</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Icon name="FileText" size={18} />
              <span className="hidden sm:inline">Отчеты</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2">
              <Icon name="ListChecks" size={18} />
              <span className="hidden sm:inline">Задачи</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Карта экологических проблем
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EcoMap problems={problems} />
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Легенда</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--eco-water))]"></div>
                      <span className="text-sm">Загрязнение воды</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--eco-green))]"></div>
                      <span className="text-sm">Загрязнение воздуха</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--eco-warning))]"></div>
                      <span className="text-sm">Отходы и мусор</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--eco-danger))]"></div>
                      <span className="text-sm">Шумовое загрязнение</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Последние сообщения</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {problems.slice(0, 3).map(problem => (
                      <div key={problem.id} className="space-y-1 pb-3 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium line-clamp-1">{problem.title}</span>
                          <Badge variant={problem.priority === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                            {problem.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{problem.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics problems={problems} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportForm />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksList problems={problems} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
