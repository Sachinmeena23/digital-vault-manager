# 🔐 Digital Vault Manager - Personal & Business Hub

A complete Google Apps Script (GAS) web application to manage and organize all your personal and business data in one secure, beautiful digital vault.

![Version](https://img.shields.io/badge/version-1.0.0-blueviolet.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen.svg)

## ✨ Features

### 📊 Dashboard & Stats
- Real-time stats cards showing total documents, videos, bookmarks, and notes
- Quick access buttons to add new entries
- Beautiful gradient UI with glassmorphism design

### 📁 Four Main Categories

1. **Business Documents** 📄
   - Upload & manage invoices, GST documents, contracts, ID cards, certificates
   - PDF/Image links with direct access
   - Organized by date and category
   - Notes field for additional context

2. **Video Hub** 🎥
   - YouTube links, Google Drive videos, tutorial collections
   - Video platform detection (YouTube, Drive, Vimeo, Other)
   - Favorite/star marking system
   - Click-to-play video preview cards

3. **Bookmarks & Web Links** 🔖
   - Useful websites, admin portals, reference links
   - Tag-based organization
   - One-click copy URL button
   - Direct open links in new tabs

4. **Quick Notes & Data** 📝
   - Text snippets for quick reference
   - Sensitive data masking (show/hide button)
   - Category-based organization
   - Copy-to-clipboard functionality

### 🔍 Advanced Search & Filter
- Global search bar across all categories
- Real-time filter results
- Instant display of matching items
- Search across titles, URLs, content, and notes

### 🎨 Design Features
- **Dark/Light Mode Toggle** - One-click theme switching with localStorage persistence
- **Colorful Category Badges** - Each category has unique gradient colors
- **Glassmorphism Cards** - Modern frosted glass effect with blur
- **Smooth Animations** - Hover effects, transitions, and micro-interactions
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Loading Skeletons** - Smooth data loading experience
- **Toast Notifications** - User feedback for actions (copy, add, delete, etc.)

### 💾 Data Management
- **Add Entries** - User-friendly modals for adding new data
- **Edit Entries** - Modify existing entries with pre-populated forms
- **Delete Entries** - Safe deletion with confirmation dialog
- **View Details** - Detailed view modal for each entry
- **Real-time Sync** - All changes instantly sync to Google Sheets

### 🌐 Integration
- **Google Sheets Backend** - All data securely stored in Google Sheets
- **Auto-initialization** - Automatically creates necessary sheets on first use
- **Zero Configuration** - Just deploy and start using

## 🚀 Quick Start Guide

### Step 1: Create a Google Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click **Create project**
3. Name your project: "Digital Vault Manager"

### Step 2: Set Up the Files

1. **Copy Code.gs content:**
   - Open the default `Code.gs` file
   - Replace all content with the code from `Code.gs` in this repository
   - Save (Ctrl+S or Cmd+S)

2. **Create index.html:**
   - Click **+ → HTML** 
   - Name it `index.html`
   - Replace all content with the code from `index.html` in this repository
   - Save

### Step 3: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (name doesn't matter)
3. Note the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
   ```

### Step 4: Link Sheet to Apps Script

1. Back in your Apps Script editor
2. Click on **Project Settings** (gear icon)
3. Copy your Script ID
4. In the Apps Script editor, click **Editor** at the top
5. Modify the `Code.gs` file - replace the first line:
   ```javascript
   const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
   ```
   This will auto-detect when deployed as web app

### Step 5: Deploy as Web App

1. In Apps Script editor, click **Deploy** → **New Deployment**
2. Select **Type**: "Web app"
3. **Execute as**: Your email
4. **Who has access**: "Anyone"
5. Click **Deploy**
6. Copy the generated Web App URL
7. Click **"Check"** if it asks for verification

### Step 6: Start Using

1. Open the deployment URL in your browser
2. The app will automatically initialize Google Sheets
3. Start adding your data!

## 📝 Usage Guide

### Adding Data

#### Business Documents
- Click **"+ Business Doc"** button
- Fill in: Document Name, Category, Upload Link, Date, Notes
- Click **"Save Entry"**

#### Videos
- Click **"+ Video"** button
- Fill in: Title, Video URL (YouTube/Drive link)
- Select Platform and Category
- Optionally mark as Favorite
- Click **"Save Entry"**

#### Bookmarks
- Click **"+ Bookmark"** button
- Fill in: Site Title, URL, Tags (comma-separated)
- Add optional description
- Click **"Save Entry"**

#### Quick Notes
- Click **"+ Note"** button
- Fill in: Title, Content (text)
- Optional: Mark as Sensitive (password/private data)
- Click **"Save Entry"**

### Searching & Filtering

1. **Global Search**: Type in the search bar at the top
2. **Browse by Tab**: Click tabs (Business, Videos, Bookmarks, Notes)
3. **View All**: Click "सभी (All)" tab to see everything
4. **Results appear instantly** as you type

### Managing Entries

- **View Details**: Click card or 👁️ icon
- **Edit**: Click card → "Edit" button in modal
- **Delete**: Click card → "Delete" button in modal
- **Copy Link**: Click 📋 button on bookmarks/notes
- **Open Link**: Click 🔗 or "Open" button
- **Mark Favorite** (Videos): Click ⭐ icon

### Theme Toggle

- Click the 🌙/☀️ button (top-right corner)
- Automatically saves your preference in browser

## 🏗️ Technical Architecture

### Backend (Code.gs)
```
initializeSheets()       → Auto-create Google Sheets structure
getSheetData()          → Fetch data from specific sheet
addEntry()              → Insert new row in sheet
updateEntry()           → Update existing entry
deleteEntry()           → Remove entry from sheet
searchData()            → Search across all categories
getDashboardStats()     → Get entry counts for dashboard
exportData()            → Export all data as JSON
```

### Frontend (index.html)
```
HTML Structure
├── Header with gradient text
├── Dashboard stats cards
├── Search & filter bar
├── Tab navigation
├── Dynamic content area
├── Add/Edit modal
├── View details modal
└── Theme toggle button

CSS Features
├── Tailwind CSS framework
├── Custom glassmorphism effects
├── Gradient backgrounds
├── Smooth animations
├── Responsive grid layouts
└── Dark/Light mode support

JavaScript Functions
├── initApp()            → Initialize on page load
├── loadData()           → Fetch all data from backend
├── renderContent()      → Dynamically render cards
├── handleSearch()       → Global search functionality
├── showAddModal()       → Open add entry dialog
├── handleSaveEntry()    → Save/update entry
├── openViewModal()      → Show entry details
├── toggleTheme()        → Switch dark/light mode
└── copyToClipboard()    → Copy to system clipboard
```

### Data Structure

**Business Documents Sheet:**
| ID | Document Name | Category | Upload Link | Date Added | Notes | Timestamp |
|----|---|---|---|---|---|---|

**Video Hub Sheet:**
| ID | Title | Video URL | Platform | Category | Favorite | Date Added | Timestamp |
|----|---|---|---|---|---|---|---|

**Bookmarks Sheet:**
| ID | Site Title | URL | Tags | Description | Date Added | Timestamp |
|----|---|---|---|---|---|---|---|

**Quick Notes Sheet:**
| ID | Title | Content | Category | Is Sensitive | Date Added | Timestamp |
|----|---|---|---|---|---|---|---|

## 🎨 Customization

### Change Theme Colors

Edit the CSS variables in `index.html`:
```css
:root {
  --primary: #8b5cf6;      /* Purple - Main color */
  --secondary: #06b6d4;    /* Cyan - Secondary */
  --accent: #10b981;       /* Green - Accent */
  --danger: #ef4444;       /* Red - Delete/Danger */
  --dark-bg: #0f172a;      /* Dark background */
  --card-bg: #1e293b;      /* Card background */
  --border-color: #334155; /* Border color */
}
```

### Add More Categories

1. In `Code.gs`, update `SHEET_NAMES` array:
   ```javascript
   const sheetNames = ['Business Documents', 'Video Hub', 'Bookmarks', 'Quick Notes', 'Your New Category'];
   ```

2. In `index.html`, add new tab button in tabs section and form fields in `getFormFields()`

3. Add category icon in `getCategoryIcon()` function

### Modify Badge Colors

Edit badge CSS classes in `index.html`:
```css
.badge-business { /* Customize business badge */ }
.badge-personal { /* Customize personal badge */ }
.badge-urgent   { /* Customize urgent badge */ }
.badge-video    { /* Customize video badge */ }
.badge-web      { /* Customize web badge */ }
```

## 🔒 Security Notes

⚠️ **Important**: This app is for personal use. While Google Sheets provides standard security:

- ✅ Data stored in your Google Drive
- ✅ Only accessible to you (or those you share with)
- ✅ Never shared with third parties
- ⚠️ For very sensitive data (passwords), consider additional encryption
- ⚠️ Use Google's 2FA on your account for extra protection

**Best Practices:**
1. Don't share the deployment URL publicly
2. Keep sensitive passwords/data in "Quick Notes" with "Is Sensitive: Yes"
3. Regularly backup your data by downloading the Sheet
4. Use strong Google account password

## 📱 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ | Full support |
| Firefox | ✅ | Full support |
| Safari | ✅ | Full support (iOS/macOS) |
| Edge | ✅ | Full support |
| Opera | ✅ | Full support |

## 🐛 Troubleshooting

### Issue: "Authorization required"
**Solution**: Click "Review permissions" and authorize the app to access your Google Drive

### Issue: Sheets not appearing
**Solution**: 
1. Refresh the page
2. Check if the Google Sheet is in your Drive
3. Re-deploy the web app

### Issue: Entries not saving
**Solution**:
1. Check browser console (F12) for errors
2. Ensure you're connected to internet
3. Try refreshing and re-adding

### Issue: Search not working
**Solution**:
1. Wait a moment for data to load
2. Clear search and try again
3. Check browser console for JavaScript errors

### Issue: Dark mode not persisting
**Solution**: Clear browser cache and localStorage

## 📊 Performance Tips

1. **Large Datasets**: Keep entries under 10,000 for best performance
2. **Images**: Link to Drive/external storage instead of uploading
3. **Cleanup**: Regularly delete old/unused entries
4. **Backup**: Export data monthly using `exportData()` function

## 🔄 Export & Backup

To export all your data as JSON:
1. Open browser Console (F12)
2. Run: `google.script.run.withSuccessHandler(console.log).exportData()`
3. Copy the JSON output
4. Save to a text file for backup

## 📚 API Reference

### Backend Functions

```javascript
// Get all data from a sheet
getSheetData(sheetName)
→ Returns: Array of objects with all entries

// Add new entry
addEntry(sheetName, data)
→ Returns: { success: true/false, id: uuid, message: string }

// Update entry
updateEntry(sheetName, id, data)
→ Returns: { success: true/false, message: string }

// Delete entry
deleteEntry(sheetName, id)
→ Returns: { success: true/false, message: string }

// Search across all sheets
searchData(query)
→ Returns: { sheetName: [matching entries] }

// Get dashboard stats
getDashboardStats()
→ Returns: { sheetName: { total: number, data: [] } }

// Export all data
exportData()
→ Returns: JSON string of all sheets and entries
```

## 🎓 Learning Resources

- [Google Apps Script Official Docs](https://developers.google.com/apps-script)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Sheets API](https://developers.google.com/sheets/api)

## 🤝 Contributing

Found a bug or have a feature request? 
1. Open an Issue
2. Describe the problem/feature
3. Provide screenshots if possible

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Built with ❤️ for personal productivity
- Powered by Google Apps Script
- Styled with Tailwind CSS
- Icons by Font Awesome

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console (F12) for errors
3. Try refreshing the page
4. Re-deploy the web app if needed

---

**Made with ❤️ by Sachin Meena**

🌟 If you find this useful, please star the repository!

Happy organizing! 🎉