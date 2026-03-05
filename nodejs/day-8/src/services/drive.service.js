const { google } = require('googleapis');
const fs = require('fs');
const driveConfig = require('@/config/drive.config');

class DriveService {
    constructor() {
        this.clientId = driveConfig.clientId;
        this.clientSecret = driveConfig.clientSecret;
        this.refreshToken = driveConfig.refreshToken;
        this.driveDirId = driveConfig.dirId;

        this.oauth2Client = new google.auth.OAuth2(
            this.clientId,
            this.clientSecret,
            'https://developers.google.com/oauthplayground'
        );

        this.oauth2Client.setCredentials({ refresh_token: this.refreshToken });
        this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    }

    /**
     * Upload a file to Google Drive.
     * @param {string} filePath - Path to the local file to upload.
     * @param {string} fileName - Name for the uploaded file on Google Drive.
     * @returns {Promise<string>} - The ID of the uploaded file.
     */
    async uploadFile(filePath, fileName) {
        try {
            const fileMetadata = {
                name: fileName,
                parents: this.driveDirId ? [this.driveDirId] : [],
            };

            const media = {
                mimeType: 'application/octet-stream',
                body: fs.createReadStream(filePath),
            };

            const response = await this.drive.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: 'id',
            });

            return response.data.id;
        } catch (error) {
            console.error('Error uploading file to Google Drive:', error);
            throw error;
        }
    }

    /**
     * Delete a file from Google Drive.
     * @param {string} fileId - The ID of the file to delete.
     */
    async deleteFile(fileId) {
        try {
            await this.drive.files.delete({
                fileId: fileId,
            });
        } catch (error) {
            console.error('Error deleting file from Google Drive:', error);
            throw error;
        }
    }
}

module.exports = new DriveService();
