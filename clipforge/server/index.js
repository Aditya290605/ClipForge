const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const ytDlpPath = path.join(__dirname, 'bin', 'yt-dlp');

// Validate video URL and get metadata
app.get('/api/validate', (req, res) => {
    const { url } = req.query;
    console.log('Validating:', url);

    // Run: bin/yt-dlp --dump-single-json --no-warnings ... [url]
    const process = spawn(ytDlpPath, [
        '--dump-single-json',
        '--no-warnings',
        '--no-call-home',
        '--prefer-free-formats',
        '--youtube-skip-dash-manifest',
        url
    ]);

    let stdoutData = '';
    let stderrData = '';

    process.stdout.on('data', (data) => {
        stdoutData += data.toString();
    });

    process.stderr.on('data', (data) => {
        stderrData += data.toString();
    });

    process.on('close', (code) => {
        if (code !== 0) {
            console.error('Validation failed:', stderrData);
            return res.status(500).json({ error: 'Failed to validate video' });
        }

        try {
            const info = JSON.parse(stdoutData);
            res.json({
                title: info.title,
                thumbnail: info.thumbnail,
                duration: info.duration,
                channel: info.uploader,
                format: 'MP4'
            });
        } catch (err) {
            console.error('JSON parse error:', err);
            res.status(500).json({ error: 'Failed to parse video metadata' });
        }
    });
});

// Download video stream
app.get('/api/download', (req, res) => {
    const { url } = req.query;
    console.log('Downloading:', url);

    res.header('Content-Type', 'video/mp4');

    // Run: bin/yt-dlp -o - [args] [url]
    const subprocess = spawn(ytDlpPath, [
        '-o', '-',
        '-f', 'best', // Use 'best' to get a single file with audio+video (avoids needing ffmpeg)
        '--restrict-filenames',
        '--no-warnings',
        url
    ]);

    // Pipe stdout directly to response
    subprocess.stdout.pipe(res);

    subprocess.stderr.on('data', (data) => {
        console.error(`yt-dlp stderr: ${data}`);
    });

    subprocess.on('close', (code) => {
        if (code !== 0) {
            console.log(`yt-dlp process exited with code ${code}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
