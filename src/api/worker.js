import AsyncStorage from "@react-native-async-storage/async-storage";

export  const fetchDataFromWorker = () => {
    const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
    let newWs = new WebSocket(socketUrl);
    let marketdata = null;


    newWs.onopen = () => {
      console.log('WebSocket connected');
    };

    newWs.onmessage = e => {
      const data = JSON.parse(e.data);
      
      const positiveData = data.filter(item => parseFloat(item.P) > 0);
      positiveData.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
      const top10PositiveData = positiveData.slice(0, 8);

      top10PositiveData.forEach(item => {
        item.c = parseFloat(item.c).toFixed(2);
        item.p = parseFloat(item.p).toFixed(3);
        item.P = parseFloat(item.P).toFixed(2);
      });

      console.log('Data Found :: ' + top10PositiveData[0].s +" :: " +top10PositiveData[0].P);

      marketdata = top10PositiveData;

      try {
        const jsonValue = JSON.stringify(top10PositiveData);
        AsyncStorage.setItem('marketdata', jsonValue);
      } catch (error) {
        console.log(error);
      }

      return top10PositiveData;
      
    };

    newWs.onerror = e => {
      console.log('Error Found');
      console.log(e.message);
    };

    newWs.onclose = e => {
      console.log('onclose Found');
      console.log(e.code, e.reason);
    };


    return marketdata;
  };

 