import axios from 'axios';

export const cargarCompraBob = async () => {
  try {
    const responseBob = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
      "fiat": "BOB",
      "page": 1,
      "rows": 10,
      "tradeType": "BUY",
      "asset": "USDT",
      "countries": [],
      "proMerchantAds": false,
      "shieldMerchantAds": false,
      "filterType": "all",
      "periods": [],
      "additionalKycVerifyFilter": 0,
      "publisherType": "merchant",
      "payTypes": [],
      "classifies": ["mass", "profession", "fiat_trade"]
    });
    return responseBob.data.data.map((item) => item.adv.price);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
};

export const cargarVentaBob = async () => {
  try {
    const responseVentaBob = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
      "fiat": "BOB",
      "page": 1,
      "rows": 10,
      "tradeType": "SELL",
      "asset": "USDT",
      "countries": [],
      "proMerchantAds": false,
      "shieldMerchantAds": false,
      "filterType": "all",
      "periods": [],
      "additionalKycVerifyFilter": 0,
      "publisherType": "merchant",
      "payTypes": [],
      "classifies": ["mass", "profession", "fiat_trade"]
    });
    return responseVentaBob.data.data.map((item) => item.adv.price);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
};

export const cargarVentaArs = async () => {
  try {
    const responseArs = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
      "fiat": "ARS",
      "page": 1,
      "rows": 10,
      "tradeType": "SELL",
      "asset": "USDT",
      "countries": [],
      "proMerchantAds": false,
      "shieldMerchantAds": false,
      "filterType": "all",
      "periods": [],
      "additionalKycVerifyFilter": 0,
      "publisherType": "merchant",
      "payTypes": [],
      "classifies": ["mass", "profession", "fiat_trade"]
    });
    return responseArs.data.data.map((item) => item.adv.price);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
};

export const cargarCompraArs = async () => {
  try {
    const responseCompraArs = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
      "fiat": "ARS",
      "page": 1,
      "rows": 10,
      "tradeType": "BUY",
      "asset": "USDT",
      "countries": [],
      "proMerchantAds": false,
      "shieldMerchantAds": false,
      "filterType": "all",
      "periods": [],
      "additionalKycVerifyFilter": 0,
      "publisherType": "merchant",
      "payTypes": [],
      "classifies": [
        "mass",
        "profession",
        "fiat_trade"
      ]
    });
    return responseCompraArs.data.data.map((item) => item.adv.price);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
};

export const cargarVentaBrl = async () => {
  try {
    const responseVentaBrl = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
      "fiat": "BRL",
      "page": 1,
      "rows": 10,
      "tradeType": "SELL",
      "asset": "USDT",
      "countries": [],
      "proMerchantAds": false,
      "shieldMerchantAds": false,
      "filterType": "all",
      "periods": [],
      "additionalKycVerifyFilter": 0,
      "publisherType": "merchant",
      "payTypes": [],
      "classifies": ["mass", "profession", "fiat_trade"]
    });
    return responseVentaBrl.data.data.map((item) => item.adv.price);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
};

export const cargarCompraBrl = async () => {
  try {
    const responseCompraBrl = await axios.post('https://servidorecono-production.up.railway.app/api/binance', {
      "fiat": "BRL",
      "page": 1,
      "rows": 10,
      "tradeType": "BUY",
      "asset": "USDT",
      "countries": [],
      "proMerchantAds": false,
      "shieldMerchantAds": false,
      "filterType": "all",
      "periods": [],
      "additionalKycVerifyFilter": 0,
      "publisherType": "merchant",
      "payTypes": [],
      "classifies": [
        "mass",
        "profession",
        "fiat_trade"
      ]
    });
    return responseCompraBrl.data.data.map((item) => item.adv.price);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return [];
  }
};