import React, { useState, useCallback } from 'react';

// --- Helper Functions and Constants ---

// Tax brackets for 2024 in Turkey
const INCOME_TAX_BRACKETS = [
    { limit: 110000, rate: 0.15 },
    { limit: 230000, rate: 0.20 },
    { limit: 870000, rate: 0.27 },
    { limit: 3000000, rate: 0.35 },
    { limit: Infinity, rate: 0.40 },
];

// Other deduction rates (for Turkey)
const SGK_RATE = 0.15; // 14% Employee Share + 1% Unemployment Insurance
const BASE_STAMP_TAX_RATE = 0.00759;

// Pre-defined inflation data with flags (Updated with recent data from user)
const INFLATION_DATA = {
    'ZW': { name: 'Zimbabve', rate: 339.7, flag: '🇿🇼' },
    'TR': { name: 'Türkiye', rate: 75.5, flag: '🇹🇷' },
    'IR': { name: 'İran', rate: 48.5, flag: '🇮🇷' },
    'AR': { name: 'Arjantin', rate: 43.5, flag: '🇦🇷' },
    'VE': { name: 'Venezuela', rate: 23.6, flag: '🇻🇪' },
    'NG': { name: 'Nijerya', rate: 23.0, flag: '🇳🇬' },
    'PK': { name: 'Pakistan', rate: 17.3, flag: '🇵🇰' },
    'RU': { name: 'Rusya', rate: 16.7, flag: '🇷🇺' },
    'GB': { name: 'Birleşik Krallık', rate: 3.4, flag: '🇬🇧' },
    'US': { name: 'ABD', rate: 2.4, flag: '🇺🇸' },
    'DE': { name: 'Almanya', rate: 2.1, flag: '🇩🇪' },
    'CUSTOM': { name: 'Özel', rate: 50.0, flag: '⚙️' }
};

const MONTH_NAMES_TR = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", 
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

// Function to format currency for Turkish Lira
const formatCurrency = (value) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(value);
};

// --- Main App Component ---

export default function App() {
    const [grossSalary, setGrossSalary] = useState('');
    const [annualInflationRate, setAnnualInflationRate] = useState(INFLATION_DATA['TR'].rate.toString());
    const [selectedCountry, setSelectedCountry] = useState('TR');
    const [monthlyData, setMonthlyData] = useState([]);
    const [error, setError] = useState('');

    const handleSalaryChange = (e) => {
        // 1. Get raw value and remove anything that is not a digit.
        const rawValue = e.target.value.replace(/[^\d]/g, '');

        // 2. If it's empty, update state and return.
        if (rawValue === '') {
            setGrossSalary('');
            return;
        }

        // 3. Convert to number for formatting.
        const numberValue = parseInt(rawValue, 10);

        // 4. Format with dots for thousands. 'de-DE' locale is used for dot separators.
        const formattedValue = new Intl.NumberFormat('de-DE').format(numberValue);

        // 5. Update the state with the formatted value.
        setGrossSalary(formattedValue);
    };
    
    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setSelectedCountry(countryCode);
        if (INFLATION_DATA[countryCode]) {
            setAnnualInflationRate(INFLATION_DATA[countryCode].rate.toString());
        }
    };

    const calculateNetSalary = useCallback(() => {
        // Un-format the salary string to get the raw number for calculation
        const gross = parseFloat(grossSalary.replace(/\./g, ''));
        
        if (isNaN(gross) || gross <= 0) {
            setError('Lütfen geçerli bir brüt maaş girin.');
            setMonthlyData([]);
            return;
        }
        
        const annualInflation = parseFloat(annualInflationRate);
        if (isNaN(annualInflation) || annualInflation < 0) {
            setError('Lütfen geçerli bir yıllık enflasyon oranı girin.');
            setMonthlyData([]);
            return;
        }

        setError('');

        const monthlyInflationRate = Math.pow(1 + annualInflation / 100, 1 / 12) - 1;

        let cumulativeIncomeBase = 0;
        let cumulativeIncomeTax = 0;
        let inflationMultiplier = 1.0;
        const results = [];

        for (let month = 1; month <= 12; month++) {
            const sgkCut = gross * SGK_RATE;
            const incomeBaseForMonth = gross - sgkCut;
            const stampTaxRate = month >= 6 ? BASE_STAMP_TAX_RATE * 1.5 : BASE_STAMP_TAX_RATE;
            const stampTax = gross * stampTaxRate;
            
            const newCumulativeIncomeBase = cumulativeIncomeBase + incomeBaseForMonth;
            let totalTaxOnNewCumulative = 0;
            let lastBracketLimit = 0;
            let appliedRate = 0;

            for (const bracket of INCOME_TAX_BRACKETS) {
                if (newCumulativeIncomeBase > lastBracketLimit) {
                    const taxableInBracket = Math.min(newCumulativeIncomeBase, bracket.limit) - lastBracketLimit;
                    totalTaxOnNewCumulative += taxableInBracket * bracket.rate;
                    if(newCumulativeIncomeBase <= bracket.limit) {
                       appliedRate = bracket.rate;
                       break; 
                    }
                }
                lastBracketLimit = bracket.limit;
            }

            const incomeTaxForMonth = totalTaxOnNewCumulative - cumulativeIncomeTax;
            const netSalary = gross - sgkCut - stampTax - incomeTaxForMonth;

            if (month > 1) {
                inflationMultiplier *= (1 + monthlyInflationRate);
            }
            const realSalary = netSalary / inflationMultiplier;
            const purchasingPowerLoss = netSalary - realSalary;
            
            results.push({
                monthName: MONTH_NAMES_TR[month - 1],
                netSalary,
                realSalary,
                purchasingPowerLoss,
                appliedTaxRate: appliedRate || INCOME_TAX_BRACKETS[0].rate,
                inflationMultiplier,
            });

            cumulativeIncomeBase = newCumulativeIncomeBase;
            cumulativeIncomeTax += incomeTaxForMonth;
        }

        setMonthlyData(results);

    }, [grossSalary, annualInflationRate]);

    return (
        <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center font-sans text-white p-4">
            <div className="w-full max-w-5xl mx-auto bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">
                
                <header className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">Gelişmiş Net Maaş Hesaplayıcı</h1>
                    <p className="text-slate-400 mt-2">Maaş projeksiyonunuzu vergi ve enflasyon senaryolarıyla analiz edin.</p>
                </header>

                {/* --- Input Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Aylık Brüt Maaş (TL)</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={grossSalary}
                            onChange={handleSalaryChange}
                            placeholder="Örn: 140.000"
                            className="w-full bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-slate-300 mb-2">Enflasyon Ülkesi</label>
                             <select
                                 value={selectedCountry}
                                 onChange={handleCountryChange}
                                 className="w-full bg-slate-700 text-white border-2 border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                             >
                                 {Object.keys(INFLATION_DATA).map(code => (
                                     <option key={code} value={code}>
                                         {`${INFLATION_DATA[code].flag} ${INFLATION_DATA[code].name}`}
                                     </option>
                                 ))}
                             </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-slate-300 mb-2">Yıllık Enflasyon (%)</label>
                             <input
                                 type="number"
                                 value={annualInflationRate}
                                 onChange={(e) => {
                                     setAnnualInflationRate(e.target.value);
                                     setSelectedCountry('CUSTOM');
                                 }}
                                 placeholder="Örn: 50"
                                 className="w-full bg-slate-700 text-white placeholder-slate-400 border-2 border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                             />
                        </div>
                    </div>
                </div>

                <div className="text-center mb-8">
                     <button
                        onClick={calculateNetSalary}
                        className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-200"
                    >
                        Hesapla
                    </button>
                </div>
                
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                {/* --- Results Table --- */}
                {monthlyData.length > 0 && (
                    <div className="overflow-x-auto rounded-lg bg-slate-900/50">
                        <table className="w-full text-left">
                            <thead className="bg-slate-700">
                                <tr>
                                    <th className="p-3 font-semibold">Ay</th>
                                    <th className="p-3 font-semibold">Net Maaş</th>
                                    <th className="p-3 font-semibold text-orange-400">Alım Gücü Kaybı</th>
                                    <th className="p-3 font-semibold text-yellow-400">Reel Maaş (Alım Gücü)</th>
                                    <th className="p-3 font-semibold text-center">Gelir V. Oranı</th>
                                    <th className="p-3 font-semibold text-center">Enflasyon Etkisi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyData.map((data, index) => (
                                    <tr key={index} className="border-b border-slate-700 last:border-0 hover:bg-slate-700/50 transition-colors text-sm">
                                        <td className="p-3 font-medium">{data.monthName}</td>
                                        <td className="p-3 text-green-400 font-mono">{formatCurrency(data.netSalary)}</td>
                                        <td className="p-3 text-orange-400 font-mono">-{formatCurrency(data.purchasingPowerLoss)}</td>
                                        <td className="p-3 text-yellow-400 font-mono">{formatCurrency(data.realSalary)}</td>
                                        <td className="p-3 text-center text-red-400 font-mono">%{Math.round(data.appliedTaxRate * 100)}</td>
                                        <td className="p-3 text-center font-mono">{data.inflationMultiplier.toFixed(3)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                
                {/* --- Explanation Section --- */}
                {monthlyData.length > 0 && (
                    <div className="mt-8 p-6 bg-slate-900/50 rounded-lg">
                        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Hesaplama Detayları</h2>
                        <div className="space-y-4 text-slate-300">
                            <div>
                                <h3 className="font-semibold text-lg text-green-400">Net Maaş</h3>
                                <p>Ele geçen nominal maaştır. <code className="text-xs bg-slate-700 p-1 rounded">Brüt Maaş - (SGK Kesintisi + Damga Vergisi + Aylık Gelir Vergisi)</code> formülü ile bulunur.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-orange-400">Alım Gücü Kaybı</h3>
                                <p>Enflasyonun o ayki net maaşınızdan ne kadarını erittiğini gösterir. <code className="text-xs bg-slate-700 p-1 rounded">Net Maaş - Reel Maaş</code> ile hesaplanır.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-yellow-400">Reel Maaş (Alım Gücü)</h3>
                                <p>Maaşınızın Ocak ayındaki alım gücüne göre bugünkü değeridir. <code className="text-xs bg-slate-700 p-1 rounded">Net Maaş / Enflasyon Etkisi</code> formülüyle hesaplanır ve enflasyonun etkisini arındırır.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-red-400">Gelir Vergisi Oranı</h3>
                                <p>O ay içinde uygulanan en yüksek gelir vergisi dilimini gösterir. Yıl içinde kümülatif gelir matrahınız arttıkça bu oran da artar, bu da net maaşınızın düşmesine neden olur.</p>
                            </div>
                             <div>
                                <h3 className="font-semibold text-lg text-cyan-500">Enflasyon Etkisi (Katsayı)</h3>
                                <p>Ocak ayına göre fiyatların genel seviyesinin ne kadar arttığını gösteren bir katsayıdır. Seçtiğiniz yıllık oranın aylık bileşik faiz formülüyle hesaplanmasıyla elde edilir.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
             <footer className="text-center mt-8 text-slate-500 text-sm max-w-5xl mx-auto">
                <p>Bu uygulama, Türkiye'nin 2024 yılı vergi dilimleri ve parametrelerine göre simülasyon yapmaktadır.</p>
                <p>Enflasyon senaryoları seçilen ülkeye göre değişse de, vergi ve kesinti hesaplamaları Türkiye sistemine göre sabittir.</p>
                <p>Asgari ücret istisnası gibi özel durumlar dahil edilmemiştir.</p>
            </footer>
        </div>
    );
}
