import nunjucks from 'nunjucks';
import fs from 'fs'
import path from 'path';
import { I18n } from './i18n/index';
import ejs from 'ejs'
import { Header, SampleData } from './utils/sampleData.types';

const viewsPath = path.resolve(__dirname, './views');

const env = nunjucks.configure(viewsPath, {
    autoescape: true,
    noCache: true,
});

const i18n = new I18n();

env.addFilter('translate', (key) => i18n.translate(key))


function renderNunjucksTemplate(templatePath: string, data: object | undefined, outputPath: fs.PathOrFileDescriptor) {
    console.log('using Nunjucks')

    const dir = path.dirname(outputPath.toString());
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const output = nunjucks.render(templatePath, data);
    fs.writeFileSync(outputPath, output);
    console.log(`Generated ${outputPath}`);
}

function renderEJSTemplate(templatePath: string, data: object, outputPath: fs.PathOrFileDescriptor) {
    console.log('using EJS')
    const dir = path.dirname(outputPath.toString());
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    ejs.renderFile(path.join(viewsPath, templatePath), data, {}, (err:Error | null, output:any) => {
        if (err) {
            console.error('Error rendering template:', err);
            return;
        }
        fs.writeFileSync(outputPath, output);
        console.log(`Generated ${outputPath}`);
    });
}


const sampleData: SampleData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './utils/sampleData.json'), 'utf-8'))



const headerData: Header = sampleData.header

for (const locale in headerData) {
    if (headerData.hasOwnProperty(locale)) {
        i18n.setLocale(locale)
        // states 
        // User Type
        renderNunjucksTemplate('header.njk', { header: headerData[locale], locale }, `./dist/${locale}/header.html`);
        // renderEJSTemplate('header.ejs', { header: headerData[locale], locale, translate: i18n.translate.bind(i18n) }, `./dist/${locale}/header.html`);
    }
}

