const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const cors=require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/run-code', (req, res) => {
    const { code, language } = req.body;
    console.log(code);   
    // Map the language to the respective file name
    let filePath;
    switch (language) {
        case 'java':
            filePath = path.join(__dirname, 'Main.java');
            break;
        case 'python':
            filePath = path.join(__dirname, 'main.py');
            break;
        case 'cpp':
            filePath = path.join(__dirname, 'main.cpp');
            break;
        default:
            return res.status(400).send('Invalid language flag.');
    }

    // Write the code into the respective file
    fs.writeFile(filePath, code, (err) => {
        if (err) {
            return res.status(500).send('Error writing the code to file.');
        }
        const currentDir = process.cwd();
        
        // Run Docker container to compile/run code
        const dockerCommand = `docker run -v "${currentDir}:/app" thecompiler ${language}`;
        // Run Docker container to compile/run code
        exec(dockerCommand, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).send(`Error executing code: ${stderr}`);
            }

            res.send(`Output: ${stdout}`);
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
