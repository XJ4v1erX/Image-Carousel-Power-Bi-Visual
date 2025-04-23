var imageCarousel841D08754064411FB94209D64C84C32B_DEBUG;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ Visual)
/* harmony export */ });
class Visual {
    container;
    currentIndex = 0;
    carouselInterval;
    options;
    constructor(options) {
        this.container = document.createElement('div');
        this.container.id = 'carousel-container';
        options.element.appendChild(this.container);
    }
    update(options) {
        this.options = options;
        const dataView = options.dataViews[0];
        if (!dataView?.categorical)
            return;
        const categorical = dataView.categorical;
        const imageUrls = categorical.categories[0].values;
        const sequences = categorical.values?.[0]?.values || [];
        const carouselImages = imageUrls.map((url, index) => ({
            url,
            sequence: sequences[index] || index
        })).sort((a, b) => a.sequence - b.sequence);
        this.renderCarousel(carouselImages);
    }
    renderCarousel(images) {
        this.container.innerHTML = '';
        images.forEach((image, index) => {
            const imgElem = document.createElement('img');
            imgElem.src = image.url;
            imgElem.className = 'carousel-image';
            imgElem.style.display = index === 0 ? 'block' : 'none';
            this.container.appendChild(imgElem);
        });
        this.setupCarouselBehavior(images.length);
    }
    setupCarouselBehavior(totalImages) {
        const settings = this.getBehaviorSettings();
        if (this.carouselInterval)
            clearInterval(this.carouselInterval);
        if (settings.autoSlide) {
            this.carouselInterval = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % totalImages;
                this.updateCarouselView(this.currentIndex);
            }, Number(settings.interval));
        }
    }
    updateCarouselView(index) {
        const images = document.querySelectorAll('.carousel-image');
        images.forEach((img, idx) => {
            img.style.display = idx === index ? 'block' : 'none';
        });
    }
    getBehaviorSettings() {
        const objects = this.options.dataViews[0].metadata.objects;
        return {
            autoSlide: objects?.behavior?.autoSlide ?? true,
            interval: objects?.behavior?.interval ?? 3000
        };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it declares 'imageCarousel841D08754064411FB94209D64C84C32B_DEBUG' on top-level, which conflicts with the current library output.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (visualPlugin)
/* harmony export */ });
/* harmony import */ var _src_visual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(283);

var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];
var imageCarousel841D08754064411FB94209D64C84C32B_DEBUG = {
    name: 'imageCarousel841D08754064411FB94209D64C84C32B_DEBUG',
    displayName: 'ImageCarousel',
    class: 'Visual',
    apiVersion: '5.3.0',
    create: (options) => {
        if (_src_visual__WEBPACK_IMPORTED_MODULE_0__/* .Visual */ .b) {
            return new _src_visual__WEBPACK_IMPORTED_MODULE_0__/* .Visual */ .b(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId, options, initialState) => {
        const dialogRegistry = globalThis.dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["imageCarousel841D08754064411FB94209D64C84C32B_DEBUG"] = imageCarousel841D08754064411FB94209D64C84C32B_DEBUG;
}
/* harmony default export */ const visualPlugin = (imageCarousel841D08754064411FB94209D64C84C32B_DEBUG);

})();

imageCarousel841D08754064411FB94209D64C84C32B_DEBUG = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=https://localhost:8080/assets/visual.js.map