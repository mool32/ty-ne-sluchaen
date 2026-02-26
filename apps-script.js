// ============================================================
// Google Apps Script для сбора статистики игры "Ты не случаен"
// ============================================================
//
// ИНСТРУКЦИЯ:
// 1. Создай Google Таблицу (например "ty-ne-sluchaen-stats")
// 2. Первый лист назови "Data"
// 3. Extensions → Apps Script
// 4. Удали всё содержимое и вставь этот код
// 5. Нажми Deploy → New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Нажми Deploy, скопируй URL
// 7. Дай URL мне — я вставлю его в код игры
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Session ID',
        'Attempt #',
        'Level',
        'Total Presses',
        'Correct Predictions',
        'Accuracy %',
        'Balance',
        'Won',
        'Reason',
        'Ratio 0/1',
        'Max Run',
        'Top Trigram',
        'Sequence',
        'Timestamps (ms)',
        'Acc Last 10',
        'Acc Last 20',
        'Carryover Balance',
        'Device',
        'Language',
        'User Agent'
      ]);
      // Bold headers
      sheet.getRange(1, 1, 1, 21).setFontWeight('bold');
      // Freeze header row
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.sessionId || '',
      data.attemptNumber || 0,
      data.level || '',
      data.totalPresses || 0,
      data.correctPredictions || 0,
      data.accuracy || 0,
      data.balance || 0,
      data.won ? 'YES' : 'NO',
      data.reason || '',
      data.ratio01 || '',
      data.maxRun || 0,
      data.topTrigram || '',
      data.sequence || '',
      data.timestamps || '',
      data.accLast10 || '',
      data.accLast20 || '',
      data.carryoverBalance !== null && data.carryoverBalance !== undefined ? data.carryoverBalance : '',
      data.device || '',
      data.lang || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Stats endpoint is working v2' }))
    .setMimeType(ContentService.MimeType.JSON);
}
