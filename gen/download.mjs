import * as fs from "fs";
import * as https from "https";

const download = (url, dest) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', () => {
            file.close(() => {
                fs.readFile(dest, {encoding: 'utf8'}, (err, data) => {
                    if (err) return console.log(err);

                    const result = data.replace(/\r\n/g, '\n')
                        .replace(/[^\S\r\n]{2,}/g, ' ')
                        .replace(/\n[^\S\r\n]+/g, '\n');

                    fs.writeFile(dest, result, {encoding: 'utf8'}, err => {
                        if (err) return console.log(err);
                    });
                });
            });
        });
    }).on('error', function (err) {
        console.log(err);
    });
};

// https://github.com/UnryzeC/UjAPI/tree/main/uJAPIFiles
download('https://raw.githubusercontent.com/UnryzeC/UjAPI/main/uJAPIFiles/common.j', './../static/common.j');
download('https://raw.githubusercontent.com/UnryzeC/UjAPI/main/uJAPIFiles/UjAPI.j', './../static/UjAPI.j');
download('https://raw.githubusercontent.com/nazarpunk/wc3-ujapi/master/sdk/blizzard.j', './../static/blizzard.j');
