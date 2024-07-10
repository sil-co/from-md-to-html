const fs: typeof import('fs') = require('fs');
const path: typeof import('path') = require('path');
const showdown = require('showdown');

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

        // 変換したHTMLを挿入する
        const newHtmlData = htmlData.replace(
            '<div class="transformed"></div>',
            `<div class="transformed">${convertedHtml}</div>`
        );

        // HTMLファイルを書き込む
        fs.writeFile(htmlFilePath, newHtmlData, 'utf8', (
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
