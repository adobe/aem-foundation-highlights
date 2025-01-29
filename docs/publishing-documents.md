# **How-To: Add a New Announcement to the Blog**  

This guide explains how to add a new announcement to the [AEM Cloud Infrastructure Blog](https://main--aem-foundation-highlights--adobe.hlx.page/), ensuring it appears on the homepage and is accessible to everyone.  

---

## **1. 🛠️ Install AEM Sidekick** (Required for Publishing)  

Before making any updates, you need **AEM Sidekick** to preview and publish changes.  

### **Steps to Install AEM Sidekick:**  
1. Open any **Chromium-based browser** (Chrome, Arc, etc.).
2. Go to [AEM Sidekick](https://chromewebstore.google.com/detail/aem-sidekick/igkmdomcgoebiipaifhmpfjhbjccggml) and install the extension.  
3. Once installed, open the **AEM Blog Homepage** and click the **Sidekick button** on the right to check if it's working.  
4. You need to login with your Microsoft account to use the Sidekick.

You’ll use Sidekick **after every change** to preview and publish updates.  

---

## **2. ✏️ Upload the Announcement Document**  

### **Steps to Upload Your Announcement:**  
1. Open **SharePoint**:  
   🔗 **[Website Content in SharePoint](https://adobe.sharepoint.com/:f:/r/sites/FCCSCloudServices/Shared%20Documents/website?csf=1&web=1&e=yjwSMG)**  
2. Navigate to the **/articles** folder.  
3. Upload your **new Word document** (`.docx`). You can use one of the existing documents as template.
4. **Preview and Publish:**
   - Select or open the **document** in Sharepoint.  
   - Click the **Sidekick button**.  
   - Click **Preview** and **Publish** to check your content live.  

---

## **3. 🔎 Update the `query-index` File**  

The **query-index.xlsx** file controls what announcements appear on the homepage. You need to add your new document there.  

### **Steps to Update the Index:**  
1. **Open SharePoint** and open the `query-index.xlsx` file.  
2. Go to the **`helix-articles`** sheet.  
3. Add a **new row** with:  
   - **path**: `/articles/<your-document-name>` (matching the uploaded file).  
   - **title**: Your article title.  
   - **authors**: Comma-separated author list (e.g., `jdoe, asmith`).  
   - **creationDate**: Date in `DD/MM/YYYY` format.  
   - **thumbnail**: not supported yet.  
   - **description**: A short summary of the announcement.  

**Example Entry:**  

| path                              | title                          | authors         | creationDate | thumbnail | description |
|-----------------------------------|--------------------------------|----------------|--------------|-----------|-------------|
| /articles/cloud-scalability-2024 | Cloud Scalability in 2024 | jdoe, asmith | 01/01/2024  | 0         | How we improved cloud scalability by 30% |
4. **Preview and Publish:**  
   - Open the **homepage** in your browser.  
   - Click the **Sidekick button**.  
   - Click **Preview** and **Publish** to make it live.  

---

## **4. 🥷 For the Ninjas: Access the Website Code**  

For any **frontend behavior changes**, check the **client-side code repository**:  

🔗 **[GitHub Repo: adobe/aem-foundation-highlights](https://github.com/adobe/aem-foundation-highlights)**  

This repository contains:  
- The **announcement component** that renders articles.  
- The **MJML-based email rendering** logic.
- Logic for other components like **header, footer, team numbers and team members**.
- General styles and logic used in the blog.

---

Now your announcement should be **live** on the homepage! 🚀