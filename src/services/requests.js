import axios from "axios";

const token = "5672068336438176c74fe1814218ea1b"

export const getDetailedCoinData = async (coinId) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}


export const getCoinMarketChart = async (coinId, selectedRange) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}`)
    // &interval=hourly
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const getMarketData = async (pageNumber = 1) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`)
    return response.data;
  } catch (e) {
    console.log(e)
  }
}


export const getTrendingData = async () => {
  try {
    // const response = await axios.get(`https://api.coingecko.com/api/v3/search/trending`)
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${token}`)
    return response.data;
  } catch (e) {
    console.log(e)
  }
}




export const getLogoData = async (symbol) => {
  try {
    const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=pk_f99f64267f7c496aa43f26e42786a46b`)
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const getWatchlistedCoins = async (pageNumber = 1, coinIds) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getAllCoins = async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export const getCandleChartData = async (symbol, days = '1d') => {
  try {
    // const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
    const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/${days}?token=${token}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const postDataGlobal = async (country) => {
  try {
    const response = await axios.post(`https://scanner.tradingview.com/${country}/scan`,
      country === 'vietnam'
        ?
        {
          "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "data_restrictions": "PREV_BAR", "lang": "vi" }, "markets": ["vietnam"], "symbols": { "query": { "types": [], "exchanges": ["HOSE", "HNX", "UPCOM"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

        }
        : country === 'america'
          ?
          {
            "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "exchange", "operation": "in_range", "right": ["NYSE", "NASDAQ", "AMEX"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "data_restrictions": "PREV_BAR", "lang": "en" }, "markets": ["america"], "symbols": { "query": { "types": [], "exchanges": ["NASDAQ", "NYSE", "AMEX", "OTC"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

          }
          : country === 'australia'
            ?
            {
              "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "lang": "en" }, "markets": ["australia"], "symbols": { "query": { "types": [], "exchanges": ["ASX"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

            }
            : country === 'austria'
              ?
              {
                "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "data_restrictions": "PREV_BAR", "lang": "en" }, "markets": ["austria"], "symbols": { "query": { "types": [], "exchanges": ["VIE"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

              }
              : country === 'canada'
                ?
                {
                  "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "data_restrictions": "PREV_BAR", "lang": "en" }, "markets": ["canada"], "symbols": { "query": { "types": [], "exchanges": ["TSX", "TSXV", "CSE", "NEO"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

                }
                : country === 'chile'
                  ?
                  {
                    "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "data_restrictions": "PREV_BAR", "lang": "en" }, "markets": ["chile"], "symbols": { "query": { "types": [], "exchanges": ["BCS"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

                  }
                  : country === 'china'
                    ? {
                      "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "data_restrictions": "PREV_BAR", "lang": "en" }, "markets": ["china"], "symbols": { "query": { "types": [], "exchanges": ["SSE"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

                    } :
                    {
                      "filter": [{ "left": "type", "operation": "in_range", "right": ["stock", "dr", "fund"] }, { "left": "subtype", "operation": "in_range", "right": ["common", "foreign-issuer", "", "etf", "etf,odd", "etf,otc", "etf,cfd"] }, { "left": "is_primary", "operation": "equal", "right": true }, { "left": "active_symbol", "operation": "equal", "right": true }], "options": { "data_restrictions": "PREV_BAR", "lang": "vi" }, "markets": ["vietnam"], "symbols": { "query": { "types": [], "exchanges": ["HNX", "UPCOM"] }, "tickers": [] }, "columns": ["logoid", "name", "close", "change", "change_abs", "Recommend.All", "volume", "Value.Traded", "market_cap_basic", "price_earnings_ttm", "earnings_per_share_basic_ttm", "number_of_employees", "sector", "description", "type", "subtype", "update_mode", "pricescale", "minmov", "fractional", "minmove2", "currency", "fundamental_currency_code"], "sort": { "sortBy": "market_cap_basic", "sortOrder": "desc" }, "range": [0, 150]

                    }

    )
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getNewStory = async () => {
  try {
    const response = await axios.get(`https://news-headlines.tradingview.com/v2/headlines?category=base&client=overview&lang=en&tag=top_stories`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getDataForexs = async (date, status) => {
  try {
    const response = await axios.get(`https://musicappandroid1200.000webhostapp.com/login/listForex.php?search_date=${date}&status=${status}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getDataMemberId = async (id) => {
  try {
    const response = await axios.get(`https://musicappandroid1200.000webhostapp.com/login/listMember.php?id=${id}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const postLogin = async (formdata) => {
  try {
    const response = await axios.post(`https://musicappandroid1200.000webhostapp.com/login/login.php`,
      formdata, {
      headers: {
        "Content-type": "multipart/form-date"
      }
    })
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getDataPrice = async (symbol) => {
  try {
    const response = await axios.get(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=1ce947f382684049b5fe5b83b7d4f8c4`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const sendNotification = async (text) => {
  const telegramBotKey = "6805060485:AAHQVxO5cYmdGsExe-lbyjPT4pHV8ayg1f0";
  const chat_id = "@testsendtele";

  const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
  try {
    const response = await axios.post(endpoint, {
      chat_id: chat_id,
      parse_mode: 'html',
      text: text
    })
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getPriceQuote = async (symbol) => {
  try {
    const response = await axios.get(`https://research.tradermade.com/api/v1/live?currency=${symbol}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getPriceQuoteUser = async (id_user, id_default) => {
  try {
    const response = await axios.get(`https://musicappandroid1200.000webhostapp.com/login/listQuoteUser.php?id_user=${id_user}&id_default=${id_default}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}





