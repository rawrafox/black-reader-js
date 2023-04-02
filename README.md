Black Reader JS
======
A library for converting Eve Online black files to JSON

Installation
------
1) Install  [Node.js](http://www.nodejs.org) along with the node package manager (NPM)
2) Clone the repo, e.g. `git clone https://github.com/rawrafox/black-reader-js`
3) Run `npm install` once from the root black-reader-js folder

Usage
-----
Download all black files for an eve online client to a destination folder
* node downloader [resFileIndexPath] [destFolder]
* example: `node downloader c:/eve/evesharedcache/tq/resfileindex.txt ./input`

Convert all black files from a source folder to a destination folder
* node runner [sourceFolder] [destFolder]
* example: `node runner ./input ./output`

Convert a black file to a destination folder
* node runner [sourceFileName.black] [destFolder]
* example: `node runner ./input/data.black ./output`

