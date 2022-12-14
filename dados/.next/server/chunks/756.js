"use strict";
exports.id = 756;
exports.ids = [756];
exports.modules = {

/***/ 756:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLinkFromBrowser": () => (/* binding */ getLinkFromBrowser),
/* harmony export */   "getProgramationFromBrowser": () => (/* binding */ getProgramationFromBrowser)
/* harmony export */ });
function getLinkFromBrowser(date) {
    const getNumberOfWeeksTillThisDate = (date)=>{
        const currentDate = new Date(date);
        const startDate = new Date(currentDate.getFullYear(), 0, 1);
        const oneDayInMiliseconds = 24 * 60 * 60 * 1000;
        const days = Math.floor((+currentDate - +startDate - oneDayInMiliseconds) / oneDayInMiliseconds);
        const weekNumber = Math.ceil(days / 7);
        return weekNumber;
    };
    const linkToScheduleFromJW = document.querySelector("#menuToday a")?.getAttribute("href");
    const linkToScheduleFromJWSplited = linkToScheduleFromJW?.split("/");
    linkToScheduleFromJWSplited?.splice(linkToScheduleFromJWSplited.length - 2, 2);
    const currentYear = new Date(date).getFullYear();
    const numberOfWeeks = getNumberOfWeeksTillThisDate(date);
    return `https://wol.jw.org${linkToScheduleFromJWSplited?.join("/")}/${currentYear}/${numberOfWeeks}`;
}
function getProgramationFromBrowser() {
    const removeDirt = (text)=>(text || "").replaceAll(/\:/g, "").trim();
    const getTextFrom = (query)=>removeDirt(document.querySelector(query)?.textContent || "");
    const getManyTexstFrom = (query)=>Array.from(document.querySelectorAll(query))?.map((node)=>removeDirt(node.textContent || ""))?.filter((text)=>text);
    const getChildrenFrom = (query)=>Array.from(document.querySelector(query)?.children || []);
    const $4sectionNodes = getChildrenFrom("#section4 ul");
    $4sectionNodes.splice($4sectionNodes.length - 2, 1); //removing Final Comments part;
    const programationTree = {
        songs: [
            {
                title: getTextFrom("#section1 #p3 a")
            },
            {
                title: Array.from($4sectionNodes.shift()?.querySelectorAll("strong") || []).map((node)=>removeDirt(node.textContent)).filter((text)=>text)[0]
            },
            {
                title: Array.from($4sectionNodes.pop()?.querySelectorAll("strong") || []).map((node)=>removeDirt(node.textContent)).filter((text)=>text)[0]
            }, 
        ],
        comments: [
            {
                title: "Coment\xe1rios iniciais",
                time: "(1 min)"
            },
            {
                title: "Coment\xe1rios finais",
                time: "(3 min)"
            }, 
        ],
        week: [
            {
                title: getTextFrom("header #p1 strong")
            }
        ],
        weekExcerpt: [
            {
                title: getTextFrom("header #p2 strong")
            }
        ],
        treasures: [
            {
                title: getManyTexstFrom("#section2 #p6 strong").join(""),
                time: "(10 min)"
            },
            {
                title: "Joias espirituais",
                time: "(10 min)"
            },
            {
                title: "Leitura da B\xedblia",
                time: "(4 min)"
            }
        ],
        ministry: getChildrenFrom("#section3 ul").map(({ children  })=>{
            const [title] = Array.from(children[0].children);
            return {
                title: removeDirt(title.textContent),
                time: removeDirt((children[0].textContent?.match(/\(.+?\)/) || [])[0])
            };
        }),
        cristianLife: $4sectionNodes.map((node)=>{
            return {
                title: Array.from(node.querySelectorAll("strong"))?.map((strong)=>removeDirt(strong.textContent)).filter((text)=>text).join(""),
                time: removeDirt(node.textContent?.match(/\(.+?\)/)?.[0])
            };
        })
    };
    return programationTree;
}



/***/ })

};
;