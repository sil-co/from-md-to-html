const fs: typeof import('fs') = require('fs');
const path = require('path');
const showdown = require('showdown');
const { JSDOM } = require('jsdom');

// ファイルパスの設定
const mdFilePath = './data/md/sample.md';
const htmlFilePath = './data/html/sample.html';

// Markdownファイルを読み込む
fs.readFile(mdFilePath, 'utf8', (
    err: NodeJS.ErrnoException | null, 
    mdData: string
) => {
    if (err) {
        console.error('Markdownファイルの読み込みに失敗しました:', err);
        return;
    }

    // MarkdownをHTMLに変換する
    const converter = new showdown.Converter();
    const convertedHtml = converter.makeHtml(mdData);

    // HTMLファイルを読み込む
    fs.readFile(htmlFilePath, 'utf8', (
        err: NodeJS.ErrnoException | null,
        htmlData: string
    ) => {
        if (err) {
            console.error('HTMLファイルの読み込みに失敗しました:', err);
            return;
        }

        // JSDOMを使用してHTMLをパースする
        const dom = new JSDOM(htmlData);
        const document = dom.window.document;

        // div.transformedを取得し、変換したHTMLを挿入する
        const transformedDiv = document.querySelector('.transformed');
        transformedDiv.innerHTML = convertedHtml;

        // 更新されたHTMLを取得
        const updatedHtml = dom.serialize();

        // HTMLファイルを書き込む
        fs.writeFile(htmlFilePath, updatedHtml, 'utf8', (
            err: NodeJS.ErrnoException | null
        ) => {
            if (err) {
                console.error('HTMLファイルの書き込みに失敗しました:', err);
                return;
            }

            console.log('Markdownの変換とHTMLファイルの更新が完了しました。');
        });
    });
});

export {}; // モジュール化をすることで、グローバルスコープの汚染を防ぐ
