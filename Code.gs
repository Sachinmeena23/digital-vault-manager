// ============================================
// DIGITAL VAULT MANAGER - Google Apps Script
// Author: Sachin Meena
// ============================================

// Get the active spreadsheet
const SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet();

// ============================================
// INITIALIZATION FUNCTIONS
// ============================================

function doGet() {
  // Initialize sheets on first load
  initializeSheets();
  
  // Return the HTML as web app
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function initializeSheets() {
  const sheetNames = ['Business Documents', 'Video Hub', 'Bookmarks', 'Quick Notes'];
  
  sheetNames.forEach(sheetName => {
    if (!SPREADSHEET.getSheetByName(sheetName)) {
      const sheet = SPREADSHEET.insertSheet(sheetName);
      initializeSheetHeaders(sheet);
    }
  });
}

function initializeSheetHeaders(sheet) {
  const sheetName = sheet.getName();
  let headers = [];
  
  if (sheetName === 'Business Documents') {
    headers = ['ID', 'Document Name', 'Category', 'Upload Link', 'Date Added', 'Notes', 'Timestamp'];
  } else if (sheetName === 'Video Hub') {
    headers = ['ID', 'Title', 'Video URL', 'Platform', 'Category', 'Favorite', 'Date Added', 'Timestamp'];
  } else if (sheetName === 'Bookmarks') {
    headers = ['ID', 'Site Title', 'URL', 'Tags', 'Description', 'Date Added', 'Timestamp'];
  } else if (sheetName === 'Quick Notes') {
    headers = ['ID', 'Title', 'Content', 'Category', 'Is Sensitive', 'Date Added', 'Timestamp'];
  }
  
  if (headers.length > 0) {
    sheet.appendRow(headers);
  }
}

// ============================================
// READ OPERATIONS
// ============================================

function getSheetData(sheetName) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log('Sheet not found: ' + sheetName);
      return [];
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return [];
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    return data.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    }).filter(row => row.ID !== '' && row.ID);
  } catch (error) {
    Logger.log('Error in getSheetData: ' + error);
    return [];
  }
}

function getDashboardStats() {
  try {
    const sheetNames = ['Business Documents', 'Video Hub', 'Bookmarks', 'Quick Notes'];
    const stats = {};
    
    sheetNames.forEach(sheetName => {
      const data = getSheetData(sheetName);
      stats[sheetName] = {
        total: data.length,
        data: data
      };
    });
    
    return stats;
  } catch (error) {
    Logger.log('Error in getDashboardStats: ' + error);
    return {
      'Business Documents': { total: 0, data: [] },
      'Video Hub': { total: 0, data: [] },
      'Bookmarks': { total: 0, data: [] },
      'Quick Notes': { total: 0, data: [] }
    };
  }
}

// ============================================
// CREATE OPERATION
// ============================================

function addEntry(sheetName, data) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'Sheet not found' };
    }
    
    const id = Utilities.getUuid();
    const timestamp = new Date().toLocaleString('en-IN');
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    let newRow = [];
    
    headers.forEach(header => {
      if (header === 'ID') {
        newRow.push(id);
      } else if (header === 'Timestamp') {
        newRow.push(timestamp);
      } else if (header === 'Date Added' && !data[header]) {
        newRow.push(new Date().toLocaleDateString('en-IN'));
      } else {
        newRow.push(data[header] || '');
      }
    });
    
    sheet.appendRow(newRow);
    SpreadsheetApp.flush();
    
    return { success: true, message: 'Entry added successfully', id: id };
  } catch (error) {
    Logger.log('Error in addEntry: ' + error);
    return { success: false, message: 'Error adding entry: ' + error.toString() };
  }
}

// ============================================
// UPDATE OPERATION
// ============================================

function updateEntry(sheetName, id, data) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'Sheet not found' };
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return { success: false, message: 'No data found' };
    }
    
    const dataRange = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
    const values = dataRange.getValues();
    const headers = values[0];
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        const updates = [];
        headers.forEach((header, index) => {
          if (header === 'Timestamp') {
            updates[index] = new Date().toLocaleString('en-IN');
          } else if (data.hasOwnProperty(header)) {
            updates[index] = data[header];
          } else {
            updates[index] = values[i][index];
          }
        });
        
        sheet.getRange(i + 1, 1, 1, headers.length).setValues([updates]);
        SpreadsheetApp.flush();
        return { success: true, message: 'Entry updated successfully' };
      }
    }
    
    return { success: false, message: 'Entry not found' };
  } catch (error) {
    Logger.log('Error in updateEntry: ' + error);
    return { success: false, message: 'Error updating entry: ' + error.toString() };
  }
}

// ============================================
// DELETE OPERATION
// ============================================

function deleteEntry(sheetName, id) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'Sheet not found' };
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return { success: false, message: 'No data found' };
    }
    
    const dataRange = sheet.getRange(1, 1, lastRow, sheet.getLastColumn());
    const values = dataRange.getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        sheet.deleteRow(i + 1);
        SpreadsheetApp.flush();
        return { success: true, message: 'Entry deleted successfully' };
      }
    }
    
    return { success: false, message: 'Entry not found' };
  } catch (error) {
    Logger.log('Error in deleteEntry: ' + error);
    return { success: false, message: 'Error deleting entry: ' + error.toString() };
  }
}

// ============================================
// SEARCH OPERATION
// ============================================

function searchData(query) {
  try {
    const query_lower = query.toLowerCase().trim();
    const sheetNames = ['Business Documents', 'Video Hub', 'Bookmarks', 'Quick Notes'];
    const results = {};
    
    sheetNames.forEach(sheetName => {
      const data = getSheetData(sheetName);
      results[sheetName] = data.filter(row => {
        return Object.values(row).some(val => 
          String(val).toLowerCase().includes(query_lower)
        );
      });
    });
    
    return results;
  } catch (error) {
    Logger.log('Error in searchData: ' + error);
    return {
      'Business Documents': [],
      'Video Hub': [],
      'Bookmarks': [],
      'Quick Notes': []
    };
  }
}

// ============================================
// EXPORT OPERATION
// ============================================

function exportData() {
  try {
    const sheetNames = ['Business Documents', 'Video Hub', 'Bookmarks', 'Quick Notes'];
    const exportData = {};
    
    sheetNames.forEach(sheetName => {
      exportData[sheetName] = getSheetData(sheetName);
    });
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    Logger.log('Error in exportData: ' + error);
    return '{}';
  }
}