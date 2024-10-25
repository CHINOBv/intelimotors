export const SEMINUEVOS_SELECTORS = {
    login: {
        username: 'input[id="email"]',
        password: 'input[id="password"]',
        submit: 'button[type="submit"]'
    },
    createAd: {
        addButton: "#primaryNav > li.cta-btn > a",
        type: '#dropdown_types > div > div > div.search-input > input[type=text]',
        brandsList: '#dropdown_brands > div > div > ul > li',
        modelsList: '#dropdown_models > div > div > ul > li',
        subtypeList: '#dropdown_subtypes > div > div > ul > li',
        statesList: '#dropdown_provinces > div > div > ul > li',
        citiesList: '#dropdown_cities > div > div > ul > li',
        yearList: '#dropdown_years > div > div > ul > li',
        mileage: '#input_recorrido',
        price: '#input_precio',
        transaction: '#dropdown_negotiable > div > div > div.search-input > input[type=text]',
        description: '#input_text_area_review',
        fileInput: '#Uploader',
        submit: '#wizard > div > div > div.footer-fixed > div > div.footer-button.footer-column > button',

    }
};
