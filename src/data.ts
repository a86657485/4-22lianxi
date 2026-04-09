// 表1：2012-2024年深圳年末常住人口（单位：万人）- 用于条形图
export const populationData = [
  { year: '2012', population: 1195.85 },
  { year: '2013', population: 1257.17 },
  { year: '2014', population: 1317.86 },
  { year: '2015', population: 1408.05 },
  { year: '2016', population: 1495.35 },
  { year: '2017', population: 1587.31 },
  { year: '2018', population: 1666.12 },
  { year: '2019', population: 1710.4 },
  { year: '2020', population: 1763.38 },
  { year: '2021', population: 1768.16 },
  { year: '2022', population: 1766.18 },
  { year: '2023', population: 1779.01 },
  { year: '2024', population: 1798.95 }
];

// 表2：深圳地铁历年营业里程（单位：公里）- 用于折线图
// 数据特征：早期平缓，后期呈现爆发式“陡峭”增长，完美体现“深圳速度”
export const metroData = [
  { year: '2004', mileage: 21.8 },
  { year: '2008', mileage: 21.8 }, // 早期发展蓄力期
  { year: '2011', mileage: 178 },  // 大运会爆发期
  { year: '2016', mileage: 285 },
  { year: '2019', mileage: 303 },
  { year: '2020', mileage: 411 },  // 开始急速攀升
  { year: '2022', mileage: 559 },  // 突破500公里
  { year: '2024', mileage: 567.1 }
];

// 表3：深圳历年真实GDP（单位：亿元）
export const shenzhenRealGDP = [
  { year: '1980', gdp: 2.70 },
  { year: '1990', gdp: 171.67 },
  { year: '2000', gdp: 2187.45 },
  { year: '2010', gdp: 10086.18 },
  { year: '2015', gdp: 17502.99 },
  { year: '2020', gdp: 27670.24 },
  { year: '2023', gdp: 34606.40 }
];

export const gdpData = [
  { year: 2012, gdp: 12950 },
  { year: 2013, gdp: 14500 },
  { year: 2014, gdp: 16001 },
  { year: 2015, gdp: 17502 },
  { year: 2016, gdp: 19492 },
  { year: 2017, gdp: 22438 },
  { year: 2018, gdp: 24221 },
  { year: 2019, gdp: 26927 },
  { year: 2020, gdp: 27670 },
  { year: 2021, gdp: 30664 },
  { year: 2022, gdp: 32387 },
  { year: 2023, gdp: 34606 },
  { year: 2024, gdp: 36000 },
];

// 深圳与广州双城对比数据 (2012-2024)
export const combinedData = [
  { year: 2012, szPop: 1195, gzPop: 1283, szGdp: 12950, gzGdp: 13551, szMetro: 178, gzMetro: 236 },
  { year: 2013, szPop: 1257, gzPop: 1292, szGdp: 14500, gzGdp: 15420, szMetro: 178, gzMetro: 260 },
  { year: 2014, szPop: 1317, gzPop: 1308, szGdp: 16001, gzGdp: 16706, szMetro: 178, gzMetro: 260 },
  { year: 2015, szPop: 1408, gzPop: 1350, szGdp: 17502, gzGdp: 18100, szMetro: 178, gzMetro: 266 },
  { year: 2016, szPop: 1495, gzPop: 1404, szGdp: 19492, gzGdp: 19547, szMetro: 285, gzMetro: 309 },
  { year: 2017, szPop: 1587, gzPop: 1449, szGdp: 22438, gzGdp: 21503, szMetro: 285, gzMetro: 391 },
  { year: 2018, szPop: 1666, gzPop: 1490, szGdp: 24221, gzGdp: 22859, szMetro: 285, gzMetro: 478 },
  { year: 2019, szPop: 1710, gzPop: 1530, szGdp: 26927, gzGdp: 23628, szMetro: 303, gzMetro: 513 },
  { year: 2020, szPop: 1763, gzPop: 1867, szGdp: 27670, gzGdp: 25019, szMetro: 411, gzMetro: 531 },
  { year: 2021, szPop: 1768, gzPop: 1881, szGdp: 30664, gzGdp: 28231, szMetro: 419, gzMetro: 590 },
  { year: 2022, szPop: 1766, gzPop: 1873, szGdp: 32387, gzGdp: 28839, szMetro: 559, gzMetro: 621 },
  { year: 2023, szPop: 1779, gzPop: 1882, szGdp: 34606, gzGdp: 30355, szMetro: 567, gzMetro: 653 },
  { year: 2024, szPop: 1798, gzPop: 1885, szGdp: 36000, gzGdp: 31800, szMetro: 567, gzMetro: 653 },
];
