const { error } = require('console');
const fs = require('fs');


//Write a file : Creates a new file or overwrites the existing file.
fs.writeFile("hey.txt","hello this is a file created with fs module",function(err) {
if(err) console.errror(err);
else console.log("File Created");
});

// append a file : Adds data to an existing file. If the file doesn't exist, it creates one.
fs.appendFile("hey.txt"," Added this satement through appendFile method ",(err) => {
    if(err) console.error(err);
    else console.log("File Appended");
})

//rename a File :Rename Files
fs.rename("hey.txt","Hello.txt",function(err){
    if(err) console.error(err);
    else console.log("File Renamed");
})

// copy file : copies the content of a file to new file 
fs.copyFile("hello.txt","./copy/copy.txt",(err) => {
    if(err) console.error(err);
    else console.log("File Copied");
})

// delete file (Unlink): Delete Files
fs.unlink("hello.txt",(err) => {
    if(err) console.error(err);
    else console.log("File deleted");    
})

// read file : Reads the content of a file.
// If encoding is not given, Node returns a buffer.
fs.readFile('hello.txt','utf8',(err,data) =>{
    if(err) console.error(err);
    else console.log("File content:",data);  
})

// check file existence : fs.existsSync(path)
if (fs.existsSync('file.txt')) console.log('Exists!');



//================ directory methods: ====================

//remove folder(can remove only blank folders) : rm or rmdir 
//if (recursive = true) it will deleted an unempty folder also
fs.rm("./copy",{recursive: true},function(err) {
    if(err) console.error(err);
    else console.log("Folder Deleted");  
})

// fs.mkdir() — Create a Folder
fs.mkdir('myFolder', (err) => {
    if (err) console.log(err);
    console.log('Folder created!');
});

// Creating nested folders:
fs.mkdir('parent/child', { recursive: true }, (err) => {});

//read directory: Reads contents of a directory.
fs.readdir('.', (err, files) => {
  console.log(files);
});



//=======================file metadata operaions: ========================

//fs.stat(path, callback):Gets metadata of a file or directory.
fs.stat('example.txt', (err, stats) => {
  if (err) throw err;

  console.log(stats);
  console.log('Is File?', stats.isFile());
  console.log('Is Directory?', stats.isDirectory());
  console.log('Size:', stats.size, 'bytes');
  console.log('Created:', stats.birthtime);
  console.log('Last Modified:', stats.mtime);
});


// fs.access(path, mode, callback) : Checks if a file is readable, writable, or exists.
// | Mode                | Meaning          |
// | ------------------- | ---------------- |
// | `fs.constants.F_OK` | File exists      |
// | `fs.constants.R_OK` | Read permission  |
// | `fs.constants.W_OK` | Write permission |

fs.access('example.txt', fs.constants.R_OK, (err) => {
  if (err) console.log('Cannot Read!');
  else console.log('Readable!');
});


// fs.chmod(path, mode, callback) : Changes file permissions.
fs.chmod('example.txt','0o777', (err) => {
  if (!err) console.log('Permissions updated!');
});
// | Mode | User | Group | Others | Meaning                               |
// | ------- | ---- | ----- | ------ | ---------------------------------- |
// | `0o777` | rwx  | rwx   | rwx    | Everyone can read/write/execute    |
// | `0o755` | rwx  | r-x   | r-x    | Common for executables & web files |
// | `0o700` | rwx  | ---   | ---    | Only owner has full control        |
// | `0o644` | rw-  | r--   | r--    | Common for normal text files       |
// | `0o600` | rw-  | ---   | ---    | Private files                      |




// ====================== STREAM METHODS =============================

// Streams allow processing files piece-by-piece instead of loading the whole file into memory


//  fs.createReadStream(path, options) : Reads data in chunks.
const stream = fs.createReadStream('largeFile.txt', { encoding: 'utf8' });

stream.on('data', chunk => {
  console.log('Received chunk:', chunk.length);
});

stream.on('end', () => {
  console.log('File read complete.');
})

stream.on('error', (err) => {
  console.error('Stream error:', err.message);
});


// fs.createWriteStream(path, options) :fs.createWriteStream(path, options)
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello\n');
writeStream.write('Streaming data...\n');
writeStream.on('error', (err) => {
    console.log('An error occurred:', err.message);
    stream.destroy();
});

writeStream.end(() => console.log('Write complete.'));




// Piping Streams (stream.pipe()) : Connects read and write streams — used for efficient copying.

fs.createReadStream('largeFile.txt')
  .pipe(fs.createWriteStream('output.txt'));
  
console.log('File copying...');




// // ,handling errors with pipelines: 
// const { pipeline } = require('stream');
// const fs = require('fs');

// pipeline(
//   fs.createReadStream('input.txt'),
//   fs.createWriteStream('output.txt'),
//   (err) => {
//     if (err) {
//       console.log(' Pipeline failed:', err.message);
//     } else {
//       console.log(' Pipeline completed successfully!');
//     }
//   }
// );


