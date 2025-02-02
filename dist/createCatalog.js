"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatalog = void 0;
const validateCatalog_1 = require("./validateCatalog");
function createCatalog(catalogs, components, terms, title, lang) {
    return {
        title: title,
        lang: lang,
        standards: getStandards(catalogs),
        chapters: getChapters(catalogs),
        components: getComponents(components),
        terms: getTerms(terms),
    };
}
exports.createCatalog = createCatalog;
function getTerms(terms) {
    if (validateCatalogDataFiles(terms)) {
        return terms.terms;
    }
}
function getComponents(components) {
    if (validateCatalogDataFiles(components)) {
        console.log("components.components", components.components);
        return components.components;
    }
}
function getChapters(catalogs) {
    let chapters = [];
    for (const index in catalogs) {
        if (!validateCatalogDataFiles(catalogs[index]))
            return;
        chapters = chapters.concat(catalogs[index].chapters);
    }
    return chapters;
}
function getStandards(catalogs) {
    let standard = [];
    for (const index in catalogs) {
        if (!validateCatalogDataFiles(catalogs[index]))
            return;
        standard = standard.concat(catalogs[index].standard);
    }
    return standard;
}
function validateCatalogDataFiles(catalog) {
    const catalogSchema = "openacr-catalog-0.1.0.json";
    const validCatalogResult = validateCatalog_1.validateCatalog(catalog, catalogSchema);
    // ** Expected to be true when valid.  **
    if (!validCatalogResult.result) {
        console.error("Error: Invalid catalog data file: " + validCatalogResult.message);
        return false;
    }
    return true;
}
