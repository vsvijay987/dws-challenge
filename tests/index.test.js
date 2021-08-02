import { getPriceLogsSince } from "../src/helper.js";

describe("getPriceLogsSince test", () => {
  it("should return empty result array if midprice is create more than 30 seconds ago", () => {
    const priceLog = [{ price: 1, timestamp: new Date().getTime() - 31000 }];
    const secondsAgo = 30;
    const result = getPriceLogsSince(secondsAgo, priceLog);
    expect(result).toEqual([]);
  });

  it("should return result array if midprice is created in last 30 seconds", () => {
    const priceLog = [
      { price: 1, timestamp: new Date().getTime() - 20000 },
    ];
    const secondsAgo = 30;
    const result = getPriceLogsSince(secondsAgo, priceLog);

    expect(result[0].price).toEqual(priceLog[0].price);
  });
});

// test('hello world', () => {

// })
