/**
 *
 * @param {File} file
 * @returns
 */
async function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}

/**
 *
 * @param {Blob} file
 * @param {{ onProgress: (progress) => void }} options
 * @returns {any[]}
 */
async function readCSV(file, options) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      options?.onProgress(0);

      const worker = new Worker("/js/workers/parseCSV.js");
      worker.postMessage(reader.result);

      worker.onmessage = (evt) => {
        const { type, data } = evt.data;
        switch (type) {
          case "progress":
            options?.onProgress(data);
            break;
          case "complete":
            resolve(data);
            break;
        }
      };
      worker.onerror = (error) => reject(error);
    };

    // reader.onprogress = (ev) => ev.
    reader.onerror = (error) => reject(error);
  });
}

function parseCSV(str) {
  var arr = [];
  var quote = false; // 'true' means we're inside a quoted field

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (var row = 0, col = 0, c = 0; c < str.length; c++) {
    var cc = str[c],
      nc = str[c + 1]; // Current character, next character
    arr[row] = arr[row] || []; // Create a new row if necessary
    arr[row][col] = arr[row][col] || ""; // Create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc == "," && !quote) {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row][col] += cc;
  }
  return arr;
}

export { readCSV, getBase64, parseCSV };
