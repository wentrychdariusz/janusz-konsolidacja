import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Calculator, TrendingUp, Users, DollarSign, AlertTriangle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import DebtCalculator from '../components/DebtCalculator';
import { useDataComparison } from '../hooks/useDataComparison';

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
  const [searchParams] = useSearchParams();
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
  
  // Hook do porównywania danych
  const { comparison } = useDataComparison();

  // Pobierz dane z URL params (z kalkulatora)
  const incomeFromUrl = searchParams.get('income') || '';
  const paydayDebtFromUrl = searchParams.get('paydayDebt') || '';
  const bankDebtFromUrl = searchParams.get('bankDebt') || '';
  const salaryFromUrl = searchParams.get('salary') || '';
  
  const parsedIncome = incomeFromUrl ? parseFloat(incomeFromUrl) : 0;
  const parsedPaydayDebt = paydayDebtFromUrl ? parseFloat(paydayDebtFromUrl) : 0;
  const parsedBankDebt = bankDebtFromUrl ? parseFloat(bankDebtFromUrl) : 0;
  const totalDebt = parsedPaydayDebt + parsedBankDebt;
  const formattedSalary = salaryFromUrl ? parseFloat(salaryFromUrl.replace(/\s/g, '')) : 0;

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

          {/* Dane z kalkulatora - nowa sekcja główna */}
          {(parsedIncome > 0 || totalDebt > 0) && (
            <Card className="mb-6 md:mb-8 border-2 border-business-blue-300 bg-gradient-to-r from-business-blue-50 to-warm-neutral-50">
              <CardHeader className="bg-gradient-to-r from-business-blue-100 to-business-blue-200">
                <CardTitle className="text-xl md:text-2xl font-bold text-navy-900 text-center">
                  🧮 Dane z Kalkulatora Oddłużenia
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Zarobki */}
                  <div className="text-center">
                    <div className="text-sm font-medium text-navy-700 mb-2">Miesięczne zarobki</div>
                    <div className="text-4xl font-bold text-business-blue-700 mb-4">
                      {formatCurrency(parsedIncome)}
                    </div>
                  </div>
                  
                  {/* Łączne zadłużenie */}
                  <div className="text-center">
                    <div className="text-sm font-medium text-navy-700 mb-2">Łączne zadłużenie</div>
                    <div className="text-4xl font-bold text-red-600 mb-4">
                      {formatCurrency(totalDebt)}
                    </div>
                    <div className="text-xs text-warm-neutral-600">
                      Chwilówki: {formatCurrency(parsedPaydayDebt)} | Banki: {formatCurrency(parsedBankDebt)}
                    </div>
                  </div>
                </div>

                {/* Analiza wiarygodności (KŁAMIE/PRAWDA) */}
                {comparison.hasComparison && (
                  <div className="mt-6 p-4 rounded-lg border-2" 
                       style={{
                         borderColor: comparison.isPotentialLie ? '#ef4444' : '#10b981',
                         backgroundColor: comparison.isPotentialLie ? '#fef2f2' : '#f0fdf4'
                       }}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-bold text-navy-900">
                        🔍 Analiza Wiarygodności Danych
                      </h4>
                      <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                        comparison.isPotentialLie 
                          ? 'bg-red-500 text-white' 
                          : 'bg-green-500 text-white'
                      }`}>
                        {comparison.isPotentialLie ? '🚨 KŁAMIE' : '✅ PRAWDA'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-navy-700">Popup (wcześniej):</div>
                        <div className="text-xl font-bold text-prestige-gold-700">
                          {comparison.popupData ? formatCurrency(comparison.popupData.salary) : 'Brak danych'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-navy-700">Kalkulator (teraz):</div>
                        <div className="text-xl font-bold text-business-blue-700">
                          {comparison.calculatorData ? formatCurrency(comparison.calculatorData.income) : 'Brak danych'}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-sm font-medium text-navy-700 mb-2">
                        Różnica: {formatCurrency(comparison.incomeDifference)} ({comparison.differencePercentage.toFixed(1)}%)
                      </div>
                      <div className="text-sm text-navy-600">
                        Poziom ryzyka: <span className={`font-bold ${
                          comparison.lieSeverity === 'major' ? 'text-red-600' :
                          comparison.lieSeverity === 'moderate' ? 'text-orange-600' :
                          comparison.lieSeverity === 'minor' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {comparison.lieSeverity === 'major' ? 'WYSOKIE' :
                           comparison.lieSeverity === 'moderate' ? 'ŚREDNIE' :
                           comparison.lieSeverity === 'minor' ? 'NISKIE' :
                           'BRAK'}
                        </span>
                      </div>
                    </div>

                    {/* Notatka dla agenta */}
                    <div className="mt-4 p-3 bg-navy-100 rounded-lg">
                      <div className="text-sm font-bold text-navy-900 mb-1">📝 Notatka dla agenta:</div>
                      <div className="text-sm text-navy-700">{comparison.agentNote}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Informacja o poprzedniej kwocie z URL - tylko jeśli brak danych z kalkulatora */}
          {formattedSalary > 0 && parsedIncome === 0 && (
            <Card className="mb-6 md:mb-8 border-2 border-prestige-gold-300 bg-gradient-to-r from-prestige-gold-50 to-warm-neutral-50">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-prestige-gold-600" />
                  <h3 className="text-lg md:text-xl font-bold text-navy-900">
                    Poprzednio podana kwota zarobków
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-prestige-gold-700 mb-2">
                    {formatCurrency(formattedSalary)}
                  </div>
                  <p className="text-warm-neutral-600">
                    Ta kwota została wprowadzona w poprzednim kroku. Porównaj ją z kalkulatorem oddłużenia poniżej.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sekcja porównawcza z kalkulatorem oddłużenia */}
          {(formattedSalary > 0 || parsedIncome > 0) && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
                Porównaj z Kalkulatorem Oddłużenia
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Poprzednia kwota lub dane z kalkulatora */}
                <Card className="border-2 border-prestige-gold-300">
                  <CardHeader className="bg-gradient-to-r from-prestige-gold-100 to-prestige-gold-200">
                    <CardTitle className="text-lg md:text-xl font-bold text-navy-900 text-center">
                      🔍 {parsedIncome > 0 ? 'Dane z Kalkulatora' : 'Poprzednia Kwota'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-prestige-gold-700">
                        {parsedIncome > 0 ? formatCurrency(parsedIncome) : formatCurrency(formattedSalary)}
                      </div>
                      <p className="text-warm-neutral-600">
                        {parsedIncome > 0 ? 'Zarobki z kalkulatora oddłużenia' : 'Kwota zarobków z poprzedniego formularza'}
                      </p>
                      {totalDebt > 0 && (
                        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm font-medium text-red-700">
                            Łączne zadłużenie:
                          </p>
                          <div className="text-2xl font-bold text-red-600 mt-1">
                            {formatCurrency(totalDebt)}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Kalkulator oddłużenia */}
                <Card className="border-2 border-business-blue-300">
                  <CardHeader className="bg-gradient-to-r from-business-blue-100 to-business-blue-200">
                    <CardTitle className="text-lg md:text-xl font-bold text-navy-900 text-center">
                      🧮 Kalkulator Oddłużenia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="max-w-md mx-auto">
                      <DebtCalculator />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

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