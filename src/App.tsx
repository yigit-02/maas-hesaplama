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
    internationalComparisonSubtitle: 'Maaşınızın dünya standartlarındaki karşılığı',
    // Additional translations
    monthlyTotalTax: 'Aylık Toplam Vergi',
    hourlyNetEarnings: 'Saatlik Net Kazancınız',
    turkeyNetSalary: 'Türkiye\'deki Net Maaşınız',
    analysisYears: 'Analiz Edilen Yıllar',
    colorLegend: 'Renk Açıklaması',
    netSalaryMode: 'Net maaş olarak alıyorum',
    netSalaryTooltip: 'Şirketinizden net maaş alıyorsanız bu seçeneği işaretleyin',
    salaryIncrease: 'Zam (%)',
    salaryIncreaseTooltip: 'Bu ayda aldığınız zam oranını girin',
    salaryIncreaseInput: 'Aylık Zam Oranları',
    salaryIncreaseDescription: 'Hangi ayda kaç yüzde zam aldığınızı belirtebilirsiniz',
    simpleRaiseInput: 'Zam Bilgisi',
    simpleRaiseTemplate: '__. ayda __%% kadar zam aldım',
    monthPlaceholder: 'Ay',
    percentPlaceholder: '%',
    showDetailedRaises: 'Detaylı ay ay zam girişi',
    hideDetailedRaises: 'Basit zam girişi',
    raiseInfoNote: 'Eğer zam aldıysanız ekleyebilirsiniz',
    netSalaryNote: 'Şirketinizden kesintisiz maaş alıyorsanız işaretleyin'
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
    internationalComparisonSubtitle: 'Your salary equivalent in global standards',
    // Additional translations
    monthlyTotalTax: 'Monthly Total Tax',
    hourlyNetEarnings: 'Your Hourly Net Earnings',
    turkeyNetSalary: 'Your Net Salary in Turkey',
    analysisYears: 'Years Analyzed',
    colorLegend: 'Color Legend',
    netSalaryMode: 'I receive net salary',
    netSalaryTooltip: 'Check this if you receive net salary from your company',
    salaryIncrease: 'Raise (%)',
    salaryIncreaseTooltip: 'Enter the raise percentage for this month',
    salaryIncreaseInput: 'Monthly Salary Raises',
    salaryIncreaseDescription: 'You can specify what percentage raise you received in which month',
    simpleRaiseInput: 'Salary Raise Information',
    simpleRaiseTemplate: 'I got __% raise in month __',
    monthPlaceholder: 'Month',
    percentPlaceholder: '%',
    showDetailedRaises: 'Detailed monthly raise input',
    hideDetailedRaises: 'Simple raise input',
    raiseInfoNote: 'Add if you received any salary raise',
    netSalaryNote: 'Check if you receive salary without deductions'
  }
};

// Inflation scenarios with country data (based on Trading Economics 2024)
const getInflationScenarios = (t: any, language: 'tr' | 'en') => {
  const countries = language === 'tr' ? {
    'Zimbabwe': 'Zimbabve',
    'Lebanon': 'Lübnan',
    'Turkey': 'Türkiye',
    'Argentina': 'Arjantin',
    'Iran': 'İran',
    'Russia': 'Rusya',
    'Egypt': 'Mısır',
    'Ethiopia': 'Etiyopya',
    'Venezuela': 'Venezuela',
    'Pakistan': 'Pakistan',
    'Ghana': 'Gana',
    'Nigeria': 'Nijerya',
    'Ukraine': 'Ukrayna',
    'South Africa': 'Güney Afrika',
    'India': 'Hindistan',
    'Brazil': 'Brezilya',
    'Mexico': 'Meksika',
    'Indonesia': 'Endonezya',
    'South Korea': 'Güney Kore',
    'China': 'Çin',
    'United Kingdom': 'İngiltere',
    'Canada': 'Kanada',
    'USA': 'ABD',
    'Australia': 'Avustralya',
    'Germany': 'Almanya',
    'France': 'Fransa',
    'Japan': 'Japonya',
    'Sweden': 'İsveç',
    'Norway': 'Norveç',
    'Switzerland': 'İsviçre'
  } : {
    'Zimbabwe': 'Zimbabwe',
    'Lebanon': 'Lebanon',
    'Turkey': 'Turkey',
    'Argentina': 'Argentina',
    'Iran': 'Iran',
    'Russia': 'Russia',
    'Egypt': 'Egypt',
    'Ethiopia': 'Ethiopia',
    'Venezuela': 'Venezuela',
    'Pakistan': 'Pakistan',
    'Ghana': 'Ghana',
    'Nigeria': 'Nigeria',
    'Ukraine': 'Ukraine',
    'South Africa': 'South Africa',
    'India': 'India',
    'Brazil': 'Brazil',
    'Mexico': 'Mexico',
    'Indonesia': 'Indonesia',
    'South Korea': 'South Korea',
    'China': 'China',
    'United Kingdom': 'United Kingdom',
    'Canada': 'Canada',
    'USA': 'USA',
    'Australia': 'Australia',
    'Germany': 'Germany',
    'France': 'France',
    'Japan': 'Japan',
    'Sweden': 'Sweden',
    'Norway': 'Norway',
    'Switzerland': 'Switzerland'
  };

  return [
    { label: `🇿🇼 ${countries['Zimbabwe']}`, value: 339.7 },
    { label: `🇱🇧 ${countries['Lebanon']}`, value: 221.3 },
    { label: `🇹🇷 ${countries['Turkey']}`, value: 75.5 },
    { label: `🇦🇷 ${countries['Argentina']}`, value: 65.2 },
    { label: `🇮🇷 ${countries['Iran']}`, value: 48.5 },
    { label: `🇷🇺 ${countries['Russia']}`, value: 36.4 },
    { label: `🇪🇬 ${countries['Egypt']}`, value: 33.9 },
    { label: `🇪🇹 ${countries['Ethiopia']}`, value: 28.9 },
    { label: `🇻🇪 ${countries['Venezuela']}`, value: 23.6 },
    { label: `🇵🇰 ${countries['Pakistan']}`, value: 22.4 },
    { label: `🇬🇭 ${countries['Ghana']}`, value: 21.5 },
    { label: `🇳🇬 ${countries['Nigeria']}`, value: 18.6 },
    { label: `🇺🇦 ${countries['Ukraine']}`, value: 14.8 },
    { label: `🇿🇦 ${countries['South Africa']}`, value: 11.1 },
    { label: `🇮🇳 ${countries['India']}`, value: 8.7 },
    { label: `🇧🇷 ${countries['Brazil']}`, value: 7.8 },
    { label: `🇲🇽 ${countries['Mexico']}`, value: 6.9 },
    { label: `🇮🇩 ${countries['Indonesia']}`, value: 5.4 },
    { label: `🇰🇷 ${countries['South Korea']}`, value: 4.2 },
    { label: `🇨🇳 ${countries['China']}`, value: 3.8 },
    { label: `🇬🇧 ${countries['United Kingdom']}`, value: 3.4 },
    { label: `🇨🇦 ${countries['Canada']}`, value: 2.9 },
    { label: `🇺🇸 ${countries['USA']}`, value: 2.4 },
    { label: `🇦🇺 ${countries['Australia']}`, value: 2.1 },
    { label: `🇩🇪 ${countries['Germany']}`, value: 2.1 },
    { label: `🇫🇷 ${countries['France']}`, value: 1.9 },
    { label: `🇯🇵 ${countries['Japan']}`, value: 1.8 },
    { label: `🇸🇪 ${countries['Sweden']}`, value: 1.5 },
    { label: `🇳🇴 ${countries['Norway']}`, value: 1.3 },
    { label: `🇨🇭 ${countries['Switzerland']}`, value: 0.7 },
    { label: t.custom, value: 0 }
  ];
};

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
  const [grossSalary, setGrossSalary] = useState<string>('45.000');
  const [selectedInflation, setSelectedInflation] = useState<number>(75.5);
  const [customInflation, setCustomInflation] = useState<string>('');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'simple' | 'detailed'>('simple');
  const [showCharts, setShowCharts] = useState<boolean>(true);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'salary' | 'gdp' | 'taxes' | 'purchasing' | 'international'>('salary');
  const [monthlySalaries, setMonthlySalaries] = useState<string[]>(Array(12).fill(''));
  const [isNetSalary, setIsNetSalary] = useState<boolean>(false);
  const [salaryIncreases, setSalaryIncreases] = useState<string[]>(Array(12).fill(''));
  const [showDetailedRaises, setShowDetailedRaises] = useState<boolean>(false);
  const [simpleRaiseMonth, setSimpleRaiseMonth] = useState<string>('');
  const [simpleRaisePercent, setSimpleRaisePercent] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showComprehensiveReport, setShowComprehensiveReport] = useState<boolean>(false);
  const [comprehensiveReport, setComprehensiveReport] = useState<any>(null);
  const [weeklyWorkingHours, setWeeklyWorkingHours] = useState<string>('45'); // Default 45 hours per week

  const t = translations[language];
  const allInflationScenarios = getInflationScenarios(t, language);
  
  // Extract country name from scenario label (removing flag emojis)
  const getCountryName = (label: string) => {
    return label.replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '').trim();
  };

  // Filter scenarios based on search term
  const filteredInflationScenarios = React.useMemo(() => {
    if (!searchTerm) return allInflationScenarios;
    
    return allInflationScenarios.filter(scenario => {
      const countryName = getCountryName(scenario.label);
      return countryName.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }, [allInflationScenarios, searchTerm]);
  
  // Mobile detection hook
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Update monthly salaries when gross salary changes
  React.useEffect(() => {
    if (grossSalary) {
      setMonthlySalaries(Array(12).fill(grossSalary));
    }
  }, [grossSalary]);

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

  // Handle monthly salary changes
  const handleMonthlySalaryChange = (monthIndex: number, value: string) => {
    const formatted = formatNumber(value);
    const newSalaries = [...monthlySalaries];
    
    // Update current month
    newSalaries[monthIndex] = formatted;
    
    // Update all subsequent months with the same value
    for (let i = monthIndex + 1; i < 12; i++) {
      newSalaries[i] = formatted;
    }
    
    setMonthlySalaries(newSalaries);
    setError('');
  };

  // Handle salary increase changes
  const handleSalaryIncreaseChange = (monthIndex: number, value: string) => {
    const newIncreases = [...salaryIncreases];
    newIncreases[monthIndex] = value;
    setSalaryIncreases(newIncreases);
    
    // If there's an increase, apply it to the salary and subsequent months
    if (value && parseFloat(value) > 0) {
      const currentSalary = parseFloat((monthlySalaries[monthIndex] || grossSalary).replace(/\./g, '')) || 0;
      const increasePercent = parseFloat(value) / 100;
      const newSalary = Math.round(currentSalary * (1 + increasePercent));
      const formattedNewSalary = formatNumber(newSalary.toString());
      
      const newSalaries = [...monthlySalaries];
      newSalaries[monthIndex] = formattedNewSalary;
      
      // Update all subsequent months with the increased value
      for (let i = monthIndex + 1; i < 12; i++) {
        newSalaries[i] = formattedNewSalary;
      }
      
      setMonthlySalaries(newSalaries);
    }
    
    setError('');
  };

  // Handle simple raise input
  const handleSimpleRaiseApply = () => {
    if (simpleRaiseMonth && simpleRaisePercent) {
      const monthIndex = parseInt(simpleRaiseMonth) - 1;
      const percent = simpleRaisePercent;
      
      if (monthIndex >= 0 && monthIndex < 12) {
        // Clear all previous increases
        setSalaryIncreases(Array(12).fill(''));
        
        // Apply the single increase
        const newIncreases = Array(12).fill('');
        newIncreases[monthIndex] = percent;
        setSalaryIncreases(newIncreases);
        
        // Apply to salary
        handleSalaryIncreaseChange(monthIndex, percent);
        
        setError('');
      }
    }
  };

  // Handle custom inflation change
  const handleCustomInflationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInflation(value);
    if (value) {
      setSelectedInflation(parseFloat(value) || 0);
    } else {
      // Reset to Turkey's default inflation rate when custom input is cleared
      setSelectedInflation(75.5);
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

  // Handle keyboard search in dropdown
  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    const key = e.key.toLowerCase();
    
    // Only handle letter keys
    if (key.length === 1 && /[a-z]/.test(key)) {
      // Clear previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      
      // Update search term
      const newSearchTerm = searchTerm + key;
      setSearchTerm(newSearchTerm);
      
      // Find matching option
      const matchingScenario = allInflationScenarios.find(scenario => {
        const countryName = getCountryName(scenario.label);
        return countryName.toLowerCase().startsWith(newSearchTerm.toLowerCase());
      });
      
      if (matchingScenario) {
        setSelectedInflation(matchingScenario.value);
        if (matchingScenario.value !== 0) {
          setCustomInflation('');
        }
      }
      
      // Clear search term after delay
      const timeout = setTimeout(() => {
        setSearchTerm('');
      }, 1000);
      setSearchTimeout(timeout);
      
      e.preventDefault();
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
    
    // Calculate working hours per month based on user input
    const weeklyHours = parseFloat(weeklyWorkingHours) || 45;
    const WORKING_HOURS_PER_MONTH = (weeklyHours * 52) / 12; // weeks per year / months per year
    
    // Calculate net salary (simplified)
    const sgkEmployee = numericGrossSalary * 0.14;
    const unemploymentEmployee = numericGrossSalary * 0.01;
    const totalIncomeTax = calculateIncomeTax(numericGrossSalary);
    const stampTax = numericGrossSalary * 0.00759;
    
    const netSalary = numericGrossSalary - sgkEmployee - unemploymentEmployee - totalIncomeTax - stampTax;
    const hourlyNet = netSalary / WORKING_HOURS_PER_MONTH;
    
    // Real market prices (2024 Turkey)
    const prices = {
      // Temel Gıda
      bread: 12, // Somun Ekmek (Beyaz, 250 gr)
      eggs: 95, // Yumurta (15'li, L Boy)
      milk: 55, // Süt (1 Litre, Tam Yağlı)
      
      // Günlük İhtiyaçlar
      coffee: 120, // Sade Kahve (Zincir Kafe, filtre)
      gasoline: 48, // Benzin (1 Litre, Ortalama)
      water: 15, // Su (0.5 Litre Şişe)
      transport: 17.70, // Toplu Taşıma (Tek Biniş, İstanbul)
      chips: 65, // Cips (Büyük Boy Paket)
      chocolate: 50, // Tablet Çikolata (80 gr, Markalı)
      toothpaste: 90, // Diş Macunu (Büyük Boy, Markalı)
      soap: 60, // Sıvı Sabun (500 ml, Ekonomik)
      
      // Kültür & Eğlence
      book: 150, // Kitap (Ortalama Roman Fiyatı)
      cinema: 250, // Sinema Bileti (Tam, Hafta İçi)
      
      // Lüks & Büyük Harcama
      luxuryCar: 3800000, // Lüks Otomobil (Örn: Mercedes C Serisi, Sıfır, Başlangıç)
      apartment: 10000000, // Kadıköy'de 3+1 Daire (Satılık, Ortalama)
      summerHouse: 12000000, // Yazlık (Ortalama, Müstakil Ev)
      smartphone: 60000, // Son Model Akıllı Telefon (Amiral Gemi)
      vacation: 80000, // Yurt Dışı Tatili (2 Kişilik, 5 Gün, Ortalama)
      
      // Diğer
      shoes: 2000, // Spor Ayakkabı (Markalı, Ortalama)
      hairDryer: 1500 // Saç Kurutma Makinesi (Kaliteli)
    };
    
    return {
      hourlyNet,
      // Temel Gıda
      bread: hourlyNet / prices.bread,
      eggs: hourlyNet / prices.eggs,
      milk: hourlyNet / prices.milk,
      
      // Günlük İhtiyaçlar
      coffee: hourlyNet / prices.coffee,
      gasoline: hourlyNet / prices.gasoline,
      water: hourlyNet / prices.water,
      transport: hourlyNet / prices.transport,
      chips: hourlyNet / prices.chips,
      chocolate: hourlyNet / prices.chocolate,
      toothpaste: hourlyNet / prices.toothpaste,
      soap: hourlyNet / prices.soap,
      
      // Kültür & Eğlence
      book: hourlyNet / prices.book,
      cinema: hourlyNet / prices.cinema,
      
      // Lüks & Büyük Harcama
      luxuryCar: hourlyNet / prices.luxuryCar,
      apartment: hourlyNet / prices.apartment,
      summerHouse: hourlyNet / prices.summerHouse,
      smartphone: hourlyNet / prices.smartphone,
      vacation: hourlyNet / prices.vacation,
      
      // Diğer
      shoes: hourlyNet / prices.shoes,
      hairDryer: hourlyNet / prices.hairDryer,
      
      // Prices for display
      prices
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

  // Generate comprehensive report combining all analyses
  const generateComprehensiveReport = (reportData: any) => {
    const {salary, gdp, tax, purchasing, international} = reportData;
    
    if (!gdp || !tax || !purchasing || !international) return null;
    
    const numericSalary = parseFloat(salary.replace(/\./g, ''));
    const monthlySalary = numericSalary;
    const annualSalary = monthlySalary * 12;
    
    return {
      summary: {
        monthlySalary: formatCurrency(monthlySalary),
        annualSalary: formatCurrency(annualSalary),
        hourlyGdp: `$${gdp.hourlyGdpContribution.toFixed(2)}`,
        hourlyTax: formatCurrency(tax.hourlyTax),
        gdpRatio: ((gdp.gdpRatio - 1) * 100).toFixed(1),
        taxRatio: ((tax.taxRatio - 1) * 100).toFixed(1),
        internationalRank: international.comparisons.findIndex((c: any) => c.country === 'Turkey') + 1,
        totalCountries: international.comparisons.length
      },
      insights: [
        `GDP katkınız Türkiye ortalamasından %${Math.abs((gdp.gdpRatio - 1) * 100).toFixed(1)} ${gdp.gdpRatio > 1 ? 'fazla' : 'az'}`,
        `Vergi katkınız ortalamanın %${Math.abs((tax.taxRatio - 1) * 100).toFixed(1)} ${tax.taxRatio > 1 ? 'üstünde' : 'altında'}`,
        `OECD ülkeleri arasında ${international.comparisons.findIndex((c: any) => c.country === 'Turkey') + 1}. sıradasınız`,
        `Saatlik GDP katkınız: ${gdp.hourlyGdpContribution.toFixed(2)} USD`
      ]
    };
  };

  const calculateSalary = () => {
    // Check if we have monthly salaries or use main gross salary
    const salariesToUse = monthlySalaries.some(salary => salary !== '') ? monthlySalaries : Array(12).fill(grossSalary);
    
    // Validate that we have at least one salary
    const hasValidSalary = salariesToUse.some(salary => {
      const numeric = parseFloat(salary.replace(/\./g, ''));
      return numeric && numeric > 0;
    });
    
    if (!hasValidSalary) {
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
      // Use individual monthly salary or default to zero if empty
      const monthlySalaryStr = salariesToUse[month - 1] || '0';
      let numericGrossSalary = parseFloat(monthlySalaryStr.replace(/\./g, '')) || 0;
      
      // If net salary mode is enabled, treat input as net salary
      // For calculations, we still need to show the gross equivalent
      const displayGrossSalary = numericGrossSalary;
      
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
      let totalEmployeeDeductions, netSalary, netPayableAmount;
      
      if (isNetSalary) {
        // If user receives net salary, treat input as net amount
        netPayableAmount = numericGrossSalary;
        netSalary = numericGrossSalary;
        totalEmployeeDeductions = 0; // No deductions since it's already net
      } else {
        // Normal gross salary calculation
        totalEmployeeDeductions = sgkEmployee + unemploymentEmployee + netIncomeTax + netStampTax;
        netSalary = numericGrossSalary - totalEmployeeDeductions;
        netPayableAmount = netSalary;
      }
      
      const minimumLivingAllowance = 0; // Not applied in this case
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
                placeholder="45.000"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Haftada Kaç Saat Çalışıyorsunuz?
              </label>
              <input
                type="number"
                value={weeklyWorkingHours}
                onChange={(e) => setWeeklyWorkingHours(e.target.value)}
                placeholder="45"
                min="1"
                max="80"
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
                placeholder="45.000"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Haftada Kaç Saat Çalışıyorsunuz?
              </label>
              <input
                type="number"
                value={weeklyWorkingHours}
                onChange={(e) => setWeeklyWorkingHours(e.target.value)}
                placeholder="45"
                min="1"
                max="80"
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
                          {t.monthlyTotalTax}
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
                placeholder="45.000"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Haftada Kaç Saat Çalışıyorsunuz?
              </label>
              <input
                type="number"
                value={weeklyWorkingHours}
                onChange={(e) => setWeeklyWorkingHours(e.target.value)}
                placeholder="45"
                min="1"
                max="80"
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
                    <div style={{ 
                      backgroundColor: '#f8fafc', 
                      padding: '1rem', 
                      borderRadius: '0.5rem', 
                      marginBottom: '1.5rem',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                        Çalışma Saatleriniz
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                        Haftada {weeklyWorkingHours} saat = Ayda {((parseFloat(weeklyWorkingHours) || 45) * 52 / 12).toFixed(0)} saat
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                        Saatlik net kazancınız: {formatCurrency(purchasingData.hourlyNet)}
                      </div>
                    </div>
                    <h3 style={{ color: '#06b6d4', marginBottom: '1rem' }}>Bir Saatlik Çalışmayla Neler Alabilirsiniz?</h3>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {[
                        // Temel Gıda
                        { icon: '🍞', label: 'Somun Ekmek (250g)', value: purchasingData.bread.toFixed(2), unit: 'adet', price: purchasingData.prices.bread },
                        { icon: '🥚', label: 'Yumurta (15li)', value: purchasingData.eggs.toFixed(2), unit: 'paket', price: purchasingData.prices.eggs },
                        { icon: '🥛', label: 'Süt (1L)', value: purchasingData.milk.toFixed(2), unit: 'şişe', price: purchasingData.prices.milk },
                        
                        // Günlük İhtiyaçlar
                        { icon: '☕', label: 'Filtre Kahve', value: purchasingData.coffee.toFixed(2), unit: 'adet', price: purchasingData.prices.coffee },
                        { icon: '⛽', label: 'Benzin', value: purchasingData.gasoline.toFixed(2), unit: 'litre', price: purchasingData.prices.gasoline },
                        { icon: '💧', label: 'Su (0.5L)', value: purchasingData.water.toFixed(2), unit: 'şişe', price: purchasingData.prices.water },
                        { icon: '🚌', label: 'Toplu Taşıma', value: purchasingData.transport.toFixed(2), unit: 'biniş', price: purchasingData.prices.transport },
                        { icon: '🍿', label: 'Cips (Büyük)', value: purchasingData.chips.toFixed(2), unit: 'paket', price: purchasingData.prices.chips },
                        { icon: '🍫', label: 'Çikolata (80g)', value: purchasingData.chocolate.toFixed(2), unit: 'adet', price: purchasingData.prices.chocolate },
                        
                        // Kültür & Eğlence
                        { icon: '📚', label: 'Roman Kitap', value: purchasingData.book.toFixed(2), unit: 'adet', price: purchasingData.prices.book },
                        { icon: '🎬', label: 'Sinema Bileti', value: purchasingData.cinema.toFixed(2), unit: 'bilet', price: purchasingData.prices.cinema },
                        
                        // Diğer
                        { icon: '👟', label: 'Spor Ayakkabı', value: purchasingData.shoes.toFixed(3), unit: 'çift', price: purchasingData.prices.shoes },
                        { icon: '💨', label: 'Saç Kurutma Makinesi', value: purchasingData.hairDryer.toFixed(3), unit: 'adet', price: purchasingData.prices.hairDryer }
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
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                            ({formatCurrency(item.price)} / {item.unit})
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ 
                      backgroundColor: '#0f172a', 
                      color: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '0.5rem',
                      marginTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <h4 style={{ margin: '0 0 1rem 0', color: '#06b6d4' }}>{t.hourlyNetEarnings}</h4>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                          {formatCurrency(purchasingData.hourlyNet)}
                        </div>
                      </div>
                      <div style={{ 
                        textAlign: 'right',
                        borderLeft: '2px solid #06b6d4',
                        paddingLeft: '1.5rem'
                      }}>
                        <div style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                          Saatlik Net Kazancınız
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#06b6d4' }}>
                          {formatCurrency(purchasingData.hourlyNet)}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                          /saat
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
                placeholder="45.000"
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <h3 style={{ color: '#06b6d4', margin: '0' }}>OECD Ülkeleri Maaş Karşılaştırması</h3>
                      <button
                        onClick={() => {
                          // Generate comprehensive report
                          const reportData = {
                            salary: grossSalary,
                            gdp: calculateGdpContribution(),
                            tax: calculateTaxContribution(),
                            purchasing: calculatePurchasingPower(),
                            international: calculateInternationalComparison()
                          };
                          
                          // Create comprehensive report display
                          const reportContent = generateComprehensiveReport(reportData);
                          setComprehensiveReport(reportContent);
                          setShowComprehensiveReport(true);
                        }}
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        📊 Genel Rapor
                      </button>
                    </div>
                    
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
                          {t.turkeyNetSalary}
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
              {isNetSalary ? (language === 'tr' ? 'Net Aylık Maaş (₺)' : 'Net Monthly Salary (₺)') : t.grossSalary}
            </label>
            <input
              type="text"
              value={grossSalary}
              onChange={handleGrossSalaryChange}
              placeholder="45.000"
              className="form-input"
            />
          </div>

          {/* Inflation Scenario Dropdown */}
          <div className="form-group">
            <label className="form-label">
              {t.inflationScenario}
              {searchTerm && (
                <span style={{ 
                  marginLeft: '0.5rem', 
                  fontSize: '0.75rem', 
                  color: '#06b6d4',
                  backgroundColor: '#1e293b',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #475569'
                }}>
                  {language === 'tr' ? `Arıyor: ${searchTerm}` : `Searching: ${searchTerm}`}
                </span>
              )}
            </label>
            <select
              value={customInflation ? 0 : selectedInflation}
              onChange={handleInflationScenarioChange}
              onKeyDown={handleDropdownKeyDown}
              className="form-select"
              title={language === 'tr' ? 'Klavyeden ülke adını yazarak arayabilirsiniz' : 'Type country name to search'}
            >
              {allInflationScenarios.map((scenario, index) => (
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

        {/* Salary Raise Input Section */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            backgroundColor: '#1e293b', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            border: '1px solid #475569'
          }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <h3 style={{ 
                color: '#06b6d4', 
                fontSize: '1rem', 
                fontWeight: '600', 
                marginBottom: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                {t.simpleRaiseInput}
                <button
                onClick={() => setShowDetailedRaises(!showDetailedRaises)}
                style={{
                  background: 'none',
                  border: '1px solid #475569',
                  color: '#94a3b8',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.7rem',
                  cursor: 'pointer'
                }}
              >
                {showDetailedRaises ? t.hideDetailedRaises : t.showDetailedRaises}
              </button>
              </h3>
              <p style={{ 
                color: '#94a3b8', 
                fontSize: '0.8rem', 
                margin: '0' 
              }}>
                {t.raiseInfoNote}
              </p>
            </div>
            
            {!showDetailedRaises ? (
              // Simple raise input
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ color: '#cbd5e1', fontSize: '1rem' }}>
                  {language === 'tr' ? '' : 'I got '}
                </span>
                <input
                  type="number"
                  value={simpleRaisePercent}
                  onChange={(e) => setSimpleRaisePercent(e.target.value)}
                  placeholder={t.percentPlaceholder}
                  style={{
                    width: '80px',
                    padding: '0.5rem',
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    borderRadius: '0.375rem',
                    color: 'white',
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                />
                <span style={{ color: '#cbd5e1', fontSize: '1rem' }}>
                  % {language === 'tr' ? 'zam' : 'raise in month'}
                </span>
                <input
                  type="number"
                  value={simpleRaiseMonth}
                  onChange={(e) => setSimpleRaiseMonth(e.target.value)}
                  placeholder={t.monthPlaceholder}
                  min="1"
                  max="12"
                  style={{
                    width: '60px',
                    padding: '0.5rem',
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    borderRadius: '0.375rem',
                    color: 'white',
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                />
                <span style={{ color: '#cbd5e1', fontSize: '1rem' }}>
                  {language === 'tr' ? '. ayda aldım' : ''}
                </span>
                <button
                  onClick={handleSimpleRaiseApply}
                  style={{
                    backgroundColor: '#0891b2',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    marginLeft: '0.5rem'
                  }}
                >
                  {language === 'tr' ? 'Uygula' : 'Apply'}
                </button>

                {/* Net Salary Mode Selection - Moved inside zam section */}
                <div style={{ 
                  marginTop: '0.75rem', 
                  paddingTop: '0.75rem', 
                  borderTop: '1px solid #475569',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <label 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#374151',
                    borderRadius: '0.375rem',
                    border: isNetSalary ? '2px solid #06b6d4' : '2px solid transparent',
                    maxWidth: 'fit-content'
                  }}
                  title={t.netSalaryTooltip}
                >
                  <input
                    type="checkbox"
                    checked={isNetSalary}
                    onChange={(e) => setIsNetSalary(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#06b6d4'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                      {t.netSalaryMode}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                      {t.netSalaryNote}
                    </div>
                  </div>
                  </label>
                </div>
              </div>
            ) : (
              // Detailed monthly input
              <div>
                <p style={{ 
                  color: '#94a3b8', 
                  fontSize: '0.875rem', 
                  marginBottom: '1rem' 
                }}>
                  {t.salaryIncreaseDescription}
                </p>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {Array.from({ length: 12 }, (_, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        color: '#cbd5e1', 
                        fontSize: '0.875rem', 
                        minWidth: '60px',
                        fontWeight: '500'
                      }}>
                        {index + 1}. Ay:
                      </span>
                      <input
                        type="number"
                        value={salaryIncreases[index]}
                        onChange={(e) => handleSalaryIncreaseChange(index, e.target.value)}
                        placeholder="0"
                        title={t.salaryIncreaseTooltip}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          backgroundColor: '#374151',
                          border: '1px solid #4b5563',
                          borderRadius: '0.375rem',
                          color: 'white',
                          fontSize: '0.875rem'
                        }}
                      />
                      <span style={{ 
                        color: '#94a3b8', 
                        fontSize: '0.875rem',
                        minWidth: '20px'
                      }}>
                        %
                      </span>
                    </div>
                  ))}
                </div>

                {/* Net Salary Mode Selection - Also in detailed section */}
                <div style={{ 
                  marginTop: '0.75rem', 
                  paddingTop: '0.75rem', 
                  borderTop: '1px solid #475569',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}>
                  <label 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: '#cbd5e1',
                      cursor: 'pointer',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#374151',
                      borderRadius: '0.375rem',
                      border: isNetSalary ? '2px solid #06b6d4' : '2px solid transparent',
                      maxWidth: 'fit-content'
                    }}
                    title={t.netSalaryTooltip}
                  >
                    <input
                      type="checkbox"
                      checked={isNetSalary}
                      onChange={(e) => setIsNetSalary(e.target.checked)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#06b6d4'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                        {t.netSalaryMode}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem' }}>
                        {t.netSalaryNote}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
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
                    <th className="text-right">{isNetSalary ? t.net : t.brut}</th>
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
                      <td className="table-cell text-right">
                        <input
                          type="text"
                          value={monthlySalaries[result.month - 1] || formatCurrency(result.grossSalary).replace('₺', '').trim()}
                          onChange={(e) => handleMonthlySalaryChange(result.month - 1, e.target.value)}
                          style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: '1px solid #475569',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            color: 'inherit',
                            textAlign: 'right',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}
                          placeholder="Brüt maaş"
                        />
                      </td>
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
                    <th className="text-right">{isNetSalary ? t.net : t.brut}</th>
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
                      <td className="table-cell text-right">
                        <input
                          type="text"
                          value={monthlySalaries[result.month - 1] || formatCurrency(result.grossSalary).replace('₺', '').trim()}
                          onChange={(e) => handleMonthlySalaryChange(result.month - 1, e.target.value)}
                          style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: '1px solid #475569',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            color: 'inherit',
                            textAlign: 'right',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}
                          placeholder="Brüt maaş"
                        />
                      </td>
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
                maintainAspectRatio: true,
                aspectRatio: isMobile ? 1.5 : 2,
                plugins: {
                  datalabels: {
                    display: false
                  },
                  legend: {
                    position: 'top' as const,
                    labels: {
                      usePointStyle: true,
                      padding: isMobile ? 10 : 20,
                      font: {
                        size: isMobile ? 12 : 14,
                        weight: 'bold'
                      },
                      color: '#cbd5e1',
                      boxWidth: isMobile ? 12 : 15,
                      boxHeight: isMobile ? 2 : 3
                    }
                  },
                  title: {
                    display: true,
                    text: t.monthlyProjection,
                    font: {
                      size: isMobile ? 14 : 18,
                      weight: 'bold'
                    },
                    padding: isMobile ? 10 : 20,
                    color: '#06b6d4'
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    titleFont: {
                      size: isMobile ? 12 : 14
                    },
                    bodyFont: {
                      size: isMobile ? 11 : 13
                    },
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
                        size: isMobile ? 9 : 11,
                        weight: 'bold'
                      },
                      maxRotation: isMobile ? 0 : 0
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
                        size: isMobile ? 9 : 11,
                        weight: 'bold'
                      },
                      callback: function(value) {
                        return isMobile ? formatCurrency(Number(value)).replace('₺', '') : formatCurrency(Number(value));
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
                  maintainAspectRatio: true,
                  aspectRatio: isMobile ? 1.2 : 1.8,
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
                        padding: isMobile ? 12 : 25,
                        font: {
                          size: isMobile ? 12 : 18,
                          weight: 'bold'
                        },
                        color: '#000000',
                        boxWidth: isMobile ? 18 : 30,
                        boxHeight: isMobile ? 12 : 20
                      }
                    },
                    title: {
                      display: true,
                      text: t.yearlyInflationRates,
                      font: {
                        size: isMobile ? 12 : 16,
                        weight: 'bold'
                      },
                      padding: isMobile ? 10 : 20,
                      color: '#06b6d4'
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: 'white',
                      bodyColor: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderWidth: 1,
                      cornerRadius: 8,
                      titleFont: {
                        size: isMobile ? 12 : 14
                      },
                      bodyFont: {
                        size: isMobile ? 11 : 13
                      },
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
                          size: isMobile ? 9 : 12,
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
                          size: isMobile ? 10 : 14,
                          weight: 'bold'
                        },
                        stepSize: 10,
                        padding: isMobile ? 4 : 8,
                        callback: function(value) {
                          return `%${value}`;
                        }
                      },
                      title: {
                        display: true,
                        text: language === 'tr' ? 'Enflasyon Oranı (%)' : 'Inflation Rate (%)',
                        color: '#000000',
                        font: {
                          size: isMobile ? 12 : 16,
                          weight: 'bold'
                        },
                        padding: isMobile ? 8 : 15
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
                  {t.analysisYears}
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
                  {t.colorLegend}
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

      {/* Comprehensive Report Modal */}
      {showComprehensiveReport && comprehensiveReport && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflow: 'auto',
            margin: '1rem',
            border: '1px solid #475569'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#06b6d4', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                📊 Kapsamlı Maaş Analiz Raporu
              </h2>
              <button
                onClick={() => setShowComprehensiveReport(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                ×
              </button>
            </div>

            {/* Summary Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                backgroundColor: '#374151', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                borderLeft: '4px solid #10b981'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Aylık Maaşınız
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                  {comprehensiveReport.summary.monthlySalary}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#374151', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                borderLeft: '4px solid #3b82f6'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Saatlik GDP Katkısı
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  {comprehensiveReport.summary.hourlyGdp}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#374151', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                borderLeft: '4px solid #f59e0b'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Saatlik Vergi Katkısı
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>
                  {comprehensiveReport.summary.hourlyTax}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#374151', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                borderLeft: '4px solid #ef4444'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                  OECD Sıralaması
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444' }}>
                  {comprehensiveReport.summary.internationalRank}/{comprehensiveReport.summary.totalCountries}
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div style={{ 
              backgroundColor: '#0f172a', 
              padding: '1.5rem', 
              borderRadius: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: '#06b6d4', marginBottom: '1rem', fontSize: '1.125rem' }}>
                🔍 Temel Bulgular
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {comprehensiveReport.insights.map((insight: string, index: number) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: '#cbd5e1',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Chart Placeholder */}
            <div style={{ 
              backgroundColor: '#374151', 
              padding: '2rem', 
              borderRadius: '0.5rem',
              textAlign: 'center',
              border: '2px dashed #475569'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <div style={{ color: '#94a3b8', fontSize: '1rem' }}>
                Tüm verilerinizin görsel analizi burada görüntülenecek
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                GDP katkısı • Vergi analizi • Satın alma gücü • Uluslararası karşılaştırma
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                onClick={() => setShowComprehensiveReport(false)}
                style={{
                  backgroundColor: '#06b6d4',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Raporu Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;