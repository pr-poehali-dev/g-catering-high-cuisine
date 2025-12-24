import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Трюфельный крем-суп', description: 'С белыми трюфелями и хрустящими крутонами', price: 2500, category: 'Супы', image: '/placeholder.svg' },
  { id: 2, name: 'Мраморная говядина', description: 'Стейк из мраморной говядины с соусом демигляс', price: 4500, category: 'Горячее', image: '/placeholder.svg' },
  { id: 3, name: 'Лобстер термидор', description: 'Классическое французское блюдо с лобстером', price: 5800, category: 'Горячее', image: '/placeholder.svg' },
  { id: 4, name: 'Тартар из лосося', description: 'Свежий лосось с авокадо и икрой', price: 3200, category: 'Холодные закуски', image: '/placeholder.svg' },
  { id: 5, name: 'Фуа-гра', description: 'С карамелизированными грушами и портвейном', price: 4200, category: 'Холодные закуски', image: '/placeholder.svg' },
  { id: 6, name: 'Тирамису', description: 'Классический итальянский десерт', price: 1800, category: 'Десерты', image: '/placeholder.svg' },
];

const services = [
  { title: 'Корпоративные мероприятия', description: 'Организация банкетов и фуршетов для бизнес-событий', icon: 'Briefcase' },
  { title: 'Свадебные торжества', description: 'Создание незабываемой атмосферы в самый важный день', icon: 'Heart' },
  { title: 'Частные вечера', description: 'Камерные ужины и приёмы для узкого круга гостей', icon: 'Users' },
  { title: 'Выездное обслуживание', description: 'Доставка и сервировка на вашей площадке', icon: 'Truck' },
];

const portfolio = [
  { title: 'Свадьба в усадьбе', guests: 150, image: '/placeholder.svg' },
  { title: 'Корпоратив IT-компании', guests: 300, image: '/placeholder.svg' },
  { title: 'Юбилей 50 лет', guests: 80, image: '/placeholder.svg' },
  { title: 'Деловой ужин', guests: 40, image: '/placeholder.svg' },
];

const reviews = [
  { name: 'Анна Петрова', text: 'Организовывали корпоратив на 200 человек. Всё прошло безупречно! Гости в восторге от качества блюд и сервиса.', rating: 5 },
  { name: 'Михаил Соколов', text: 'G-catering сделали нашу свадьбу волшебной. Каждое блюдо — произведение искусства. Спасибо!', rating: 5 },
  { name: 'Елена Волкова', text: 'Высочайший уровень! Обращаемся уже третий раз. Профессионализм на каждом этапе.', rating: 5 },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['Все', 'Холодные закуски', 'Супы', 'Горячее', 'Десерты'];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredMenu = selectedCategory === 'Все' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-marble">
      {/* Header */}
      <header className="bg-graphite text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold">
            <span className="text-gold">G</span>-catering
          </h1>
          <nav className="hidden md:flex gap-8">
            {['Главная', 'Меню', 'Услуги', 'Портфолио', 'О нас', 'Отзывы', 'Контакты'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gold transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <Button 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className="bg-gold hover:bg-gold/90 text-graphite font-semibold relative"
          >
            <Icon name="ShoppingCart" className="mr-2" size={20} />
            Корзина
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">{cart.length}</Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="главная" className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-graphite to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h2 className="text-6xl font-serif font-bold mb-6">
            Высокая кухня <span className="text-gold">для избранных</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Аристократичная нота высокого обслуживания, первоклассная подача блюд и необычный подход к каждому мероприятию
          </p>
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-graphite font-semibold text-lg px-8">
            <Icon name="ChefHat" className="mr-2" size={24} />
            Заказать кейтеринг
          </Button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="меню" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold text-center mb-4">Наше <span className="text-gold">Меню</span></h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Изысканные блюда от шеф-повара</p>
          
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={selectedCategory === cat ? 'bg-gold hover:bg-gold/90 text-graphite' : 'border-gold text-gold hover:bg-gold/10'}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map(item => (
              <Card key={item.id} className="hover:shadow-2xl transition-shadow animate-scale-in overflow-hidden border-2 border-gold/20">
                <div className="h-48 bg-gradient-to-br from-gold/20 to-gray-100 flex items-center justify-center">
                  <Icon name="ChefHat" size={64} className="text-gold/40" />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">{item.name}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gold">{item.price} ₽</span>
                    <Button onClick={() => addToCart(item)} className="bg-gold hover:bg-gold/90 text-graphite">
                      <Icon name="Plus" className="mr-2" size={18} />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="услуги" className="py-20 bg-marble">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold text-center mb-4">Наши <span className="text-gold">Услуги</span></h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Полный спектр кейтеринговых услуг</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map(service => (
              <Card key={service.title} className="text-center hover:shadow-xl transition-shadow border-2 border-gold/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} size={32} className="text-gold" />
                  </div>
                  <CardTitle className="font-serif text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="портфолио" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold text-center mb-4">Наши <span className="text-gold">Работы</span></h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Реализованные мероприятия</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map(item => (
              <Card key={item.title} className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-gold/20">
                <div className="h-48 bg-gradient-to-br from-gold/30 to-gray-200 flex items-center justify-center">
                  <Icon name="Camera" size={48} className="text-gold/50" />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 flex items-center">
                    <Icon name="Users" size={16} className="mr-2 text-gold" />
                    {item.guests} гостей
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="о нас" className="py-20 bg-graphite text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-serif font-bold mb-6"><span className="text-gold">О</span> компании</h2>
            <p className="text-xl leading-relaxed mb-6">
              G-catering — это команда профессионалов с более чем 15-летним опытом в области высокой кухни и организации премиальных мероприятий.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              Мы создаём незабываемые кулинарные впечатления, сочетая классические традиции французской кухни с современными гастрономическими трендами. Каждое блюдо — это произведение искусства, созданное нашими шеф-поварами с особым вниманием к деталям и качеству ингредиентов.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="отзывы" className="py-20 bg-marble">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold text-center mb-4"><span className="text-gold">Отзывы</span> клиентов</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Что говорят о нас</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map(review => (
              <Card key={review.name} className="border-2 border-gold/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <CardTitle className="font-serif text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="контакты" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-serif font-bold text-center mb-4"><span className="text-gold">Связаться</span> с нами</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Оставьте заявку и мы свяжемся с вами</p>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-gold/20">
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div>
                    <label className="block mb-2 font-semibold">Ваше имя</label>
                    <Input placeholder="Иван Иванов" className="border-gold/30" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Телефон</label>
                    <Input placeholder="+7 (999) 123-45-67" className="border-gold/30" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Email</label>
                    <Input type="email" placeholder="your@email.ru" className="border-gold/30" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Сообщение</label>
                    <Textarea placeholder="Расскажите о вашем мероприятии" rows={4} className="border-gold/30" />
                  </div>
                  <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-graphite font-semibold text-lg">
                    <Icon name="Send" className="mr-2" size={20} />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Icon name="Phone" size={32} className="text-gold mx-auto mb-2" />
                <p className="font-semibold">Телефон</p>
                <p className="text-gray-600">+7 (495) 123-45-67</p>
              </div>
              <div>
                <Icon name="Mail" size={32} className="text-gold mx-auto mb-2" />
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">info@g-catering.ru</p>
              </div>
              <div>
                <Icon name="MapPin" size={32} className="text-gold mx-auto mb-2" />
                <p className="font-semibold">Адрес</p>
                <p className="text-gray-600">Москва, ул. Примерная, 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-graphite text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">
            <span className="text-gold">G</span>-catering
          </h3>
          <p className="text-gray-400 mb-6">Высокая кухня для избранных</p>
          <div className="flex justify-center gap-6 mb-6">
            <Icon name="Instagram" size={24} className="text-gold cursor-pointer hover:text-gold/80" />
            <Icon name="Facebook" size={24} className="text-gold cursor-pointer hover:text-gold/80" />
            <Icon name="Twitter" size={24} className="text-gold cursor-pointer hover:text-gold/80" />
          </div>
          <p className="text-gray-500 text-sm">© 2024 G-catering. Все права защищены.</p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in" onClick={() => setIsCartOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold">Корзина</h3>
              <Button variant="ghost" onClick={() => setIsCartOpen(false)}>
                <Icon name="X" size={24} />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={64} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{item.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-gold font-bold">{item.price} ₽</span>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold">Итого:</span>
                    <span className="text-2xl font-bold text-gold">{totalAmount.toLocaleString()} ₽</span>
                  </div>
                  <Button className="w-full bg-gold hover:bg-gold/90 text-graphite font-semibold text-lg">
                    <Icon name="Check" className="mr-2" size={20} />
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}