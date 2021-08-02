import Sparkline from "./sparkline.js";
import { getPriceLogsSince, createNewCell } from "./helper.js";

//Function to sort the table
const sortTable = (tableBody, col) => {
  //col is the column number by which the table should be sorted
  let tableRows = Array.from(tableBody.getElementsByTagName("tr"));
  tableRows.sort(
    (a, b) =>
      parseFloat(a.cells[col].textContent) -
      parseFloat(b.cells[col].textContent)
  );
  tableRows.map((tableRow) => tableBody.appendChild(tableRow));
};

/*Function to update the stocks object. The stocks object contains the points array of 
midprices of the currency pairs which we needed to make the sparkline.*/
const updateStockData = (fetchedStockDetails, stocks) => {
  const name = fetchedStockDetails.name;
  const midPrice =
    (fetchedStockDetails.bestBid + fetchedStockDetails.bestAsk) / 2;

  function PriceLogItem(price) {
    this.price = price;
    this.timestamp = new Date().getTime();
  }
  if (!stocks.hasOwnProperty(name)) {
    stocks[name] = [];
  }
  stocks[name].push(new PriceLogItem(midPrice));
  return getPriceLogsSince(30, stocks[name]);
};

//Function to create and update the stock table
export const updateStockTable = (fetchedStockDetails, stocks) => {
  const dataTable = document.getElementById("stockRows");
  const existingStockRow = document.getElementById(fetchedStockDetails.name);
  const result = updateStockData(fetchedStockDetails, stocks);

  //Getting the array for midprices
  const stockGraphSparks = result.map((ele) => ele.price);

  const sparks = document.createElement("span");
  Sparkline.draw(sparks, stockGraphSparks, {
    lineColor: "green",
    endColor: "black",
    lineWidth: 2,
  });
  if (existingStockRow) {
    existingStockRow.cells[1].innerHTML =
      fetchedStockDetails.bestBid.toFixed(5);
    existingStockRow.cells[2].innerHTML =
      fetchedStockDetails.bestAsk.toFixed(5);
    existingStockRow.cells[3].innerHTML =
      fetchedStockDetails.lastChangeAsk.toFixed(5);
    existingStockRow.cells[4].innerHTML =
      fetchedStockDetails.lastChangeBid.toFixed(5);
    existingStockRow.cells[5].innerHTML = "";
    existingStockRow.cells[5].appendChild(sparks);

    //sorting table by the 4th column
    sortTable(dataTable, 4);

    return;
  }

  const newStockRow = dataTable.insertRow();
  newStockRow.id = fetchedStockDetails.name;

  createNewCell(newStockRow, fetchedStockDetails.name);
  createNewCell(newStockRow, fetchedStockDetails.bestBid.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.bestAsk.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.lastChangeAsk.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.lastChangeBid.toFixed(5));

  const stockGraph = document.createElement("td");

  //appending sparkline in the row
  stockGraph.appendChild(sparks);
  newStockRow.appendChild(stockGraph);

  sortTable(dataTable, 4);
};
