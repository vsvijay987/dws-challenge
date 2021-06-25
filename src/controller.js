import Sparkline from "./sparkline.js";

export const updateStockData = (fetchedStockDetails, stocks) => {
  // if stock data is null return stocks
  if (!fetchedStockDetails) {
    return stocks;
  }

  //  check stock data already in stocks data
  //  if stock data does not exists in stocks, Initialize it
  if (stocks[fetchedStockDetails.name]) {
    stocks[fetchedStockDetails.name].push(fetchedStockDetails);
  } else {
    stocks[fetchedStockDetails.name] = [fetchedStockDetails];
  }

  return stocks;
};

const createNewCell = (row, value) => {
  const txtValue = document.createTextNode(value);
  const td = document.createElement("td");
  td.appendChild(txtValue);
  row.appendChild(td);
};

const sortTable = (tableBody, col) => {
  //col is the column number by which the table should be sorted
  let tableRows = Array.prototype.slice.call(tableBody.getElementsByTagName('tr'), 0);
  tableRows.sort((a, b)=> (parseFloat(a.cells[col].textContent) - parseFloat(b.cells[col].textContent)));
  tableRows.map(tableRow => tableBody.appendChild(tableRow))
}

export const updateStockTable = (fetchedStockDetails, stocks) => {
  const dataTable = document.getElementById("stockRows");
  const existingStockRow = document.getElementById(fetchedStockDetails.name);
  const stockGraphSparks = [];
  stocks[fetchedStockDetails.name].forEach((data) => {
    stockGraphSparks.push(data.bestBid + data.bestAsk / 2);
  });
  const sparks = document.createElement("span");
  Sparkline.draw(sparks, stockGraphSparks, {
    lineColor: "green",
    endColor: "black",
    lineWidth: 2,
  });
  if (existingStockRow) {
    sortTable(document.querySelector('#stockRows'), 6)
    existingStockRow.cells[1].innerHTML =
      fetchedStockDetails.bestBid.toFixed(5);
    existingStockRow.cells[2].innerHTML =
      fetchedStockDetails.bestAsk.toFixed(5);
    existingStockRow.cells[5].innerHTML =
      fetchedStockDetails.lastChangeAsk.toFixed(5);
    existingStockRow.cells[6].innerHTML =
      fetchedStockDetails.lastChangeBid.toFixed(5);
    existingStockRow.cells[7].innerHTML = "";
    existingStockRow.cells[7].appendChild(sparks);
    
    return;
  }
  
  const newStockRow = dataTable.insertRow();
  newStockRow.id = fetchedStockDetails.name;
  createNewCell(newStockRow, fetchedStockDetails.name);
  createNewCell(newStockRow, fetchedStockDetails.bestBid.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.bestAsk.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.openBid.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.openAsk.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.lastChangeAsk.toFixed(5));
  createNewCell(newStockRow, fetchedStockDetails.lastChangeBid.toFixed(5));
  const stockGraph = document.createElement("td");
  stockGraph.appendChild(sparks);
  newStockRow.appendChild(stockGraph);
};
