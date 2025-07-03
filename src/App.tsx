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
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
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
    inflationRatesChart: 'Türkiye Enflasyon Oranları (TÜIK ENAG vs İTO)',
    netSalaryLabel: 'Net Maaş',
    realSalaryLabel: 'Gerçek Net Maaş',
    hungerThreshold: 'Açlık Sınırı',
    povertyThreshold: 'Yoksulluk Sınırı',
    tuikEnagLabel: 'TÜIK ENAG',
    itoLabel: 'İTO',
    monthlyProjection: 'Aylık Projeksiyon',
    yearlyInflationRates: 'Yıllık Enflasyon Oranları'
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
    inflationRatesChart: 'Turkey Inflation Rates (TUIK ENAG vs ITO)',
    netSalaryLabel: 'Net Salary',
    realSalaryLabel: 'Real Net Salary',
    hungerThreshold: 'Hunger Threshold',
    povertyThreshold: 'Poverty Threshold',
    tuikEnagLabel: 'TUIK ENAG',
    itoLabel: 'ITO',
    monthlyProjection: 'Monthly Projection',
    yearlyInflationRates: 'Yearly Inflation Rates'
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

// Turkish income tax brackets for 2024 (based on your document)
const incomeTaxBrackets = [
  { min: 0, max: 110000, rate: 0.15 },
  { min: 110000, max: 230000, rate: 0.20 },
  { min: 230000, max: 580000, rate: 0.27 },
  { min: 580000, max: Infinity, rate: 0.35 }
];

// Tax exemptions (2024 values)
const taxExemptions = {
  incomeExemption: 3315.70, // Monthly income tax exemption
  stampExemption: 197.38    // Monthly stamp tax exemption
};

// Poverty and hunger thresholds (2024 values - TÜRK-İŞ data)
const povertyThresholds = {
  hungerThreshold: 19662, // Monthly hunger threshold for 4-person family
  povertyThreshold: 64055 // Monthly poverty threshold for 4-person family
};

// Turkey inflation data (TÜIK ENAG and İTO yearly rates)
const turkeyInflationData = {
  years: ['2019', '2020', '2021', '2022', '2023', '2024'],
  tuikEnag: [15.2, 14.6, 36.1, 72.3, 61.9, 75.5],
  ito: [18.5, 16.2, 42.3, 83.4, 68.1, 82.3]
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
  }, []);

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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
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
      
      // Calculate exemptions
      const incomeExemption = Math.min(monthlyIncomeTax, taxExemptions.incomeExemption);
      const stampExemption = Math.min(stampTax, taxExemptions.stampExemption);
      
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
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    hidden: !hasCalculated
                  },
                  {
                    label: t.realSalaryLabel,
                    data: results.map(r => r.realSalary),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    hidden: !hasCalculated
                  },
                  {
                    label: t.hungerThreshold,
                    data: new Array(12).fill(povertyThresholds.hungerThreshold),
                    borderColor: 'rgb(255, 205, 86)',
                    backgroundColor: 'rgba(255, 205, 86, 0.2)',
                    borderDash: [5, 5],
                    tension: 0
                  },
                  {
                    label: t.povertyThreshold,
                    data: new Array(12).fill(povertyThresholds.povertyThreshold),
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderDash: [10, 5],
                    tension: 0
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: t.monthlyProjection
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return formatCurrency(Number(value));
                      }
                    }
                  }
                }
              }}
            />
          </div>

          {/* Turkey Inflation Rates Chart */}
          {selectedInflation === 75.5 && hasCalculated && (
            <div className="chart-container">
              <h3 className="chart-subtitle">
                {t.inflationRatesChart}
              </h3>
              <Bar
                data={{
                  labels: turkeyInflationData.years,
                  datasets: [
                    {
                      label: t.tuikEnagLabel,
                      data: turkeyInflationData.tuikEnag,
                      backgroundColor: 'rgba(54, 162, 235, 0.8)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                    },
                    {
                      label: t.itoLabel,
                      data: turkeyInflationData.ito,
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: t.yearlyInflationRates
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.dataset.label}: %${context.parsed.y}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return `%${value}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;