import {execSync} from 'child_process'
import path from 'path';

export default class LocaleHtmlGeneratorPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('DynamicLocalePlugin', () => {
            console.log('Generating locale-specific HTML files...');
            const outputPath = path.resolve(compiler.options.output.path, compiler.options.output.filename);
            execSync(`node ${outputPath}`, { stdio: 'inherit' });
        });
    }
}
