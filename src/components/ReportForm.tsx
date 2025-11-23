import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const ReportForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    address: '',
    reporter: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Отчет отправлен",
      description: "Ваше сообщение о проблеме зарегистрировано. Номер обращения: #" + Math.floor(Math.random() * 10000),
    });
    setFormData({
      type: '',
      title: '',
      description: '',
      address: '',
      reporter: '',
    });
  };

  const typeOptions = [
    { value: 'air', label: 'Загрязнение воздуха', icon: 'Wind' },
    { value: 'water', label: 'Загрязнение воды', icon: 'Droplet' },
    { value: 'waste', label: 'Отходы и мусор', icon: 'Trash2' },
    { value: 'noise', label: 'Шумовое загрязнение', icon: 'Volume2' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileText" size={24} />
            Сообщить о проблеме
          </CardTitle>
          <CardDescription>
            Заполните форму, чтобы сообщить о выявленной экологической проблеме
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Тип проблемы *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Выберите тип проблемы" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Icon name={option.icon as any} size={16} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Заголовок *</Label>
              <Input
                id="title"
                placeholder="Краткое описание проблемы"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                placeholder="Подробное описание проблемы, дата обнаружения, последствия..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адрес или местоположение *</Label>
              <Input
                id="address"
                placeholder="Улица, дом или описание местности"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporter">Ваше имя (необязательно)</Label>
              <Input
                id="reporter"
                placeholder="Имя для обратной связи"
                value={formData.reporter}
                onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 gap-2">
                <Icon name="Send" size={18} />
                Отправить отчет
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ type: '', title: '', description: '', address: '', reporter: '' })}
              >
                Очистить
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Рекомендации по отчету</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <Icon name="CheckCircle2" size={16} className="shrink-0 mt-0.5 text-secondary" />
            <p>Укажите точное местоположение проблемы для быстрого реагирования</p>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="CheckCircle2" size={16} className="shrink-0 mt-0.5 text-secondary" />
            <p>Опишите масштаб проблемы и возможные риски для здоровья</p>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="CheckCircle2" size={16} className="shrink-0 mt-0.5 text-secondary" />
            <p>При наличии фотографий, сохраните их для последующей отправки</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportForm;
