import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartDataLabels
);

// Language definitions
const translations = {
  tr: {
    title: 'Brüt-Net Maaş Hesaplayıcı',
    subtitle: 'Enflasyon etkisi analiziyle 12 aylık maaş projeksiyonunuzu hesaplayın',
    grossSalary: 'Brüt Aylık Maaş (₺)',
    inflationScenario: 'Enflasyon Senaryosu',
    customInflation: 'Özel Enflasyon Oranı (%)',
    customInflationPlaceholder: 'Özel oran girin',
    calculateButton: 'Maaş Projeksiyonunu Hesapla',
    resultsTitle: '12 Aylık Maaş Projeksiyonu',
    month: 'Ay',
    brut: 'Brüt',
    sskIsci: 'SSK İşçi',
    issizlikIsci: 'İşsizlik İşçi',
    aylikGelirVergisi: 'Aylık Gelir Vergisi',
    damgaVergisi: 'Damga Vergisi',
    kumulatifVergiMatrahi: 'Kümülatif Vergi Matrahı',
    net: 'Net',
    asgariGecimIndirimi: 'Asgari Geçim İndirimi',
    asgariUcretGelirVergisiIstisnasi: 'Asgari Ücret Gelir Vergisi İstisnası',
    asgariUcretDamgaVergisiIstisnasi: 'Asgari Ücret Damga Vergisi İstisnası',
    netOdenecekTutar: 'Net Ödenecek Tutar',
    sskIsveren: 'SSK İşveren',
    issizlikIsveren: 'İşsizlik İşveren',
    toplamMaliyet: 'Toplam Maliyet',
    purchasingPowerLoss: 'Satın Alma Gücü Kaybı',
    realSalary: 'Gerçek Maaş',
    inflationMultiplier: 'Enflasyon Çarpanı',
    calculationDetails: 'Hesaplama Detayları',
    deductions: 'Kesintiler',
    calculations: 'Hesaplamalar',
    sgkText: 'SGK Primi: Brüt maaşın %14\'ü',
    unemploymentText: 'İşsizlik Sigortası: Brüt maaşın %1\'i',
    stampTaxText: 'Damga Vergisi: Brüt maaşın %0,759\'u',
    incomeTaxText: 'Gelir Vergisi: Artan oranlı (%15, %20, %27, %35)',
    netSalaryText: 'Net Maaş: Brüt - SGK - İşsizlik - Gelir Vergisi - Damga Vergisi',
    realSalaryText: 'Gerçek Maaş: Enflasyona göre düzeltilmiş net maaş',
    purchasingPowerLossText: 'Satın Alma Gücü Kaybı: Net Maaş - Gerçek Maaş',
    inflationMultiplierText: 'Enflasyon Çarpanı: Kümülatif enflasyon etkisi',
    noteText: 'Bu hesaplayıcı Türkiye\'deki güncel vergi dilimlerini kullanır. SGK primi %14, işsizlik sigortası %1, damga vergisi %0,759 oranlarında uygulanır.',
    errorInvalidSalary: 'Lütfen geçerli bir brüt maaş tutarı girin',
    errorNegativeInflation: 'Enflasyon oranı negatif olamaz',
    custom: 'Özel',
    viewMode: 'Görünüm Modu',
    simpleView: 'Basit Görünüm',
    detailedView: 'Detaylı Görünüm',
    currentTaxBracket: 'Mevcut Vergi Dilimi',
    netSalarySimple: 'Net Maaş',
    inflationEffect: 'Enflasyon Etkisi',
    chartsTitle: 'Grafikler',
    salaryComparisonChart: 'Net Maaş vs Gerçek Net Maaş Karşılaştırması',
    inflationRatesChart: 'Yıllık Enflasyon Oranları Karşılaştırması (2020 - 2025)',
    netSalaryLabel: 'Net Maaş',
    realSalaryLabel: 'Gerçek Net Maaş',
    hungerThreshold: 'Açlık Sınırı',
    povertyThreshold: 'Yoksulluk Sınırı',
    tuikLabel: 'TÜİK (TÜFE)',
    enagLabel: 'ENAG',
    itoLabel: 'İTO (İstanbul Ücretliler Geçinme İndeksi)',
    monthlyProjection: 'Aylık Projeksiyon',
    yearlyInflationRates: 'Yıllık Enflasyon Oranları',
    analysisTitle: 'Maaş Analizi',
    initialSalary: 'Başlangıç Gerçek Maaşınız',
    finalSalary: '12 Ay Sonunda Gerçek Maaşınız',
    inflationImpact: 'Enflasyon Etkisi',
    purchasingPowerLossTotal: 'Toplam Satın Alma Gücü Kaybı',
    hungerThresholdWarning: '{{month}}. aydan itibaren açlık sınırının altında kalıyor.',
    povertyThresholdWarning: '{{month}}. aydan itibaren yoksulluk sınırının altında kalıyor.',
    aboveThresholds: 'Maaşınız 12 ay boyunca açlık ve yoksulluk sınırlarının üzerinde kalıyor.',
    monthlyLoss: 'Aylık ortalama kayıp'
  },
  en: {
    title: 'Gross-Net Salary Calculator',
    subtitle: 'Calculate your 12-month salary projection with inflation impact analysis',
    grossSalary: 'Gross Monthly Salary (₺)',
    inflationScenario: 'Inflation Scenario',
    customInflation: 'Custom Inflation Rate (%)',
    customInflationPlaceholder: 'Enter custom rate',
    calculateButton: 'Calculate Salary Projection',
    resultsTitle: '12-Month Salary Projection',
    month: 'Month',
    brut: 'Gross',
    sskIsci: 'SSK Employee',
    issizlikIsci: 'Unemployment Employee',
    aylikGelirVergisi: 'Monthly Income Tax',
    damgaVergisi: 'Stamp Tax',
    kumulatifVergiMatrahi: 'Cumulative Tax Base',
    net: 'Net',
    asgariGecimIndirimi: 'Minimum Living Allowance',
    asgariUcretGelirVergisiIstisnasi: 'Minimum Wage Income Tax Exemption',
    asgariUcretDamgaVergisiIstisnasi: 'Minimum Wage Stamp Tax Exemption',
    netOdenecekTutar: 'Net Payable Amount',
    sskIsveren: 'SSK Employer',
    issizlikIsveren: 'Unemployment Employer',
    toplamMaliyet: 'Total Cost',
    purchasingPowerLoss: 'Purchasing Power Loss',
    realSalary: 'Real Salary',
    inflationMultiplier: 'Inflation Multiplier',
    calculationDetails: 'Calculation Details',
    deductions: 'Deductions',
    calculations: 'Calculations',
    sgkText: 'SSK Premium: 14% of gross salary',
    unemploymentText: 'Unemployment Insurance: 1% of gross salary',
    stampTaxText: 'Stamp Tax: 0.759% of gross salary',
    incomeTaxText: 'Income Tax: Progressive rates (15%, 20%, 27%, 35%)',
    netSalaryText: 'Net Salary: Gross - SSK - Unemployment - Income Tax - Stamp Tax',
    realSalaryText: 'Real Salary: Net Salary adjusted for inflation',
    purchasingPowerLossText: 'Purchasing Power Loss: Net Salary - Real Salary',
    inflationMultiplierText: 'Inflation Multiplier: Cumulative inflation impact',
    noteText: 'This calculator uses current Turkish tax brackets. SSK premium 14%, unemployment insurance 1%, stamp tax 0.759%.',
    errorInvalidSalary: 'Please enter a valid gross salary amount',
    errorNegativeInflation: 'Inflation rate cannot be negative',
    custom: 'Custom',
    viewMode: 'View Mode',
    simpleView: 'Simple View',
    detailedView: 'Detailed View',
    currentTaxBracket: 'Current Tax Bracket',
    netSalarySimple: 'Net Salary',
    inflationEffect: 'Inflation Effect',
    chartsTitle: 'Charts',
    salaryComparisonChart: 'Net Salary vs Real Net Salary Comparison',
    inflationRatesChart: 'Yearly Inflation Rates Comparison (2020 - 2025)',
    netSalaryLabel: 'Net Salary',
    realSalaryLabel: 'Real Net Salary',
    hungerThreshold: 'Hunger Threshold',
    povertyThreshold: 'Poverty Threshold',
    tuikLabel: 'TUIK (TUFE)',
    enagLabel: 'ENAG',
    itoLabel: 'ITO (Istanbul Wage Earners Living Index)',
    monthlyProjection: 'Monthly Projection',
    yearlyInflationRates: 'Yearly Inflation Rates',
    analysisTitle: 'Salary Analysis',
    initialSalary: 'Your Initial Real Salary',
    finalSalary: 'Your Real Salary After 12 Months',
    inflationImpact: 'Inflation Impact',
    purchasingPowerLossTotal: 'Total Purchasing Power Loss',
    hungerThresholdWarning: 'Falls below hunger threshold starting from month {{month}}.',
    povertyThresholdWarning: 'Falls below poverty threshold starting from month {{month}}.',
    aboveThresholds: 'Your salary stays above hunger and poverty thresholds for all 12 months.',
    monthlyLoss: 'Monthly average loss'
  }
};

// Inflation scenarios with country data (based on Trading Economics 2024)
const getInflationScenarios = (t: any) => [
  { label: '🇿🇼 Zimbabwe', value: 339.7 },
  { label: '🇱🇧 Lebanon', value: 221.3 },
  { label: '🇹🇷 Turkey', value: 75.5 },
  { label: '🇦🇷 Argentina', value: 65.2 },
  { label: '🇮🇷 Iran', value: 48.5 },
  { label: '🇷🇺 Russia', value: 36.4 },
  { label: '🇪🇬 Egypt', value: 33.9 },
  { label: '🇪🇹 Ethiopia', value: 28.9 },
  { label: '🇻🇪 Venezuela', value: 23.6 },
  { label: '🇵🇰 Pakistan', value: 22.4 },
  { label: '🇬🇭 Ghana', value: 21.5 },
  { label: '🇳🇬 Nigeria', value: 18.6 },
  { label: '🇺🇦 Ukraine', value: 14.8 },
  { label: '🇿🇦 South Africa', value: 11.1 },
  { label: '🇮🇳 India', value: 8.7 },
  { label: '🇧🇷 Brazil', value: 7.8 },
  { label: '🇲🇽 Mexico', value: 6.9 },
  { label: '🇮🇩 Indonesia', value: 5.4 },
  { label: '🇰🇷 South Korea', value: 4.2 },
  { label: '🇨🇳 China', value: 3.8 },
  { label: '🇬🇧 United Kingdom', value: 3.4 },
  { label: '🇨🇦 Canada', value: 2.9 },
  { label: '🇺🇸 USA', value: 2.4 },
  { label: '🇦🇺 Australia', value: 2.1 },
  { label: '🇩🇪 Germany', value: 2.1 },
  { label: '🇫🇷 France', value: 1.9 },
  { label: '🇯🇵 Japan', value: 1.8 },
  { label: '🇸🇪 Sweden', value: 1.5 },
  { label: '🇳🇴 Norway', value: 1.3 },
  { label: '🇨🇭 Switzerland', value: 0.7 },
  { label: t.custom, value: 0 }
];

// Turkish income tax brackets for 2024 (updated to match Excel)
const incomeTaxBrackets = [
  { min: 0, max: 110000, rate: 0.15 },
  { min: 110000, max: 230000, rate: 0.20 },
  { min: 230000, max: 580000, rate: 0.27 },
  { min: 580000, max: Infinity, rate: 0.35 }
];

// Monthly exemption limits (2024 values - updated)
const monthlyExemptions = {
  january: { income: 3315.70, stamp: 197.38 },
  february: { income: 3315.70, stamp: 197.38 },
  march: { income: 3315.70, stamp: 197.38 },
  april: { income: 3315.70, stamp: 197.38 },
  may: { income: 3315.70, stamp: 197.38 },
  june: { income: 3315.70, stamp: 197.38 },
  july: { income: 3315.70, stamp: 197.38 },
  august: { income: 4257.57, stamp: 197.38 }, // Updated in August
  september: { income: 4420.94, stamp: 197.38 }, // Updated in September
  october: { income: 4420.94, stamp: 197.38 },
  november: { income: 4420.94, stamp: 197.38 },
  december: { income: 4420.94, stamp: 197.38 }
};

const getMonthlyExemption = (month: number) => {
  const exemptions = [
    monthlyExemptions.january, monthlyExemptions.february, monthlyExemptions.march,
    monthlyExemptions.april, monthlyExemptions.may, monthlyExemptions.june,
    monthlyExemptions.july, monthlyExemptions.august, monthlyExemptions.september,
    monthlyExemptions.october, monthlyExemptions.november, monthlyExemptions.december
  ];
  return exemptions[month - 1];
};

// Tax exemptions (2024 values) - removed unused variable

// Poverty and hunger thresholds (2024 values - TÜRK-İŞ data)
const povertyThresholds = {
  hungerThreshold: 19662, // Monthly hunger threshold for 4-person family
  povertyThreshold: 64055 // Monthly poverty threshold for 4-person family
};

// Turkey inflation data (TÜIK TÜFE, ENAG, İTO yearly rates - 2020-2025)
const turkeyInflationData = {
  years: ['2020', '2021', '2022', '2023', '2024', '2025*'],
  tuik: [14.60, 36.08, 64.27, 64.77, 68.50, 35.05],
  enag: [36.72, 82.81, 137.55, 127.21, 118.53, 68.68],
  ito: [15.09, 34.18, 92.97, 74.88, 78.54, 41.12]
};

interface CalculationResult {
  month: number;
  grossSalary: number;
  sgkEmployee: number;
  unemploymentEmployee: number;
  monthlyIncomeTax: number;
  stampTax: number;
  cumulativeTaxBase: number;
  netSalary: number;
  minimumLivingAllowance: number;
  incomeExemption: number;
  stampExemption: number;
  netPayableAmount: number;
  sgkEmployer: number;
  unemploymentEmployer: number;
  totalCost: number;
  purchasingPowerLoss: number;
  realSalary: number;
  inflationMultiplier: number;
}

function App() {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [selectedInflation, setSelectedInflation] = useState<number>(75.5);
  const [customInflation, setCustomInflation] = useState<string>('');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('simple');
  const [showCharts, setShowCharts] = useState<boolean>(true);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const t = translations[language];
  const inflationScenarios = getInflationScenarios(t);

  // Generate empty results for initial display
  const generateEmptyResults = (): CalculationResult[] => {
    const emptyResults: CalculationResult[] = [];
    for (let month = 1; month <= 12; month++) {
      emptyResults.push({
        month,
        grossSalary: 0,
        sgkEmployee: 0,
        unemploymentEmployee: 0,
        monthlyIncomeTax: 0,
        stampTax: 0,
        cumulativeTaxBase: 0,
        netSalary: 0,
        minimumLivingAllowance: 0,
        incomeExemption: 0,
        stampExemption: 0,
        netPayableAmount: 0,
        sgkEmployer: 0,
        unemploymentEmployer: 0,
        totalCost: 0,
        purchasingPowerLoss: 0,
        realSalary: 0,
        inflationMultiplier: 1
      });
    }
    return emptyResults;
  };

  // Initialize with empty results
  React.useEffect(() => {
    if (results.length === 0) {
      setResults(generateEmptyResults());
    }
  }, [results.length]);

  // Format number with thousand separators
  const formatNumber = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Format currency in Turkish Lira
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format currency with decimals for detailed view - removed unused function

  // Generate salary analysis
  const generateSalaryAnalysis = () => {
    if (!hasCalculated || results.length === 0) return null;
    
    const initialRealSalary = results[0].realSalary;
    const finalRealSalary = results[11].realSalary;
    const totalLoss = results.reduce((sum, r) => sum + r.purchasingPowerLoss, 0);
    const monthlyAverageLoss = totalLoss / 12;
    
    // Find when salary drops below thresholds
    const hungerThresholdMonth = results.findIndex(r => r.realSalary < povertyThresholds.hungerThreshold);
    const povertyThresholdMonth = results.findIndex(r => r.realSalary < povertyThresholds.povertyThreshold);
    
    return {
      initialRealSalary,
      finalRealSalary,
      totalLoss,
      monthlyAverageLoss,
      hungerThresholdMonth: hungerThresholdMonth === -1 ? null : hungerThresholdMonth + 1,
      povertyThresholdMonth: povertyThresholdMonth === -1 ? null : povertyThresholdMonth + 1
    };
  };

  // Calculate progressive income tax based on cumulative income
  const calculateIncomeTax = (cumulativeIncome: number): number => {
    let totalTax = 0;
    let remainingIncome = cumulativeIncome;

    for (const bracket of incomeTaxBrackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInThisBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      );
      
      totalTax += taxableInThisBracket * bracket.rate;
      remainingIncome -= taxableInThisBracket;
    }

    return totalTax;
  };

  // Get current tax bracket for cumulative income
  const getCurrentTaxBracket = (cumulativeIncome: number): string => {
    for (const bracket of incomeTaxBrackets) {
      if (cumulativeIncome <= bracket.max) {
        return `%${(bracket.rate * 100).toFixed(0)}`;
      }
    }
    return `%${(incomeTaxBrackets[incomeTaxBrackets.length - 1].rate * 100).toFixed(0)}`;
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: 'tr' | 'en') => {
    setLanguage(newLanguage);
    setError('');
  };

  // Handle gross salary input with formatting
  const handleGrossSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    setGrossSalary(formatted);
    setError('');
  };

  // Handle custom inflation change
  const handleCustomInflationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInflation(value);
    if (value) {
      setSelectedInflation(parseFloat(value) || 0);
    }
  };

  // Handle inflation scenario selection
  const handleInflationScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseFloat(e.target.value);
    setSelectedInflation(selectedValue);
    if (selectedValue !== 0) {
      setCustomInflation('');
    }
  };

  // Perform salary calculations
  const calculateSalary = () => {
    const numericGrossSalary = parseFloat(grossSalary.replace(/\./g, ''));
    
    // Validation
    if (!numericGrossSalary || numericGrossSalary <= 0) {
      setError(t.errorInvalidSalary);
      return;
    }

    if (selectedInflation < 0) {
      setError(t.errorNegativeInflation);
      return;
    }

    // Calculate monthly inflation rate
    const monthlyInflationRate = Math.pow(1 + selectedInflation / 100, 1/12) - 1;
    
    const calculationResults: CalculationResult[] = [];
    let cumulativeGrossIncome = 0;

    for (let month = 1; month <= 12; month++) {
      cumulativeGrossIncome += numericGrossSalary;
      
      // Calculate employee deductions
      const sgkEmployee = numericGrossSalary * 0.14; // 14% SSK Employee
      const unemploymentEmployee = numericGrossSalary * 0.01; // 1% unemployment insurance Employee
      
      // Calculate income tax
      const totalIncomeTax = calculateIncomeTax(cumulativeGrossIncome);
      const previousIncomeTax = month > 1 ? calculateIncomeTax(cumulativeGrossIncome - numericGrossSalary) : 0;
      const monthlyIncomeTax = totalIncomeTax - previousIncomeTax;
      
      // Calculate stamp tax
      const stampTax = numericGrossSalary * 0.00759; // 0.759% stamp tax
      
      // Calculate employer costs
      const sgkEmployer = numericGrossSalary * 0.155; // 15.5% SSK Employer
      const unemploymentEmployer = numericGrossSalary * 0.02; // 2% unemployment insurance Employer
      
      // Calculate exemptions based on month
      const monthlyExemption = getMonthlyExemption(month);
      const incomeExemption = Math.min(monthlyIncomeTax, monthlyExemption.income);
      const stampExemption = Math.min(stampTax, monthlyExemption.stamp);
      
      // Calculate net amounts after exemptions
      const netIncomeTax = Math.max(0, monthlyIncomeTax - incomeExemption);
      const netStampTax = Math.max(0, stampTax - stampExemption);
      
      // Calculate net salary and final amounts
      const totalEmployeeDeductions = sgkEmployee + unemploymentEmployee + netIncomeTax + netStampTax;
      const netSalary = numericGrossSalary - totalEmployeeDeductions;
      const minimumLivingAllowance = 0; // Not applied in this case
      const netPayableAmount = netSalary + minimumLivingAllowance;
      const totalCost = numericGrossSalary + sgkEmployer + unemploymentEmployer;
      
      // Calculate inflation impact
      const inflationMultiplier = Math.pow(1 + monthlyInflationRate, month - 1);
      const realSalary = netPayableAmount / inflationMultiplier;
      const purchasingPowerLoss = netPayableAmount - realSalary;
      
      calculationResults.push({
        month,
        grossSalary: numericGrossSalary,
        sgkEmployee,
        unemploymentEmployee,
        monthlyIncomeTax: netIncomeTax,
        stampTax: netStampTax,
        cumulativeTaxBase: cumulativeGrossIncome,
        netSalary,
        minimumLivingAllowance,
        incomeExemption,
        stampExemption,
        netPayableAmount,
        sgkEmployer,
        unemploymentEmployer,
        totalCost,
        purchasingPowerLoss,
        realSalary,
        inflationMultiplier
      });
    }

    setResults(calculationResults);
    setShowResults(true);
    setShowCharts(true);
    setHasCalculated(true);
    setError('');
  };

  return (
    <div className="container">
      {/* Language Toggle */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => handleLanguageChange('tr')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: language === 'tr' ? '#06b6d4' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: language === 'tr' ? '600' : '400'
          }}
        >
          🇹🇷 TR
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: language === 'en' ? '#06b6d4' : '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: language === 'en' ? '600' : '400'
          }}
        >
          🇺🇸 EN
        </button>
      </div>

      {/* Header */}
      <div className="header">
        <h1 className="title">
          {t.title}
        </h1>
        <p className="subtitle">
          {t.subtitle}
        </p>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <div className="input-grid">
          {/* Gross Salary Input */}
          <div className="form-group">
            <label className="form-label">
              {t.grossSalary}
            </label>
            <input
              type="text"
              value={grossSalary}
              onChange={handleGrossSalaryChange}
              placeholder="120.000"
              className="form-input"
            />
          </div>

          {/* Inflation Scenario Dropdown */}
          <div className="form-group">
            <label className="form-label">
              {t.inflationScenario}
            </label>
            <select
              value={selectedInflation}
              onChange={handleInflationScenarioChange}
              className="form-select"
            >
              {inflationScenarios.map((scenario, index) => (
                <option key={index} value={scenario.value}>
                  {scenario.label} {scenario.value > 0 ? `(${scenario.value}%)` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Inflation Input */}
          <div className="form-group">
            <label className="form-label">
              {t.customInflation}
            </label>
            <input
              type="number"
              value={customInflation}
              onChange={handleCustomInflationChange}
              placeholder={t.customInflationPlaceholder}
              className="form-input"
            />
          </div>
        </div>

        {/* View Mode Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
            {t.viewMode}
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('simple')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === 'simple' ? '#06b6d4' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: viewMode === 'simple' ? '600' : '400'
              }}
            >
              {t.simpleView}
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === 'detailed' ? '#06b6d4' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: viewMode === 'detailed' ? '600' : '400'
              }}
            >
              {t.detailedView}
            </button>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="button-container">
          <button
            onClick={calculateSalary}
            className="calculate-button"
          >
            {t.calculateButton}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {showResults && results.length > 0 && (
        <div className="results-section">
          <h2 className="results-title">
            {t.resultsTitle}
          </h2>
          
          {/* Results Table */}
          <div className="table-container">
            {viewMode === 'simple' ? (
              // Simple View Table
              <table className="results-table simple">
                <thead className="table-header">
                  <tr>
                    <th>{t.month}</th>
                    <th className="text-right">{t.brut}</th>
                    <th className="text-right">{t.netSalarySimple}</th>
                    <th className="text-right red">{t.currentTaxBracket}</th>
                    <th className="text-right orange">{t.purchasingPowerLoss}</th>
                    <th className="text-right yellow">{t.realSalary}</th>
                    <th className="text-right">{t.inflationEffect}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.month} className="table-row">
                      <td className="table-cell">{result.month}</td>
                      <td className="table-cell text-right">{formatCurrency(result.grossSalary)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.netPayableAmount)}</td>
                      <td className="table-cell text-right red">{getCurrentTaxBracket(result.cumulativeTaxBase)}</td>
                      <td className="table-cell text-right orange">
                        {formatCurrency(result.purchasingPowerLoss)}
                      </td>
                      <td className="table-cell text-right yellow">
                        {formatCurrency(result.realSalary)}
                      </td>
                      <td className="table-cell text-right">
                        {(result.inflationMultiplier * 100 - 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Detailed View Table
              <table className="results-table detailed">
                <thead className="table-header">
                  <tr>
                    <th>{t.month}</th>
                    <th className="text-right">{t.brut}</th>
                    <th className="text-right">{t.sskIsci}</th>
                    <th className="text-right">{t.issizlikIsci}</th>
                    <th className="text-right red">{t.aylikGelirVergisi}</th>
                    <th className="text-right">{t.damgaVergisi}</th>
                    <th className="text-right">{t.kumulatifVergiMatrahi}</th>
                    <th className="text-right">{t.net}</th>
                    <th className="text-right">{t.asgariGecimIndirimi}</th>
                    <th className="text-right">{t.asgariUcretGelirVergisiIstisnasi}</th>
                    <th className="text-right">{t.asgariUcretDamgaVergisiIstisnasi}</th>
                    <th className="text-right">{t.netOdenecekTutar}</th>
                    <th className="text-right">{t.sskIsveren}</th>
                    <th className="text-right">{t.issizlikIsveren}</th>
                    <th className="text-right">{t.toplamMaliyet}</th>
                    <th className="text-right orange">{t.purchasingPowerLoss}</th>
                    <th className="text-right yellow">{t.realSalary}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.month} className="table-row">
                      <td className="table-cell">{result.month}</td>
                      <td className="table-cell text-right">{formatCurrency(result.grossSalary)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.sgkEmployee)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.unemploymentEmployee)}</td>
                      <td className="table-cell text-right red">{formatCurrency(result.monthlyIncomeTax)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.stampTax)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.cumulativeTaxBase)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.netSalary)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.minimumLivingAllowance)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.incomeExemption)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.stampExemption)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.netPayableAmount)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.sgkEmployer)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.unemploymentEmployer)}</td>
                      <td className="table-cell text-right">{formatCurrency(result.totalCost)}</td>
                      <td className="table-cell text-right orange">
                        {formatCurrency(result.purchasingPowerLoss)}
                      </td>
                      <td className="table-cell text-right yellow">
                        {formatCurrency(result.realSalary)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Calculation Details */}
          <div className="calculation-details">
            <h3 className="details-title">
              {t.calculationDetails}
            </h3>
            <div className="details-grid">
              <div className="details-section">
                <h4>{t.deductions}:</h4>
                <ul className="details-list">
                  <li>• <strong>{t.sgkText}</strong></li>
                  <li>• <strong>{t.unemploymentText}</strong></li>
                  <li>• <strong>{t.incomeTaxText}</strong></li>
                  <li>• <strong>{t.stampTaxText}</strong></li>
                </ul>
              </div>
              <div className="details-section">
                <h4>{t.calculations}:</h4>
                <ul className="details-list">
                  <li>• <strong>{t.netSalaryText}</strong></li>
                  <li>• <strong>{t.realSalaryText}</strong></li>
                  <li>• <strong>{t.purchasingPowerLossText}</strong></li>
                  <li>• <strong>{t.inflationMultiplierText}</strong></li>
                </ul>
              </div>
            </div>
            <div className="details-note">
              <p>
                <strong>Not:</strong> {t.noteText}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {showCharts && results.length > 0 && (
        <div className="charts-section">
          <h2 className="charts-title">
            {t.chartsTitle}
          </h2>
          
          {/* Salary Comparison Chart */}
          <div className="chart-container">
            <h3 className="chart-subtitle">
              {t.salaryComparisonChart}
            </h3>
            <Line
              data={{
                labels: results.map(r => `${t.month} ${r.month}`),
                datasets: [
                  {
                    label: t.netSalaryLabel,
                    data: results.map(r => r.netPayableAmount),
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    tension: 0.3,
                    borderWidth: 4,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#22c55e',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    hidden: !hasCalculated
                  },
                  {
                    label: t.realSalaryLabel,
                    data: results.map(r => r.realSalary),
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.15)',
                    tension: 0.3,
                    borderWidth: 4,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#dc2626',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    hidden: !hasCalculated
                  },
                  {
                    label: t.hungerThreshold,
                    data: new Array(12).fill(povertyThresholds.hungerThreshold),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderDash: [8, 4],
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0
                  },
                  {
                    label: t.povertyThreshold,
                    data: new Array(12).fill(povertyThresholds.povertyThreshold),
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    borderDash: [12, 6],
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  datalabels: {
                    display: false
                  },
                  legend: {
                    position: 'top' as const,
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                      font: {
                        size: 14,
                        weight: 'bold'
                      },
                      color: '#cbd5e1',
                      boxWidth: 15,
                      boxHeight: 3
                    }
                  },
                  title: {
                    display: true,
                    text: t.monthlyProjection,
                    font: {
                      size: 18,
                      weight: 'bold'
                    },
                    padding: 20,
                    color: '#06b6d4'
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: '#cbd5e1',
                      font: {
                        size: 11,
                        weight: 'bold'
                      }
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: '#cbd5e1',
                      font: {
                        size: 11,
                        weight: 'bold'
                      },
                      callback: function(value) {
                        return formatCurrency(Number(value));
                      }
                    }
                  }
                }
              }}
            />
          </div>

          {/* Salary Analysis */}
          {hasCalculated && (
            <div className="analysis-container">
              <h3 className="analysis-title">
                {t.analysisTitle}
              </h3>
              {(() => {
                const analysis = generateSalaryAnalysis();
                if (!analysis) return null;
                
                return (
                  <div className="analysis-content">
                    <div className="analysis-grid">
                      <div className="analysis-item">
                        <span className="analysis-label">{t.initialSalary}:</span>
                        <span className="analysis-value positive">{formatCurrency(analysis.initialRealSalary)}</span>
                      </div>
                      <div className="analysis-item">
                        <span className="analysis-label">{t.finalSalary}:</span>
                        <span className="analysis-value negative">{formatCurrency(analysis.finalRealSalary)}</span>
                      </div>
                      <div className="analysis-item">
                        <span className="analysis-label">{t.purchasingPowerLossTotal}:</span>
                        <span className="analysis-value negative">{formatCurrency(analysis.totalLoss)}</span>
                      </div>
                      <div className="analysis-item">
                        <span className="analysis-label">{t.monthlyLoss}:</span>
                        <span className="analysis-value negative">{formatCurrency(analysis.monthlyAverageLoss)}</span>
                      </div>
                    </div>
                    
                    <div className="analysis-warnings">
                      {analysis.hungerThresholdMonth ? (
                        <div className="warning-item hunger">
                          <span className="warning-icon">📉</span>
                          <span>{t.hungerThresholdWarning.replace('{{month}}', analysis.hungerThresholdMonth.toString())}</span>
                        </div>
                      ) : null}
                      
                      {analysis.povertyThresholdMonth ? (
                        <div className="warning-item poverty">
                          <span className="warning-icon">📉</span>
                          <span>{t.povertyThresholdWarning.replace('{{month}}', analysis.povertyThresholdMonth.toString())}</span>
                        </div>
                      ) : null}
                      
                      {!analysis.hungerThresholdMonth && !analysis.povertyThresholdMonth ? (
                        <div className="warning-item success">
                          <span className="warning-icon">✅</span>
                          <span>{t.aboveThresholds}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Turkey Inflation Rates Chart */}
          {(
            <div className="chart-container">
              <h3 className="chart-subtitle">
                {t.inflationRatesChart}
              </h3>
              <Bar
                data={{
                  labels: turkeyInflationData.years,
                  datasets: [
                    {
                      label: t.tuikLabel,
                      data: turkeyInflationData.tuik,
                      backgroundColor: 'rgba(54, 162, 235, 0.8)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 2,
                      barPercentage: 0.7,
                      categoryPercentage: 0.8
                    },
                    {
                      label: t.enagLabel,
                      data: turkeyInflationData.enag,
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2,
                      barPercentage: 0.7,
                      categoryPercentage: 0.8
                    },
                    {
                      label: t.itoLabel,
                      data: turkeyInflationData.ito,
                      backgroundColor: 'rgba(255, 206, 86, 0.8)',
                      borderColor: 'rgba(255, 206, 86, 1)',
                      borderWidth: 2,
                      barPercentage: 0.7,
                      categoryPercentage: 0.8
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  interaction: {
                    mode: 'index' as const,
                    intersect: false,
                  },
                  plugins: {
                    datalabels: {
                      display: false
                    },
                    legend: {
                      position: 'top' as const,
                      display: true,
                      labels: {
                        usePointStyle: false,
                        padding: 25,
                        font: {
                          size: 18,
                          weight: 'bold'
                        },
                        color: '#000000',
                        boxWidth: 30,
                        boxHeight: 20
                      }
                    },
                    title: {
                      display: true,
                      text: t.yearlyInflationRates,
                      font: {
                        size: 16,
                        weight: 'bold'
                      },
                      padding: 20,
                      color: '#06b6d4'
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: 'white',
                      bodyColor: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: 1,
                      cornerRadius: 8,
                      callbacks: {
                        label: function(context) {
                          return `${context.dataset.label}: %${context.parsed.y}`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                      },
                      ticks: {
                        color: '#374151',
                        font: {
                          size: 12,
                          weight: 'bold'
                        }
                      }
                    },
                    y: {
                      beginAtZero: true,
                      max: 150,
                      grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                      },
                      ticks: {
                        color: '#000000',
                        font: {
                          size: 14,
                          weight: 'bold'
                        },
                        stepSize: 10,
                        padding: 8,
                        callback: function(value) {
                          return `%${value}`;
                        }
                      },
                      title: {
                        display: true,
                        text: 'Enflasyon Oranı (%)',
                        color: '#000000',
                        font: {
                          size: 16,
                          weight: 'bold'
                        },
                        padding: 15
                      }
                    }
                  }
                }}
              />
              
              {/* Years Display */}
              <div style={{
                marginTop: '15px',
                padding: '12px',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{ 
                  color: '#ffffff', 
                  margin: '0 0 10px 0', 
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  Analiz Edilen Yıllar
                </h4>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  {turkeyInflationData.years.map((year, index) => (
                    <div key={index} style={{
                      backgroundColor: '#374151',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      border: '2px solid #4b5563'
                    }}>
                      {year}
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Legend */}
              <div style={{
                marginTop: '15px',
                padding: '15px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h4 style={{ 
                  color: '#1f2937', 
                  margin: '0 0 15px 0', 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  Renk Açıklaması
                </h4>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'rgba(54, 162, 235, 0.8)',
                      border: '2px solid rgba(54, 162, 235, 1)',
                      borderRadius: '4px'
                    }}></div>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1f2937' }}>
                      {t.tuikLabel}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      border: '2px solid rgba(255, 99, 132, 1)',
                      borderRadius: '4px'
                    }}></div>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1f2937' }}>
                      {t.enagLabel}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'rgba(255, 206, 86, 0.8)',
                      border: '2px solid rgba(255, 206, 86, 1)',
                      borderRadius: '4px'
                    }}></div>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1f2937' }}>
                      {t.itoLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;