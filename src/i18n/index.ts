import {en_GB} from './locales/en-GB'
import {de_DE} from './locales/de-DE'

type Translations = { [key: string]: string };

export class I18n {
    private locale = '';
    private resources: Record<string, { translation: Translations }> = {
        'en_GB': { translation: en_GB },
        'de_DE': { translation: de_DE }
    };
    private fallbackLocale = 'de_DE';
    
    constructor(){
        this.locale = this.fallbackLocale
    }

    setLocale(locale: string): void {
        if(this.resources[locale]){
            this.locale = locale;
        } else {
            console.log("Using fallback locale")
            this.locale = this.fallbackLocale;
        }
    }

    translate(key: string): string{
        const translations = this.resources[this.locale]?.translation

        if (!translations) {
            throw new Error(`Translations not found for locale '${this.locale}'`);
        }

        const translation = translations[key];

        if (!translation) {
            throw new Error(`Translation key '${key}' not found for locale '${this.locale}'`);
        }

        return translation;
    }
}