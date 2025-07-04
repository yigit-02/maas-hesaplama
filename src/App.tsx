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
    monthlyLoss: 'Aylık ortalama kayıp',
    // Tab labels
    salaryCalculatorTab: 'Maaş Hesaplayıcı',
    gdpContributionTab: 'GDP Katkı',
    taxContributionTab: 'Vergi Katkısı',
    purchasingPowerTab: 'Alım Gücü',
    internationalComparisonTab: 'Uluslararası Karşılaştırma',
    // GDP Contribution Module
    gdpContributionTitle: 'Saatlik GDP Katkı Hesaplayıcı',
    gdpContributionSubtitle: 'Türkiye ekonomisine saatlik katkınızı hesaplayın',
    hourlyGdpContribution: 'Saatlik GDP Katkınız',
    turkeyGdpPerCapita: 'Türkiye Kişi Başı GDP',
    gdpContributionResult: 'GDP Katkı Analizi',
    // Tax Contribution Module
    taxContributionTitle: 'Saatlik Vergi Katkısı',
    taxContributionSubtitle: 'Devlete saatlik vergi katkınızı hesaplayın',
    hourlyTaxContribution: 'Saatlik Vergi Katkınız',
    // Purchasing Power Module
    purchasingPowerTitle: 'Saatlik Alım Gücü',
    purchasingPowerSubtitle: 'Bir saatlik çalışmayla neler alabilirsiniz?',
    hourlyPurchasingPower: 'Saatlik Alım Gücünüz',
    // International Comparison Module
    internationalComparisonTitle: 'Uluslararası Karşılaştırma',
    internationalComparisonSubtitle: 'Maaşınızın dünya standartlarındaki karşılığı'
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
    monthlyLoss: 'Monthly average loss',
    // Tab labels
    salaryCalculatorTab: 'Salary Calculator',
    gdpContributionTab: 'GDP Contribution',
    taxContributionTab: 'Tax Contribution',
    purchasingPowerTab: 'Purchasing Power',
    internationalComparisonTab: 'International Comparison',
    // GDP Contribution Module
    gdpContributionTitle: 'Hourly GDP Contribution Calculator',
    gdpContributionSubtitle: 'Calculate your hourly contribution to Turkish economy',
    hourlyGdpContribution: 'Your Hourly GDP Contribution',
    turkeyGdpPerCapita: 'Turkey GDP Per Capita',
    gdpContributionResult: 'GDP Contribution Analysis',
    // Tax Contribution Module
    taxContributionTitle: 'Hourly Tax Contribution',
    taxContributionSubtitle: 'Calculate your hourly tax contribution to the state',
    hourlyTaxContribution: 'Your Hourly Tax Contribution',
    // Purchasing Power Module
    purchasingPowerTitle: 'Hourly Purchasing Power',
    purchasingPowerSubtitle: 'What can you buy with one hour of work?',
    hourlyPurchasingPower: 'Your Hourly Purchasing Power',
    // International Comparison Module
    internationalComparisonTitle: 'International Comparison',
    internationalComparisonSubtitle: 'Your salary equivalent in global standards'
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

// OECD countries comparison data (2024 estimates)
const oecdCountriesData = [
  {
    country: 'Turkey',
    flag: '🇹🇷',
    averageGrossSalary: 156000, // TL annually
    averageNetSalary: 108000, // TL annually
    pppFactor: 1.0, // Base for Turkey
    currencyCode: 'TL',
    costOfLivingIndex: 100, // Base index
    gdpPerCapita: 13000 // USD
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    averageGrossSalary: 58000, // EUR annually  
    averageNetSalary: 38000, // EUR annually
    pppFactor: 0.77, // EUR to TL PPP
    currencyCode: 'EUR',
    costOfLivingIndex: 180,
    gdpPerCapita: 48000
  },
  {
    country: 'United States',
    flag: '🇺🇸', 
    averageGrossSalary: 70000, // USD annually
    averageNetSalary: 52000, // USD annually
    pppFactor: 0.36, // USD to TL PPP
    currencyCode: 'USD',
    costOfLivingIndex: 200,
    gdpPerCapita: 80000
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    averageGrossSalary: 45000, // GBP annually
    averageNetSalary: 34000, // GBP annually
    pppFactor: 0.43, // GBP to TL PPP
    currencyCode: 'GBP',
    costOfLivingIndex: 190,
    gdpPerCapita: 46000
  },
  {
    country: 'France',
    flag: '🇫🇷',
    averageGrossSalary: 45000, // EUR annually
    averageNetSalary: 32000, // EUR annually
    pppFactor: 0.77, // EUR to TL PPP
    currencyCode: 'EUR',
    costOfLivingIndex: 175,
    gdpPerCapita: 42000
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    averageGrossSalary: 35000, // EUR annually
    averageNetSalary: 26000, // EUR annually
    pppFactor: 0.77, // EUR to TL PPP
    currencyCode: 'EUR',
    costOfLivingIndex: 160,
    gdpPerCapita: 32000
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    averageGrossSalary: 28000, // EUR annually
    averageNetSalary: 22000, // EUR annually
    pppFactor: 0.77, // EUR to TL PPP
    currencyCode: 'EUR',
    costOfLivingIndex: 150,
    gdpPerCapita: 28000
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    averageGrossSalary: 75000, // PLN annually
    averageNetSalary: 55000, // PLN annually
    pppFactor: 1.8, // PLN to TL PPP
    currencyCode: 'PLN',
    costOfLivingIndex: 130,
    gdpPerCapita: 17500
  },
  {
    country: 'Czech Republic',
    flag: '🇨🇿',
    averageGrossSalary: 500000, // CZK annually
    averageNetSalary: 380000, // CZK annually
    pppFactor: 12.5, // CZK to TL PPP
    currencyCode: 'CZK',
    costOfLivingIndex: 140,
    gdpPerCapita: 26500
  },
  {
    country: 'Greece',
    flag: '🇬🇷',
    averageGrossSalary: 20000, // EUR annually
    averageNetSalary: 16000, // EUR annually
    pppFactor: 0.77, // EUR to TL PPP
    currencyCode: 'EUR',
    costOfLivingIndex: 140,
    gdpPerCapita: 17000
  }
];

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
  const [activeTab, setActiveTab] = useState<'salary' | 'gdp' | 'taxes' | 'purchasing' | 'international'>('salary');

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
  // GDP calculation functions
  const calculateGdpContribution = () => {
    const numericGrossSalary = parseFloat(grossSalary.replace(/\./g, ''));
    if (!numericGrossSalary || numericGrossSalary <= 0) return null;
    
    const TURKEY_GDP_PER_CAPITA_USD = 13000; // 2024 estimate
    const WORKING_HOURS_PER_YEAR = 1750; // Standard working hours
    const WORKING_HOURS_PER_MONTH = 225; // 1750 / 12 * 1.5 adjustment
    const USD_TO_TL_RATE = 30; // Approximate exchange rate
    
    // Turkey's average hourly GDP contribution (reference)
    const turkeyAvgHourlyGdpUSD = TURKEY_GDP_PER_CAPITA_USD / WORKING_HOURS_PER_YEAR;
    const turkeyAvgHourlyGdpTL = turkeyAvgHourlyGdpUSD * USD_TO_TL_RATE;
    
    // User's hourly salary
    const monthlySalary = numericGrossSalary;
    const hourlySalary = monthlySalary / WORKING_HOURS_PER_MONTH;
    
    // User's estimated hourly GDP contribution (proportional to their salary vs average salary)
    const turkeyAvgMonthlySalary = 45000; // Approximate average monthly gross salary in Turkey
    const salaryMultiplier = monthlySalary / turkeyAvgMonthlySalary;
    const userHourlyGdpContributionTL = turkeyAvgHourlyGdpTL * salaryMultiplier;
    const userHourlyGdpContributionUSD = userHourlyGdpContributionTL / USD_TO_TL_RATE;
    
    return {
      hourlyGdpContribution: userHourlyGdpContributionUSD, // User's actual contribution
      hourlyGdpContributionTL: userHourlyGdpContributionTL,
      hourlySalary,
      turkeyAvgHourlyGdp: turkeyAvgHourlyGdpUSD, // Turkey average for comparison
      monthlyGdpContribution: userHourlyGdpContributionTL * WORKING_HOURS_PER_MONTH,
      gdpRatio: userHourlyGdpContributionUSD / turkeyAvgHourlyGdpUSD,
      salaryToGdpRatio: hourlySalary / userHourlyGdpContributionTL
    };
  };

  const calculateTaxContribution = () => {
    const numericGrossSalary = parseFloat(grossSalary.replace(/\./g, ''));
    if (!numericGrossSalary || numericGrossSalary <= 0) return null;
    
    const WORKING_HOURS_PER_MONTH = 225;
    
    // Calculate monthly taxes
    const sgkEmployee = numericGrossSalary * 0.14;
    const unemploymentEmployee = numericGrossSalary * 0.01;
    const totalIncomeTax = calculateIncomeTax(numericGrossSalary);
    const stampTax = numericGrossSalary * 0.00759;
    
    const totalMonthlyTax = sgkEmployee + unemploymentEmployee + totalIncomeTax + stampTax;
    const hourlyTax = totalMonthlyTax / WORKING_HOURS_PER_MONTH;
    
    return {
      hourlyTax,
      totalMonthlyTax,
      sgkEmployee,
      unemploymentEmployee,
      totalIncomeTax,
      stampTax
    };
  };

  const calculatePurchasingPower = () => {
    const numericGrossSalary = parseFloat(grossSalary.replace(/\./g, ''));
    if (!numericGrossSalary || numericGrossSalary <= 0) return null;
    
    const WORKING_HOURS_PER_MONTH = 225;
    
    // Calculate net salary (simplified)
    const sgkEmployee = numericGrossSalary * 0.14;
    const unemploymentEmployee = numericGrossSalary * 0.01;
    const totalIncomeTax = calculateIncomeTax(numericGrossSalary);
    const stampTax = numericGrossSalary * 0.00759;
    
    const netSalary = numericGrossSalary - sgkEmployee - unemploymentEmployee - totalIncomeTax - stampTax;
    const hourlyNet = netSalary / WORKING_HOURS_PER_MONTH;
    
    // Sample prices (2024 Turkey)
    const prices = {
      bigMac: 85, // TL
      coffee: 25, // TL
      bread: 8, // TL
      cinema: 60, // TL
      taxi: 28, // TL per km
      gasoline: 35 // TL per liter
    };
    
    return {
      hourlyNet,
      bigMac: hourlyNet / prices.bigMac,
      coffee: hourlyNet / prices.coffee,
      bread: hourlyNet / prices.bread,
      cinema: hourlyNet / prices.cinema,
      taxi: hourlyNet / prices.taxi,
      gasoline: hourlyNet / prices.gasoline
    };
  };

  const calculateInternationalComparison = () => {
    const numericGrossSalary = parseFloat(grossSalary.replace(/\./g, ''));
    if (!numericGrossSalary || numericGrossSalary <= 0) return null;
    
    // Calculate user's annual net salary in Turkey
    const sgkEmployee = numericGrossSalary * 0.14;
    const unemploymentEmployee = numericGrossSalary * 0.01;
    const totalIncomeTax = calculateIncomeTax(numericGrossSalary);
    const stampTax = numericGrossSalary * 0.00759;
    
    const monthlyNetSalary = numericGrossSalary - sgkEmployee - unemploymentEmployee - totalIncomeTax - stampTax;
    const annualNetSalary = monthlyNetSalary * 12;
    
    // Calculate comparisons for each country
    const comparisons = oecdCountriesData.map(country => {
      if (country.country === 'Turkey') {
        return {
          ...country,
          userSalaryInLocalCurrency: annualNetSalary,
          salaryDifferencePercentage: 0,
          pppAdjustedSalary: annualNetSalary,
          costAdjustedSalary: annualNetSalary,
          salaryRank: 'reference',
          monthlyEquivalent: monthlyNetSalary
        };
      }
      
      // Convert user's Turkish salary to other country's currency using PPP
      const salaryInLocalCurrency = annualNetSalary * country.pppFactor;
      
      // Calculate percentage difference from country average
      const salaryDifferencePercentage = ((salaryInLocalCurrency - country.averageNetSalary) / country.averageNetSalary) * 100;
      
      // PPP adjusted comparison (how much buying power you have)
      const pppAdjustedSalary = annualNetSalary / country.pppFactor;
      
      // Cost of living adjusted salary
      const costAdjustedSalary = (annualNetSalary / country.costOfLivingIndex) * 100;
      
      // Determine salary rank
      let salaryRank = 'average';
      if (salaryDifferencePercentage > 20) salaryRank = 'above_average';
      else if (salaryDifferencePercentage > 50) salaryRank = 'high';
      else if (salaryDifferencePercentage < -20) salaryRank = 'below_average';
      else if (salaryDifferencePercentage < -50) salaryRank = 'low';
      
      return {
        ...country,
        userSalaryInLocalCurrency: salaryInLocalCurrency,
        salaryDifferencePercentage,
        pppAdjustedSalary,
        costAdjustedSalary,
        salaryRank,
        monthlyEquivalent: salaryInLocalCurrency / 12
      };
    });
    
    // Sort by GDP per capita for better visualization
    comparisons.sort((a, b) => b.gdpPerCapita - a.gdpPerCapita);
    
    return {
      userAnnualNet: annualNetSalary,
      userMonthlyNet: monthlyNetSalary,
      comparisons
    };
  };

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
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem', 
        display: 'flex', 
        gap: '0.5rem'
      }} className="language-toggle">
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
          {activeTab === 'salary' ? t.title : 
           activeTab === 'gdp' ? t.gdpContributionTitle :
           activeTab === 'taxes' ? t.taxContributionTitle :
           activeTab === 'purchasing' ? t.purchasingPowerTitle :
           t.internationalComparisonTitle}
        </h1>
        <p className="subtitle">
          {activeTab === 'salary' ? t.subtitle : 
           activeTab === 'gdp' ? t.gdpContributionSubtitle :
           activeTab === 'taxes' ? t.taxContributionSubtitle :
           activeTab === 'purchasing' ? t.purchasingPowerSubtitle :
           t.internationalComparisonSubtitle}
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '2rem',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'salary', label: t.salaryCalculatorTab },
          { id: 'gdp', label: t.gdpContributionTab },
          { id: 'taxes', label: t.taxContributionTab },
          { id: 'purchasing', label: t.purchasingPowerTab },
          { id: 'international', label: t.internationalComparisonTab }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === tab.id ? '#06b6d4' : '#374151',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.id ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* GDP Contribution Module */}
      {activeTab === 'gdp' && (
        <div className="input-section">
          <div className="input-grid">
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
          </div>
          
          {grossSalary && (
            <div className="gdp-results" style={{ marginTop: '2rem' }}>
              {(() => {
                const gdpData = calculateGdpContribution();
                if (!gdpData) return null;
                
                return (
                  <div className="gdp-analysis">
                    <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>{t.gdpContributionResult}</h3>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ 
                        backgroundColor: '#f8fafc', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                          Saatlik GDP Katkınız
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                          ${gdpData.hourlyGdpContribution.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          ({formatCurrency(gdpData.hourlyGdpContributionTL)})
                        </div>
                      </div>
                      <div style={{ 
                        backgroundColor: '#f8fafc', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                          Saatlik Maaşınız
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0369a1' }}>
                          {formatCurrency(gdpData.hourlySalary)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          Aylık: {formatCurrency(gdpData.hourlySalary * 225)}
                        </div>
                      </div>
                      <div style={{ 
                        backgroundColor: '#f8fafc', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                          Türkiye Ortalaması ile Kıyas
                        </div>
                        <div style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: 'bold', 
                          color: gdpData.gdpRatio > 1 ? '#059669' : '#dc2626'
                        }}>
                          {gdpData.gdpRatio > 1 ? '+' : ''}{((gdpData.gdpRatio - 1) * 100).toFixed(1)}%
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          Ortalama: ${gdpData.turkeyAvgHourlyGdp.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      backgroundColor: '#0f172a', 
                      color: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '0.5rem',
                      marginTop: '1rem'
                    }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: '#06b6d4' }}>Analiz</h4>
                      <div style={{ display: 'grid', gap: '1rem' }}>
                        <p style={{ margin: '0', lineHeight: '1.6' }}>
                          <strong>💼 GDP Katkısı:</strong> Maaşınıza göre tahmini saatlik GDP katkınız{' '}
                          <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                            ${gdpData.hourlyGdpContribution.toFixed(2)}
                          </span>{' '}
                          ({formatCurrency(gdpData.hourlyGdpContributionTL)})
                        </p>
                        <p style={{ margin: '0', lineHeight: '1.6' }}>
                          <strong>📊 Ortalama ile Kıyas:</strong> Türkiye ortalamasından{' '}
                          <span style={{ 
                            color: gdpData.gdpRatio > 1 ? '#10b981' : '#ef4444',
                            fontWeight: 'bold'
                          }}>
                            %{Math.abs((gdpData.gdpRatio - 1) * 100).toFixed(1)} {gdpData.gdpRatio > 1 ? 'fazla' : 'az'}
                          </span>{' '}
                          ekonomik katkı sağlıyorsunuz.
                        </p>
                        <p style={{ margin: '0', lineHeight: '1.6' }}>
                          <strong>🎯 Değerlendirme:</strong>{' '}
                          {gdpData.gdpRatio > 1.5 
                            ? 'Ekonomiye çok yüksek katkı sağlıyorsunuz!'
                            : gdpData.gdpRatio > 1.1 
                            ? 'Ortalamanın üzerinde ekonomik katkı sağlıyorsunuz.'
                            : gdpData.gdpRatio > 0.9
                            ? 'Ortalamaya yakın ekonomik katkı sağlıyorsunuz.'
                            : 'Ortalamadan düşük ekonomik katkı sağlıyorsunuz.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Tax Contribution Module */}
      {activeTab === 'taxes' && (
        <div className="input-section">
          <div className="input-grid">
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
          </div>
          
          {grossSalary && (
            <div className="tax-results" style={{ marginTop: '2rem' }}>
              {(() => {
                const taxData = calculateTaxContribution();
                if (!taxData) return null;
                
                return (
                  <div className="tax-analysis">
                    <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>{t.hourlyTaxContribution}</h3>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ 
                        backgroundColor: '#fef3c7', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid #fbbf24'
                      }}>
                        <div style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.5rem' }}>
                          Saatlik Vergi Katkınız
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#92400e' }}>
                          {formatCurrency(taxData.hourlyTax)}
                        </div>
                      </div>
                      <div style={{ 
                        backgroundColor: '#fed7d7', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem',
                        border: '1px solid #f56565'
                      }}>
                        <div style={{ fontSize: '0.875rem', color: '#9b2c2c', marginBottom: '0.5rem' }}>
                          Aylık Toplam Vergi
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9b2c2c' }}>
                          {formatCurrency(taxData.totalMonthlyTax)}
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>SGK Primi</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af' }}>
                          {formatCurrency(taxData.sgkEmployee)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>İşsizlik Sigortası</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af' }}>
                          {formatCurrency(taxData.unemploymentEmployee)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Gelir Vergisi</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af' }}>
                          {formatCurrency(taxData.totalIncomeTax)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Damga Vergisi</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af' }}>
                          {formatCurrency(taxData.stampTax)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Purchasing Power Module */}
      {activeTab === 'purchasing' && (
        <div className="input-section">
          <div className="input-grid">
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
          </div>
          
          {grossSalary && (
            <div className="purchasing-results" style={{ marginTop: '2rem' }}>
              {(() => {
                const purchasingData = calculatePurchasingPower();
                if (!purchasingData) return null;
                
                return (
                  <div className="purchasing-analysis">
                    <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Bir Saatlik Çalışmayla Neler Alabilirsiniz?</h3>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {[
                        { icon: '🍔', label: 'Big Mac', value: purchasingData.bigMac.toFixed(2), unit: 'adet' },
                        { icon: '☕', label: 'Kahve', value: purchasingData.coffee.toFixed(2), unit: 'adet' },
                        { icon: '🍞', label: 'Ekmek', value: purchasingData.bread.toFixed(2), unit: 'adet' },
                        { icon: '🎬', label: 'Sinema', value: purchasingData.cinema.toFixed(2), unit: 'bilet' },
                        { icon: '🚖', label: 'Taksi', value: purchasingData.taxi.toFixed(2), unit: 'km' },
                        { icon: '⛽', label: 'Benzin', value: purchasingData.gasoline.toFixed(2), unit: 'litre' }
                      ].map((item, index) => (
                        <div key={index} style={{ 
                          backgroundColor: '#f8fafc', 
                          padding: '1.5rem', 
                          borderRadius: '0.5rem',
                          border: '1px solid #e2e8f0',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                          <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#059669' }}>
                            {item.value} {item.unit}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ 
                      backgroundColor: '#0f172a', 
                      color: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '0.5rem',
                      marginTop: '1rem'
                    }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: '#06b6d4' }}>Saatlik Net Kazancınız</h4>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                        {formatCurrency(purchasingData.hourlyNet)}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* International Comparison Module */}
      {activeTab === 'international' && (
        <div className="input-section">
          {/* Explanation Section */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h4 style={{ color: '#1f2937', marginBottom: '1rem', fontSize: '1.1rem' }}>
              🌍 Bu Sayfa Ne Yapıyor?
            </h4>
            <div style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '0.95rem' }}>
              <p style={{ margin: '0 0 1rem 0' }}>
                <strong>Türkiye'deki maaşınızın diğer ülkelerdeki karşılığını hesaplıyoruz.</strong> Sadece döviz kuruna bakmıyoruz, 
                gerçek yaşam koşullarını da hesaba katıyoruz.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                <div>
                  <h5 style={{ color: '#059669', margin: '0 0 0.5rem 0' }}>💰 Eşdeğer Maaş</h5>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>
                    Türkiye'deki net maaşınızın o ülkenin para biriminde ne kadar olacağını gösterir. 
                    Örnek: 50.000 TL → Almanya'da ~38.500 EUR
                  </p>
                </div>
                
                <div>
                  <h5 style={{ color: '#0369a1', margin: '0 0 0.5rem 0' }}>📊 Ülke Ortalaması ile Karşılaştırma</h5>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>
                    O ülkenin ortalama maaşından ne kadar fazla/az alacağınızı yüzde olarak gösterir.
                    Yeşil: Ortalamanın üstü, Kırmızı: Ortalamanın altı
                  </p>
                </div>
                
                <div>
                  <h5 style={{ color: '#7c3aed', margin: '0 0 0.5rem 0' }}>🛒 Satın Alma Gücü</h5>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>
                    Yaşam maliyetini hesaba katarak gerçek alım gücünüzü gösterir. 
                    %120 = Türkiye'den %20 daha fazla şey alabilirsiniz
                  </p>
                </div>
                
                <div>
                  <h5 style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>🏆 Maaş Sıralaması</h5>
                  <p style={{ margin: '0', fontSize: '0.9rem' }}>
                    O ülkede hangi gelir seviyesinde olacağınızı gösterir: 
                    Yüksek → Ortalamanın Üstü → Ortalama → Ortalamanın Altı → Düşük
                  </p>
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#0f172a', 
                color: 'white', 
                padding: '1rem', 
                borderRadius: '0.25rem',
                marginTop: '1rem'
              }}>
                <strong>💡 Özetle:</strong> Aynı maaşla hangi ülkede daha iyi yaşayabileceğinizi, 
                hangi ülkede ortalama bir vatandaş seviyesinde olacağınızı görürsünüz.
              </div>
            </div>
          </div>

          <div className="input-grid">
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
          </div>
          
          {grossSalary && (
            <div className="international-results" style={{ marginTop: '2rem' }}>
              {(() => {
                const internationalData = calculateInternationalComparison();
                if (!internationalData) return null;
                
                return (
                  <div className="international-analysis">
                    <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>OECD Ülkeleri Maaş Karşılaştırması</h3>
                    
                    {/* Summary Cards */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{ 
                        backgroundColor: '#0f172a', 
                        color: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem'
                      }}>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                          Türkiye'deki Net Maaşınız
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                          {formatCurrency(internationalData.userMonthlyNet)}/ay
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                          ({formatCurrency(internationalData.userAnnualNet)}/yıl)
                        </div>
                      </div>
                      
                      <div style={{ 
                        backgroundColor: '#1e40af', 
                        color: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '0.5rem'
                      }}>
                        <div style={{ fontSize: '0.875rem', color: '#dbeafe', marginBottom: '0.5rem' }}>
                          En Yüksek Satın Alma Gücü
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                          {internationalData.comparisons
                            .filter(c => c.country !== 'Turkey')
                            .sort((a, b) => b.costAdjustedSalary - a.costAdjustedSalary)[0]?.flag} {
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.costAdjustedSalary - a.costAdjustedSalary)[0]?.country
                          }
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#dbeafe' }}>
                          %{internationalData.comparisons
                            .filter(c => c.country !== 'Turkey')
                            .sort((a, b) => b.costAdjustedSalary - a.costAdjustedSalary)[0]?.costAdjustedSalary.toFixed(0)} 
                          satın alma gücü
                        </div>
                      </div>
                    </div>

                    {/* Countries Comparison Table */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ color: '#1f2937', marginBottom: '1rem' }}>Ülke Bazında Detaylı Karşılaştırma</h4>
                      <div style={{ 
                        display: 'grid', 
                        gap: '1rem'
                      }}>
                        {internationalData.comparisons.map((country, index) => {
                          const getRankColor = (rank: string) => {
                            switch(rank) {
                              case 'high': return '#10b981';
                              case 'above_average': return '#06b6d4';
                              case 'average': return '#8b5cf6';
                              case 'below_average': return '#f59e0b';
                              case 'low': return '#ef4444';
                              case 'reference': return '#6b7280';
                              default: return '#6b7280';
                            }
                          };
                          
                          const getRankText = (rank: string) => {
                            switch(rank) {
                              case 'high': return 'Yüksek';
                              case 'above_average': return 'Ortalamanın Üstü';
                              case 'average': return 'Ortalama';
                              case 'below_average': return 'Ortalamanın Altı';
                              case 'low': return 'Düşük';
                              case 'reference': return 'Referans';
                              default: return 'Ortalama';
                            }
                          };
                          
                          return (
                            <div key={index} style={{ 
                              backgroundColor: '#f8fafc', 
                              border: '1px solid #e2e8f0',
                              borderRadius: '0.5rem',
                              padding: '1.5rem',
                              display: 'grid',
                              gridTemplateColumns: 'auto 1fr auto auto auto',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <div style={{ 
                                fontSize: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                {country.flag}
                                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937' }}>
                                  {country.country}
                                </span>
                              </div>
                              
                              <div>
                                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  Eşdeğer Maaş
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937' }}>
                                  {country.userSalaryInLocalCurrency.toLocaleString('tr-TR', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                  })} {country.currencyCode}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                  (Aylık: {country.monthlyEquivalent.toLocaleString('tr-TR', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                  })})
                                </div>
                              </div>
                              
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  Ülke Ortalaması
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                                  {country.averageNetSalary.toLocaleString('tr-TR')} {country.currencyCode}
                                </div>
                                <div style={{ 
                                  fontSize: '0.875rem', 
                                  color: country.salaryDifferencePercentage >= 0 ? '#10b981' : '#ef4444',
                                  fontWeight: 'bold'
                                }}>
                                  {country.salaryDifferencePercentage >= 0 ? '+' : ''}{country.salaryDifferencePercentage.toFixed(1)}%
                                </div>
                              </div>
                              
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  Satın Alma Gücü
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                                  %{country.costAdjustedSalary.toFixed(0)}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                  (Türkiye=100%)
                                </div>
                              </div>
                              
                              <div style={{ 
                                padding: '0.5rem 1rem',
                                backgroundColor: getRankColor(country.salaryRank),
                                color: 'white',
                                borderRadius: '0.25rem',
                                fontSize: '0.875rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                minWidth: '120px'
                              }}>
                                {getRankText(country.salaryRank)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div style={{ 
                      backgroundColor: '#0f172a', 
                      color: 'white', 
                      padding: '2rem', 
                      borderRadius: '0.5rem'
                    }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: '#06b6d4' }}>Anahtar Bulgular</h4>
                      <div style={{ display: 'grid', gap: '1rem' }}>
                        <div>
                          <strong>💰 En Yüksek Eşdeğer Maaş:</strong> {
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.userSalaryInLocalCurrency - a.userSalaryInLocalCurrency)[0]?.flag
                          } {
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.userSalaryInLocalCurrency - a.userSalaryInLocalCurrency)[0]?.country
                          } ({
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.userSalaryInLocalCurrency - a.userSalaryInLocalCurrency)[0]?.userSalaryInLocalCurrency.toLocaleString('tr-TR', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              })
                          } {
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.userSalaryInLocalCurrency - a.userSalaryInLocalCurrency)[0]?.currencyCode
                          })
                        </div>
                        <div>
                          <strong>🛒 En Yüksek Satın Alma Gücü:</strong> {
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.costAdjustedSalary - a.costAdjustedSalary)[0]?.flag
                          } {
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.costAdjustedSalary - a.costAdjustedSalary)[0]?.country
                          } (%{
                            internationalData.comparisons
                              .filter(c => c.country !== 'Turkey')
                              .sort((a, b) => b.costAdjustedSalary - a.costAdjustedSalary)[0]?.costAdjustedSalary.toFixed(0)
                          })
                        </div>
                        <div>
                          <strong>📊 Ortalamanın Üstünde Olan Ülke Sayısı:</strong> {
                            internationalData.comparisons.filter(c => 
                              c.country !== 'Turkey' && (c.salaryRank === 'above_average' || c.salaryRank === 'high')
                            ).length
                          } / {internationalData.comparisons.length - 1}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Original Salary Calculator */}
      {activeTab === 'salary' && (
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
      )}

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
                }} className="years-container">
                  {turkeyInflationData.years.map((year, index) => (
                    <div key={index} style={{
                      backgroundColor: '#374151',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      border: '2px solid #4b5563'
                    }} className="year-item">
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
                }} className="color-legend-container">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="legend-item">
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
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="legend-item">
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
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="legend-item">
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