export const getPriceLogsSince = (secondsAgo, priceLog) => {
  let millisecondsAgo = secondsAgo * 1000;
  let time = new Date().getTime() - millisecondsAgo;

  let result = [];
  for (let i = priceLog.length - 1; i >= 0; i--) {
    if (priceLog[i].timestamp >= time) result.push(priceLog[i]);
    else break;
  }
  return result;
};

//Function to create new cell in the row
export const createNewCell = (row, value) => {
  const txtValue = document.createTextNode(value);

  const td = document.createElement("td");
  td.appendChild(txtValue);
  row.appendChild(td);
};
