// Google Apps Script - Digital Vault Manager Backend
// Author: Sachin Meena
// Description: Complete backend for Personal & Business Digital Vault Manager

const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet();

// Initialize or get sheets for different categories
function initializeSheets() {
  const sheetNames = ['Business Documents', 'Video Hub', 'Bookmarks', 'Quick Notes'];
  
  sheetNames.forEach(sheetName => {
    if (!SPREADSHEET.getSheetByName(sheetName)) {
      const sheet = SPREADSHEET.insertSheet(sheetName);
      initializeSheetHeaders(sheet);
    }
  });
}

// Initialize headers for each sheet
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
  
  sheet.appendRow(headers);
}

// Render the web app
function doGet() {
  initializeSheets();
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Get all data from a specific sheet
function getSheetData(sheetName) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      return [];
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    return rows.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    }).filter(row => row.ID !== '');
  } catch (error) {
    Logger.log('Error in getSheetData: ' + error);
    return [];
  }
}

// Add new entry
function addEntry(sheetName, data) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'Sheet not found' };
    }
    
    const lastRow = sheet.getLastRow();
    const id = Utilities.getUuid();
    const timestamp = new Date();
    
    let newRow = [];
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    headers.forEach(header => {
      if (header === 'ID') {
        newRow.push(id);
      } else if (header === 'Timestamp') {
        newRow.push(timestamp);
      } else {
        newRow.push(data[header] || '');
      }
    });
    
    sheet.appendRow(newRow);
    return { success: true, message: 'Entry added successfully', id: id };
  } catch (error) {
    Logger.log('Error in addEntry: ' + error);
    return { success: false, message: 'Error adding entry: ' + error };
  }
}

// Update entry
function updateEntry(sheetName, id, data) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'Sheet not found' };
    }
    
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        headers.forEach((header, index) => {
          if (header === 'Timestamp') {
            sheet.getRange(i + 1, index + 1).setValue(new Date());
          } else if (data[header] !== undefined) {
            sheet.getRange(i + 1, index + 1).setValue(data[header]);
          }
        });
        return { success: true, message: 'Entry updated successfully' };
      }
    }
    
    return { success: false, message: 'Entry not found' };
  } catch (error) {
    Logger.log('Error in updateEntry: ' + error);
    return { success: false, message: 'Error updating entry: ' + error };
  }
}

// Delete entry
function deleteEntry(sheetName, id) {
  try {
    const sheet = SPREADSHEET.getSheetByName(sheetName);
    if (!sheet) {
      return { success: false, message: 'Sheet not found' };
    }
    
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        sheet.deleteRow(i + 1);
        return { success: true, message: 'Entry deleted successfully' };
      }
    }
    
    return { success: false, message: 'Entry not found' };
  } catch (error) {
    Logger.log('Error in deleteEntry: ' + error);
    return { success: false, message: 'Error deleting entry: ' + error };
  }
}

// Search across all sheets
function searchData(query) {
  try {
    const query_lower = query.toLowerCase();
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
    return {};
  }
}

// Get stats for dashboard
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
    return {};
  }
}

// Export data as JSON
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