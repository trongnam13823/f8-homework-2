const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const driveService = require('@/services/drive.service');
const mailService = require('@/services/mail.service');
const appConfig = require('@/config/app.config');

/**
 * Perform a database backup, upload it to Google Drive and send a notification email.
 */
async function performBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `backup-${appConfig.dbName}-${timestamp}.sql`;
    const backupPath = path.join(__dirname, '../../storage/DBBackup', fileName);

    // Ensure backup directory exists
    const backupDir = path.join(__dirname, '../../storage/DBBackup');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    try {
        console.log(`Starting backup: ${fileName}...`);

        // Command to dump database. Using -i for interactivity if needed, but here we redirect.
        // We'll try to use docker exec since we found mysql is running in docker.
        const { mysqlContainerName, dbUser, dbPass, dbName, dbHost, dbPort, adminEmail } = appConfig;

        const dumpCommand = `docker exec ${mysqlContainerName} mysqldump -u${dbUser} -p${dbPass} ${dbName} > "${backupPath}"`;

        await new Promise((resolve, reject) => {
            exec(dumpCommand, (error, stdout, stderr) => {
                if (error) return reject(error);
                resolve();
            });
        });

        console.log(`Backup file created at: ${backupPath}`);

        // Upload to Drive via Drive service
        console.log(`Uploading to Google Drive...`);
        const fileId = await driveService.uploadFile(backupPath, fileName);
        console.log(`Upload successful! File ID: ${fileId}`);

        console.log(`Sending email notification...`);
        // Send Email using service method
        await mailService.sendBackupNotification({
            status: 'Success',
            timestamp: new Date().toLocaleString(),
            filename: fileName,
            fileId: fileId,
        });
        console.log(`Email notification sent successfully.`);

        // Clean up local backup file
        // fs.unlinkSync(backupPath);
        console.log(`Backup completed successfully.`);
    } catch (error) {
        console.error('Backup process failed:', error);

        // Send failure email using service method
        await mailService.sendBackupNotification({
            status: 'Failure',
            timestamp: new Date().toLocaleString(),
            filename: fileName,
            error: error.message,
        }).catch(e => console.error('Failed to send failure email:', e));
    }
}

module.exports = performBackup;
