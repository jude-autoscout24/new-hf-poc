type SubCategoryLink = {
    name: string;
    href: string;
    target: string;
    tracking: string;
};

type SubCategory = {
    name: string;
    subCategoryLinks: SubCategoryLink[];
};

type ParentLink = {
    name: string;
    subCategories: SubCategory[];
};

export type Header = {
    [locale: string]: {
        parentLinks: ParentLink[];
    };
};

export type SampleData = {
    header: Header;
};
