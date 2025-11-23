import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { EcoProblem } from '@/pages/Index';

interface EcoMapProps {
  problems: EcoProblem[];
}

const typeConfig = {
  air: { color: 'bg-[hsl(var(--eco-green))]', icon: 'Wind', label: 'Воздух' },
  water: { color: 'bg-[hsl(var(--eco-water))]', icon: 'Droplet', label: 'Вода' },
  waste: { color: 'bg-[hsl(var(--eco-warning))]', icon: 'Trash2', label: 'Отходы' },
  noise: { color: 'bg-[hsl(var(--eco-danger))]', icon: 'Volume2', label: 'Шум' },
};

const EcoMap = ({ problems }: EcoMapProps) => {
  return (
    <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-muted/80">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-[400px]">
            {problems.map((problem, index) => {
              const config = typeConfig[problem.type];
              const top = 15 + (index * 18) % 70;
              const left = 10 + (index * 22) % 75;
              
              return (
                <div
                  key={problem.id}
                  className="absolute group animate-fade-in"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${config.color} ring-4 ring-background cursor-pointer transition-all hover:scale-125 hover:ring-8`}></div>
                  
                  <Card className="absolute z-10 w-64 p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-6 top-0 shadow-xl">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm line-clamp-2">{problem.title}</h4>
                        <Icon name={config.icon as any} size={16} className="shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{problem.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {config.label}
                        </Badge>
                        <Badge 
                          variant={problem.priority === 'critical' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {problem.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{problem.date}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-card/90 px-3 py-2 rounded-md backdrop-blur-sm">
          <Icon name="MapPin" size={14} className="inline mr-1" />
          Интерактивная карта города
        </div>
      </div>
    </div>
  );
};

export default EcoMap;
