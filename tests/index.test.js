import {updateStockData} from '../src/controller.js';

describe("updateStockData test", () => {
  it("should return stocks object if current stock details is null", () => {
    const stocks = {};
    const currentStock = null;
    const updatedStocks = updateStockData(currentStock, stocks);
    expect(updatedStocks).toEqual(stocks);
  });

  it("should return stocks object with key => currentStock.name, if current stock is valid", () => {
    const stocks = {};
    const currentStock = {
      name: "stock",
      bestBid: 1,
      bestAsk: 2,
      openBid: 3,
      openAsk: 4,
      lastChangeAsk: 5,
      lastChangeBid: 6,
    };
    const updatedStocks = updateStockData(currentStock, stocks);
    expect(Object.keys(updatedStocks)).toEqual(["stock"]);
  });

  it("should update stocks object after getting new stock data", () => {
    const stocks = {
      stock: [
        {
          name: "stock",
          bestBid: 1,
          bestAsk: 2,
          openBid: 3,
          openAsk: 4,
          lastChangeAsk: 5,
          lastChangeBid: 6,
        },
      ],
    };
    const currentStock = {
      name: "stock",
      bestBid: 7,
      bestAsk: 8,
      openBid: 9,
      openAsk: 10,
      lastChangeAsk: 11,
      lastChangeBid: 12,
    };
    const updatedStocks = updateStockData(currentStock, stocks);
    expect(updatedStocks["stock"].length).toEqual(2);
  });
});

// test('hello world', () => {

// })
