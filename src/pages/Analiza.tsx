import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Calculator, TrendingUp, Users, DollarSign } from 'lucide-react';
import TopHeader from '../components/TopHeader';

interface CalculatorData {
  id: string;
  income: number;
  debt_amount: number;
  created_at: string;
}

interface IncomeRange {
  range: string;
  count: number;
  percentage: number;
}

const Analiza = () => {
  const [data, setData] = useState<CalculatorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    avgIncome: 0,
    avgDebt: 0,
    minIncome: 0,
    maxIncome: 0
  });
  const [incomeRanges, setIncomeRanges] = useState<IncomeRange[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: calculatorData, error } = await supabase
        .from('calculator_usage')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Błąd pobierania danych:', error);
        return;
      }

      setData(calculatorData || []);
      calculateStats(calculatorData || []);
      calculateIncomeRanges(calculatorData || []);
    } catch (error) {
      console.error('Błąd:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: CalculatorData[]) => {
    if (data.length === 0) return;

    const incomes = data.map(item => Number(item.income));
    const debts = data.map(item => Number(item.debt_amount));

    setStats({
      totalUsers: data.length,
      avgIncome: Math.round(incomes.reduce((a, b) => a + b, 0) / incomes.length),
      avgDebt: Math.round(debts.reduce((a, b) => a + b, 0) / debts.length),
      minIncome: Math.min(...incomes),
      maxIncome: Math.max(...incomes)
    });
  };

  const calculateIncomeRanges = (data: CalculatorData[]) => {
    const ranges = [
      { min: 0, max: 3000, label: 'Poniżej 3000 PLN' },
      { min: 3000, max: 4000, label: '3000-4000 PLN' },
      { min: 4000, max: 5000, label: '4000-5000 PLN' },
      { min: 5000, max: 6000, label: '5000-6000 PLN' },
      { min: 6000, max: 8000, label: '6000-8000 PLN' },
      { min: 8000, max: 10000, label: '8000-10000 PLN' },
      { min: 10000, max: Infinity, label: 'Powyżej 10000 PLN' }
    ];

    const total = data.length;
    const rangeData = ranges.map(range => {
      const count = data.filter(item => 
        Number(item.income) >= range.min && Number(item.income) < range.max
      ).length;
      
      return {
        range: range.label,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      };
    }).filter(range => range.count > 0);

    setIncomeRanges(rangeData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0
    }).format(value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  if (loading) {
    return (
      <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
        <TopHeader />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 flex items-center justify-center h-96">
            <div className="text-center">
              <Calculator className="w-12 h-12 animate-spin mx-auto mb-4 text-navy-900" />
              <p className="text-navy-800 text-lg">Ładowanie danych...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-lato min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50">
      <TopHeader />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900 mb-2 md:mb-4 px-2">
              Analiza Kalkulatora Oddłużenia
            </h1>
            <p className="text-warm-neutral-600 text-base md:text-lg px-2">
              Raport dotyczący kwot dochodów użytkowników kalkulatora
            </p>
          </div>

          {/* Statystyki ogólne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="p-3 md:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Liczba użytkowników</CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-lg sm:text-xl md:text-2xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
            
            <Card className="p-3 md:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Średni dochód</CardTitle>
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-sm sm:text-lg md:text-2xl font-bold">{formatCurrency(stats.avgIncome)}</div>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Minimalny dochód</CardTitle>
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-sm sm:text-lg md:text-2xl font-bold">{formatCurrency(stats.minIncome)}</div>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Maksymalny dochód</CardTitle>
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-sm sm:text-lg md:text-2xl font-bold">{formatCurrency(stats.maxIncome)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Wykres słupkowy - przedziały dochodów */}
          <Card className="mb-6 md:mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-base md:text-lg">Rozkład dochodów według przedziałów</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeRanges} margin={{ bottom: 60, left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="range" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={10}
                    interval={0}
                  />
                  <YAxis fontSize={10} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'count' ? `${value} osób` : `${value}%`,
                      name === 'count' ? 'Liczba' : 'Procent'
                    ]}
                  />
                  <Bar dataKey="count" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Wykres kołowy - przedziały dochodów */}
          <Card className="mb-6 md:mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-base md:text-lg">Procentowy rozkład dochodów</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeRanges}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {incomeRanges.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, props: any) => [
                      `${value} osób (${props.payload.percentage}%)`, 
                      props.payload.range
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabela szczegółowych danych */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base md:text-lg">Ostatnie wpisy kalkulatora</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-1">Data</th>
                      <th className="text-left py-2 px-1">Dochód</th>
                      <th className="text-left py-2 px-1">Zadłużenie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 20).map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-1 whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString('pl-PL')}
                        </td>
                        <td className="py-2 px-1">{formatCurrency(Number(item.income))}</td>
                        <td className="py-2 px-1">{formatCurrency(Number(item.debt_amount))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analiza;