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
    netSalaryNote: 'Şirketinizden kesintisiz maaş alıyorsanız işaretleyin',
    // Comments section
    commentsSection: 'Kullanıcı Yorumları',
    shareExperience: 'Deneyiminizi Paylaşın',
    commentPlaceholder: 'Maaşınız hakkında düşüncelerinizi, tecrübelerinizi ve tavsiyelerinizi yazın...',
    shareComment: 'Yorum Paylaş',
    anonymousComment: 'Anonim yorum',
    salaryRange: 'Maaş aralığı',
    customSalaryRange: 'Özel maaş aralığı',
    company: 'Şirket',
    position: 'Pozisyon',
    experience: 'Tecrübe',
    companyPlaceholder: 'Şirket adı (isteğe bağlı)',
    positionPlaceholder: 'Pozisyonunuz (isteğe bağlı)',
    experiencePlaceholder: 'Kaç yıllık tecrübe',
    customSalaryPlaceholder: 'Örn: ₺85.000 - ₺95.000',
    noComments: 'Henüz yorum yok. İlk yorumu siz bırakın!',
    commentAdded: 'Yorumunuz başarıyla eklendi!',
    commentError: 'Yorum eklenirken bir hata oluştu.',
    writeComment: 'Yorum Yaz',
    scrollToComments: 'Yorumlara Git',
    cancel: 'İptal',
    viewAllComments: 'Bütün Yorumları Oku',
    backToCalculator: 'Hesaplayıcıya Dön',
    totalComments: 'Toplam Yorum',
    // Auth
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    logout: 'Çıkış Yap',
    username: 'Kullanıcı Adı',
    email: 'E-posta',
    password: 'Şifre',
    loginToReply: 'Yanıtlamak için giriş yapın',
    reply: 'Yanıtla',
    replies: 'Yanıtlar',
    showReplies: 'Yanıtları Göster',
    hideReplies: 'Yanıtları Gizle',
    addReply: 'Yanıt Ekle',
    switchToRegister: 'Hesabınız yok mu? Kayıt olun',
    switchToLogin: 'Hesabınız var mı? Giriş yapın',
    // Premium features
    premium: 'Premium',
    upgradeToPremium: 'Premium\'a Yükselt',
    socialMediaPromotion: 'Sosyal Medya Tanıtımı',
    shareOnSocial: 'Sosyal Medyada Paylaş',
    premiumFeature: 'Premium Özellik',
    premiumRequired: 'Bu özellik için Premium üyelik gereklidir',
    shareYourStory: 'Hikayenizi Paylaşın',
    socialMediaDescription: 'Yorumunuz Twitter ve Instagram\'da hikaye olarak paylaşılacak',
    schedulePost: 'Paylaşım Zamanla',
    postNow: 'Şimdi Paylaş',
    postScheduled: 'Paylaşım Zamanlandı',
    viewSocialPosts: 'Sosyal Medya Paylaşımları',
    timeAgo: 'önce',
    justNow: 'şimdi',
    minutesAgo: 'dakika',
    hoursAgo: 'saat',
    daysAgo: 'gün',
    weeksAgo: 'hafta',
    monthsAgo: 'ay'
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
    netSalaryNote: 'Check if you receive salary without deductions',
    // Comments section
    commentsSection: 'User Comments',
    shareExperience: 'Share Your Experience',
    commentPlaceholder: 'Share your thoughts, experiences and tips about your salary...',
    shareComment: 'Share Comment',
    anonymousComment: 'Anonymous comment',
    salaryRange: 'Salary range',
    customSalaryRange: 'Custom salary range',
    company: 'Company',
    position: 'Position',
    experience: 'Experience',
    companyPlaceholder: 'Company name (optional)',
    positionPlaceholder: 'Your position (optional)',
    experiencePlaceholder: 'Years of experience',
    customSalaryPlaceholder: 'e.g: ₺85.000 - ₺95.000',
    noComments: 'No comments yet. Be the first to comment!',
    commentAdded: 'Your comment has been added successfully!',
    commentError: 'An error occurred while adding your comment.',
    writeComment: 'Write Comment',
    scrollToComments: 'Go to Comments',
    cancel: 'Cancel',
    viewAllComments: 'Read All Comments',
    backToCalculator: 'Back to Calculator',
    totalComments: 'Total Comments',
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    loginToReply: 'Login to reply',
    reply: 'Reply',
    replies: 'Replies',
    showReplies: 'Show Replies',
    hideReplies: 'Hide Replies',
    addReply: 'Add Reply',
    switchToRegister: 'Don\'t have an account? Register',
    switchToLogin: 'Have an account? Login',
    // Premium features
    premium: 'Premium',
    upgradeToPremium: 'Upgrade to Premium',
    socialMediaPromotion: 'Social Media Promotion',
    shareOnSocial: 'Share on Social Media',
    premiumFeature: 'Premium Feature',
    premiumRequired: 'Premium membership required for this feature',
    shareYourStory: 'Share Your Story',
    socialMediaDescription: 'Your comment will be shared as a story on Twitter and Instagram',
    schedulePost: 'Schedule Post',
    postNow: 'Post Now',
    postScheduled: 'Post Scheduled',
    viewSocialPosts: 'View Social Media Posts',
    timeAgo: 'ago',
    justNow: 'now',
    minutesAgo: 'minutes',
    hoursAgo: 'hours',
    daysAgo: 'days',
    weeksAgo: 'weeks',
    monthsAgo: 'months'
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

// Global countries comparison data (2024 estimates) - Expanded for comprehensive analysis
const globalCountriesData = [
  {
    country: 'Turkey',
    flag: '🇹🇷',
    averageGrossSalary: 156000, // TL annually
    averageNetSalary: 108000, // TL annually
    pppFactor: 1.0, // Base for Turkey
    currencyCode: 'TL',
    costOfLivingIndex: 100, // Base index
    gdpPerCapita: 13000, // USD
    minimumWage: 17002, // TL monthly
    region: 'Middle East',
    lifeQuality: 'Moderate'
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    averageGrossSalary: 58000, // EUR annually  
    averageNetSalary: 38000, // EUR annually
    pppFactor: 0.77, // EUR to TL PPP
    currencyCode: 'EUR',
    costOfLivingIndex: 180,
    gdpPerCapita: 48000,
    minimumWage: 2080, // EUR monthly
    region: 'Europe',
    lifeQuality: 'Very High'
  },
  {
    country: 'United States',
    flag: '🇺🇸', 
    averageGrossSalary: 70000, // USD annually
    averageNetSalary: 52000, // USD annually
    pppFactor: 0.36, // USD to TL PPP
    currencyCode: 'USD',
    costOfLivingIndex: 200,
    gdpPerCapita: 80000,
    minimumWage: 1256, // USD monthly (federal minimum)
    region: 'North America',
    lifeQuality: 'Very High'
  },
  {
    country: 'India',
    flag: '🇮🇳',
    averageGrossSalary: 480000, // INR annually
    averageNetSalary: 420000, // INR annually
    pppFactor: 22.5, // INR to TL PPP
    currencyCode: 'INR',
    costOfLivingIndex: 25,
    gdpPerCapita: 2500,
    minimumWage: 5340, // INR monthly
    region: 'Asia',
    lifeQuality: 'Moderate'
  },
  {
    country: 'Egypt',
    flag: '🇪🇬',
    averageGrossSalary: 72000, // EGP annually
    averageNetSalary: 60000, // EGP annually
    pppFactor: 15.8, // EGP to TL PPP
    currencyCode: 'EGP',
    costOfLivingIndex: 30,
    gdpPerCapita: 4200,
    minimumWage: 3500, // EGP monthly
    region: 'Africa',
    lifeQuality: 'Moderate'
  },
  {
    country: 'Bulgaria',
    flag: '🇧🇬',
    averageGrossSalary: 18000, // BGN annually
    averageNetSalary: 14400, // BGN annually
    pppFactor: 1.95, // BGN to TL PPP
    currencyCode: 'BGN',
    costOfLivingIndex: 65,
    gdpPerCapita: 12500,
    minimumWage: 933, // BGN monthly
    region: 'Europe',
    lifeQuality: 'High'
  },
  {
    country: 'Mexico',
    flag: '🇲🇽',
    averageGrossSalary: 180000, // MXN annually
    averageNetSalary: 150000, // MXN annually
    pppFactor: 10.2, // MXN to TL PPP
    currencyCode: 'MXN',
    costOfLivingIndex: 55,
    gdpPerCapita: 11500,
    minimumWage: 5400, // MXN monthly
    region: 'North America',
    lifeQuality: 'High'
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    averageGrossSalary: 75000, // PLN annually
    averageNetSalary: 55000, // PLN annually
    pppFactor: 1.8, // PLN to TL PPP
    currencyCode: 'PLN',
    costOfLivingIndex: 130,
    gdpPerCapita: 17500,
    minimumWage: 4300, // PLN monthly
    region: 'Europe',
    lifeQuality: 'High'
  },
  {
    country: 'Romania',
    flag: '🇷🇴',
    averageGrossSalary: 48000, // RON annually
    averageNetSalary: 32000, // RON annually
    pppFactor: 2.1, // RON to TL PPP
    currencyCode: 'RON',
    costOfLivingIndex: 90,
    gdpPerCapita: 14500,
    minimumWage: 3700, // RON monthly
    region: 'Europe',
    lifeQuality: 'High'
  },
  {
    country: 'Thailand',
    flag: '🇹🇭',
    averageGrossSalary: 360000, // THB annually
    averageNetSalary: 330000, // THB annually
    pppFactor: 15.5, // THB to TL PPP
    currencyCode: 'THB',
    costOfLivingIndex: 45,
    gdpPerCapita: 7800,
    minimumWage: 11000, // THB monthly
    region: 'Asia',
    lifeQuality: 'High'
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    averageGrossSalary: 45000, // GBP annually
    averageNetSalary: 34000, // GBP annually
    pppFactor: 0.43, // GBP to TL PPP
    currencyCode: 'GBP',
    costOfLivingIndex: 190,
    gdpPerCapita: 46000,
    minimumWage: 2200, // GBP monthly
    region: 'Europe',
    lifeQuality: 'Very High'
  },
  {
    country: 'Greece',
    flag: '🇬🇷',
    averageGrossSalary: 20000, // EUR annually
    averageNetSalary: 16000, // EUR annually
    pppFactor: 0.77, // EUR to TL PPP
    currencyCode: 'EUR',
    costOfLivingIndex: 140,
    gdpPerCapita: 17000,
    minimumWage: 760, // EUR monthly
    region: 'Europe',
    lifeQuality: 'High'
  }
];

// World and Turkey statistics for global comparison
const globalStats = {
  worldAverageGDP: 12500, // USD per capita
  turkeyRankInWorld: 68, // Out of ~200 countries by GDP per capita
  turkeyGDPRank: 19, // Largest economy by nominal GDP
  istanbulAverageSalary: 180000, // TL annually
  turkeyAverageSalary: 108000, // TL annually
  turkeyMinimumWage: 17002 * 12, // TL annually
  worldPopulation: 8000000000,
  turkeyPopulation: 85000000,
  worldAverageSalaryUSD: 18000 // USD annually
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

interface Comment {
  id: string;
  text: string;
  isAnonymous: boolean;
  salaryRange: string;
  company: string;
  position: string;
  experience: string;
  timestamp: number;
  author?: string;
  replies?: Reply[];
}

interface Reply {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  isPremium?: boolean;
}

interface SocialPost {
  id: string;
  commentId: string;
  platform: 'twitter' | 'instagram';
  isScheduled: boolean;
  scheduledDate?: number;
  status: 'pending' | 'posted' | 'failed';
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

  // Sample comments data
  const sampleComments: Comment[] = [
    {
      id: '1',
      text: 'Yazılım geliştiricisi olarak bu hesaplayıcı gerçekten çok faydalı. Özellikle enflasyon etkisini görmek şok edici. 12 ay sonunda maaşımın alım gücü %25 azalıyor.',
      isAnonymous: true,
      salaryRange: '₺50.000 - ₺75.000',
      company: 'Tech Startup',
      position: 'Senior Developer',
      experience: '5-8 yıl',
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000
    },
    {
      id: '2', 
      text: 'Bankacı arkadaşlar bu hesaplayıcıyı mutlaka kullanın. Ben SGK primlerimin ne kadar olduğunu tam olarak bilmiyordum. Şimdi her ay ne kadar kesinti yapıldığını net görüyorum.',
      isAnonymous: false,
      salaryRange: '₺30.000 - ₺40.000',
      company: 'Özel Banka',
      position: 'Müşteri Temsilcisi',
      experience: '2-3 yıl',
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
    },
    {
      id: '3',
      text: 'Muhasebeci olarak müşterilerime bu siteyi öneriyorum. Vergi hesaplamaları çok doğru ve güncel. Özellikle asgari geçim indirimi hesabı mükemmel.',
      isAnonymous: true,
      salaryRange: '₺40.000 - ₺50.000',
      company: 'Mali Müşavirlik',
      position: 'Muhasebeci',
      experience: '8-10 yıl',
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000
    },
    {
      id: '4',
      text: 'İnsan kaynakları uzmanı olarak çalışanlara maaş projeksiyonu göstermek için kullanıyorum. Çok profesyonel bir araç olmuş.',
      isAnonymous: false,
      salaryRange: '₺75.000 - ₺100.000',
      company: 'Holding',
      position: 'İK Uzmanı',
      experience: '10+ yıl',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
    },
    {
      id: '5',
      text: 'Öğretmen maaşı ile bu kadar detaylı analiz görmek üzücü ama gerçekçi. En azından geleceği planlayabiliyorum artık.',
      isAnonymous: true,
      salaryRange: '₺20.000 - ₺30.000',
      company: 'MEB',
      position: 'Öğretmen',
      experience: '3-5 yıl',
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000
    },
    {
      id: '6',
      text: 'Satış temsilcisi olarak komisyon + maaş alıyorum. Bu hesaplayıcı sabit maaş kısmını çok iyi hesaplıyor. Teşekkürler!',
      isAnonymous: true,
      salaryRange: '₺30.000 - ₺40.000',
      company: 'İlaç Firması',
      position: 'Satış Temsilcisi',
      experience: '1-2 yıl',
      timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000
    }
  ];

  // Comment section states
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState<string>('');
  const [commentSalaryRange, setCommentSalaryRange] = useState<string>('');
  const [customSalaryRange, setCustomSalaryRange] = useState<string>('');
  const [commentCompany, setCommentCompany] = useState<string>('');
  const [commentPosition, setCommentPosition] = useState<string>('');
  const [commentExperience, setCommentExperience] = useState<string>('');
  const [isCommentAnonymous, setIsCommentAnonymous] = useState<boolean>(true);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  // User authentication states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [loginForm, setLoginForm] = useState({ username: '', email: '', password: '' });
  const [replyingToComment, setReplyingToComment] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  // Premium features states
  const [showSocialModal, setShowSocialModal] = useState<boolean>(false);
  const [selectedCommentForShare, setSelectedCommentForShare] = useState<string | null>(null);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
  const [forceUpdate, setForceUpdate] = useState<number>(0);

  const t = translations[language];
  const allInflationScenarios = getInflationScenarios(t, language);
  
  // Extract country name from scenario label (removing flag emojis)
  const getCountryName = (label: string) => {
    return label.replace(/[\u1F1E6-\u1F1FF]{2}/g, '').trim();
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
  // Helper function to convert net salary to gross salary
  const calculateGrossFromNet = (targetNet: number): number => {
    let grossEstimate = targetNet * 1.5; // Starting estimate (net is usually ~65-70% of gross)
    let iteration = 0;
    const maxIterations = 20;
    
    while (iteration < maxIterations) {
      // Calculate deductions using the same logic as main calculator
      const sgkEmployee = grossEstimate * 0.14;
      const unemploymentEmployee = grossEstimate * 0.01;
      const totalIncomeTax = calculateIncomeTax(grossEstimate);
      const stampTax = grossEstimate * 0.00759;
      
      const calculatedNet = grossEstimate - sgkEmployee - unemploymentEmployee - totalIncomeTax - stampTax;
      const difference = Math.abs(calculatedNet - targetNet);
      
      if (difference < 1) { // 1 TL tolerance
        break;
      }
      
      // Update estimate using ratio
      const ratio = targetNet / calculatedNet;
      grossEstimate = grossEstimate * ratio;
      iteration++;
    }
    
    return grossEstimate;
  };

  // GDP calculation functions
  const calculateGdpContribution = () => {
    const numericInputSalary = parseFloat(grossSalary.replace(/\./g, ''));
    if (!numericInputSalary || numericInputSalary <= 0) return null;
    
    // Handle net vs gross salary
    let effectiveGrossSalary = numericInputSalary;
    if (isNetSalary) {
      effectiveGrossSalary = calculateGrossFromNet(numericInputSalary);
    }
    
    const TURKEY_GDP_PER_CAPITA_USD = 13000; // 2024 estimate
    const WORKING_HOURS_PER_YEAR = 1750; // Standard working hours
    
    // Use dynamic weeklyWorkingHours instead of fixed value
    const weeklyHours = parseFloat(weeklyWorkingHours) || 45;
    const WORKING_HOURS_PER_MONTH = (weeklyHours * 52) / 12; // Dynamic calculation
    
    const USD_TO_TL_RATE = 30; // Approximate exchange rate
    
    // Turkey's average hourly GDP contribution (reference)
    const turkeyAvgHourlyGdpUSD = TURKEY_GDP_PER_CAPITA_USD / WORKING_HOURS_PER_YEAR;
    const turkeyAvgHourlyGdpTL = turkeyAvgHourlyGdpUSD * USD_TO_TL_RATE;
    
    // User's hourly salary
    const monthlySalary = effectiveGrossSalary;
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
    const numericInputSalary = parseFloat(grossSalary.replace(/\./g, ''));
    if (!numericInputSalary || numericInputSalary <= 0) return null;
    
    // Handle net vs gross salary
    let effectiveGrossSalary = numericInputSalary;
    if (isNetSalary) {
      effectiveGrossSalary = calculateGrossFromNet(numericInputSalary);
    }
    
    // Use dynamic weeklyWorkingHours instead of fixed value
    const weeklyHours = parseFloat(weeklyWorkingHours) || 45;
    const WORKING_HOURS_PER_MONTH = (weeklyHours * 52) / 12;
    
    // Calculate monthly taxes
    const sgkEmployee = effectiveGrossSalary * 0.14;
    const unemploymentEmployee = effectiveGrossSalary * 0.01;
    const totalIncomeTax = calculateIncomeTax(effectiveGrossSalary);
    const stampTax = effectiveGrossSalary * 0.00759;
    
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
    const numericInputSalary = parseFloat(grossSalary.replace(/\./g, ''));
    if (!numericInputSalary || numericInputSalary <= 0) return null;
    
    // Handle net vs gross salary
    let effectiveGrossSalary = numericInputSalary;
    if (isNetSalary) {
      effectiveGrossSalary = calculateGrossFromNet(numericInputSalary);
    }
    
    // Calculate working hours per month based on user input
    const weeklyHours = parseFloat(weeklyWorkingHours) || 45;
    const WORKING_HOURS_PER_MONTH = (weeklyHours * 52) / 12; // weeks per year / months per year
    
    // Calculate net salary (simplified)
    const sgkEmployee = effectiveGrossSalary * 0.14;
    const unemploymentEmployee = effectiveGrossSalary * 0.01;
    const totalIncomeTax = calculateIncomeTax(effectiveGrossSalary);
    const stampTax = effectiveGrossSalary * 0.00759;
    
    const netSalary = effectiveGrossSalary - sgkEmployee - unemploymentEmployee - totalIncomeTax - stampTax;
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
    
    // Calculate working hours and hourly wage
    const weeklyHours = parseFloat(weeklyWorkingHours) || 45;
    const monthlyHours = (weeklyHours * 52) / 12;
    const hourlyWage = monthlyNetSalary / monthlyHours;
    
    // World ranking calculation
    const annualNetUSD = annualNetSalary / 30; // Approximate USD conversion
    const worldRankPercentile = Math.min(95, Math.max(5, (annualNetUSD / globalStats.worldAverageSalaryUSD) * 50));
    
    // Calculate comparisons for each country
    const comparisons = globalCountriesData.map(country => {
      if (country.country === 'Turkey') {
        return {
          ...country,
          userSalaryInLocalCurrency: annualNetSalary,
          salaryDifferencePercentage: ((annualNetSalary - country.averageNetSalary) / country.averageNetSalary) * 100,
          pppAdjustedSalary: annualNetSalary,
          costAdjustedSalary: 100,
          salaryRank: 'reference',
          monthlyEquivalent: monthlyNetSalary,
          lifeStyle: '🇹🇷 Türkiye standardında yaşam'
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
      
      // Determine salary rank and lifestyle description
      let salaryRank = 'average';
      let lifeStyle = '';
      
      if (salaryDifferencePercentage > 50) {
        salaryRank = 'high';
        lifeStyle = `🏆 ${country.flag} Üst gelir grubu - Lüks yaşam`;
      } else if (salaryDifferencePercentage > 20) {
        salaryRank = 'above_average';
        lifeStyle = `✨ ${country.flag} Ortalama üstü - Konforlu yaşam`;
      } else if (salaryDifferencePercentage > -20) {
        salaryRank = 'average';
        lifeStyle = `⚖️ ${country.flag} Ortalama vatandaş seviyesi`;
      } else if (salaryDifferencePercentage > -50) {
        salaryRank = 'below_average';
        lifeStyle = `⚠️ ${country.flag} Ortalama altı - Kısıtlı bütçe`;
      } else {
        salaryRank = 'low';
        lifeStyle = `📉 ${country.flag} Düşük gelir - Zorlu yaşam`;
      }
      
      return {
        ...country,
        userSalaryInLocalCurrency: salaryInLocalCurrency,
        salaryDifferencePercentage,
        pppAdjustedSalary,
        costAdjustedSalary,
        salaryRank,
        monthlyEquivalent: salaryInLocalCurrency / 12,
        lifeStyle
      };
    });
    
    // Sort by GDP per capita for better visualization
    comparisons.sort((a, b) => b.gdpPerCapita - a.gdpPerCapita);
    
    // Calculate additional metrics
    const minimumWageComparison = (monthlyNetSalary / (globalStats.turkeyMinimumWage / 12));
    const istanbulComparison = (annualNetSalary / globalStats.istanbulAverageSalary) * 100;
    const bestPurchasingPowerCountry = comparisons
      .filter(c => c.country !== 'Turkey')
      .sort((a, b) => b.costAdjustedSalary - a.costAdjustedSalary)[0];
    
    return {
      userAnnualNet: annualNetSalary,
      userMonthlyNet: monthlyNetSalary,
      hourlyWage,
      worldRankPercentile,
      minimumWageComparison,
      istanbulComparison,
      bestPurchasingPowerCountry,
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

  // Authentication functions
  const handleLogin = () => {
    // Simple mock authentication
    if (loginForm.username && loginForm.password) {
      const user: User = {
        id: Date.now().toString(),
        username: loginForm.username,
        email: loginForm.email || `${loginForm.username}@example.com`
      };
      setCurrentUser(user);
      setShowLoginModal(false);
      setLoginForm({ username: '', email: '', password: '' });
    }
  };

  const handleRegister = () => {
    // Simple mock registration
    if (loginForm.username && loginForm.email && loginForm.password) {
      const user: User = {
        id: Date.now().toString(),
        username: loginForm.username,
        email: loginForm.email
      };
      setCurrentUser(user);
      setShowLoginModal(false);
      setLoginForm({ username: '', email: '', password: '' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const addReply = (commentId: string) => {
    if (!replyText.trim() || !currentUser) return;

    const reply: Reply = {
      id: Date.now().toString(),
      text: replyText.trim(),
      author: currentUser.username,
      timestamp: Date.now()
    };

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyText('');
    setReplyingToComment(null);
  };

  // Comment functions
  const addComment = () => {
    if (!newComment.trim()) return;
    
    // Use custom salary range if provided, otherwise use selected range
    const finalSalaryRange = customSalaryRange.trim() || commentSalaryRange || 'Belirtilmemiş';
    
    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      isAnonymous: isCommentAnonymous,
      salaryRange: finalSalaryRange,
      company: commentCompany.trim(),
      position: commentPosition.trim(),
      experience: commentExperience.trim(),
      timestamp: Date.now(),
      author: currentUser && !isCommentAnonymous ? currentUser.username : undefined,
      replies: []
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setCommentSalaryRange('');
    setCustomSalaryRange('');
    setCommentCompany('');
    setCommentPosition('');
    setCommentExperience('');
    setShowCommentForm(false);
  };

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return t.justNow;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} ${t.minutesAgo} ${t.timeAgo}`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ${t.hoursAgo} ${t.timeAgo}`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} ${t.daysAgo} ${t.timeAgo}`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} ${t.weeksAgo} ${t.timeAgo}`;
    return `${Math.floor(diffInSeconds / 2592000)} ${t.monthsAgo} ${t.timeAgo}`;
  };


  // All Comments Page
  if (showAllComments) {
    return (
      <div className="container">
        {/* Header for All Comments Page */}
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          padding: '2rem',
          borderRadius: '1rem',
          marginBottom: '2rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <button
            onClick={() => setShowAllComments(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            ← {t.backToCalculator}
          </button>
          
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
            💬 {t.commentsSection}
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
            {t.totalComments}: {comments.length}
          </p>
        </div>

        {/* All Comments List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'white',
                    backgroundColor: '#3b82f6',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '1rem',
                    fontWeight: '500'
                  }}>
                    {comment.isAnonymous ? t.anonymousComment : 'Kullanıcı'}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#1e40af',
                    backgroundColor: '#dbeafe',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '1rem',
                    fontWeight: '500'
                  }}>
                    💰 {comment.salaryRange}
                  </span>
                  {comment.company && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#059669',
                      backgroundColor: '#d1fae5',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontWeight: '500'
                    }}>
                      🏢 {comment.company}
                    </span>
                  )}
                  {comment.position && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#7c3aed',
                      backgroundColor: '#ede9fe',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontWeight: '500'
                    }}>
                      👔 {comment.position}
                    </span>
                  )}
                  {comment.experience && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#dc2626',
                      backgroundColor: '#fee2e2',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontWeight: '500'
                    }}>
                      ⏱️ {comment.experience}
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  backgroundColor: '#f3f4f6',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.5rem'
                }}>
                  {formatTimeAgo(comment.timestamp)}
                </span>
              </div>
              <p style={{
                fontSize: '1rem',
                color: '#374151',
                lineHeight: '1.6',
                margin: 0,
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #3b82f6'
              }}>
                {comment.text}
              </p>

              {/* Reply Section for All Comments Page */}
              <div style={{ marginTop: '1rem' }}>
                {currentUser ? (
                  <button
                    onClick={() => setReplyingToComment(replyingToComment === comment.id ? null : comment.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    💬 {t.reply}
                  </button>
                ) : (
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontStyle: 'italic'
                  }}>
                    {t.loginToReply}
                  </span>
                )}

                {/* Reply Form for All Comments Page */}
                {replyingToComment === comment.id && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`${currentUser?.username} olarak yanıtla...`}
                      style={{
                        width: '100%',
                        height: '80px',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        resize: 'vertical',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: '0.5rem'
                    }}>
                      <button
                        onClick={() => addReply(comment.id)}
                        disabled={!replyText.trim()}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: replyText.trim() ? '#3b82f6' : '#9ca3af',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                          fontWeight: '500'
                        }}
                      >
                        {t.addReply}
                      </button>
                      <button
                        onClick={() => {
                          setReplyingToComment(null);
                          setReplyText('');
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'transparent',
                          color: '#6b7280',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        {t.cancel}
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies List for All Comments Page */}
                {comment.replies && comment.replies.length > 0 && (
                  <div style={{ marginTop: '1rem', marginLeft: '1rem' }}>
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        style={{
                          padding: '0.75rem',
                          backgroundColor: '#f0f8ff',
                          borderRadius: '0.5rem',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#3b82f6'
                          }}>
                            @{reply.author}
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af'
                          }}>
                            {formatTimeAgo(reply.timestamp)}
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#374151',
                          margin: 0,
                          lineHeight: '1.4'
                        }}>
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Button */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem',
          paddingTop: '2rem'
        }}>
          <button
            onClick={() => {
              setShowAllComments(false);
              setTimeout(() => {
                const commentsSection = document.getElementById('comments-section');
                if (commentsSection) {
                  commentsSection.scrollIntoView({ behavior: 'smooth' });
                  setShowCommentForm(true);
                }
              }, 100);
            }}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>💬</span>
            {t.writeComment}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Top Navigation */}
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem', 
        display: 'flex', 
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        {/* User Info */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              fontSize: '0.875rem', 
              color: '#374151',
              backgroundColor: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db'
            }}>
              👤 {currentUser.username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {t.logout}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {t.login}
          </button>
        )}

        {/* Language Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
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
        
        {/* Comments Info */}
        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'center',
          padding: '0.75rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#3b82f6',
            fontWeight: '500'
          }}>
            💡 {language === 'tr' 
              ? 'Hesaplama sonuçlarınızı gördükten sonra aşağıda deneyimlerinizi paylaşabilirsiniz'
              : 'You can share your experiences in the comments section below after viewing your calculation results'
            }
          </p>
        </div>
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
          
          {/* Net Maaş Checkbox - GDP */}
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#2d3748',
            borderRadius: '0.5rem',
            border: '1px solid #4a5568'
          }}>
            <label 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#e2e8f0',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                backgroundColor: isNetSalary ? '#1e40af' : '#4a5568',
                borderRadius: '0.5rem',
                border: isNetSalary ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.2s ease',
                boxShadow: isNetSalary ? '0 4px 8px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
              }}
              title={t.netSalaryTooltip}
            >
              <input
                type="checkbox"
                checked={isNetSalary}
                onChange={(e) => setIsNetSalary(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  accentColor: '#3b82f6',
                  cursor: 'pointer'
                }}
              />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {t.netSalaryMode}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                  {t.netSalaryNote}
                </div>
              </div>
            </label>
          </div>
          
          {/* Yeniden Hesaplama Butonu - GDP */}
          {grossSalary && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: '1.5rem',
              marginBottom: '1rem'
            }}>
              <button
                onClick={() => {
                  // Force re-calculation by triggering a re-render
                  setForceUpdate(prev => prev + 1);
                }}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#0891b2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0e7490';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#0891b2';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                🔄 {language === 'tr' ? 'Yeniden Hesapla' : 'Recalculate'}
              </button>
            </div>
          )}
          
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
          
          {/* Net Maaş Checkbox - Taxes */}
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#2d3748',
            borderRadius: '0.5rem',
            border: '1px solid #4a5568'
          }}>
            <label 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#e2e8f0',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                backgroundColor: isNetSalary ? '#1e40af' : '#4a5568',
                borderRadius: '0.5rem',
                border: isNetSalary ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.2s ease',
                boxShadow: isNetSalary ? '0 4px 8px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
              }}
              title={t.netSalaryTooltip}
            >
              <input
                type="checkbox"
                checked={isNetSalary}
                onChange={(e) => setIsNetSalary(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  accentColor: '#3b82f6',
                  cursor: 'pointer'
                }}
              />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {t.netSalaryMode}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                  {t.netSalaryNote}
                </div>
              </div>
            </label>
          </div>
          
          {/* Yeniden Hesaplama Butonu - Taxes */}
          {grossSalary && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: '1.5rem',
              marginBottom: '1rem'
            }}>
              <button
                onClick={() => {
                  // Force re-calculation by triggering a re-render
                  setForceUpdate(prev => prev + 1);
                }}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#0891b2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0e7490';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#0891b2';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                🔄 {language === 'tr' ? 'Yeniden Hesapla' : 'Recalculate'}
              </button>
            </div>
          )}
          
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
          
          {/* Net Maaş Checkbox - Purchasing */}
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#2d3748',
            borderRadius: '0.5rem',
            border: '1px solid #4a5568'
          }}>
            <label 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#e2e8f0',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                backgroundColor: isNetSalary ? '#1e40af' : '#4a5568',
                borderRadius: '0.5rem',
                border: isNetSalary ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.2s ease',
                boxShadow: isNetSalary ? '0 4px 8px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
              }}
              title={t.netSalaryTooltip}
            >
              <input
                type="checkbox"
                checked={isNetSalary}
                onChange={(e) => setIsNetSalary(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  accentColor: '#3b82f6',
                  cursor: 'pointer'
                }}
              />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {t.netSalaryMode}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                  {t.netSalaryNote}
                </div>
              </div>
            </label>
          </div>
          
          {/* Yeniden Hesaplama Butonu - Purchasing Power */}
          {grossSalary && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: '1.5rem',
              marginBottom: '1rem'
            }}>
              <button
                onClick={() => {
                  // Force re-calculation by triggering a re-render
                  setForceUpdate(prev => prev + 1);
                }}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#0891b2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0e7490';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#0891b2';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                🔄 {language === 'tr' ? 'Yeniden Hesapla' : 'Recalculate'}
              </button>
            </div>
          )}
          
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
            <h4 style={{ color: '#1f2937', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: 'bold' }}>
              🌍 ULUSLARARASI MAAŞ KIYASLAMA
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
          
          {/* Net Maaş Checkbox - International */}
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#2d3748',
            borderRadius: '0.5rem',
            border: '1px solid #4a5568'
          }}>
            <label 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#e2e8f0',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                backgroundColor: isNetSalary ? '#1e40af' : '#4a5568',
                borderRadius: '0.5rem',
                border: isNetSalary ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.2s ease',
                boxShadow: isNetSalary ? '0 4px 8px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
              }}
              title={t.netSalaryTooltip}
            >
              <input
                type="checkbox"
                checked={isNetSalary}
                onChange={(e) => setIsNetSalary(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  accentColor: '#3b82f6',
                  cursor: 'pointer'
                }}
              />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {t.netSalaryMode}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                  {t.netSalaryNote}
                </div>
              </div>
            </label>
          </div>
          
          {grossSalary && (
            <div className="international-results" style={{ marginTop: '2rem' }}>
              {(() => {
                const internationalData = calculateInternationalComparison();
                if (!internationalData) return null;
                
                return (
                  <div className="international-analysis" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ 
                        color: '#1f2937', 
                        fontSize: '1.8rem', 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        marginBottom: '1rem',
                        background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        🏆 {formatCurrency(internationalData.userMonthlyNet)} Maaşınızla Dünyada Neredesiniz?
                      </h3>
                    </div>
                    
                    {/* 1. Dünya Ortalaması Karşılaştırması */}
                    <div style={{
                      backgroundColor: '#f0f9ff',
                      border: '2px solid #0ea5e9',
                      borderRadius: '1rem',
                      padding: '2rem',
                      marginBottom: '2rem'
                    }}>
                      <h4 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: '#0c4a6e',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        🌍 Dünya Ortalaması Karşılaştırması
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#059669', marginBottom: '0.5rem' }}>
                            Dünya Sıralaması
                          </div>
                          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                            %{internationalData.worldRankPercentile.toFixed(0)}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                            En yüksek {internationalData.worldRankPercentile.toFixed(0)}%'lik dilimdesiniz!
                          </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#7c3aed', marginBottom: '0.5rem' }}>
                            Dünya Ortalamasına Göre
                          </div>
                          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                            {(internationalData.userAnnualNet / 30 / globalStats.worldAverageSalaryUSD * 100).toFixed(0)}%
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                            Dünya ortalamasının {(internationalData.userAnnualNet / 30 / globalStats.worldAverageSalaryUSD).toFixed(1)} katı!
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Türkiye İçindeki Konum */}
                    <div style={{
                      backgroundColor: '#fef2f2',
                      border: '2px solid #ef4444',
                      borderRadius: '1rem',
                      padding: '2rem',
                      marginBottom: '2rem'
                    }}>
                      <h4 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: '#dc2626',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        🇹🇷 Türkiye İçindeki Konum
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏢</div>
                          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                            İstanbul Ortalamasına Göre
                          </div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: internationalData.istanbulComparison > 100 ? '#059669' : '#dc2626' }}>
                            %{internationalData.istanbulComparison.toFixed(0)}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            {internationalData.istanbulComparison > 100 ? 'İstanbul ortalamasının üzerinde' : 'İstanbul ortalamasının altında'}
                          </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇺🇸</div>
                          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                            Türkiye Genel Ortalamasına Göre
                          </div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                            %{((internationalData.userAnnualNet / globalStats.turkeyAverageSalary) * 100).toFixed(0)}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            Türkiye ortalamasının {(internationalData.userAnnualNet / globalStats.turkeyAverageSalary).toFixed(1)} katı
                          </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💵</div>
                          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>
                            Asgari Ücrete Göre
                          </div>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
                            {internationalData.minimumWageComparison.toFixed(1)}x
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            Asgari ücretin {internationalData.minimumWageComparison.toFixed(1)} katı
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Uluslararası Ülke Kıyaslaması */}
                    <div style={{
                      backgroundColor: '#f0fdf4',
                      border: '2px solid #22c55e',
                      borderRadius: '1rem',
                      padding: '2rem',
                      marginBottom: '2rem'
                    }}>
                      <h4 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: '#15803d',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        🌍 Uluslararası Ülke Kıyaslaması (Tablo Formatında)
                      </h4>
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
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  flexWrap: 'wrap',
                  padding: '1rem',
                  backgroundColor: '#2d3748',
                  borderRadius: '0.5rem',
                  border: '1px solid #4a5568'
                }}>
                  <span style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>
                    {language === 'tr' ? '' : 'I got '}
                  </span>
                  <input
                    type="number"
                    value={simpleRaisePercent}
                    onChange={(e) => setSimpleRaisePercent(e.target.value)}
                    placeholder={t.percentPlaceholder}
                    style={{
                      width: '100px',
                      padding: '0.75rem',
                      backgroundColor: '#4a5568',
                      border: '2px solid #718096',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}
                  />
                  <span style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>
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
                      width: '80px',
                      padding: '0.75rem',
                      backgroundColor: '#4a5568',
                      border: '2px solid #718096',
                      borderRadius: '0.5rem',
                      color: 'white',
                      fontSize: '1rem',
                      textAlign: 'center',
                      fontWeight: '600'
                    }}
                  />
                  <span style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: '500' }}>
                    {language === 'tr' ? '. ayda aldım' : ''}
                  </span>
                  <button
                    onClick={handleSimpleRaiseApply}
                    style={{
                      backgroundColor: '#0891b2',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = '#0e7490';
                      target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = '#0891b2';
                      target.style.transform = 'translateY(0)';
                    }}
                  >
                    {language === 'tr' ? '✓ Uygula' : '✓ Apply'}
                  </button>
                </div>

                {/* Net Salary Mode Selection - Redesigned */}
                <div style={{ 
                  padding: '1rem',
                  backgroundColor: '#2d3748',
                  borderRadius: '0.5rem',
                  border: '1px solid #4a5568'
                }}>
                  <label 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      padding: '0.75rem 1rem',
                      backgroundColor: isNetSalary ? '#1e40af' : '#4a5568',
                      borderRadius: '0.5rem',
                      border: isNetSalary ? '2px solid #3b82f6' : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      boxShadow: isNetSalary ? '0 4px 8px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    title={t.netSalaryTooltip}
                  >
                    <input
                      type="checkbox"
                      checked={isNetSalary}
                      onChange={(e) => setIsNetSalary(e.target.checked)}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#3b82f6',
                        cursor: 'pointer'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {t.netSalaryMode}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '0.5rem 0'
          }}>
            <h2 className="results-title" style={{ margin: 0 }}>
              {t.resultsTitle}
            </h2>
            <button
              onClick={() => {
                // Yenileme işlemi - hesaplamaları yeniden çalıştır
                if (parseFloat(grossSalary) > 0) {
                  calculateSalary();
                }
              }}
              style={{
                backgroundColor: '#0ea5e9',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#0284c7';
                target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#0ea5e9';
                target.style.transform = 'translateY(0)';
              }}
              title={language === 'tr' ? 'Hesaplamaları yeniden çalıştır' : 'Refresh calculations'}
            >
              <span style={{ fontSize: '1rem' }}>🔄</span>
              {language === 'tr' ? 'Yenile' : 'Refresh'}
            </button>
          </div>
          
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

      {/* Comments Section */}
      <div id="comments-section" style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: 'white',
          textAlign: 'center'
        }}>
          💬 {t.commentsSection}
        </h2>

        {/* Add Comment Form */}
        {showCommentForm && (
          <div style={{
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '1rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: '#1e40af',
              textAlign: 'center'
            }}>
              {t.shareExperience}
            </h3>
            
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t.commentPlaceholder}
              style={{
                width: '100%',
                height: '120px',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />

            {/* Custom Salary Range Input - Primary */}
            <div style={{ marginTop: '1.5rem' }}>
              <input
                type="text"
                value={customSalaryRange}
                onChange={(e) => {
                  setCustomSalaryRange(e.target.value);
                  if (e.target.value.trim()) {
                    setCommentSalaryRange(''); // Clear predefined selection if user types custom
                  }
                }}
                placeholder={t.customSalaryPlaceholder}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #3b82f6',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: '#f0f8ff'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#3b82f6'}
              />
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: '0.5rem 0 0 0',
                textAlign: 'center'
              }}>
                {language === 'tr' 
                  ? 'Maaş aralığınızı yazmak istemiyorsanız aşağıdan seçin'
                  : 'If you don\'t want to write your salary range, select from below'
                }
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <select
                value={commentSalaryRange}
                onChange={(e) => {
                  setCommentSalaryRange(e.target.value);
                  if (e.target.value) {
                    setCustomSalaryRange(''); // Clear custom input if predefined option is selected
                  }
                }}
                style={{
                  padding: '0.75rem',
                  border: customSalaryRange ? '2px solid #d1d5db' : '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  opacity: customSalaryRange ? 0.6 : 1
                }}
                disabled={!!customSalaryRange}
              >
                <option value="">{t.salaryRange}</option>
                <option value="₺0 - ₺20.000">₺0 - ₺20.000</option>
                <option value="₺20.000 - ₺30.000">₺20.000 - ₺30.000</option>
                <option value="₺30.000 - ₺40.000">₺30.000 - ₺40.000</option>
                <option value="₺40.000 - ₺50.000">₺40.000 - ₺50.000</option>
                <option value="₺50.000 - ₺75.000">₺50.000 - ₺75.000</option>
                <option value="₺75.000 - ₺100.000">₺75.000 - ₺100.000</option>
                <option value="₺100.000+">₺100.000+</option>
              </select>

              <input
                type="text"
                value={commentCompany}
                onChange={(e) => setCommentCompany(e.target.value)}
                placeholder={t.companyPlaceholder}
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />

              <input
                type="text"
                value={commentPosition}
                onChange={(e) => setCommentPosition(e.target.value)}
                placeholder={t.positionPlaceholder}
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />

              <select
                value={commentExperience}
                onChange={(e) => setCommentExperience(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              >
                <option value="">{t.experiencePlaceholder}</option>
                <option value="0-1 yıl">0-1 yıl</option>
                <option value="1-2 yıl">1-2 yıl</option>
                <option value="2-3 yıl">2-3 yıl</option>
                <option value="3-5 yıl">3-5 yıl</option>
                <option value="5-8 yıl">5-8 yıl</option>
                <option value="8-10 yıl">8-10 yıl</option>
                <option value="10+ yıl">10+ yıl</option>
              </select>
            </div>


            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: '#374151',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={isCommentAnonymous}
                  onChange={(e) => setIsCommentAnonymous(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                {t.anonymousComment}
              </label>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setShowCommentForm(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {t.cancel}
                </button>
                <button
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: newComment.trim() ? '#3b82f6' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                    fontWeight: '500'
                  }}
                >
                  {t.shareComment}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View All Comments Button */}
        {comments.length > 3 && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setShowAllComments(true)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📖 {t.viewAllComments} ({comments.length})
            </button>
          </div>
        )}

        {/* Comments List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {comments.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem'
            }}>
              {t.noComments}
            </div>
          ) : (
            comments.slice(0, 3).map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'white',
                      backgroundColor: '#3b82f6',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontWeight: '500'
                    }}>
                      {comment.isAnonymous ? t.anonymousComment : 'Kullanıcı'}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#1e40af',
                      backgroundColor: '#dbeafe',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      fontWeight: '500'
                    }}>
                      💰 {comment.salaryRange}
                    </span>
                    {comment.company && (
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#059669',
                        backgroundColor: '#d1fae5',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '1rem',
                        fontWeight: '500'
                      }}>
                        🏢 {comment.company}
                      </span>
                    )}
                    {comment.position && (
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#7c3aed',
                        backgroundColor: '#ede9fe',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '1rem',
                        fontWeight: '500'
                      }}>
                        👔 {comment.position}
                      </span>
                    )}
                    {comment.experience && (
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#dc2626',
                        backgroundColor: '#fee2e2',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '1rem',
                        fontWeight: '500'
                      }}>
                        ⏱️ {comment.experience}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.5rem'
                  }}>
                    {formatTimeAgo(comment.timestamp)}
                  </span>
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: 0,
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  borderLeft: '4px solid #3b82f6'
                }}>
                  {comment.text}
                </p>

                {/* Reply and Social Media Section */}
                <div style={{ marginTop: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                  }}>
                    {currentUser ? (
                      <button
                        onClick={() => setReplyingToComment(replyingToComment === comment.id ? null : comment.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#3b82f6',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        💬 {t.reply}
                      </button>
                    ) : (
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        fontStyle: 'italic'
                      }}>
                        {t.loginToReply}
                      </span>
                    )}
                    
                    {/* Social Media Share Button for Premium Users */}
                    {currentUser && currentUser.isPremium && (
                      <button
                        onClick={() => {
                          setSelectedCommentForShare(comment.id);
                          setShowSocialModal(true);
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'rgba(34, 197, 94, 0.1)',
                          color: '#059669',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          fontWeight: '500',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        📱 {t.shareOnSocial}
                      </button>
                    )}
                    
                    {/* Premium Upgrade Button for Non-Premium Users */}
                    {currentUser && !currentUser.isPremium && (
                      <button
                        onClick={() => setShowPremiumModal(true)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'rgba(245, 158, 11, 0.1)',
                          color: '#d97706',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          fontWeight: '500',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        ⭐ {t.upgradeToPremium}
                      </button>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyingToComment === comment.id && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`${currentUser?.username} olarak yanıtla...`}
                        style={{
                          width: '100%',
                          height: '80px',
                          padding: '0.75rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          resize: 'vertical',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '0.5rem'
                      }}>
                        <button
                          onClick={() => addReply(comment.id)}
                          disabled={!replyText.trim()}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: replyText.trim() ? '#3b82f6' : '#9ca3af',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                            fontWeight: '500'
                          }}
                        >
                          {t.addReply}
                        </button>
                        <button
                          onClick={() => {
                            setReplyingToComment(null);
                            setReplyText('');
                          }}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'transparent',
                            color: '#6b7280',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                          }}
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies List */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div style={{ marginTop: '1rem', marginLeft: '1rem' }}>
                      {comment.replies.map((reply) => (
                        <div
                          key={reply.id}
                          style={{
                            padding: '0.75rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: '#3b82f6'
                            }}>
                              @{reply.author}
                            </span>
                            <span style={{
                              fontSize: '0.75rem',
                              color: '#9ca3af'
                            }}>
                              {formatTimeAgo(reply.timestamp)}
                            </span>
                          </div>
                          <p style={{
                            fontSize: '0.875rem',
                            color: '#374151',
                            margin: 0,
                            lineHeight: '1.4'
                          }}>
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Button */}
        {!showCommentForm && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <button
              onClick={() => setShowCommentForm(true)}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>💬</span>
              {t.writeComment}
            </button>
          </div>
        )}

        {/* Login Modal */}
        {showLoginModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setShowLoginModal(false)}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              width: '90%'
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                textAlign: 'center',
                color: '#1e293b'
              }}>
                {isLoginMode ? t.login : t.register}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder={t.username}
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />

                {!isLoginMode && (
                  <input
                    type="email"
                    placeholder={t.email}
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                )}

                <input
                  type="password"
                  placeholder={t.password}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />

                <button
                  onClick={isLoginMode ? handleLogin : handleRegister}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  {isLoginMode ? t.login : t.register}
                </button>

                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    textDecoration: 'underline'
                  }}
                >
                  {isLoginMode ? t.switchToRegister : t.switchToLogin}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Modal */}
        {showSocialModal && selectedCommentForShare && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setShowSocialModal(false)}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxWidth: '500px',
              width: '90%'
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                textAlign: 'center',
                color: '#1e293b'
              }}>
                🌟 {t.socialMediaPromotion}
              </h2>

              <div style={{
                backgroundColor: '#f8fafc',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#374151'
                }}>
                  {t.shareYourStory}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  {t.socialMediaDescription}
                </p>

                {/* Comment Preview */}
                {(() => {
                  const comment = comments.find(c => c.id === selectedCommentForShare);
                  if (!comment) return null;
                  
                  return (
                    <div style={{
                      backgroundColor: 'white',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb',
                      fontSize: '0.875rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem'
                        }}>
                          💰 {comment.salaryRange}
                        </span>
                        {comment.company && (
                          <span style={{
                            backgroundColor: '#059669',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}>
                            🏢 {comment.company}
                          </span>
                        )}
                        {comment.position && (
                          <span style={{
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}>
                            👔 {comment.position}
                          </span>
                        )}
                      </div>
                      <p style={{
                        margin: 0,
                        color: '#374151',
                        fontSize: '0.875rem',
                        lineHeight: '1.4'
                      }}>
                        {comment.text}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Social Media Platform Selection */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <button
                  onClick={() => {
                    const comment = comments.find(c => c.id === selectedCommentForShare);
                    if (comment) {
                      const newPost: SocialPost = {
                        id: Date.now().toString(),
                        commentId: comment.id,
                        platform: 'twitter',
                        isScheduled: false,
                        status: 'posted'
                      };
                      setSocialPosts(prev => [...prev, newPost]);
                      setShowSocialModal(false);
                      alert(language === 'tr' ? 
                        'Yorumunuz Twitter\'da paylaşılmak üzere hazırlandı!' : 
                        'Your comment has been prepared for sharing on Twitter!');
                    }
                  }}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#1da1f2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📱 Twitter
                </button>
                <button
                  onClick={() => {
                    const comment = comments.find(c => c.id === selectedCommentForShare);
                    if (comment) {
                      const newPost: SocialPost = {
                        id: Date.now().toString(),
                        commentId: comment.id,
                        platform: 'instagram',
                        isScheduled: false,
                        status: 'posted'
                      };
                      setSocialPosts(prev => [...prev, newPost]);
                      setShowSocialModal(false);
                      alert(language === 'tr' ? 
                        'Yorumunuz Instagram\'da paylaşılmak üzere hazırlandı!' : 
                        'Your comment has been prepared for sharing on Instagram!');
                    }
                  }}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#E4405F',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📷 Instagram
                </button>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setShowSocialModal(false)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        )}

        {/* Premium Upgrade Modal */}
        {showPremiumModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setShowPremiumModal(false)}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              width: '90%'
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                textAlign: 'center',
                color: '#1e293b'
              }}>
                ⭐ {t.upgradeToPremium}
              </h2>

              <div style={{
                backgroundColor: '#fef3c7',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                border: '1px solid #fbbf24'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#d97706'
                }}>
                  {t.premiumFeature}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#92400e',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  {t.premiumRequired}
                </p>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1.5rem',
                  color: '#92400e',
                  fontSize: '0.875rem',
                  lineHeight: '1.6'
                }}>
                  <li>{t.socialMediaPromotion}</li>
                  <li>{language === 'tr' ? 'Özel premium destek' : 'Premium support'}</li>
                  <li>{language === 'tr' ? 'Gelişmiş analiz araçları' : 'Advanced analytics tools'}</li>
                </ul>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <button
                  onClick={() => {
                    // Mock premium upgrade
                    if (currentUser) {
                      setCurrentUser({...currentUser, isPremium: true});
                      setShowPremiumModal(false);
                      alert(language === 'tr' ? 
                        'Tebrikler! Premium üyeliğiniz aktif edildi.' : 
                        'Congratulations! Your premium membership has been activated.');
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#d97706',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {t.upgradeToPremium}
                </button>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;